var mapdic=[];
var init=false;
var current_card=[];
var layout=[];
var humansGroup=[];

var layZoom;

var postButton;
var onSpotHumans=["","","","",""];

var boss;
var boss_lifebar;
var boss_lifebarText;

var player_life=100;
var player_fullLife=100;

var te=0;

var tekuang;

var bossddd;

var bossLastAction="";

var bossStepNum=0;

var isBossTrend=true;

var clearTintForHurt=[];

var paiku=[];//牌库列表
var qipaiku=[];//弃牌库

var gamePlayState = new Phaser.Class({
  
    
    Extends: Phaser.Scene,
    
    initialize:
    
    function GamePlay ()
    {
        Phaser.Scene.call(this, {
            key: 'GamePlay',
            active:false
        });
    },

    preload: function ()
    {
        //背景色设置
        
        
        
        //资源加载进度条
        var progress = this.add.graphics();
        var pro_text = this.add.text(sw/2-50,sh/2-100,"资源加载中...",{fontSize: '30px', fontFamily:"font1"});

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
        this.load.image("boss_shilaimu","assets/boss/boss_shilaimu.png");
        
        this.load.image("post","assets/ui/post.png");
        this.load.image("dunUI","assets/ui/dunUI.png");
        this.load.image("humansLifeUI","assets/ui/humansLifeUI.png");
        this.load.image("humansAttUI","assets/ui/humansAttUI.png");
        this.load.image("attUI","assets/ui/attUI.png");
        this.load.image("doubleUI","assets/ui/doubleUI.png");
        
        
        this.load.image("qishi","assets/humans/qishi.png");
        this.load.image("dunwei","assets/humans/dunwei.png");
        this.load.image("yisheng","assets/humans/yisheng.png");
        this.load.image("jiaolian","assets/humans/jiaolian.png");
        this.load.image("kelong","assets/humans/kelong.png");
        
        this.load.image("mao","assets/weapon/mao.png");
        this.load.image("dun","assets/weapon/dun.png");
        this.load.image("clock","assets/weapon/clock.png");
        
        
        this.load.image("bg_forest","assets/bg_forest.jpg");
        this.load.image("woodboard","assets/ui/woodboard.jpg");
        
    },

    create: function ()
    {
        paiku=[qishi,maoweapon,dunweapon,clockweapon];
        bossddd=shilaimu;
        //帧率
        this.physics.world.setFPS(60);
        
        //ui
        layZoom=sw/7.5/256;
        layW=256*layZoom;
        layH=layW;
        for(i=0;i<5;i++){
            lay=this.add.sprite(sw/2-2*layW-40+(layW+20)*i,sh/2,"lay");
            lay.setScale(layZoom);
            lay.setAlpha(0.6);
            layout.push(lay);
        }
      
        for(i=0;i<5;i++){
            group=this.add.group();
            
            humansGroup.push(group);
        }
        //this.add.sprite(sw/2-2*layW-40,sh/2,"qishi").setScale(layZoom/2*1.5);
        
        
        //boss设置
        boss=this.add.sprite(sw/2,sh/16*3.15,"boss_"+bossddd.key);
        boss.setScale(0.6);
        var boss_tipText=this.add.text(sw/2,20,bossddd.name,{ 
          fontSize: '30px', 
          fontFamily:"font1",
          fill: '#000000' ,
          
        });
        boss.life=bossddd.life;
        boss.fullLife=bossddd.life;
      
        postButton=this.add.text(sw/2,sh/16*3+200*0.6+60,"来吧!(结束本回合)",{ 
          fontSize: '30px', 
          fontFamily:"font1",
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
          fontSize: '30px', 
          fontFamily:"font1",
          fill: '#000000' ,
          
        });
        boss_lifebarText.setOrigin(0.5,0.5);
        
        
        
        //te框
        tekuang=this.add.sprite(-256*layZoom,sh/2,"lay");
        tekuang.setAngle(45);
        tekuang.setScale(layZoom);
        
        //镜头设置
        //this.cameras.main.startFollow(this.player);
        this.cameras.main.setBackgroundColor("rgb(154,164,136)");
        //bg设置
        this.add.sprite(sw/2,boss_tipText.y+sw/1346*540-15,"woodboard").setScale(sw/1346).setDepth(-1);
        
        updateUIloop();

    },

    update: function ()
    {
        if(!init){
          fpManager(this,3);
          init=true;
        }
        
       
       
    }
    //update end...
    
    
    

});


myGame.scenes.push(gamePlayState);


