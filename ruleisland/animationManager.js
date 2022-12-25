//动画管理器

function moveToPointX(scene,obj,dx,totaltime){
    scene.tweens.add({
        targets: obj,
        x: dx,
        ease: 'Power1',
        duration: totaltime
    });
}