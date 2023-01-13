



var GameJiesuan = new Phaser.Class({
  
    
    Extends: Phaser.Scene,
    
    initialize:
    
    function GameJiesuan ()
    {
        Phaser.Scene.call(this, {
            key: 'GameJiesuan',
            active:false
        });
    },
    
    preload:function (){
        
        this.load.image("jiesuanbg","assets/bg.png");
        this.load.image("mapCardjiesuan","assets/cardMoBan.png");
        
    },
    create:function(){
        
        this.add.image(sw/2,sh/2,"jiesuanbg").setScale(sh*sw/256).setAlpha(0.8);
        
        
    
  },
  update:function (){
      if(isjiesuan){
        this.title = this.add.text(sw/2, 50, "结算", { fontSize: '80px',fontFamily:"font1", fill: '#ffffff' }).setOrigin(0.5,0.5);
        
        this.coin = this.add.text(sw/2, sh/16*5, "获得赏金:"+boss.coin, { fontSize: '30px',fontFamily:"font1", fill: '#ffd315' }).setOrigin(0.5,0.5);
        
        this.cardt = this.add.text(sw/2, sh/16*8, "选择一张卡牌:", { fontSize: '30px',fontFamily:"font1", fill: '#ffffff' }).setOrigin(0.5,0.5);
        
        
        
        for(cardtt=0;cardtt<3;cardtt++){
        cardData=cardtotal[Math.floor(Math.random()*cardtotal.length)];
        this.cardContainer=this.add.container(15+(cardtt+1)*(sw-30)/4,sh/16*8+10+((sh-4)/3-15)/1.8);
    addcard=this.add.sprite(0,0,"mapCardjiesuan");
    addcard.setScale(((sh-4)/3-15)/384/1.8);
    addcard.setTint(0x554236);
    addcard.layoutType="cardBg";
    
    Aname=this.add.text(0,-1*(((sh-4)/3-15)/1.8/2-10),cardData.name,{ fontSize: '20px', fontFamily:"font1",  fill: '#ffffff' });
    Aname.setOrigin(0.5,0.5);
    
    cardImg=this.add.sprite(0,0,cardData.key);
    cardImg.setScale(((sh-4)/3-15)/1.8/256*0.3);
    
    Ades=this.add.text(0,((sh-4)/3-15)/1.8/2-10,cardData.des,{ fontSize: '15px', fontFamily:"font1", fill: '#ffffff' });
    Ades.setOrigin(0.5,0.5);
    
    addcard.cdata=cardData;
    this.cardContainer.add(addcard);
    this.cardContainer.add(Aname);
    this.cardContainer.add(Ades);
    this.cardContainer.add(cardImg);
    if(cardData.type=="humans"){
    cardLifeUI=this.add.sprite(((sh-4)/3-15)/384/1.8*256/2*(-1)+10,-1*(((sh-4)/3-15)/1.8/2-10),"humansLifeUI").setScale(((sh-4)/3-15)/384/10);
    cardLifeUIText=this.add.text(((sh-4)/3-15)/384/1.8*256/2*(-1)+10,-1*(((sh-4)/3-15)/1.8/2-10),cardData.life,{ fontSize: '10px', fontFamily:"font1",  fill: '#000000' }).setOrigin(0.5,0.5);
    this.cardContainer.add(cardLifeUI);
    this.cardContainer.add(cardLifeUIText);

    cardAttUI=this.add.sprite(((sh-4)/3-15)/384/1.8*256/2-10,-1*(((sh-4)/3-15)/1.8/2-10),"humansAttUI").setScale(((sh-4)/3-15)/384/10);
    cardAttUIText=this.add.text(((sh-4)/3-15)/384/1.8*256/2-10,-1*(((sh-4)/3-15)/1.8/2-10),cardData.att,{ fontSize: '10px', fontFamily:"font1",  fill: '#000000' }).setOrigin(0.5,0.5);
    this.cardContainer.add(cardAttUI);
    this.cardContainer.add(cardAttUIText);
    }

    this.cardContainer.cardData=cardData;
    }
        
        this.homeButton = this.add.text(sw/2, sh-20-30, "返回", { fontSize: '25px',fontFamily:"font1", fill: '#ffffff' }).setOrigin(0.5,0.5);
        
        this.homeButton.setInteractive();
        
        this.homeButton.on("pointerdown",function (eve){
            
            //bgm.stop();
            isinitmap=true;
            this.scene.scene.stop("GamePlay");
            this.scene.scene.start("GameMap");
            
            this.scene.scene.stop("GameJiesuan");
            
        });
        isjiesuan=false;
        

mapdic=[];
init=false;
current_card=[];
layout=[];
humansGroup=[];

postButton;
onSpotHumans=["","","","",""];

boss;
boss_lifebar;
boss_lifebarText;

player_life=100;
player_fullLife=100;

te=0;

tekuang;

bossddd;

bossLastAction="";

bossStepNum=0;

isBossTrend=true;

clearTintForHurt=[];
      }
  }
});

myGame.scenes.push(GameJiesuan);