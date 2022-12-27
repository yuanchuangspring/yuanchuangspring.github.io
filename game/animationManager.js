//动画管理器

function moveToPointX(scene,obj,dx,totaltime,yoyo=false){
    scene.tweens.add({
        targets: obj,
        x: dx,
        ease: 'Power1',
        duration: totaltime,
        yoyo:yoyo
    });
}

function moveToPointY(scene,obj,dy,totaltime,yoyo=false,callback){
    scene.tweens.add({
        targets: obj,
        y: dy,
        ease: 'Power1',
        duration: totaltime,
        yoyo:yoyo,
        onComplete:callback
    });
}

function scaleTo(scene,obj,se,totaltime){
    scene.tweens.add({
        targets: obj,
        scale: se,
        ease: 'Linear',
        duration: totaltime
    });
}

function spineAngle(scene,obj,se,totaltime){
    scene.tweens.add({
        targets: obj,
        angle: se,
        ease: 'Linear',
        duration: totaltime
    });
}

function changeWidth(scene,obj,se,totaltime){
    scene.tweens.add({
        targets: obj,
        width: se,
        ease: 'Linear',
        duration: totaltime
    });
    
}