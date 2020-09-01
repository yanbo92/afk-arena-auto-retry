"ui";
ui.layout(
    <frame>
        <vertical gravity='center_horizontal' h='*'>
            <text text="日志：" layout_weight='0.5'/>
            <com.stardust.autojs.core.console.ConsoleView layout_weight='6' id="console" h="300"/>
    
            <Switch id='needNext' w="auto" layout_weight='1' text="自动点下一关"/>
            <Switch id='needNotice' w="auto" layout_weight='1' text="推过了震动提醒"/>
            <horizontal gravity='center_horizontal' layout_weight='1'>
                <button id='start'  w="auto" h="auto" text="开始" />
                <button id='stop'  w="auto" h="auto" text="停止" />
            </horizontal>
            <text text="按音量减键可以停止脚本运行" layout_weight='0.5' gravity='center_horizontal'/>
        </vertical>

    </frame>
);

e1 = null;
e2 = null;
e3 = null;
e4 = null;
isStopped = true;


events.observeKey();
events.onKeyDown("volume_down",function(event){
    if(isStopped == false){
    if(e1){
        e1.getEngine().forceStop()
        }
    if(e2){
        e2.getEngine().forceStop()
        }
    if(e3){
        e3.getEngine().forceStop()
      
        }
    if(e4){
        e4.getEngine().forceStop()
        }
    isStopped = true;
    toast("已停止")
    }else{
        //复制start
        toast("开始运行")
        isStopped = false;
            if (ui.needNext.isChecked() == false) {
        if (ui.needNotice.isChecked() == false){
        log("开始运行脚本，不点下一关，不震动")
            threads.start(function(){
        //toast("5秒后开始");
        //sleep(5000)
        requestScreenCapture();
        log("开始运行");
        var i = 1
        do{
            if(isStopped){
                break;}
            log("次数"+i);
            e1 = engines.execScriptFile("FindAndClickNoNext.js")
            log("等待120s");
            
            sleep(120000);
            e1.getEngine().forceStop()
            i+=1;
            
        }
        while(1);                                                        

})}else{
     log("开始运行脚本，不点下一关，震动")
            threads.start(function(){
        //toast("5秒后开始");
        //sleep(5000)
        requestScreenCapture();
        log("开始运行");
        var i = 1
        do{
            if(isStopped){
                break;}
            log("次数"+i);
            e2 = engines.execScriptFile("FindAndClickNoNextNotice.js")
            log("等待120s");
            
            sleep(120000);
            e2.getEngine().forceStop()
            i+=1;
            
        }
        while(1);                                                        

})
    }
    } else {
        if (ui.needNotice.isChecked() == false){
        log("开始运行脚本，自动点下一关，不震动")
            threads.start(function(){
        //toast("5秒后开始");
        //sleep(5000)
        requestScreenCapture();
        log("开始运行");
        var i = 1
        do{
            if(isStopped){
                break;}
            log("次数"+i);
            e3 = engines.execScriptFile("FindAndClickAutoNext.js")
            log("等待120s");
            sleep(120000);
            e3.getEngine().forceStop()
            i+=1;
        }
        while(1);                                                        

})
    }else{
          log("开始运行脚本，自动点下一关，震动")
            threads.start(function(){
        //toast("5秒后开始");
        //sleep(5000)
        requestScreenCapture();
        log("开始运行");
        var i = 1
        do{
            if(isStopped){
                break;}
            log("次数"+i);
            e4 = engines.execScriptFile("FindAndClickAutoNextNotice.js")
            log("等待120s");
            sleep(120000);
            e4.getEngine().forceStop()
            i+=1;
        }
        while(1);                                                        

})
        }
    }

        }
    }
    );
    
