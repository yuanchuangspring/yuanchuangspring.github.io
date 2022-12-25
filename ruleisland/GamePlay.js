var mapdic=[];
var init=false;
var current_card=[ [],[],[] ];


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
        
    },

    create: function ()
    {
        //帧率
        this.physics.world.setFPS(60);
        
        //创建精灵
        //this.player=this.add.sprite(sw/2,sh/2,"mapCard");
        //this.player.setScale(0.35);
        
        this.menuBg=this.add.rectangle(64,sh/2,128,sh+50,0xcacaca);
        
        this.uiBg1=this.add.rectangle(128+(sw-84)/2,(sh-4)/6,sw-104,(sh-4)/3,0xaba58f);
        this.uiBg2=this.add.rectangle(128+(sw-84)/2,(sh-4)/6+(sh-4)/3+3,sw-104,(sh-4)/3,0xaba58f);
        this.uiBg3=this.add.rectangle(128+(sw-84)/2,(sh-4)/6+((sh-4)/3+3)*2+5,sw-104,(sh-4)/3+10,0xaba58f);
        
        this.clock=this.add.rectangle(64,20,120,32,0xffffff);
        this.clockText=this.add.text(64,20,"00:00",{ font: '25px Arial', fill: '#000000' });
        this.clockText.setOrigin(0.5,0.5);
        
        this.playerConfig=this.add.rectangle(64,56,120,32,0xffffff);
        this.playerConfigText=this.add.text(64,56,"name",{ font: '25px Arial', fill: '#000000' });
        this.playerConfigText.setOrigin(0.5,0.5);
        
        //创建精灵组
        this.mapGroup=this.add.group();
        
        //镜头设置
        //this.cameras.main.startFollow(this.player);

    },

    update: function ()
    {
        if(!init){
          postCard1(this,1);
          postCard2(this,1);
          postCard3(this,1);
          init=true;
        }
        
       
       
    }
    //update end...
    
    
    

});


myGame.scenes.push(gamePlayState);


