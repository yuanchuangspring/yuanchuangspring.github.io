/**
*myWorld物品引擎
*
*20221218
*/

function ItemCollectTool(obj,texture){
        this.item = obj.add.sprite(290, 300, texture).setVelocity(0);
        this.item.setFrame(162);
        this.item.setFlipX(true);
        this.item.setDepth(10);
        this.item.setBodySize(190,125,true);
        this.item.setScale(0.2);
        
}