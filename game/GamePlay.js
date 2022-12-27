var mapdic=[];
var init=false;
var current_card=[];
var layout=[];

var postButton;
var onSpotHumans=["","","","",""];

var boss;
var boss_lifebar;
var boss_lifebarText;

var player_life=100;
var player_fullLife=100;

var te=0;

var tekuang;

var gamePlayState = new Phaser.Class({
  
    
    Extends: Phaser.Scene,
    
    initialize:
    
    function GamePlay ()
    {
        Phaser.Scene.call(this, {
            key: 'GamePlay'
        });
    },

    preload: function ()
    {
        //背景色设置
        
        
        
        //资源加载进度条
        var progress = this.add.graphics();
        var pro_text = this.add.text(sw/2-50,sh/2-100,"资源加载中...");

        this.load.on('progress', function (value) {

            progress.clear();
            progress.fillStyle(0xffffff, 1);
            progress.fillRect(0, sh/2-20, 800 * value, 60);
 
        });

        this.load.on('complete', function () {
            console.log(1);
            pro_text.destroy();
            progress.destroy();

        });

        
        
        
        //资源加载
        this.load.spritesheet("items","assets/itemsheet.png",{frameWidth:96,frameHeight:96});
        this.load.image("mapCard","assets/cardMoBan.png");
        this.load.image("menubg","assets/ui/menuBg.png");
        this.load.image("uibg","assets/ui/uiBg.png");
        this.load.image("lay","assets/ui/layout.png");
        this.load.image("boss_huaji","assets/boss/boss_huaji.png");
        this.load.image("boss_huaji","assets/boss/boss_huaji.png");
        this.load.image("qishi","assets/humans/qishi.png");
        this.load.image("post","assets/ui/post.png");
        
    },

    create: function ()
    {
        //帧率
        this.physics.world.setFPS(60);
        
        //ui
        var layZoom=sw/7.5/256;
        layW=256*layZoom;
        layH=layW;
        for(i=0;i<5;i++){
            lay=this.add.sprite(sw/2-2*layW-40+(layW+20)*i,sh/2,"lay");
            lay.setScale(layZoom);
            lay.setAlpha(0.6);
            layout.push(lay);
        }
        //this.add.sprite(sw/2-2*layW-40,sh/2,"qishi").setScale(layZoom/2*1.5);
        
        
        //boss设置
        boss=this.add.sprite(sw/2,sh/16*3,"boss_huaji");
        boss.setScale(0.6);
        var boss_tipText=this.add.text(sw/2,20,"滑稽",{ 
          font: '30px Arial', 
          fill: '#000000' ,
          
        });
        boss.life=100;
        boss.fullLife=100;
      
        postButton=this.add.text(sw/2,sh/16*3+200*0.6+60,"来吧!(结束本回合)",{ 
          font: '30px Arial', 
          fill: '#ffffff' ,
          backgroundColor:"#000000"
          
        });
        postButton.style.backgroundColor='#ff00ff';
        postButton.setOrigin(0.5,0.5);
        postButton.setInteractive();
        postButton.on("pointerdown",function (){
            if(postButton.alpha!=0.5){
              postButton.setAlpha(0.5);
              takeEffect(this);
            }
        },this);
        
        
        this.tweens.add({
             targets: boss,
             scale: 0.65,
             ease: 'Linear',
             duration: 500,
             yoyo:true,
             repeat:-1
        });
        
      
        boss_tipText.setOrigin(0.5,0.5);
        
        //血条
        this.boss_lifebarD=this.add.rectangle(sw/2,sh/16*3+200*0.6,512*0.6+20,50,0x000000);
        this.boss_lifebarB=this.add.rectangle(sw/2,sh/16*3+200*0.6,512*0.6,30,0xffffff);
        
        boss_lifebar=this.add.rectangle(sw/2,sh/16*3+200*0.6,512*0.6,30,0xff0000);
        
        boss_lifebarText=this.add.text(sw/2,sh/16*3+200*0.6,boss.life+"/"+boss.fullLife,{ 
          font: '30px Arial', 
          fill: '#000000' ,
          
        });
        boss_lifebarText.setOrigin(0.5,0.5);
        
        //玩家血条
        this.player_lifebarD=this.add.rectangle(sw/2,sh/16*3+200*0.6,512*0.6+20,50,0x000000);
        this.player_lifebarB=this.add.rectangle(sw/2,sh/16*3+200*0.6,512*0.6,30,0xffffff);
        
        player_lifebar=this.add.rectangle(sw/2,sh/16*3+200*0.6,512*0.6,30,0xff0000);
        
        player_lifebarText=this.add.text(sw/2,sh/16*3+200*0.6,boss.life+"/"+boss.fullLife,{ 
          font: '30px Arial', 
          fill: '#000000' ,
          
        });
        player_lifebarText.setOrigin(0.5,0.5);
        
        //te框
        tekuang=this.add.sprite(-256*layZoom,sh/2,"lay");
        tekuang.setAngle(45);
        tekuang.setScale(layZoom);
        
        //镜头设置
        //this.cameras.main.startFollow(this.player);

    },

    update: function ()
    {
        if(!init){
          postCard(this,qishi);
          postCard(this,qishi);
          postCard(this,qishi);
          init=true;
        }
        
       
       
    }
    //update end...
    
    
    

});


myGame.scenes.push(gamePlayState);


