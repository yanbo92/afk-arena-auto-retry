"ui";

function click_blank() {

    console.log('开始点击空白处跳过见闻和礼包');

    setScreenMetrics(720, 1280);

    for (var i = 0; i < 5; i++) {

        click(360, 1280);

        sleep(3000)

    }

}

function enter_battle() {

    console.log('点击挑战首领进入主线推图界面');

    setScreenMetrics(720, 1280);

    if (!inside_battle()) {
        click(360, 1100)
    }

    sleep(3000)

    if (!inside_battle()) {
        click(360, 1000)
    }

    if (!inside_battle()) {
        click(360, 1100)
    }

    sleep(3000)

    if (!inside_battle()) {
        click(360, 1000)
    }
}

function enter_by_mode() {
    if (selectedMode == '主线推图') {
        enter_battle()
    }
}

function inside_battle() {
    var tmp = images.read("./arrow.jpg");
    // 截图并找图
    var p = findImage(captureScreen(), tmp, {
        threshold: 0.2
    });
    tmp.recycle()
    if (p) {
        return true
    }
    else {
        return false
    }
}
function network_retry() {
    var tmp = images.read("./network_retry.jpg");
    // 截图并找图
    var p = findImage(captureScreen(), tmp, {
        threshold: 0.8
    });
    tmp.recycle()
    if (p) {
        click(835, 1314)
        sleep(3000)
    }
}

function fight_retry() {

    setScreenMetrics(720, 1280);

    click(380, 1175);

    sleep(300);

    // 为了单队
    click(360, 1100)


}

function screenshot_sdcard() {

    curTime = new Date();

    time_string = (curTime.getFullYear() + "-" + (curTime.getMonth() + 1) + "_" + curTime.getDate() + "_" + curTime.getHours() + "_" + curTime.getMinutes() + "_" + curTime.getSeconds());

    var name = "/sdcard/Download/" + time_string + ".png"

    captureScreen(name);

}

function kill_scripts() {
    allNgs = engines.all()
    myNg = engines.myEngine()
    for (var i = 0; i < allNgs.length; ++i) {

        if (!(allNgs[i] === myNg)) {
            allNgs[i].forceStop()
        }

    }
}

function kill_app(packageName) {
    var name = getPackageName(packageName);
    if (!name) {
        if (getAppName(packageName)) {
            name = packageName;
        } else {
            return false;
        }
    }
    app.openAppSetting(name);
    text(app.getAppName(name)).waitFor();
    let is_sure = textMatches(/(.*强.*|.*停.*|.*结.*|.*行.*)/).findOne();
    if (is_sure.enabled()) {
        textMatches(/(.*强.*|.*停.*|.*结.*|.*行.*)/).findOne().click();
        textMatches(/(.*确.*|.*定.*)/).findOne().click();
        log(app.getAppName(name) + "应用已被关闭");
        sleep(1000);
        back();
    } else {
        log(app.getAppName(name) + "应用不能被正常关闭或不在后台运行");
        back();
    }
}

ui.layout(
    <vertical>
        <appbar>
            <toolbar title="ReAFK" />
        </appbar>
        <Switch id="autoService" text="无障碍服务" checked="{{auto.service != null}}" padding="50 50 50 50" textSize="15sp" />
        <horizontal padding="20" >
            <radiogroup id='typeSelect'>
                <radio text='主线推图' padding="10"></radio>
                <radio text='王座之塔' padding="10"></radio>
                <radio text='耀光塔' padding="10"></radio>
                <radio text='蛮族塔' padding="10"></radio>
                <radio text='绿裔塔' padding="10"></radio>
                <radio text='亡灵塔' padding="10"></radio>
                <radio text='半神塔' padding="10"></radio>
                <radio text='恶魔塔' padding="10"></radio>
            </radiogroup>
        </horizontal>
        <button id="start" text="开始运行" />
        <text text="Produced by 云天明" gravity="center" />
    </vertical>
);

ui.autoService.on("check", function (checked) {
    // 用户勾选无障碍服务的选项时，跳转到页面让用户去开启
    if (checked && auto.service == null) {
        app.startActivity({
            action: "android.settings.ACCESSIBILITY_SETTINGS"
        });
    }
    if (!checked && auto.service != null) {
        auto.service.disableSelf();
    }
});

// 当用户回到本界面时，resume事件会被触发
ui.emitter.on("resume", function () {
    // 此时根据无障碍服务的开启情况，同步开关的状态
    ui.autoService.checked = auto.service != null;
});

ui.start.on("click", function () {
    //程序开始运行之前判断无障碍服务
    if (auto.service == null) {
        toast("请先开启无障碍服务！");
        return;
    }
    main();
});

buttonList = []
ui.post(
    function () {
        var count = ui.typeSelect.getChildCount()
        for (var i = 0; i < count; i++) {
            var view = ui.typeSelect.getChildAt(i)
            var id = view.id
            var content = view.getText().toString()
            buttonList.push({
                num: i,
                id: id,
                content: content,
            })
        }
        log(buttonList)
    }
)

selectedMode = ""
ui.typeSelect.setOnCheckedChangeListener(
    function (radioGroup, id) {
        var myIdStartFrom0 = id - buttonList[0].id
        var content = radioGroup.getChildAt(myIdStartFrom0).getText().toString()
        var msg = util.format('序号=%s, 内容=%s', myIdStartFrom0, content)
        // toastLog(msg)
        selectedMode = content
    }
)


function main() {
    // 这里写脚本的主逻辑

    threads.start(function () {
        log("开始运行");
        toast(selectedMode)

        try {
            if (!requestScreenCapture()) {

                toast("请求截图失败");

                exit();

            }
        } catch (e) {
            console.error($debug.getStackTrace(e));
        }

        kill_app("剑与远征")
        kill_scripts()


        while (true) {

            if (!(currentPackage().indexOf("lilith") != -1)) {

                console.log('游戏死了，重启游戏');

                app.launchApp("剑与远征")

                sleep(15000);

                click_blank()

                enter_by_mode()

            } else {

                console.log("当前界面没有游戏图标，re图");

                network_retry()

                for (var i = 0; i < 1000; i++) {

                    fight_retry();

                }

                console.log("re完一轮，截图");

                screenshot_sdcard()

            }

        }

    });
}
