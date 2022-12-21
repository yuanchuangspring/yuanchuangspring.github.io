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
        this.load.image("bg","assets/ui/bg.png");
        this.load.image("bg_logo","assets/ui/bg_logo.jpg");
        this.load.image("but_start","assets/ui/but_start.jpg");
        
        
        
    },
    create:function(){
        
        
        this.bg=this.add.image(sw/2,sh/2,"bg");
        
        this.version = this.add.text(10, sh-20, "版本:DEMO20221221   特学生工作室制作", { font: '15px Arial', fill: '#ffffff' });

        this.logo=this.add.image(sw/2,(sw*7/16)/922*287/2,"bg_logo");
        this.logo.setScale((sw*7/16)/922);
        this.bg.setScale(sw/128);
        
        this.start=this.add.sprite(sw/2,sh/2+(sw*4/16)/899*288/2,"but_start");
        this.start.setScale((sw*4/16)/899);
        this.start.setInteractive()
        this.start.on("pointerdown",function (pointer){this.scene.start("GamePlay");this.scene.start("gameUI");},this);    
        
        
        
    }
    
  
});

myGame.scenes.push(GameBegin);