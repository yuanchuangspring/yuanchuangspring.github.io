<?php

function getCSVdata($filename)
{
    $row = 1;//第一行开始
    if(($handle = fopen($filename, "r")) !== false) 
    {    
        while(($dataSrc = fgetcsv($handle)) !== false) 
        {
            $num = count($dataSrc);
            for ($c=0; $c < $num; $c++)//列 column 
            {
                if($row === 1)//第一行作为字段 
                {
                    $dataName[] = $dataSrc[$c];//字段名称
                }
                else
                {
                    foreach ($dataName as $k=>$v)
                    {
                        if($k == $c)//对应的字段
                        {
                            $data[$v] = $dataSrc[$c];
                        }
                    }
                }
            }
            if(!empty($data))
            {
                 $dataRtn[] = $data;
                 unset($data);
            }
            $row++;
        }
        fclose($handle);
        return $dataRtn;
    }
}

function getCSVdataDetail($csvname,$id,$aim)
{
    $csvdata=getCSVdata($csvname);
    
    
    foreach($csvdata as $item)
    {
        if($item["id"]==$id)
        {
            return $item[$aim];
            
        }
       
    }
    
}

function setCSVdataNum($csvname,$id,$aim,$action)
{
    $csvdata=getCSVdata($csvname);
    $index=0;
    
    foreach($csvdata as $item)
    {
        if($item["id"]==$id)
        {
            $csvdata[$index][$aim]=(int)$item[$aim]+$action;
            
        }
        $index+=1;
    }
    
    
    $csvstr="id,time,title,general,read,star\n";
    
    
    for($i=0;$i<count($csvdata);$i++)
    {
        $csvkeys=array_keys($csvdata[$i]);
        for($a=0;$a<count($csvkeys);$a++)
        {
            if($a==count($csvkeys)-1)
            {
                $csvstr=$csvstr.$csvdata[$i][$csvkeys[$a]]."\n";
            }
            else
            {
                $csvstr=$csvstr.$csvdata[$i][$csvkeys[$a]].",";
            }
            
        }
        
    }
    
    $file=fopen($csvname,"w");
    fwrite($file,$csvstr);
    fclose($file);
    
    return $csvdata;
}

function addArticle($csvname,$id,$title,$general,$content)
{
    $date=getdate();
    $addData=$id.",".$date["mon"]."月".$date["mday"]."日".$date["hours"]."时".$date["minutes"]."分".",".$title.",".$general.","."0,0";
    $file=fopen($csvname,"a+");
    fwrite($file,"\n".$addData);
    fclose($file);
}

//setCSVdataNum("main.csv","2023061901","star",1);

if($_GET["action"]=="getdata")
{
    $maindata=getCSVdata("main.csv");
    echo json_encode($maindata);
}
if($_GET["action"]=="addstar")
{
    $maindata=setCSVdataNum("main.csv",$_GET["id"],"star",1);
    echo "ok";
}
if($_GET["action"]=="addread")
{
    $maindata=setCSVdataNum("main.csv",$_GET["id"],"read",1);
    echo "ok";
}
if($_GET["action"]=="subtractstar")
{
    $maindata=setCSVdataNum("main.csv",$_GET["id"],"star",-1);
    echo "ok";
}
if($_GET["action"]=="submitcontent")
{
    addArticle("main.csv",$_POST["id"],$_POST["title"],$_POST["general"],$_POST["content"]);
    if(copy("../save/blog.html","../save/".$_POST["id"].".html"))
    {
        $blog=fopen("../save/".$_POST["id"].".html","a+");
        fwrite($blog,$_POST["content"]."</div></div></body></html>");
        fclose($blog);
        echo "上传成功";
    }else
    {
        echo "上传失败";
    }
    
}




?>