ui.stop.on("click", () => {

    if(e1){
        e1.getEngine().forceStop()
        }
    if(e2){
        e2.getEngine().forceStop()
        }
    if(e3){
        e3.getEngine().forceStop()
      
        }
    if(e4){
        e4.getEngine().forceStop()
        }
    isStopped = true;
    log("已停止")
    
});
ui.console.setConsole(runtime.console);
// 设置控制台字体颜色
let c = new android.util.SparseArray();
let Log = android.util.Log;
c.put(Log.VERBOSE, new java.lang.Integer(colors.parseColor("#dfc0c0c0")));
c.put(Log.DEBUG, new java.lang.Integer(colors.parseColor("#cc000000")));
c.put(Log.INFO, new java.lang.Integer(colors.parseColor("#ff64dd17")));
c.put(Log.WARN, new java.lang.Integer(colors.parseColor("#ff2962ff")));
c.put(Log.ERROR, new java.lang.Integer(colors.parseColor("#ffd50000")));
c.put(Log.ASSERT, new java.lang.Integer(colors.parseColor("#ffff534e")));
ui.console.setColors(c);

ui.needNext.on("check", (checked) => {
  
    if (checked== false) {//这里autojs测试版7好像有问题只能这么写
        log("切换到不点击下一关，请重新运行脚本");
    } else {
        log("自动点下一关，请重新运行脚本");
    }
    
});

ui.needNotice.on("check", (checked) => {
  
    if (checked== false) {//这里autojs测试版7好像有问题只能这么写
        log("关闭了推过关卡震动提醒，重新运行生效");
        
    } else {
        log("打开了推过关卡震动提醒，重新运行生效");
    }
    
});

ui.start.on("click", () => {
    
    if(e1){
        e1.getEngine().forceStop()
        }
    if(e2){
        e2.getEngine().forceStop()
        }
    if(e3){
        e3.getEngine().forceStop()
      
        }
    if(e4){
        e4.getEngine().forceStop()
        }
    isStopped = false;
    if (ui.needNext.isChecked() == false) {
        if (ui.needNotice.isChecked() == false){
        log("开始运行脚本，不点下一关，不震动")
            threads.start(function(){
        //toast("5秒后开始");
        //sleep(5000)
        requestScreenCapture();
        log("开始运行");
        var i = 1
        do{
            if(isStopped){
                break;}
            log("次数"+i);
            e1 = engines.execScriptFile("FindAndClickNoNext.js")
            log("等待120s");
            
            sleep(120000);
            e1.getEngine().forceStop()
            i+=1;
            
        }
        while(1);                                                        

})}else{
     log("开始运行脚本，不点下一关，震动")
            threads.start(function(){
        //toast("5秒后开始");
        //sleep(5000)
        requestScreenCapture();
        log("开始运行");
        var i = 1
        do{
            if(isStopped){
                break;}
            log("次数"+i);
            e2 = engines.execScriptFile("FindAndClickNoNextNotice.js")
            log("等待120s");
            
            sleep(120000);
            e2.getEngine().forceStop()
            i+=1;
            
        }
        while(1);                                                        

})
    }
    } else {
        if (ui.needNotice.isChecked() == false){
        log("开始运行脚本，自动点下一关，不震动")
            threads.start(function(){
        //toast("5秒后开始");
        //sleep(5000)
        requestScreenCapture();
        log("开始运行");
        var i = 1
        do{
            if(isStopped){
                break;}
            log("次数"+i);
            e3 = engines.execScriptFile("FindAndClickAutoNext.js")
            log("等待120s");
            sleep(120000);
            e3.getEngine().forceStop()
            i+=1;
        }
        while(1);                                                        

})
    }else{
          log("开始运行脚本，自动点下一关，震动")
            threads.start(function(){
        //toast("5秒后开始");
        //sleep(5000)
        requestScreenCapture();
        log("开始运行");
        var i = 1
        do{
            if(isStopped){
                break;}
            log("次数"+i);
            e4 = engines.execScriptFile("FindAndClickAutoNextNotice.js")
            log("等待120s");
            sleep(120000);
            e4.getEngine().forceStop()
            i+=1;
        }
        while(1);                                                        

})
        }
    }


});