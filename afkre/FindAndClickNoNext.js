var fight = images.read("./fight.jpg");
var retry = images.read("./retry.jpg");
var reconnect = images.read("./reconnect.jpg");
var next = images.read("./next1.jpg");
var conti = images.read("./continue.jpg")

//events.observeKey();
//events.onKeyDown("volume_down",function(event){
 //   toast(engines.all());
//    ScriptExecution.getEngine().forceStop()
   // });
try{
requestScreenCapture();
}catch(err){
    
    }
//截图并找图
for(var i=1;i<100;i++){
var con = findImage(captureScreen(), conti);
if(con){
    log("找到战斗: " + con);
    click(con.x, con.y)
    sleep(1000)
   
}
var f = findImage(captureScreen(), fight);
if(f){
    log("找到战斗: " + f);
    click(f.x, f.y)
   
}else{
    log("未找到战斗");
    var r = findImage(captureScreen(), retry);
    if (r){
        log("找到重开: " + r);
        click(r.x, r.y)
    }
    else{
        log("未找到重开");
        var rc = findImage(captureScreen(), reconnect,{threshold:0.6});
        if (rc){                 
            log("找到重连" + rc);
            click(rc.x, rc.y)
            }    
               else{
            log("未找到重连");
            var n = findImage(captureScreen(), next);
            if (n){
            log("找到下一关: " + n);
            
            
    }
            }
    }
}
log("等待1s");
sleep(1000);
}
