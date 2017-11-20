
var logFlag = false;
function videoPlay(videoInfo)
{

    logFlag = login(videoInfo);
    if(logFlag)
    {
        var cameraId = 73;
        startPreview(videoInfo["Channel"]);
    }
}
//ocx视频播放
function startPreview(cameraId) {
    $("#video").css("display", "block");
    var OCXobj = document.getElementById("PreviewOcx");
    var ret = OCXobj.StartTask_Preview_FreeWnd(cameraId);
}
//ocx登录
function login(videoInfo)
{
    var video = document.getElementById("video");
    video.innerHTML = "<object classid=\'CLSID:71DEA326-2E6F-454A-83E1-FDB6317DD0BB\' id=\'PreviewOcx\' name=\'ocx\' width=\'100%\' height=\'100%\'></object>";
    //var userName = "admin";
    //var pw = "trkj@88888";
    //var ipAdd = "192.168.5.203";
    //var port = "80";
    var userName = videoInfo["PlatformUserName"];
    var pw = videoInfo["PlatformPassword"];
    var ipAdd = videoInfo["PlatformIP"];
    var port = videoInfo["PlatformPort"].toString();
    if (!validateInteger(port, "端口")) {
        return;
    }
    if (!(parseInt(port) >= 0 && parseInt(port) <= 2147483647)) {
        alert("端口号介于0到2147483647之间！");
        return;
    }
    var OCXobj = document.getElementById("PreviewOcx");
    //if (!window.ActiveXObject) {
    //    alert("对不起，证书登陆请使用IE浏览器！");
    //    return;
    //}
    //OCXobj.SetWndNum(1);
    var ret = OCXobj.Login(ipAdd,port,userName,pw);
    //switch (ret) {
    //    case 0:
    //        //initCameraList();
    //        //initTree();
    //        //clearTree();
    //        alert("登录成功！");
    //        logFlag = true;
    //        // showMethodInvokedInfo("Login,GetResourceInfo 接口调用成功！");
    //        break;
    //    case -1:
    //        //clearTree();
    //        alert("登录失败！");
    //        logFlag = false;
    //        // showMethodInvokedInfo("Login接口调用失败！错误码：" + OCXobj.GetLastError());
    //        break;
    //    default:
    //        break;
    //}
    if (ret) {
       // alert("登录成功！");
        logFlag = true;
    }
    else {
        alert("登录失败！");
        logFlag = false;
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
//ocx退出
function closeVideo()
{
    var OCXobj = document.getElementById("PreviewOcx");
    if (OCXobj != null)
        {
        var ret = OCXobj.Logout();
        if (ret)
        {
            alert("退出成功！")
        }
        else
        {
            alert("退出失败！")
        }
        //switch (ret) {
        //    case 0:
        //        OCXobj.StopAllPreview();
        //        //init();
        //        //alert("退出成功！");
              
        //        break;
        //    case -1:
        //        //alert("退出失败！错误码：" + OCXobj.GetLastError());
                
        //        break;
        //    default:
        //        break;
        //}
    }
    else {
       // alert("退出失败！");
    }
        var video = document.getElementById("video");         
        video.innerHTML = "";
    
}

