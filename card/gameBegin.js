var bgm;
var bgmVolume=50;
var MapToBegin=false;




var GameBegin = new Phaser.Class({
  
    
    Extends: Phaser.Scene,
    
    initialize:
    
    function GameBegin ()
    {
        Phaser.Scene.call(this, {
            key: 'GameBegin',
            active:true
        });
    },
    
    preload:function (){
        this.load.image("desk","assets/ui/desk.png");
        this.load.audio("bgm","assets/music/Ludum Dare 32 - Track 4.wav");
        
    },
    create:function(){
        
        

        if(MapToBegin){
            ppp();
            MapToBegin=false;
        }
        bgm=this.sound.add("bgm");
        bgm.play({volume: bgmVolume/100,loop:true});
        
        $("#canvas").css("left","50000px");
        
        this.title = this.add.text(sw/2, 100, "赏金小队", { fontSize: '80px',fontFamily:"font1", fill: '#ffffff' }).setOrigin(0.5,0.5);
        
        yellowtip=this.add.text(sw/2+100, 130, yellowtipText[Math.floor(Math.random()*yellowtipText.length)], { fontSize: '40px',fontFamily:"font1", fill: '#ffe160' }).setOrigin(0.5,0.5);
        yellowtip.setAngle(-30);
 
        this.tweens.add({
             targets: yellowtip,
             scale: 0.65,
             ease: 'Power1',
             duration: 400,
             yoyo:true,
             repeat:-1
        });
       
        this.startButton = this.add.text(sw/2, sh/2, "开始游戏", { fontSize: '50px',fontFamily:"font1", fill: '#ffffff' }).setOrigin(0.5,0.5);
        
        this.startButton.setInteractive();
        this.startButton.on("pointerdown",function (){
            isinitmap=false;
            this.scene.start("GameMap");
            
        },this);
      
        this.settingButton = this.add.text(sw/2, sh/2+75, "设置", { fontSize: '50px',fontFamily:"font1", fill: '#ffffff' }).setOrigin(0.5,0.5);
        
        this.settingButton.setInteractive();
        this.settingButton.on("pointerdown",function (){
            
            this.scene.scene.start("GameSetting");
            
        });
        
        
        
        this.version = this.add.text(10, sh-20, "版本:DEMO20221221   特学生工作室制作", { fontSize: '15px',fontFamily:"font1", fill: '#ffffff' });
        
     }
        
    
  
});

myGame.scenes.push(GameBegin);