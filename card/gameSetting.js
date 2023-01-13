
var GameSetting = new Phaser.Class({
  
    
    Extends: Phaser.Scene,
    
    initialize:
    
    function GameSetting ()
    {
        Phaser.Scene.call(this, {
            key: 'GameSetting',
            active:false
        });
    },
    
    preload:function (){
        this.load.audio("bgm_setting","assets/music/Ludum Dare 32 - Track 4.wav");
        this.load.html("volume","volume.html");
        this.load.html("map","stsmapgen-master/mapcanvas.html");
    },
    create:function(){
        
        $("#canvas").css("left","50000px");
        
        
        
        //this.bgm=this.sound.add("bgm_setting");
        //this.bgm.play({volume: 1,loop:true});
        
        
        this.title = this.add.text(sw/2, 50, "设置", { fontSize: '80px',fontFamily:"font1", fill: '#ffffff' }).setOrigin(0.5,0.5);
        
        this.volumeText = this.add.text(sw/2, sh/2-60, "背景音乐音量:"+bgmVolume, { fontSize: '30px',fontFamily:"font1", fill: '#ffffff' }).setOrigin(0.5,0.5);
        
       
        
        this.volumeRange = this.add.dom(sw/2,sh/2).createFromCache("volume");
        
        this.volumeRange.addListener("pointerup");
        
        this.volumeRange.getChildByName("volumeRange").value=bgmVolume;
        
        
        
        
        this.volumeRange.on("pointerup",function (event){
            volumenum=this.getChildByName("volumeRange").value;
            
            this.scene.volumeText.setText("背景音乐音量:"+volumenum);
            bgm.setVolume(volumenum/100);
            bgmVolume=volumenum;
        });
        
        this.homeButton = this.add.text(sw/2, sh-20-30, "返回", { fontSize: '25px',fontFamily:"font1", fill: '#ffffff' }).setOrigin(0.5,0.5);
        
        this.homeButton.setInteractive();
        
        this.homeButton.on("pointerdown",function (eve){
            
            bgm.stop();
            
            this.scene.scene.start("GameBegin");
            
            this.scene.scene.stop("GameSetting");
            
        });
        
        
        this.version = this.add.text(10, sh-20, "版本:DEMO20221221   特学生工作室制作", { fontSize: '15px',fontFamily:"font1", fill: '#ffffff' });
        
     }
        
    
  
});

myGame.scenes.push(GameSetting);