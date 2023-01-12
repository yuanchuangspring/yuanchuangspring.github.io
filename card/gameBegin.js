var bgm;
var bgmVolume=50;





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
        ppp();
        bgm=this.sound.add("bgm");
        bgm.play({volume: bgmVolume/100,loop:true});
        
        $("#canvas").css("left","50000px");
        
        this.title = this.add.text(sw/2, 50, "赏金小队", { fontSize: '80px',fontFamily:"font1", fill: '#ffffff' }).setOrigin(0.5,0.5);
        
        
        this.startButton = this.add.text(sw/2, sh/2, "开始游戏", { fontSize: '50px',fontFamily:"font1", fill: '#ffffff' }).setOrigin(0.5,0.5);
        
        this.startButton.setInteractive();
        this.startButton.on("pointerdown",function (){
            
            this.scene.start("GameMap");
            
        },this);
      
        this.settingButton = this.add.text(sw/2, sh/2+75, "设置", { fontSize: '50px',fontFamily:"font1", fill: '#ffffff' }).setOrigin(0.5,0.5);
        
        this.settingButton.setInteractive();
        this.settingButton.on("pointerdown",function (){
            
            this.scene.start("GameSetting");
            
        },this);
        
        
        
        this.version = this.add.text(10, sh-20, "版本:DEMO20221221   特学生工作室制作", { fontSize: '15px',fontFamily:"font1", fill: '#ffffff' });
        
     }
        
    
  
});

myGame.scenes.push(GameBegin);