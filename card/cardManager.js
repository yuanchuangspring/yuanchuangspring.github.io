//卡牌管理器
var gameSceneVar;

var cw=((sh-4)/3-15)/384*256;
var postsign;
var postLine;
var isSelect=false;
var current_select="";
var current_select_layout="";
var tipText="";

var pre_depth=0;

function fpManager(scene,num){
    if(paiku.length<num){
            qipaiku.forEach(function (qi){
                paiku.push(qi);
                qipaiku.splice(qipaiku.indexOf(qi),1);
            });
          }
    for(fp=0;fp<num;fp++){
            
            ranfp=Math.floor(Math.random()*paiku.length);
            postCard(boss.scene,paiku[ranfp]);
            
            paiku.splice(ranfp,1);
    }
}

function postCard(scene,cardData){
    
    this.cardContainer=scene.add.container(sw+200,sh/16*12);
    addcard=scene.add.sprite(0,0,"mapCard");
    addcard.setScale(((sh-4)/3-15)/384/1.8);
    addcard.setTint(0x554236);
    addcard.layoutType="cardBg";
    
    Aname=scene.add.text(0,-1*(((sh-4)/3-15)/1.8/2-10),cardData.name,{ fontSize: '20px', fontFamily:"font1",  fill: '#ffffff' });
    Aname.setOrigin(0.5,0.5);
    
    cardImg=scene.add.sprite(0,0,cardData.key);
    cardImg.setScale(((sh-4)/3-15)/1.8/256*0.3);
    
    Ades=scene.add.text(0,((sh-4)/3-15)/1.8/2-10,cardData.des,{ fontSize: '15px', fontFamily:"font1", fill: '#ffffff' });
    Ades.setOrigin(0.5,0.5);
    addcard.cdata=cardData;
    this.cardContainer.add(addcard);
    this.cardContainer.add(Aname);
    this.cardContainer.add(Ades);
    this.cardContainer.add(cardImg);
    
    this.cardContainer.cardData=cardData;
    
    current_card.push(this.cardContainer);
    
    addcard.setInteractive();
    addcard.on("pointerdown",function (pointer){
        this.parentContainer.setDepth(100);
        tipText=this.scene.add.text(sw/2,sh/2+256*layZoom,this.cdata.tip,{ fontSize: '20px', fontFamily:"font1",  fill: '#ffffff' }).setOrigin(0.5,0.5);
        
        isSelect=true;
        postsign=this.scene.add.sprite(pointer.x,pointer.y,"post").setDepth(101);
        postsign.setScale(0.3);
        postLine=this.scene.add.graphics().setDepth(101);
        
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
        if(tipText!=""){
         
          tipText.destroy();
          tipText="";
          current_select.parentContainer.setDepth(1);
        }
        if(((pointer.y-sh/2)**2<=400 && isSelect==true &&te==0 && onSpotHumans[layout.indexOf(current_select_layout)]=="" && current_select.parentContainer.cardData.type=="humans") || ((pointer.y-sh/2)**2<=400 && isSelect==true &&te==0 && onSpotHumans[layout.indexOf(current_select_layout)]!="" && current_select.parentContainer.cardData.type=="weapon")){
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
                 if(p.cardData.type=="humans"){
                 zancunsprite=gameSceneVar.add.sprite(current_select_layout.x,current_select_layout.y,p.cardData.key).setScale(((sh-4)/3-15)/384/5);
                 
                 zancunsprite.cardData=p.cardData;
                 
                 zancunsprite.life=p.cardData.life;
                 zancunsprite.longUI=[];
                 zancunsprite.effect=[];
                 zancunsprite.effectUI=[];
                 zancunsprite.willInfluence=[];
                 zancunsprite.att=p.cardData.att;
                 
                 
                 
                 //施工区
                 onSpotHumans[layout.indexOf(current_select_layout)]=zancunsprite;
                 humansGroup[layout.indexOf(current_select_layout)].add(zancunsprite);
                 
                 //人物血量ui
                 humansLifeUI=gameSceneVar.add.sprite(zancunsprite.x+((sh-4)/3-15)/5/3,zancunsprite.y-((sh-4)/3-15)/6,"humansLifeUI").setScale(((sh-4)/3-15)/384/10);
                 humansLifeUI.UItype="humansLifeUI";
                 
                 lifeUIText=gameSceneVar.add.text(humansLifeUI.x,humansLifeUI.y,zancunsprite.life,{ fontSize: '10px', fontFamily:"font1",  fill: '#000000' }).setOrigin(0.5,0.5);
                 
                 zancunsprite.longUI.push([humansLifeUI,lifeUIText]);
                 humansGroup[layout.indexOf(current_select_layout)].add(humansLifeUI);
                 humansGroup[layout.indexOf(current_select_layout)].add(lifeUIText);
                 //人物攻击力
                 humansAttUI=gameSceneVar.add.sprite(zancunsprite.x-((sh-4)/3-15)/5/3,zancunsprite.y-((sh-4)/3-15)/6,"humansAttUI").setScale(((sh-4)/3-15)/384/10);
                 humansAttUI.UItype="humansAttUI";
                 
                 attUIText=gameSceneVar.add.text(humansAttUI.x,humansAttUI.y,zancunsprite.att,{ fontSize: '10px', fontFamily:"font1",  fill: '#000000' }).setOrigin(0.5,0.5);
                 
                 zancunsprite.longUI.push([humansAttUI,attUIText]);
                 humansGroup[layout.indexOf(current_select_layout)].add(humansAttUI);
                 humansGroup[layout.indexOf(current_select_layout)].add(attUIText);
                 //人物效果-->effect
                 
                 //人物受boss影响-->willInfluence
                 
                 
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
                 
                 }//判断是否人物卡
               //判断是否是武器卡
                 if(p.cardData.type=="weapon" ){
                   posdex=layout.indexOf(current_select_layout);
                   if(onSpotHumans[posdex].hasOwnProperty("weapon") && onSpotHumans[posdex].weapon!=""){
                     postCard(boss.scene,onSpotHumans[posdex].weapon.cardData);
                     for(func=0;func<p.cardData.action.length;func++){
                       weaponDistribution(posdex,onSpotHumans[posdex].weapon.cardData.action[func],true);
                     }
                     onSpotHumans[posdex].weapon.destroy();
                   }
                   onSpotHumans[posdex].weapon="";
                   
                   zancunsprite=gameSceneVar.add.sprite(current_select_layout.x+150*layZoom,current_select_layout.y,p.cardData.key).setScale(((sh-4)/3-15)/384/3);
                 
                   zancunsprite.cardData=p.cardData;
                   
                   for(func=0;func<zancunsprite.cardData.action.length;func++){
                     weaponDistribution(layout.indexOf(current_select_layout),zancunsprite.cardData.action[func]);
                   }
                 
                   current_card.splice(current_card.indexOf(p),1);
                   p.destroy();
                   cardLayout(gameSceneVar);
                   
                   humansGroup[posdex].add(zancunsprite);
                   onSpotHumans[posdex].weapon=zancunsprite;
                   
                   gameSceneVar.tweens.add({
                       targets: zancunsprite,
                       scale: ((sh-4)/3-15)/384/5*1.2,
                       ease: 'Linear',
                       duration: 500,
                       yoyo:true,
                       repeat:-1
                   });
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
                 
             }//oncomplete函数结束
          });//tween结束
          
          
          
          
          
          
          
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
    changeWidth(boss_lifebar.scene,boss_lifebar,512*0.6*(boss.life/boss.fullLife),200);
}

function takeEffect(scene){
      
      moveToPointX(layout[te].scene,tekuang,layout[te].x,300);
      layout[te].setAlpha(1);
      if(te!=0){layout[te-1].setAlpha(0.6);}
      if(onSpotHumans[te]!=""){
        moveToPointY(onSpotHumans[te].scene,onSpotHumans[te],onSpotHumans[te].y-20,200,true,function (){
            if(te<4){
              te+=1;
              setTimeout("takeEffect(gameSceneVar)",500);
              
              
            }else{setTimeout("bossAction();layout[4].setAlpha(0.6);moveToPointX(layout[4].scene,tekuang,-256*sw/7.5/256,1000)",500);}
        });
        for(ditri=0;ditri<onSpotHumans[te].cardData.func.length;ditri++){
          
            humansDistribution(onSpotHumans[te].cardData.func[ditri],onSpotHumans[te]);
        }
      }else{
          if(te<4){
              te+=1;
              setTimeout("takeEffect(gameSceneVar)",100);
              
            }else{setTimeout("bossAction();layout[4].setAlpha(0.6);moveToPointX(layout[4].scene,tekuang,-256*sw/7.5/256,1000)",100);}
      }
      
    
}

function protect(position,num,backte=false){
    if(onSpotHumans.hasOwnProperty(te+position)&&onSpotHumans[te+position]!=""){
        dunUIAni=tekuang.scene.add.sprite(onSpotHumans[te].x,onSpotHumans[te].y,"dunUI");
        dunUIAni.setAlpha(1);
        dunUIAni.setScale(layZoom*0.8);
        dunUIAni.setDepth(20);
        
        //Reflect.deleteProperty(a,"b");
        if(onSpotHumans[te+position].effect.hasOwnProperty("protect")){
          if(onSpotHumans[te+position].effect["protect"]+num>=0){
            onSpotHumans[te+position].effect["protect"]+=num;
            onSpotHumans[te+position].effectUI["protect"][1].setText(onSpotHumans[te+position].effect["protect"]);
          }
        }else{
          if(num>0){
            onSpotHumans[te+position].effect["protect"]=num;
            onSpotHumans[te+position].effectUI["protect"]=[];
            onSpotHumans[te+position].effectUI["protect"][0]=boss.scene.add.sprite(onSpotHumans[te+position].x-((sh-4)/3-15)/5/3+((sh-4)/3-15)/5/3*(Object.keys(onSpotHumans[te+position].effectUI).length-1),onSpotHumans[te+position].y,"dunUI").setScale(layZoom*0.3);
            onSpotHumans[te+position].effectUI["protect"][1]=boss.scene.add.text(onSpotHumans[te+position].effectUI["protect"][0].x,onSpotHumans[te+position].effectUI["protect"][0].y,onSpotHumans[te+position].effect["protect"],{ fontSize: '15px', fontFamily:"font1",  fill: '#ffffff' }).setOrigin(0.5,0.5);
            humansGroup[te+position].add(onSpotHumans[te+position].effectUI["protect"][0]);
            humansGroup[te+position].add(onSpotHumans[te+position].effectUI["protect"][1]);
          }
        }
      
        changeAlpha(tekuang.scene,dunUIAni,1,500);
        
        moveToPointX(tekuang.scene,dunUIAni,onSpotHumans[te+position].x,500,false,function (){dunUIAni.destroy();});
        changeAlpha(tekuang.scene,dunUIAni,0,500,false,1,200);
        
        
        
    }
    if(backte){te=0;}
}

function attimprove(position,num,backte=false){
    if(onSpotHumans.hasOwnProperty(te+position)&&onSpotHumans[te+position]!=""){
        attUIAni=tekuang.scene.add.sprite(onSpotHumans[te].x,onSpotHumans[te].y,"attUI");
        attUIAni.setAlpha(1);
        attUIAni.setScale(layZoom*0.8);
        attUIAni.setDepth(20);
        
        //Reflect.deleteProperty(a,"b");
        if(onSpotHumans[te+position].effect.hasOwnProperty("attimprove")){
            if(onSpotHumans[te+position].effect["attimprove"]+num>=0){
                onSpotHumans[te+position].effect["attimprove"]+=num;
                onSpotHumans[te+position].effectUI["attimprove"][1].setText(onSpotHumans[te+position].effect["attimprove"]);
            } 
        }else{
           if(num>0){
            onSpotHumans[te+position].effect["attimprove"]=num;
            onSpotHumans[te+position].effectUI["attimprove"]=[];
            onSpotHumans[te+position].effectUI["attimprove"][0]=boss.scene.add.sprite(onSpotHumans[te+position].x-((sh-4)/3-15)/5/3+((sh-4)/3-15)/5/3*(Object.keys(onSpotHumans[te+position].effectUI).length-1),onSpotHumans[te+position].y,"attUI").setScale(layZoom*0.3);
            onSpotHumans[te+position].effectUI["attimprove"][1]=boss.scene.add.text(onSpotHumans[te+position].effectUI["attimprove"][0].x,onSpotHumans[te+position].effectUI["attimprove"][0].y,onSpotHumans[te+position].effect["attimprove"],{ fontSize: '15px', fontFamily:"font1",  fill: '#ffffff' }).setOrigin(0.5,0.5);
            humansGroup[te+position].add(onSpotHumans[te+position].effectUI["attimprove"][0]);
            humansGroup[te+position].add(onSpotHumans[te+position].effectUI["attimprove"][1]);
           }
        }
      
        changeAlpha(tekuang.scene,attUIAni,1,500);
        
        moveToPointX(tekuang.scene,attUIAni,onSpotHumans[te+position].x,500,false,function (){attUIAni.destroy();});
        changeAlpha(tekuang.scene,attUIAni,0,500,false,1,200);
        scaleTo(boss.scene,onSpotHumans[te+position].longUI[1][0],((sh-4)/3-15)/384/10*2,200,true);
        onSpotHumans[te+position].longUI[1][1].setText(onSpotHumans[te+position].att+ onSpotHumans[te+position].effect["attimprove"]);
        
        
    }
    if(backte){te=0;}
}

function double(position,num,backte=false){
    if(onSpotHumans.hasOwnProperty(te+position)&&onSpotHumans[te+position]!=""){
        doubleUIAni=tekuang.scene.add.sprite(onSpotHumans[te].x,onSpotHumans[te].y,"doubleUI");
        doubleUIAni.setAlpha(1);
        doubleUIAni.setScale(layZoom*0.8);
        doubleUIAni.setDepth(20);
        
        //Reflect.deleteProperty(a,"b");
        if(onSpotHumans[te+position].effect.hasOwnProperty("double")){
            if(onSpotHumans[te+position].effect["double"]+num>=0){
                onSpotHumans[te+position].effect["double"]+=num;
                onSpotHumans[te+position].effectUI["double"][1].setText(onSpotHumans[te+position].effect["double"]);
            } 
        }else{
           if(num>0){
            onSpotHumans[te+position].effect["double"]=num;
            onSpotHumans[te+position].effectUI["double"]=[];
            onSpotHumans[te+position].effectUI["double"][0]=boss.scene.add.sprite(onSpotHumans[te+position].x-((sh-4)/3-15)/5/3+((sh-4)/3-15)/5/3*(Object.keys(onSpotHumans[te+position].effectUI).length-1),onSpotHumans[te+position].y,"doubleUI").setScale(layZoom*0.3);
            onSpotHumans[te+position].effectUI["double"][1]=boss.scene.add.text(onSpotHumans[te+position].effectUI["double"][0].x,onSpotHumans[te+position].effectUI["double"][0].y,onSpotHumans[te+position].effect["double"],{ fontSize: '15px', fontFamily:"font1", fill: '#ffffff' }).setOrigin(0.5,0.5);
            humansGroup[te+position].add(onSpotHumans[te+position].effectUI["double"][0]);
            humansGroup[te+position].add(onSpotHumans[te+position].effectUI["double"][1]);
           }
        }
      
        changeAlpha(tekuang.scene,doubleUIAni,1,500);
        
        moveToPointX(tekuang.scene,doubleUIAni,onSpotHumans[te+position].x,500,false,function (){doubleUIAni.destroy();});
        changeAlpha(tekuang.scene,doubleUIAni,0,500,false,1,200);
        scaleTo(boss.scene,onSpotHumans[te+position].longUI[1][0],((sh-4)/3-15)/384/10*2,200,true);
        onSpotHumans[te+position].longUI[1][1].setText(onSpotHumans[te+position].att+ onSpotHumans[te+position].effect["double"]);
        
        
    }
    if(backte){te=0;}
}

function cure(position,num){
   
    if(onSpotHumans.hasOwnProperty(te+position)&&onSpotHumans[te+position]!=""){
        scaleTo(boss.scene,onSpotHumans[te+position].longUI[0][0],((sh-4)/3-15)/384/10*2,200,true);
        onSpotHumans[te+position].life+=num
        onSpotHumans[te+position].longUI[0][1].setText(onSpotHumans[te+position].life);
                           
        
    }
}

function bossAction(){
    moveToPointY(boss.scene,boss,boss.y-50,500,false,function (){moveToPointY(boss.scene,boss,boss.y+100,200,false,function (){humansInfluence();bossTrend();moveToPointY(boss.scene,boss,boss.y-50,500,false,function (){});});});
 
}

function bossTrend(){
    changeAlpha(boss.scene,boss,0.5,200,true,3);
    scaleTo(boss.scene,boss,0.5,200,true,1200);
    if(bossddd.actionType=="STEP"){
        if(bossStepNum>bossddd.funcPool.length-1){bossStepNum=0;}
        
        setTimeout("bossDistribution(bossddd.funcPool[bossStepNum][0]+'Trend',bossddd.funcPool[bossStepNum][1]);bossStepNum+=1;bossLastAction=bossddd.funcPool[bossStepNum];te=0;postCard(boss.scene,qishi);postButton.setAlpha(1);",1500);
        
    }
    
}

function RandomHumans(num){
    zancunrandom=[];
    zancunhas=[];
    zancunooo=0
    for(rrr=0;rrr<onSpotHumans.length;rrr++){
      if(onSpotHumans[rrr]!=""){
        zancunooo+=1;
      }
    }
    if(zancunooo<num){numm=zancunooo;}else{numm=num}
    while(zancunrandom.length<numm){
      randomnum=Math.floor(Math.random()*5);
      if(zancunhas.indexOf(randomnum)==-1 && onSpotHumans[randomnum]!=""){
        zancunrandom.push(onSpotHumans[randomnum]);
        zancunhas.push(randomnum);
      }
      
    }
    return zancunhas;
}

function hurtHumansByRandomTrend(hlist,num){
  
    for(hitem=0;hitem<hlist.length;hitem++){
      layout[hlist[hitem]].setTint(0xff0000);
      xxx="-"+num;
      
      if(!(onSpotHumans[hlist[hitem]].hasOwnProperty("hurtnumText"))){
          hurtnumText=boss.scene.add.text(layout[hlist[hitem]].x,layout[hlist[hitem]].y+layout[hlist[hitem]].height/2*layZoom+20,xxx,{ fontSize: '20px', fontFamily:"font1",  fill: '#f00430' });
          hurtnumText.setOrigin(0.5,0.5);
          onSpotHumans[hlist[hitem]].hurtnumText=hurtnumText;
          
          
          
      }else{
          if(onSpotHumans[hlist[hitem]].hurtnumText==null){
              hurtnumText=boss.scene.add.text(layout[hlist[hitem]].x,layout[hlist[hitem]].y+layout[hlist[hitem]].height/2*layZoom+20,xxx,{ fontSize: '20px', fontFamily:"font1", fill: '#f00430' });
              hurtnumText.setOrigin(0.5,0.5);
              onSpotHumans[hlist[hitem]].hurtnumText=hurtnumText;
          
          
          }else{
              onSpotHumans[hlist[hitem]].hurtnumText.innertext+=num;
              ttt="-"+onSpotHumans[hlist[hitem]].hurtnumText.innertext;
              onSpotHumans[hlist[hitem]].hurtnumText.setText(ttt);
          }
      }
      
      onSpotHumans[hlist[hitem]].willInfluence.push(["hurt",num]);
    }
  
}

function humansInfluence(){
   for(hhh=0;hhh<onSpotHumans.length;hhh++){
     if(onSpotHumans[hhh]!=""){
      for(inf=0;inf<onSpotHumans[hhh].willInfluence.length;inf++){
         
         if(onSpotHumans[hhh].willInfluence[inf][0]=="hurt"){
             //受伤影响
                     if(onSpotHumans[hhh].effect.hasOwnProperty("protect")){
                       
                       if(onSpotHumans[hhh].willInfluence[inf][1]>=onSpotHumans[hhh].effect["protect"]){onSpotHumans[hhh].willInfluence[inf][1]-=onSpotHumans[hhh].effect["protect"];onSpotHumans[hhh].effect["protect"]=0;
                       }else{onSpotHumans[hhh].effect["protect"]-=onSpotHumans[hhh].willInfluence[inf][1];onSpotHumans[hhh].willInfluence[inf][1]=0;}
                       onSpotHumans[hhh].effectUI["protect"][1].setText(onSpotHumans[hhh].effect["protect"]);
                       scaleTo(boss.scene,onSpotHumans[hhh].effectUI["protect"][0],((sh-4)/3-15)/384/10*2,200,true);
                     
                       
                     }
                     onSpotHumans[hhh].life-=onSpotHumans[hhh].willInfluence[inf][1];
                     onSpotHumans[hhh].hurtnumText.destroy();
                     onSpotHumans[hhh].hurtnumText=null;
                     layout[hhh].clearTint();
                     if(onSpotHumans[hhh].life<=0){
                       humansDead(hhh);
                       break;
                     }else{
                     for(longui=0;longui<onSpotHumans[hhh].longUI.length;longui++){
                        if(onSpotHumans[hhh].longUI[longui][0].UItype=="humansLifeUI"){
                           
                           scaleTo(boss.scene,onSpotHumans[hhh].longUI[longui][0],((sh-4)/3-15)/384/10*2,200,true);
                           onSpotHumans[hhh].setTint(0xff0000);
                           clearTintForHurt.push(onSpotHumans[hhh]);
                           setTimeout("for(cle=0;cle<clearTintForHurt.length;cle++){clearTintForHurt[cle].clearTint();}clearTintForHurt=[];",500);
                           moveToPointY(boss.scene,onSpotHumans[hhh],onSpotHumans[hhh].y+50,300,true,function (){});
                           onSpotHumans[hhh].longUI[longui][1].setText(onSpotHumans[hhh].life);
                           
                        }
                     }
                     
                     }
                     //else->人物存活
              
         }
         //受伤if结束
       
       
         if(inf==onSpotHumans[hhh].willInfluence.length-1){
           onSpotHumans[hhh].willInfluence=[];
           //影响列表清零
         }
     }
     //单个角色influence循环结束
    }
   }
   //总for循环结束
  
}

function copy(position){
  if(onSpotHumans[te+position]!=""){
   onSpotHumans[te].setTexture(onSpotHumans[te+position].texture.key);
   onSpotHumans[te].att=onSpotHumans[te+position].att;
   onSpotHumans[te].cardData=onSpotHumans[te+position].cardData;
   scaleTo(boss.scene,onSpotHumans[te].longUI[1][0],((sh-4)/3-15)/384/10*2,200,true);
   onSpotHumans[te].longUI[1][1].setText(onSpotHumans[te].att);
   }            
}

function humansDistribution(func,data){
    if(func=="hurtBoss"){
     
      
      if(data.effect.hasOwnProperty("attimprove")){
          hurtBoss(data.att+data.effect["attimprove"]);
      }else{
          hurtBoss(data.att);
      }
    }
    if(func=="protect"){
      protect(data.cardData.pro_position,data.cardData.pro_num);
    }
    if(func=="cure"){
      cure(data.cardData.cur_position,data.cardData.cur_num);
    }
    if(func=="attimprove"){
      attimprove(data.cardData.att_position,data.cardData.att_num);
    }
    if(func=="kelong"){
      copy(data.cardData.ke_position);
    }
  
}

function bossDistribution(func,data){
    if(func=="hurtHumansByRandomTrend"){
      hurtHumansByRandomTrend(RandomHumans(data[0]),data[1]);
    }
    if(func=="hurtHumansByRandom"){
      hurtHumansByRandom();
    }
}

function humansDead(n){
    spineAngle(boss.scene,onSpotHumans[n],45,300);
    moveToPointX(boss.scene,onSpotHumans[n],sh*1.5,300,false,function(){});
    humansGroup[n].clear(true,true);
    onSpotHumans[n]="";
}

function weaponDistribution(pos,data,backit=false){
    func=data[0];
    if(backit){
    num=data[1]*(-1);
    }else{num=data[1];}
    if(func=="attimprove"){
      te=pos;
      attimprove(0,num,true);
    }
    if(func=="protect"){
      te=pos;
      protect(0,num,true);
    }
    if(func=="double"){
      te=pos;
      double(0,num,true);
    }
}

function updateUIloop(){
    setInterval(function (){
        for(chh=0;chh<onSpotHumans.length;chh++){
         if(onSpotHumans[chh]!=""){
          for(chhh=0;chhh<Object.keys(onSpotHumans[chh].effect).length;chhh++){
            if(onSpotHumans[chh].effect[Object.keys(onSpotHumans[chh].effect)[chhh]]==0){
              onSpotHumans[chh].effectUI[Object.keys(onSpotHumans[chh].effect)[chhh]][0].destroy();
              onSpotHumans[chh].effectUI[Object.keys(onSpotHumans[chh].effect)[chhh]][1].destroy();
              
              Reflect.deleteProperty(onSpotHumans[chh].effectUI,Object.keys(onSpotHumans[chh].effect)[chhh]);
              Reflect.deleteProperty(onSpotHumans[chh].effect,Object.keys(onSpotHumans[chh].effect)[chhh]);
            }
          }
          for(chhh=0;chhh<Object.keys(onSpotHumans[chh].effectUI).length;chhh++){
            onSpotHumans[chh].effectUI[Object.keys(onSpotHumans[chh].effectUI)[chhh]][0].setX(onSpotHumans[chh].x-((sh-4)/3-15)/5/3+((sh-4)/3-15)/5/3*chhh);
            onSpotHumans[chh].effectUI[Object.keys(onSpotHumans[chh].effectUI)[chhh]][1].setX(onSpotHumans[chh].x-((sh-4)/3-15)/5/3+((sh-4)/3-15)/5/3*chhh);
            
          }
         }
         
        }
        
    },1000);
}