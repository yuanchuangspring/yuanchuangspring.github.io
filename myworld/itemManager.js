/**
*myWorld物品引擎
*
*20221218
*/

var ifButtonDown=[];

var ItemCollectTool = new Phaser.Class({
    Extends:Phaser.Physics.Arcade.Sprite,
    initialize:function ItemCollectTool(scene,x,y,texture){
        Phaser.Physics.Arcade.Sprite.call(this,scene,x,y,texture);
        this.scene=scene;
        this.pzxgroup=this.scene.physics.add.group();
        scene.physics.world.enable(this);
        
        //this.body=new Phaser.Physics.Arcade.Body(scene.physics.world,this);
        this.setTexture(texture);
        this.setBodySize(190,125,true);
        this.setScale(0.2);
        this.setFrame(162);
        this.setFlipX(true);
        this.setDepth(10);
        this.setOrigin(0,1);
        scene.physics.add.collider(this,this.scene.mapAddingGroup);
        pzxgroupvar=this.pzxgroup;
        
        
        
    },
    preUpdate(time,delta){
        sin=0;
        cos=0;
        speed=150;
        dx=this.scene.joystick.deltaX;
        dy=this.scene.joystick.deltaY;
        if(!(dx==0&&dy==0)){
        sin=dy/Math.sqrt(dx**2+dy**2);
        cos=dx/Math.sqrt(dx**2+dy**2);
        if(cos>=0){
              
              this.setFlipX(true);
              
              dd=0;this.setOrigin(0,1);
              this.setPosition(this.scene.sprite.x,this.scene.sprite.y+10);
              this.setOrigin(0.75,1);
              
            }else{dd=1;this.setOrigin(1,1);this.setFlipX(false);
            this.setPosition(this.scene.sprite.x,this.scene.sprite.y+10);
            this.setOrigin(0.25,1);
        
            }
        
       
        this.body.velocity.set(cos* speed,sin* speed);
        }else{
        
        this.body.velocity.set(0);
        
        }
      
        if(ifButtonDown.indexOf("collect")!=-1 && this.angle==0){
          if(!this.flipX){
          this.scene.tweens.timeline({
               targets: this,
             
               tweens:[
                 {
                   angle: 50,
                   duration: 60,
                   callbackScope: this.scene,
                   ease: 'Linear'
                 },
                 
                 {
                   angle: -135,
                   duration: 100,
                   callbackScope: this.scene,
                   ease: 'Linear'
                 },
                 {
                   angle: 0,
                   duration: 60,
                   callbackScope: this.scene,
                   ease: 'Linear'
                 }
               ]
            });
           
        }else{
            this.scene.tweens.timeline({
               targets: this,
               
               tweens:[
                 {
                   angle: -50,
                   duration: 60,
                   callbackScope: this.scene,
                   ease: 'Linear'
                 },
                 
                 {
                   angle: 135,
                   duration: 100,
                   callbackScope: this.scene,
                   ease: 'Linear'
                 },
                 {
                   angle: 0,
                   duration: 60,
                   callbackScope: this.scene,
                   ease: 'Linear'
                 }
               ]
            });
          
          
        }
       //这里后面要改参数，即破坏能力
            closestAdding.life=closestAdding.life-1;
            this.scene.tweens.timeline({
               targets: closestAdding,
               
               tweens:[
                 {
                   scale: 0.09,
                   duration: 60,
                   callbackScope: this.scene,
                   ease: 'Linear'
                 },
                 
                
                 {
                   scale: 0.12,
                   duration: 60,
                   callbackScope: this.scene,
                   ease: 'Linear'
                 }
               ]
            });
            if(closestAdding.life<=0){closestAdding.destroy();}
      }
      
    }


   

});

function c(t){
    t.clear(true,true);
}