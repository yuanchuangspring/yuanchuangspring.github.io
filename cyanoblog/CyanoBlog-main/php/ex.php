<?php
$date=getdate();
var_dump($date);
echo $date["mon"]."月".$date["mday"]."日".$date["hours"]."时".$date["minutes"]."分";
?>