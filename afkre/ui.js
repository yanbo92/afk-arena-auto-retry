"ui";
var fight = images.read("./fight.jpg");
    var retry = images.read("./retry.jpg");
    var reconnect = images.read("./reconnect.jpg");
    var next = images.read("./next.jpg");

ui.layout(
    <vertical>
        <button id="startBTN" text="开始"/>
        <button id="stopBTN" text="停止"/>
    </vertical>
);


ui.startBTN.click(() => {
threads.start(function(){
toast("5秒后开始");
    sleep(5000)
do{
        requestScreenCapture();
        //截图并找图
        var f = findImage(captureScreen(), fight);
        if(f){
            //toast("找到战斗: " + f);
            click(f.x, f.y)
           
        }else{
            //toast("未找到战斗");
            var r = findImage(captureScreen(), retry);
            if (r){
                //toast("找到重开: " + r);
                click(r.x, r.y)
            }
            else{
                var rc = findImage(captureScreen(), reconnect,{threshold:0.6});
                if (rc){                 
                    //toast("找到重连: " + r);
                    click(rc.x, rc.y)
                    }
                    else{
                    var n = findImage(captureScreen(), next);
                    if (n){
                    //toast("下一关: " + n);
                    click(n.x, n.y)
            }
                    }
               
            }
        }
        sleep(1000)
        }
    while(1);

})
});
ui.stopBTN.click(function(){
    exit()
    })


