var collectButton;

var gameUI = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function gameUI ()
    {
        Phaser.Scene.call(this, { key: 'gameUI',active:false });

        
    },
  
    preload: function (){
        this.load.image("collectButton","assets/ui/collect.png");
        this.load.image("bagbg","assets/ui/bagBg.png");
        
        this.load.spritesheet("itemui","assets/items/itemsheet.png",{frameWidth:96,frameHeight:96});
        
    },

    create: function ()
    {
        this.bagOpen=false;
        this.bagUI=this.add.group();
        //  Our Text object to display the Score
        //var info = this.add.text(10, 10, 'seed:'+external_seed, { font: '48px Arial', fill: '#000000' });
        tipText = this.add.text(5, 15, "", { font: '20px Arial', fill: '#ffffff' });
        tipText.setDepth(100);
        //  Grab a reference to the Game Scene
        var ourGame = this.scene.get('GamePlay');
        
        bagButton= this.add.sprite(sw/2,sh-20,"itemui");
        bagButton.setFrame(137);
        bagButton.setScale(0.5);
        bagButton.setInteractive();
        bagButton.addListener("pointerdown",function (pointer){
            if(!this.bagOpen){
                
                this.bagbg=this.add.image(sw/2,sh/2,"bagbg");
                this.bagUI.add(this.bagbg);
                for(bagitem=0;bagitem<Object.keys(playerBag).length;bagitem++){
                  bi=this.add.sprite(sw/2-240+24+84*(bagitem%5),sh/2-128+24+50*(Math.floor(bagitem/5)),playerBagConfig[Object.keys(playerBag)[bagitem]].key+"ui");
                      
                  if(playerBagConfig[Object.keys(playerBag)[bagitem]].isSheet==true){
                      bi.setFrame(playerBagConfig[Object.keys(playerBag)[bagitem]].frameNum);
                  }
                  bi.setScale(0.5);
                  
                  
                  this.bagUI.add(bi);
                  
                  ti = this.add.text(bi.x, bi.y, playerBagConfig[Object.keys(playerBag)[bagitem]].name+":"+playerBag[Object.keys(playerBag)[bagitem]], { font: '20px Arial', fill: '#ffffff' });
                  ti.setDepth(100);
                  this.bagUI.add(ti);
                }
                this.bagOpen=true;
            }else{this.bagUI.clear(true,true);this.bagUI=this.add.group();this.bagOpen=false;}
        },this);
        
        collectButton = this.add.sprite(sw-150,sh-150,"collectButton");
        collectButton.setScale(0.2);
        collectButton.setAlpha(0.5);
        
        collectButton.setInteractive();
        collectButton.addListener("pointerdown",function (pointer){
            ifButtonDown.push("collect");
            collectButton.setAlpha(1);
            
        });
        collectButton.addListener("pointerup",function (pointer){
            //ifButtonDown.splice(ifButtonDown.indexOf("collect"),1);
            collectButton.setAlpha(0.5);
            
        });
        
        //  Listen for events from it
        ourGame.events.on('addScore', function () {

            

        }, this);
    }

});

myGame.scenes.push(gameUI);