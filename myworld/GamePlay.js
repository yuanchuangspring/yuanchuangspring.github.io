var mapdic=[];
var previousBlock="";
var currentBlock="";
var hasLoadDic=[];
var objlist=[];
var hasToLoadDic=[];
var dd=0;

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
        //资源加载进度条
        var progress = this.add.graphics();
        var pro_text = this.add.text(sw/2-50,sh/2-100,"资源加载中...");

        this.load.on('progress', function (value) {

            progress.clear();
            progress.fillStyle(0xffffff, 1);
            progress.fillRect(0, sh/2-20, 800 * value, 60);
 
        });

        this.load.on('complete', function () {
            pro_text.destroy();
            progress.destroy();

        });

        
        
        
        //资源加载
        this.load.spritesheet('player', 'assets/player48x48.png',{frameWidth:72,frameHeight:72});
        this.load.image('player_left', 'assets/player_left.png');
        this.load.image('bg', 'assets/sky.png');
        this.load.image('vjoy_base', 'assets/base.png');
        this.load.image('vjoy_body', 'assets/body.png');
        this.load.image('vjoy_cap', 'assets/cap.png');
        
        //地图tiles
        this.load.image("grass_tile","assets/maptiles/grass.png");
        this.load.image("cold_grass_tile","assets/maptiles/cold_grass.png");
        this.load.image("sand_tile","assets/maptiles/sand.png");
        this.load.image("hot_grass_tile","assets/maptiles/hot_grass.png");
        this.load.image("lit_grass_tile","assets/maptiles/lit_grass.png");
        this.load.image("wet_grass_tile","assets/maptiles/wet_grass.png");
        this.load.image("s_wet_grass_tile","assets/maptiles/s_wet_grass.png");
        this.load.image("ice_tai_tile","assets/maptiles/ice_tai.png");
        
        //building 上层附着物
        this.load.image("tree_1","assets/building/tree_1.png");
        this.load.image("xianrenzhang","assets/building/xianrenzhang.png");
        this.load.image("taixian","assets/building/taixian.png");
        this.load.image("tree_2","assets/building/tree_2.png");
        this.load.image("kucao","assets/building/kucao.png");
        this.load.image("songshu","assets/building/songshu.png");
        this.load.image("big_rock","assets/building/big_rock.png");
        this.load.image("medium_rock","assets/building/medium_rock.png");
        
        //item 物品加载
        this.load.spritesheet("item","assets/items/itemsheet.png",{frameWidth:96,frameHeight:96});
        
        
        
        
        //插件加载
        this.load.scenePlugin('VJoyPlugin', './VJoyPlugin.js', 'VJoyPlugin', 'vjoy');
    },

    create: function ()
    {
        //帧率
        this.physics.world.setFPS(30);
        
        //地图组
        this.mapGroup= this.physics.add.group();
        
        //附着物组
        this.mapAddingGroup=this.physics.add.group();
        
        //人物组
        
        this.anims.create({
          key:"player_right",
          frames:this.anims.generateFrameNumbers("player",{frames:[16,17,18,19]}),
          frameRate:10,
          repeat:-1
        });
        
        this.anims.create({
          key:"player_left",
          frames:this.anims.generateFrameNumbers("player",{frames:[20,21,22,23]}),
          frameRate:10,
          repeat:-1
        });
        
        this.anims.create({
          key:"player_stand_left",
          frames:this.anims.generateFrameNumbers("player",{frames:[4]}),
          frameRate:1,
          repeat:-1
        });
      
        this.anims.create({
          key:"player_stand_right",
          frames:this.anims.generateFrameNumbers("player",{frames:[0]}),
          frameRate:1,
          repeat:-1
        });
      
        this.sprite = this.physics.add.sprite(300, 300, 'player').setVelocity(0);
        this.sprite_tool = this.physics.add.sprite(290, 300, 'item').setVelocity(0);
        this.sprite_tool.setFrame(162);
        this.sprite_tool.setFlipX(true);
        this.sprite_tool.setDepth(20);
        this.sprite.setBodySize(36,50,true);
        this.sprite_tool.setBodySize(190,125,true);
        this.sprite_tool.setScale(0.2);
        this.sprite.setScale(0.5);
        this.sprite.setDepth(5);
        
        //设置碰撞
        this.physics.add.collider(this.sprite,this.mapAddingGroup);
        this.physics.add.collider(this.sprite_tool,this.mapAddingGroup);
        
        
        
        
        
        //镜头跟随
        this.cameras.main.startFollow(this.sprite);
        this.cameras.main.setZoom(sw/583.68);
        
        //摇杆插件
        this.joystick = this.add.joystick({
            sprites: {
                base: 'vjoy_base',
                body: 'vjoy_body',
                cap: 'vjoy_cap'
            },
            singleDirection: false,
            maxDistanceInPixels: 100,
            device: 1 ,
            minx: 0,
            maxx: sw/2,
            worldZoom:sw/583.68
        });
        //this.scale.startFullscreen();

    },

    update: function ()
    {
       
       
       for(delll=0;delll<hasLoadDic.length;delll++){
              getImportant(hasLoadDic[delll][0],hasLoadDic[delll][1],varbx,varby,delll);
       }
        //设置速度 联动摇杆(屎山)
        var speed = 150;
        dx=this.joystick.deltaX;
        dy=this.joystick.deltaY;
        
        if(!(dx==0&&dy==0)){
        sin=dy/Math.sqrt(dx**2+dy**2);
        cos=dx/Math.sqrt(dx**2+dy**2);
        
            if(cos>=0){
              
              this.sprite.play("player_right",true);
              this.sprite_tool.setFlipX(true);
              this.sprite_tool.setPosition(this.sprite.x-10,this.sprite.y);
              dd=0;
              
            }else{this.sprite.play("player_left",true);dd=1;this.sprite_tool.setFlipX(false);
            this.sprite_tool.setPosition(this.sprite.x+10,this.sprite.y);}
        
        this.sprite.body.velocity.set(cos* speed,sin* speed);
        this.sprite_tool.body.velocity.set(cos* speed,sin* speed);
        }else{
        if(dd==0){
            this.sprite.play("player_stand_right");
            
        }else{this.sprite.play("player_stand_left");
        
        }
        this.sprite.body.velocity.set(0);
        this.sprite_tool.body.velocity.set(0);
        
        }
      
      
      
      
      
        
        //地图刷新
        spx=this.sprite.x;
        spy=this.sprite.y;
        currentBlock=getblock(spx,spy)[2];
        varbx=getblock(spx,spy)[0];
        varby=getblock(spx,spy)[1];
        
        //创世区块
        
        if(!mapdic.hasOwnProperty("0/0")){
          createworldByblock(0,0);
          blockDraw(this.physics.add.group(),this.physics.add.group(),{
               x:0,
               y:0,
               block:mapdic["0/0"]
            },this.mapAddingGroup);
          hasLoadDic.push([0,0]);
        }
        if(currentBlock!=previousBlock){
          
          //如果玩家区块位置改变
          previousBlock=currentBlock;
          
          
          
          //绘制四周区块
          checklist=checkHas(varbx,varby);
          
          for(i=0;i<checklist.length;i++){
            if(!mapdic.hasOwnProperty(checklist[i][0]+"/"+checklist[i][1])){
                createworldByblock(checklist[i][0],checklist[i][1]);
            }
            
            //绘制函数
            blockDraw(this.physics.add.group(),this.physics.add.group(),{
               x:checklist[i][0],
               y:checklist[i][1],
               block:mapdic[checklist[i][0]+"/"+checklist[i][1]]
            },this.mapAddingGroup);
            
            //更新已加载区块
            hasLoadDic.push([checklist[i][0],checklist[i][1]]);
            
          }
          
          //卸载不需要的区块(优化性能)炒鸡重要！！！
          for(delll=0;delll<hasLoadDic.length;delll++){
              getImportant(hasLoadDic[delll][0],hasLoadDic[delll][1],varbx,varby,delll);
          }
        
        }
      
    }
    //update end...
    
    
    

});


myGame.scenes.push(gamePlayState);


