var SCENE;
var mapGroup;
var isinitmap=false;

var GameMap = new Phaser.Class({
  
    
    Extends: Phaser.Scene,
    
    initialize:
    
    function GameMap ()
    {
        Phaser.Scene.call(this, {
            key: 'GameMap',
            active:false
        });
    },
    
    preload:function (){
        
        this.load.image("map","assets/ui/map.png");
        this.load.image("mapselect","assets/ui/mapselect.png");
    },
    create:function(){
        
        SCENE=this;
        mapGroup=this.add.group();
        
        mapUI=this.add.sprite(sw/2,150+sw/16*15/2,"map").setScale(sw/16*15/128).setTint(0xE7D09E);
        
        $("#canvas").css("left",sw*1/32);
        $("#canvas").css("top","150px");
        drawit(isinitmap);
        
        //this.bgm=this.sound.add("bgm_setting");
        //this.bgm.play({volume: 1,loop:true});
        
        
        this.title = this.add.text(sw/2, 50, "选择...", { fontSize: '80px',fontFamily:"font1", fill: '#ffffff' }).setOrigin(0.5,0.5);
        
        this.homeButton = this.add.text(sw/2, sh-20-30, "返回", { fontSize: '25px',fontFamily:"font1", fill: '#ffffff' }).setOrigin(0.5,0.5);
        
        this.homeButton.setInteractive();
        
        this.homeButton.on("pointerdown",function (eve){
            
            MapToBegin=true;

            bgm.stop();
            
            this.scene.scene.start("GameBegin");
            
            this.scene.scene.stop("GameMap");
            
        });
        
        
        this.version = this.add.text(10, sh-20, "版本:DEMO20221221   特学生工作室制作", { fontSize: '15px',fontFamily:"font1", fill: '#ffffff' });
        
     }
        
    
  
});

myGame.scenes.push(GameMap);