var fight = images.read("./fight.jpg");
var retry = images.read("./retry.jpg");
var reconnect = images.read("./reconnect.jpg");
var next = images.read("./next1.jpg");
var conti = images.read("./continue.jpg")
var fightb1 = images.read("./fightBoss.jpg")
var fightb = images.read("./fightb1.jpg")


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
            device.vibrate(5000)
            click(n.x, n.y)
    }else{
        var fb = findImage(captureScreen(), fightb);
if(fb){
    log("找到首领: " + fb);
    click(fb.x, fb.y)
    
   
}else{
    var fb1 = findImage(captureScreen(), fightb1);
if(fb1){
    log("找到首领: " + fb1);
    click(fb1.x, fb1.y)
    
    }
        }
            }
            }
       
    }
}
log("等待1s");
sleep(1000);
}
