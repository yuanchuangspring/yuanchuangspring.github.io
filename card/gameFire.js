var GameFire = new Phaser.Class({
  
    
    Extends: Phaser.Scene,
    
    initialize:
    
    function GameFire ()
    {
        Phaser.Scene.call(this, {
            key: 'GameFire',
            active:false
        });
    },
    
    preload:function (){
        this.load.image("firered","assets/ui/fireRed.png");
        this.load.image("firegreen","assets/ui/fireGreen.png");
    },
    create:function(){
        
        $("#canvas").css("left","50000px");
        
        
        
        //this.bgm=this.sound.add("bgm_setting");
        //this.bgm.play({volume: 1,loop:true});
        
        
        this.title = this.add.text(sw/2, 100, "营火🔥", { fontSize: '80px',fontFamily:"font1", fill: '#ffffff' }).setOrigin(0.5,0.5);
        
        this.frsprite=this.add.sprite(sw/2,sh/2-20-sw/16*12/2,"firered").setScale(sw/16*12/512);
        this.fgsprite=this.add.sprite(sw/2,sh/2+20+sw/16*12/2,"firegreen").setScale(sw/16*12/512);
        
        this.frsprite.setInteractive();
        this.frsprite.on("pointerdown",function (){
            this.scene.tweens.add({
             targets: this,
             scale: sw/16*12/512*0.8,
             ease: 'Power1',
             duration: 400,
             yoyo:true,
             onComplete:function (){
                     paiku.forEach(function (qi){
                       
                         qi.life+=5;
                         
                     });
                     isinitmap=true;
                     this.targets[0].scene.scene.stop("GameFire");
                     this.targets[0].scene.scene.start("GameMap");
                 }
            });
        });

        this.frspriteText = this.add.text(sw/2, sh/2-20-sw/16*12/2, "休息:全体人员回复五生命值", { fontSize: '30px',fontFamily:"font1", fill: '#ffffff' }).setOrigin(0.5,0.5);
        this.fgspriteText = this.add.text(sw/2, sh/2+20+sw/16*12/2, "训练:升级一张卡牌", { fontSize: '30px',fontFamily:"font1", fill: '#ffffff' }).setOrigin(0.5,0.5);
        
     }
        
    
  
});

myGame.scenes.push(GameFire);