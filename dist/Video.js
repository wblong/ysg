
var logFlag = false;
function videoPlay()
{

    logFlag = login();
    if(logFlag)
    {
        startPreview(73);
    }
}
//ocx视频播放
function startPreview(cameraId) {
    $("#video").css("display", "block");
    var OCXobj = document.getElementById("PreviewOcx");
    var ret = OCXobj.StartTask_Preview_FreeWnd(cameraId);
}
//ocx登录
function login()
{
    var video = document.getElementById("video");
    video.innerHTML = "<object classid=\'clsid:AC036352-03EB-4399-9DD0-602AB1D8B6B9\' id=\'PreviewOcx\' width=\'300\' height=\'300\' name=\'ocx\'></object>";
    var userName = "admin";
    var pw = "trkj@88888";
    var ipAdd = "192.168.5.203";
    var port = "80";
    // var userName = videoInfo["PlatformUserName"];
    // var pw = videoInfo["PlatformPassword"];
    // var ipAdd = videoInfo["PlatformIP"];
    // var port = videoInfo["PlatformPort"];
    if (!validateInteger(port, "端口")) {
        return;
    }
    if (!(parseInt(port) >= 0 && parseInt(port) <= 2147483647)) {
        alert("端口号介于0到2147483647之间！");
        return;
    }
    var OCXobj = document.getElementById("PreviewOcx");
    OCXobj.SetWndNum(1);
    var ret = OCXobj.Login(ipAdd, port, userName, pw);
    switch (ret) {
        case 0:
            //initCameraList();
            //initTree();
            //clearTree();
            alert("登录成功！");
            logFlag = true;
            // showMethodInvokedInfo("Login,GetResourceInfo 接口调用成功！");
            break;
        case -1:
            //clearTree();
            alert("登录失败！");
            logFlag = false;
            // showMethodInvokedInfo("Login接口调用失败！错误码：" + OCXobj.GetLastError());
            break;
        default:
            break;
    }
    return logFlag;
}

function validateInteger(value, label) {
    if (value.length == 0 || isNaN(value)) {
        alert(label + "必须是一个整数.");
        return false;
    } else {
        var re = /^[0-9]+[0-9]*]*$/;   //判断正整数 
        if (!re.test(value)) {
            alert(label + "必须是一个整数.");
            return false;
        }

        var isNumber = false;
        for (var count = 0; count < value.length; count++) {
            var code = value.charCodeAt(count);
            if ((48 > code && code > 57)) {
                alert(label + "必须是一个整数.");
                return false;
            }
        }
    }
    return true;
}
//ocx推出
function closeVideo()
{
        var OCXobj = document.getElementById("PreviewOcx");
        var ret = OCXobj.Logout();
        switch (ret) {
            case 0:
                OCXobj.StopAllPreview();
                //init();
                alert("退出成功！");
              
                break;
            case -1:
                alert("退出失败！错误码：" + OCXobj.GetLastError());
                
                break;
            default:
                break;
        }
        var video = document.getElementById("video");
        video.innerHTML = "";
    
}

