let canvasSize
const noiseScale = 0.02

let startPoint
let endPoint

let graph = createGraph();

var graphCache;

var nowNode;
var buliCache=[];
var pathListCache=[];


function setup() {
  ttt();
}

function drawit(conti=false) {
  ttt();
  if(conti){
      graph=graphCache;
      
      
  }else{
      graphCache=graph;
      buliCache=[];
      pathListCache=[];
  }
  push()
  //translate(canvasSize * 0.5, canvasSize * 0.05)
  // Lines
  let activePoints = []
  nuuum=0
  for (let i = 0; i < canvasSize / 50; i++) {
    if(conti){
          foundPath=pathListCache[nuuum];
          nuuum+=1;
      }else{
      
    const pathFinder = ngraphPath.aStar(graph, {
      distance(fromNode, toNode, link) {
        return link.data.weight
      }
    });
    foundPath = pathFinder.find(startPoint, endPoint)
   
    if (foundPath.length === 0) {
      break
    }
    pathListCache.push(foundPath);
    }
    activePoints.push(...foundPath.map(obj => obj.id))

    stroke(40, 80, 20)
    fill(40, 80, 20)

coloor=[0xff00ff,0x00ff00,0x000000,0x0000ff,0xffff00,0xffffff,0x00ffff,0xff0000,0xf0f000,0xf000f0,0xf0f0f0];
    
    
    for (let j = 1; j < foundPath.length; j++) {

      //arrow(...foundPath[j].id, ...foundPath[j - 1].id)
      
      mapLine=SCENE.add.graphics();
        

      mapLine.lineStyle(2,0x5B5B51);
        
      mapLine.lineBetween(foundPath[j].id[0],foundPath[j].id[1]+170, foundPath[j - 1].id[0],foundPath[j - 1].id[1]+170);

    }

    const idx = floor(random(1, foundPath.length - 1))
    graph.removeNode(foundPath[idx].id)
  }

  // Points
  stroke(0)
  textSize(16)
  textAlign(CENTER, CENTER)
  
  nuum=0;
  for (const p of new Set(activePoints)) {
    const pJSON = JSON.stringify(p)
    
    switch (pJSON) {
      
      case JSON.stringify(startPoint):
        bu = SCENE.add.text(p[0],p[1]+170,"起点",{fontSize:"20px",fontFamile:"font1",fill:"#000000"}).setOrigin(0.5,0.5);
        if(!conti){nowNode=p;}
        break
      case JSON.stringify(endPoint):
        bu = SCENE.add.text(p[0],p[1]+170,"终点",{fontSize:"20px",fontFamile:"font1",fill:"#000000"}).setOrigin(0.5,0.5);
        
        break
      default:
        if(!conti){
        
        buli=["👿","👿","👿","👿","👿","👿","🔥","💰","❓"];
        ranbu=buli[Math.floor(Math.random()*buli.length)];
        bu = SCENE.add.text(p[0],p[1]+170,ranbu,{fontSize:"20px",fontFamile:"font1",fill:"#ffffff"}).setOrigin(0.5,0.5);
        buliCache.push(ranbu);
        }else{bu = SCENE.add.text(p[0],p[1]+170,buliCache[nuum],{fontSize:"20px",fontFamile:"font1",fill:"#ffffff"}).setOrigin(0.5,0.5);}
        bu.iidd=p;
        if(nowNode!=null && p[0]==nowNode[0]){
            
            NODEkuang=SCENE.add.sprite(bu.iidd[0],bu.iidd[1]+170,"mapselect").setScale(25/512)
            
        }
        nuum+=1;
        bu.setInteractive();
        bu.on("pointerdown",function (){
             if(nowNode==null){
                 
                 nowNode=this.iidd;
                 NODEkuang=SCENE.add.sprite(this.iidd[0],this.iidd[1]+170,"mapselect")
                 SCENE.tweens.add({
                    targets:NODEkuang ,
                    scale: 25/512,
                    ease: 'Power1',
                    duration: 400,
                 });
             }else{
                if(checkPathRight(nowNode,this.iidd)){
                   if(this._text=="👿"){
                      nowNode=this.iidd;
                      NODEkuang=SCENE.add.sprite(this.iidd[0],this.iidd[1]+170,"mapselect")
                      SCENE.tweens.add({
                         targets:NODEkuang ,
                         scale: 25/512,
                         ease: 'Power1',
                         duration: 500,
                         onComplete:function (){
init=false;
                               SCENE.scene.start("GameJiesuan");
                               SCENE.scene.start("GamePlay");
                               SCENE.scene.bringToTop("GamePlay");
                               SCENE.scene.stop("GameMap");
                         }
                      }); 
                    }
                    if(this._text=="🔥"){
                      nowNode=this.iidd;
                      NODEkuang=SCENE.add.sprite(this.iidd[0],this.iidd[1]+170,"mapselect")
                      SCENE.tweens.add({
                         targets:NODEkuang ,
                         scale: 25/512,
                         ease: 'Power1',
                         duration: 500,
                         onComplete:function (){
                               
                               SCENE.scene.start("GameFire");
                               SCENE.scene.bringToTop("GameFire");
                               SCENE.scene.stop("GameMap");
                         }
                      }); 
                    }
                }
             }
        });
        mapGroup.add(bu);
    }
   
  }
  pop()

  //noStroke()
  fill(40, 50, 60, 0.3)
  //rect(0, 0, canvasSize, canvasSize)
}

