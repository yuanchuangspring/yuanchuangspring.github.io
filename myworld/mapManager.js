/**
*文件名:mapManager.js
*说明:游戏地图加载文件
*重写:20221217
*/

var map_size=80;

//perlinjs没有提供seed入口，所以对perlinjs重写
//添加external_seed，外部引入种子
var external_seed=Math.random()*1314521;

function createworld(x,y){
    //创造指定绝对位置的区块
    bx=getblock(x,y)[0];
    by=getblock(x,y)[1];
    mapdic[bx+"/"+by]=[];
    
    for(j=0;j<100;j++){
      //待完成:柏林噪音引入地图生成
      noiTEM=noise.perlin2((bx*10+j%10)/map_size,(by*10+Math.floor(j/10))/map_size);
      noiWAT=noise.perlin2((bx*10+j%10)/map_size,(by*10+Math.floor(j/10))/map_size);
      TYPE=areaConfig[getType(noiTEM,noiWAT)];
      //进行地面附着物生成
      adding="";
      
      if(TYPE.addtion.hasOwnProperty(0)){
         if(Random(0,1)<=TYPE.addtion[0].value){adding=TYPE.addtion[0].key}
      }
      mapdic[bx+"/"+by].push([TYPE.main+"_tile",adding]);
      
    }
    
}

function createworldByblock(bx,by){
    mapdic[bx+"/"+by]=[];
    
    for(j=0;j<100;j++){
      //待完成:柏林噪音引入地图生成
      noiTEM=noise.perlin2((bx*10+j%10)/map_size,(by*10+Math.floor(j/10))/map_size);
      noiWAT=noise.perlin2((bx*10+j%10)/map_size,(by*10+Math.floor(j/10))/map_size);
      TYPE=areaConfig[getType(noiTEM,noiWAT)];
      //进行地面附着物生成
      adding="";
      
      if(TYPE.addtion.hasOwnProperty(0)){
        
         if(Math.random()<=TYPE.addtion[0].value){adding=TYPE.addtion[0].key}
      }
      mapdic[bx+"/"+by].push([TYPE.main+"_tile",adding]);
      
    }
}

function getblock(x,y){
    //返回绝对位置的区块编号
    return [Math.floor(x/307.2),Math.floor(y/307.2),Math.floor(x/307.2)+"/"+Math.floor(y/307.2)];
}

function gettiles(x,y){
    //返回绝对位置所在区块的列表信息
    //用于外部调用
    bx=getblock(x,y)[0];
    by=getblock(x,y)[1];
    xx=Math.floor(x%307.2/30.72);
    yy=Math.floor(y%307.2/30.72);
    tile_number=yy*10+xx;
    if(!mapdic.hasOwnProperty(bx+"/"+by)){createworld(x,y);}
    return mapdic[bx+"/"+by];
    
}

function blockDraw(obj,obj2,data){
    console.log("mapManager is working...");
    //绘制区块,传参为区块数据
    //用于主程序 update() 调用刷新
    //需要定义全局列表 objlist
    //需要两个obj 均为group类
    
    objlist[Math.floor(data.x/307.2)+"/"+Math.floor(data.y/307.2)]=[Math.floor(data.x/307.2),Math.floor(data.y/307.2),obj,obj2];
    for(drawnnn=0;drawnnn<100;drawnnn++){
        x=data.x+drawnnn%10*30.72;
        y=data.y+Math.floor(drawnnn/10)*30.72;
        ind=obj.create(x,y,data.block[drawnnn][0]);
        ind.setScale(1.92);
        ind.setDepth(0);
        
        if(data.block[drawnnn][1]!=""){
        
        ind_adding=obj2.create(x,y,data.block[drawnnn][1]);
        ind_adding.setScale(1.92);
        ind_adding.setDepth(1);
        ind_adding.setBodySize(50,50,true);
        ind_adding.setPushable(false);
        
        }
    }
}

function getImportant(bx,by,bxo,byo,n){
    if(((bx-bxo)**2+(by-byo)**2)>6){
      if(objlist.hasOwnProperty(bx+"/"+by)){
      objlist[bx+"/"+by][2].clear(true,true);
      objlist[bx+"/"+by][3].clear(true,true);
      hasLoadDic.splice(n,1);
      }else{console.log("错误:");console.log(bx+"/"+by);}
      
    }
}

function checkHas(x,y){
    //检查区块编号四周是否加载过
    //需定义全局列表 hasLoadDic
    check=[];
    locallist=[];
    for(pop=0;pop<hasLoadDic.length;pop++){locallist[pop]=hasLoadDic[pop][0]+"/"+hasLoadDic[pop][1];}
    if(locallist.indexOf((x-1)+"/"+(y-1))==-1){
      check.push([x-1,y-1]);
    }
    if(locallist.indexOf(x+"/"+(y-1))==-1){
      check.push([x,y-1]);
    }
    if(locallist.indexOf((x+1)+"/"+(y-1))==-1){
      check.push([x+1,y-1]);
    }
    if(locallist.indexOf((x-1)+"/"+y)==-1){
      check.push([x-1,y]);
    }
    if(locallist.indexOf((x+1)+"/"+y)==-1){
      check.push([x+1,y]);
    }
    if(locallist.indexOf((x-1)+"/"+(y+1))==-1){
      check.push([x-1,y+1]);
    }
    if(locallist.indexOf(x+"/"+(y+1))==-1){
      check.push([x,y+1]);
    }
    if(locallist.indexOf((x+1)+"/"+(y+1))==-1){
      check.push([x+1,y+1]);
    }
    return check;
}

function getHas(bx,by){
    return [
        bx+"/"+by,
        (bx-1)+"/"+(by-1),
        (bx-1)+"/"+(by),
        (bx-1)+"/"+(by+1),
        (bx)+"/"+(by-1),
        (bx)+"/"+(by+1),
        (bx+1)+"/"+(by-1),
        (bx+1)+"/"+(by),
        (bx+1)+"/"+(by+1)
    ];
}
function getType(TEM,WAT){
    if(TEM<=-0.2 && WAT<=0){return "tanyuan"}
    if(TEM<=-0.2 && WAT>0){return "hansen"}
    if(TEM<=0 && WAT<=-0.2){return "wencao"}
    if(TEM<=0 && WAT<=0.2){return "wenji"}
    if(TEM<=0 && WAT>0.2){return "wenyu"}
    if(TEM<=0.2 && WAT<=-0.2){return "resha"}
    if(TEM<=0.2 && WAT<=0){return "wenji"}
    if(TEM<=0.2 && WAT<=0.2){return "wenyu"}
    if(TEM<=0.2 && WAT>0.2){return "reyu"}
    if(TEM>0.2 && WAT<=-0.2){return "resha"}
    if(TEM>0.2 && WAT<=0.2){return "recao"}
    if(TEM>0.2 && WAT>0.2){return "resha"}
}
