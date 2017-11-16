//日期格式化
Date.prototype.Format = function (fmt) {    
    var o = {    
        "M+": this.getMonth() + 1, //月份     
        "d+": this.getDate(), //日     
        "H+": this.getHours(), //小时     
        "m+": this.getMinutes(), //分     
        "s+": this.getSeconds(), //秒     
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度     
        "S": this.getMilliseconds() //毫秒     
    };    
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));    
    for (var k in o)    
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));    
    return fmt;    
};
//字符串格式化
String.prototype.format = function(){    
	    var args = arguments;    
	    return this.replace(/\{(\d+)\}/g,                    
	        function(m,i){    
	            return args[i];    
	        });    
};
//通过URL获取参数
function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}