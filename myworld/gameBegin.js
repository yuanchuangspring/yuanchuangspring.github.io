var GameBegin = new Phaser.Class({
  
    
    Extends: Phaser.Scene,
    
    initialize:
    
    function GameBegin ()
    {
        Phaser.Scene.call(this, {
            key: 'GameBegin'
        });
    },
    
    preload:function (){
        this.load.image();
    }
    
  
});