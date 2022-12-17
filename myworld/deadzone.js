//绘制四周区块
          checklist=checkHas(getblock(this.sprite.x,this.sprite.y)[0],getblock(this.sprite.x,this.sprite.y)[1]);
          for(i=0;i<checklist.length;i++){
            createworldByblock(checklist[i][0],checklist[i][1]);
            blockDraw(this.mapGroup,{
               x:checklist[i][0]*307.2,
               y:checklist[i][1]*307.2,
               block:mapdic[checklist[i][0]+"/"+checklist[i][1]]
            });
            hasLoadDic.push(checklist[i][0]+"/"+checklist[i][1]);
          }
          //卸载不需要的区块
          l=getHas(getblock(this.sprite.x,this.sprite.y)[0],getblock(this.sprite.x,this.sprite.y)[1]);
          for(i=0;i<hasLoadDic.length;i++){
            iii=hasLoadDic[i];
            iji=false;
            for(jj=0;jj<l.length;jj++){
              if(l[jj]==iii){iji=true;break;}
            }
            if(iji==false){
              for(dick=0;dick<objlist[iii].length;dick++){
                objlist[iii][dick].destroy();
                hasLoadDic=hasLoadDic.splice(i,1);
                
              }
            }
          }
        
        
        
