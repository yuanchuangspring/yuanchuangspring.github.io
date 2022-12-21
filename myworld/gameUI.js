var collectButton;

var gameUI = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function gameUI ()
    {
        Phaser.Scene.call(this, { key: 'gameUI', active: true });

        
    },
  
    preload: function (){
        this.load.image("collectButton","assets/ui/collect.png");
    },

    create: function ()
    {
        //  Our Text object to display the Score
        var info = this.add.text(10, 10, 'seed:'+external_seed, { font: '48px Arial', fill: '#000000' });

        //  Grab a reference to the Game Scene
        var ourGame = this.scene.get('GamePlay');
        
        collectButton = this.add.sprite(sw-150,sh-150,"collectButton");
        collectButton.setScale(0.2);
        collectButton.setAlpha(0.5);
        
        collectButton.setInteractive();
        collectButton.addListener("pointerdown",function (pointer){
            ifButtonDown.push("collect");
            collectButton.setAlpha(1);
            
        });
        collectButton.addListener("pointerup",function (pointer){
            ifButtonDown.splice(ifButtonDown.indexOf("collect"),1);
            collectButton.setAlpha(0.5);
            
        });
        
        //  Listen for events from it
        ourGame.events.on('addScore', function () {

            

        }, this);
    }

});

myGame.scenes.push(gameUI);