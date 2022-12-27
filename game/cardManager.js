//卡牌管理器
var gameSceneVar;

var cw=((sh-4)/3-15)/384*256;
var postsign;
var postLine;
var isSelect=false;
var current_select="";
var current_select_layout="";

function postCard(scene,cardData){
    
    this.cardContainer=scene.add.container(sw+200,sh/16*12);
    addcard=scene.add.sprite(0,0,"mapCard");
    addcard.setScale(((sh-4)/3-15)/384/1.8);
    addcard.setTint(0x554236);
    addcard.layoutType="cardBg";
    
    Aname=scene.add.text(0,-1*(((sh-4)/3-15)/1.8/2-10),cardData.name,{ font: '20px Arial', fill: '#ffffff' });
    Aname.setOrigin(0.5,0.5);
    
    cardImg=scene.add.sprite(0,0,cardData.key);
    cardImg.setScale(sw/7.5/256/2*1.5);
    
    Ades=scene.add.text(0,((sh-4)/3-15)/1.8/2-10,cardData.des,{ font: '10px Arial', fill: '#ffffff' });
    Ades.setOrigin(0.5,0.5);
    
    this.cardContainer.add(addcard);
    this.cardContainer.add(Aname);
    this.cardContainer.add(Ades);
    this.cardContainer.add(cardImg);
    
    this.cardContainer.cardData=cardData;
    
    current_card.push(this.cardContainer);
    
    addcard.setInteractive();
    addcard.on("pointerdown",function (pointer){
        isSelect=true;
        postsign=this.scene.add.sprite(pointer.x,pointer.y,"post");
        postsign.setScale(0.3);
        postLine=this.scene.add.graphics();
        
        scaleTo(this.scene,this.parentContainer,1.2,300);
        current_select=this;
    });
    scene.input.on("pointermove",function (pointer){
      if(current_select!=undefined && isSelect==true){
        postLine.clear();
        postLine.lineStyle(6,0x149228);
        
        postLine.lineBetween(current_select.parentContainer.x,current_select.parentContainer.y,pointer.x,pointer.y);
 
        postsign.setPosition(pointer.x,pointer.y);
        
        for(sl=0;sl<layout.length;sl++){
          if(Phaser.Math.Distance.Between(layout[sl].x,layout[sl].y,pointer.x,pointer.y)<=20){
            current_select_layout=layout[sl];
            scaleTo(this,current_select_layout,sw/7.5/256*1.2,200);
            current_select_layout.setAlpha(1);
          }else{layout[sl].setScale(sw/7.5/256);layout[sl].setAlpha(0.6);}
        }
      }
    },scene);
    scene.input.on("pointerup",function (pointer){
        
        //这块迟早出问题，container删的不彻底
        
        
        if((pointer.y-sh/2)**2<=400 && isSelect==true &&te==0){
          //选好了，post！
          p=current_select.parentContainer;
          p.each(function (des){
              des.destroy();
          });
          
          gameSceneVar=this;
          current_select.parentContainer="";
          current_select="";
          jiguang=this.add.rectangle(current_select_layout.x,-100,10,0,0xffffff);
          this.tweens.add({
             targets: jiguang,
             height: sh/2+100,
             ease: 'Linear',
             duration: 100
          });
          this.tweens.add({
             targets: jiguang,
             width: 50,
             ease: 'Linear',
             duration: 100
          });
          this.tweens.add({
             targets: jiguang,
             x: jiguang.x-20,
             ease: 'Linear',
             duration: 100,
             onComplete:function (){
                 zancunsprite=gameSceneVar.add.sprite(current_select_layout.x,current_select_layout.y,p.cardData.key).setScale(((sh-4)/3-15)/384/5);
                 zancunsprite.cardData=p.cardData;
                 //施工区
                 onSpotHumans[layout.indexOf(current_select_layout)]=zancunsprite;
                 
                 gameSceneVar.tweens.add({
                   targets: zancunsprite,
                   scale: ((sh-4)/3-15)/384/5*1.2,
                   ease: 'Linear',
                   duration: 500,
                   yoyo:true,
                   repeat:-1
                 });
                 current_card.splice(current_card.indexOf(p),1);
                 p.destroy();
                 cardLayout(gameSceneVar);
                 
                 gameSceneVar.tweens.add({
                  targets: jiguang,
                  width: 0,
                  ease: 'Linear',
                  duration: 500
                 });
                 gameSceneVar.tweens.add({
                  targets: jiguang,
                  x:jiguang.x+25,
                  ease: 'Linear',
                  duration: 500,
                  onComplete:function (){
                      jiguang.destroy();
                      
                  }
                 });
                 
                 
             }
          });
        
          
          
          
          
          
          
        }
        scaleTo(this,current_select_layout,sw/7.5/256,300);
        if(current_select_layout!=undefined){current_select_layout.setAlpha(0.6);}
        if(current_select!=undefined){scaleTo(this,current_select.parentContainer,1,300);}
        if(isSelect==true){postsign.destroy();
        postLine.destroy();}
        isSelect=false;
    },scene);
    
    moveToPointX(scene,this.cardContainer,sw/(current_card.length+1)*(current_card.indexOf(this.cardContainer)+1),1000);
    spineAngle(scene,this.cardContainer,-30+60/(current_card.length+1)*(current_card.indexOf(this.cardContainer)+1),1000);
    cardLayout(scene);
   
}

function cardLayout(scene){
    for(cardlay=0;cardlay<current_card.length;cardlay++){
      moveToPointX(scene,current_card[cardlay],sw/(current_card.length+1)*(cardlay+1),1000);
      spineAngle(scene,current_card[cardlay],-30+60/(current_card.length+1)*(cardlay+1),1000);
    
    }
}

function hurtBoss(num){
    boss.setTint(0xff0000);
    boss.scene.tweens.add({
        targets: boss,
        x: boss.x+20,
        ease: 'Power1',
        duration: 200,
        yoyo:true
    });
    setTimeout("boss.clearTint()",200);
    boss.life-=num;
    boss_lifebarText.setText(boss.life+"/"+boss.fullLife);
    changeWidth(boss_lifebar.scene,boss_lifebar,512*0.6*(boss.life/boss.fullLife),1000);
}

function takeEffect(scene){
      moveToPointX(layout[te].scene,tekuang,layout[te].x,1000);
      layout[te].setAlpha(1);
      if(te!=0){layout[te-1].setAlpha(0.6);}
      if(onSpotHumans[te]!=""){
        moveToPointY(onSpotHumans[te].scene,onSpotHumans[te],onSpotHumans[te].y-20,200,true,function (){
            if(te<4){
              te+=1;
              setTimeout("takeEffect(gameSceneVar)",1000);
              
              
            }else{setTimeout("postButton.setAlpha(1);te=0;layout[4].setAlpha(0.6);moveToPointX(layout[4].scene,tekuang,-256*sw/7.5/256,1000)",1000);}
        });
        eval(onSpotHumans[te].cardData.func);
      }else{
          if(te<4){
              te+=1;
              setTimeout("takeEffect(gameSceneVar)",1000);
              
            }else{setTimeout("postButton.setAlpha(1);te=0;layout[4].setAlpha(0.6);moveToPointX(layout[4].scene,tekuang,-256*sw/7.5/256,1000)",1000);}
      }
      
    
}
