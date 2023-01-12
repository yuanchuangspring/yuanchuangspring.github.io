/*
*仿杀戮尖塔地图生成
*/

class mapManager {
  
  constructor(num,eachMax,eachMin) {
    
    Math.seed(seed);
  
    this.mapList=[];
    
    this.num=num;
    
    this.eachMin=eachMin;
    
    this.eachMax=eachMax;
    
    for(cre=0;cre<this.num;cre++){
        
        //初始化该层列表
        this.mapList.push([]);
        
        //获取本层节点数
        eachNum=this.eachMin+Math.floor(Math.random()*(this.eachMax-this.eachMin));
        
        //遍历生成节点
        for(item=0;item<eachNum;item++){
          
          //初始化该节点
          this.mapList[cre].push("1 => ");
          
          //连接上一层节点
          for(pre=0;pre<this.mapList[cre-1].length;pre++){
            
            if(Math.random()<=0.5){
              
              
              
            }
            
          }
          
        }
        
    }
    
  }
}