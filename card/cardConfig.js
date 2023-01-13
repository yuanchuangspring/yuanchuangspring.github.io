//卡牌设定

qishi={
  name:"骑士",
  des:"我焯勇的",
  tip:"造成10点伤害",
  key:"qishi",
  att:10,
  func:["hurtBoss"],
  life:10,
  type:"humans"
}

dunwei={
  name:"盾卫",
  des:"来者不惧",
  tip:"造成5点伤害,给予下一位人物3点护盾",
  att:5,
  pro_position:1,
  pro_num:3,
  key:"dunwei",
  func:["protect","hurtBoss"],
  life:20,
  type:"humans"
}

yisheng={
  name:"医生",
  des:"悬壶济世",
  tip:"无伤害，给予上一位人物2点治疗",
  att:0,
  cur_position:-1,
  cur_num:2,
  key:"yisheng",
  func:["cure"],
  life:5,
  type:"humans"
}

jiaolian={
  name:"教练",
  des:"全是干货",
  tip:"造成5伤害，给予下一位人物5点力量",
  att:5,
  att_position:1,
  att_num:5,
  key:"jiaolian",
  func:["attimprove","hurtBoss"],
  life:10,
  type:"humans"
}

kelong={
  name:"克隆人",
  des:"copy...",
  tip:"复制下一位人物，但血量不变",
  att:0,
  ke_position:1,
  key:"kelong",
  func:["kelong"],
  life:8,
  type:"humans"
}


//bossConfig
huaji={
  name:"滑稽",
  key:"huaji",
  life:100,
  actionType:"STEP",
  coin:60,
  funcPool:[ ["hurtHumansByRandom",[2,2]] ]
}

shilaimu={
  name:"史莱姆",
  key:"shilaimu",
  life:200,
  actionType:"STEP",
  hurtHumans:3,
  att:3,
  coin:50,
  funcPool:[ ["hurtHumansByRandom",[3,5]] ]
}

//weaponConfig
maoweapon={
  name:"矛",
  key:"mao",
  des:"锐利！",
  tip:"增加使用者攻击力5点",
  action:[ ["attimprove",5] ],
  type:"weapon"
}



clockweapon={
  name:"时钟",
  key:"clock",
  des:"时光无限",
  tip:"使用者每回合行动两次",
  action:[ ["double",2] ],
  type:"weapon"
}

//jinengConfig


judun={
  name:"举盾",
  key:"dun",
  des:"技能牌",
  tip:"增加使用者五点护甲",
  action:[ ["protect",5] ],
  type:"jineng"
}
