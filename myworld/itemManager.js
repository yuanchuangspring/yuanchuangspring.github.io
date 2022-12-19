/**
*myWorld物品引擎
*
*20221218
*/

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
        speed=150;
        dx=this.scene.joystick.deltaX;
        dy=this.scene.joystick.deltaY;
        if(!(dx==0&&dy==0)){
        sin=dy/Math.sqrt(dx**2+dy**2);
        cos=dx/Math.sqrt(dx**2+dy**2);
        if(cos>=0){
              
              this.setFlipX(true);
              
              dd=0;this.setOrigin(0,1);
              this.setPosition(this.scene.sprite.x,this.scene.sprite.y);
              this.setOrigin(0.75,1);
              
            }else{dd=1;this.setOrigin(1,1);this.setFlipX(false);
            this.setPosition(this.scene.sprite.x,this.scene.sprite.y);
            this.setOrigin(0.25,1);
        
            }
        
       
        this.body.velocity.set(cos* speed,sin* speed);
        }else{
        
        this.body.velocity.set(0);
        
        }
      
        dx1=this.scene.joystick1.deltaX;
        dy1=this.scene.joystick1.deltaY;
        if(!(dx1==0&&dy1==0)){
          
            sin1=dy1/Math.sqrt(dx1**2+dy1**2);
            cos1=dx1/Math.sqrt(dx1**2+dy1**2);
            //666资源采集引擎
            if(cos1<=0 && this.angle==0){
            this.scene.tweens.timeline({
               targets: this,
               onComplete:this.pzxCheck,
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
          pzx=this.scene.physics.add.sprite(this.scene.sprite.x-30,this.scene.sprite.y,"pzx");
          pzx.setScale(0.1);
          this.pzxgroup.add(pzx);
          this.scene.physics.add.collider(this.pzxgroup,this.scene.mapAddingGroup,function (pz,ma){pz.destroy();mavar=ma;setTimeout("mavar.destroy()",160);});
          pzxgroupvar=this.pzxgroup;
            
          }else{
              if(this.angle==0){
              this.scene.tweens.timeline({
               targets: this,
               onComplete:this.pzxCheck,
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
          pzx=this.scene.physics.add.sprite(this.scene.sprite.x+30,this.scene.sprite.y,"pzx");
          pzx.setScale(0.1);
          this.pzxgroup.add(pzx);
          this.scene.physics.add.collider(this.pzxgroup,this.scene.mapAddingGroup,function (pz,ma){pz.destroy();mavar=ma;setTimeout("mavar.destroy()",160);});
          pzxgroupvar=this.pzxgroup;
            
          }
          
          }
        }
      setTimeout(function (){c(pzxgroupvar);},500);
    },


   

});

function c(t){
    t.clear(true,true);
}