function arrow(x1, y1, x2, y2, arrowSize = 6) {
  let vec = createVector(x2 - x1, y2 - y1)
  const len = vec.mag()
  vec.mult((len - 10) / len)
  push()
  translate(x1, y1)
  dottedLine(0, 0, vec.x, vec.y)
  rotate(vec.heading())
  translate(vec.mag() - arrowSize, 0)
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0)
  pop()
}

function dottedLine(x1, y1, x2, y2, fragment = 5) {
  let vec = createVector(x2 - x1, y2 - y1)
  const len = vec.mag()
  push()
  translate(x1, y1)
  for (let i = floor(len * 0.5 / fragment); i >= 0; i--) {
    if (i == 0 && floor(len / fragment) % 2 == 0) {
      vec.normalize().mult(len % fragment)
    } else {
      vec.normalize().mult(fragment)
    }
    line(0, 0, vec.x, vec.y)
    vec.mult(2)
    translate(vec.x, vec.y)
  }
  pop()
}

function ppp(){
    clear();
   
    ttt();
    
}

function ttt(){
  canvasSize = min(window.screen.height, window.screen.width*15/16)
  let canvas = createCanvas(canvasSize, canvasSize);
  canvas.parent("canvas")
  colorMode(HSB)
  noLoop()

  // Poisson Disk Sampling
  let pdsObj = new PoissonDiskSampling({
    shape: [canvasSize * 0.9, canvasSize * 0.9],
    minDistance: 40,
    maxDistance: 80,
    tries: 20
  }, random)
  startPoint = [canvasSize * 0.5, canvasSize * 0.9]
  endPoint = [canvasSize * 0.5, 0]
  pdsObj.addPoint(startPoint)
  pdsObj.addPoint(endPoint)
  let points = pdsObj.fill().filter(p => {
    return dist(...p, canvasSize * 0.5, canvasSize * 0.45) <= canvasSize * 0.45
  })

  // Delaunay
  let delaunay = Delaunator.from(points).triangles
  let triangles = []
  for (let i = 0; i < delaunay.length; i += 3) {
    triangles.push([
      points[delaunay[i]],
      points[delaunay[i + 1]],
      points[delaunay[i + 2]]
    ])
  }
  for (let t of triangles) {
    graph.addLink(t[0], t[1], {
      weight: dist(...t[0], ...t[1])
    })
    graph.addLink(t[1], t[2], {
      weight: dist(...t[1], ...t[2])
    })
    graph.addLink(t[2], t[0], {
      weight: dist(...t[2], ...t[0])
    })
  }
}

function getPathRight(che){
    checkPathList=[];
    checkPathListDex=[];
    for(checkp=0;checkp<pathListCache.length;checkp++){
        for(checkpi=0;checkpi<pathListCache[checkp].length;checkpi++){
              if(pathListCache[checkp][checkpi].id[0]==che[0]){
                     checkPathList.push(pathListCache[checkp]);
                     checkPathListDex.push(checkpi)
                     break;
               }
        }
    }
    return checkPathList;
}

function checkPathRight(now,che){
    getPathRight(now);
    
    isLink=false;
    for(nono=0;nono<checkPathList.length;nono++){
            if(nowNode[1]!=canvasSize * 0.9){
              if(checkPathList[nono][checkPathListDex[nono]-1].id[0]==che[0]){
                     return true;
                     
               }
            }else{
               if(checkPathList[nono][checkPathList[nono].length-2].id[0]==che[0]){
                     return true;
                     
               }
            }
    }
    return isLink;
}
