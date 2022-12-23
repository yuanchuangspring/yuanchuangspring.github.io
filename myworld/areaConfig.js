var areaConfig=[];

//itemConfig
blank={
  name:"",
  isSheet:true,
  key:"",
  frameNum:0,
  canUse:false,
  canEat:false,
  des:""
}

wood={
  name:"木板",
  isSheet:true,
  key:"item",
  frameNum:272,
  canUse:false,
  canEat:false,
  des:"一块平平无奇的木板"
}

rock={
  name:"石块",
  isSheet:true,
  key:"item",
  frameNum:273,
  canUse:false,
  canEat:false,
  des:"硬邦邦的"
}

apple={
  name:"苹果",
  isSheet:true,
  key:"item",
  frameNum:224,
  canUse:false,
  canEat:true,
  des:"牛顿呢"
}

kucao={
  name:"枯草",
  isSheet:true,
  key:"item",
  frameNum:194,
  canUse:false,
  canEat:false,
  des:"一堆枯草，毫无生机"
}










//additionConfig

taixian={
  key:"taixian",
  bargin:[],
  collide:[-1],
  life:1
}

tree1={
  key:"tree_1",
  bargin:[ [wood,3,0.9],[apple,2,0.2] ],
  life:5
}

tree2={
  key:"tree_2",
  bargin:[ [wood,6,0.8] ],
  collide:[30,100],
  life:10
}

kucao={
  key:"kucao",
  bargin:[ [kucao,1,1] ],
  collide:[-1],
  life:1
}

xianrenzhang={
  key:"xianrenzhang",
  bargain:[],
  life:3
}

songshu={
  key:"songshu",
  bargin:[ [wood,3,0.9] ],
  life:5
}

bigRock={
  key:"big_rock",
  bargin:[ [rock,5,0.6] ],
  life:10
}

midRock={
  key:"medium_rock",
  bargin:[ [rock,1,1] ],
  life:6
}

areaConfig["tanyuan"]={main:"ice_tai",addtion:[{item:taixian,value:0.2}]};

areaConfig["reyu"]={main:"wet_grass",addtion:[{item:tree2,value:0.4}]};
areaConfig["recao"]={main:"hot_grass",addtion:[{item:kucao,value:0.5}]};
areaConfig["resha"]={main:"sand",addtion:[{item:xianrenzhang,value:0.01}]};
areaConfig["hansen"]={main:"cold_grass",addtion:[{item:songshu,value:0.05},{item:tree1,value:0.05},{item:bigRock,value:0.005},{item:midRock,value:0.01}]};
areaConfig["wenyu"]={main:"s_wet_grass",addtion:[{item:tree1,value:0.05},{item:bigRock,value:0.005}]};
areaConfig["wenji"]={main:"grass",addtion:[{item:tree1,value:0.05},{item:bigRock,value:0.005},{item:midRock,value:0.01}]};
areaConfig["wencao"]={main:"lit_grass",addtion:[]};


