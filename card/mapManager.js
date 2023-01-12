var canvasSize=500;
var noiseScale = 0.02;

var startPoint;
var endPoint;



function dist(...args){
    return Math.sqrt((args[0]-args[2])**2+(args[1]-args[3])**2);
}


  
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