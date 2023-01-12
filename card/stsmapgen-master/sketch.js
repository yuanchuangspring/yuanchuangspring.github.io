let canvasSize
const noiseScale = 0.02

let startPoint
let endPoint

let graph = createGraph();

   



function setup() {
  ttt();
}

function drawit() {
  noStroke()
  fill(40, 50, 60)
  rect(0, 0, canvasSize, canvasSize)
  push()
  strokeWeight(10)
  stroke(40, 80, 20)
  fill(0, 0)
  square(0, 0, canvasSize)
  pop()

  push()
  translate(canvasSize * 0.05, canvasSize * 0.05)
  // Lines
  let activePoints = []
  for (let i = 0; i < canvasSize / 50; i++) {
    const pathFinder = ngraphPath.aStar(graph, {
      distance(fromNode, toNode, link) {
        return link.data.weight
      }
    })
    const foundPath = pathFinder.find(startPoint, endPoint)
    if (foundPath.length === 0) {
      break
    }
    activePoints.push(...foundPath.map(obj => obj.id))

    stroke(40, 80, 20)
    fill(40, 80, 20)
    for (let j = 1; j < foundPath.length; j++) {
      arrow(...foundPath[j].id, ...foundPath[j - 1].id)
    }

    const idx = floor(random(1, foundPath.length - 1))
    graph.removeNode(foundPath[idx].id)
  }

  // Points
  stroke(0)
  textSize(16)
  textAlign(CENTER, CENTER)
  
  for (const p of new Set(activePoints)) {
    const pJSON = JSON.stringify(p)
    
    switch (pJSON) {
      
      case JSON.stringify(startPoint):
        button = createButton('😁');
        button.position(p[0],p[1]+150);
        button.style("background","rgba(0,0,0,0)");
        button.style("border","none");
        button.style("padding-left","20px");
        button.style("padding-top","5px");
        break
      case JSON.stringify(endPoint):
        button = createButton('👿');
        button.position(p[0],p[1]+150);
        button.style("background","rgba(0,0,0,0)");
        button.style("border","none");
        button.style("padding-left","20px");
        button.style("padding-top","5px");
        break
      default:
        button = createButton(random(Array.from("💀💀💀💰❓")));
        button.position(p[0],p[1]+150);
        button.style("background","rgba(0,0,0,0)");
        button.style("border","none");
        button.style("padding-left","20px");
        button.style("padding-top","5px");
        button.mousePressed(sayhi);
    }
  }
  pop()

  noStroke()
  fill(40, 50, 60, 0.3)
  rect(0, 0, canvasSize, canvasSize)
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
    removeElements();
    ttt();
    
}

function ttt(){
  canvasSize = min(window.screen.height, window.screen.width*15/16)
  let canvas = createCanvas(canvasSize, canvasSize)
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
  startPoint = [canvasSize * 0.45, canvasSize * 0.9]
  endPoint = [canvasSize * 0.45, 0]
  pdsObj.addPoint(startPoint)
  pdsObj.addPoint(endPoint)
  let points = pdsObj.fill().filter(p => {
    return dist(...p, canvasSize * 0.45, canvasSize * 0.45) <= canvasSize * 0.45
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

function sayhi(){
    alert("hi");
}
