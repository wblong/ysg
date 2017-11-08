/*	Copyright (c) 2016 Jean-Marc VIGLINO, 
	released under the CeCILL-B license (French BSD license)
	(http://www.cecill.info/licences/Licence_CeCILL-B_V1-en.txt).
*/
/**
 * @classdesc
 * A popup element to be displayed over the map and attached to a single map
 * location.  Like {@link ol.control.Control}, Overlays are visible widgets.
 * Unlike Controls, they are not in a fixed position on the screen, but are tied
 * to a geographical coordinate, so panning the map will move an Overlay but not
 * a Control.
 *
 * Example:
 *
 *     var popup = new ol.Overlay.Popup();
 *     map.addOverlay(popup);
 *     popup.show(coordinate, "Hello!");
 *     popup.hide();
 *
 * @constructo
 * @extends {ol.Overlay}
 * @param {olx.OverlayOptions} options Overlay options 
 *		+ popupClass: the a class for the overlay.
 *		+ closeBox: popup has a close box.
 *		+ onclose: callback when popup is closed
 *		+ onshow: callback when popup is shown
 *		+ positionning: add 'auto' to let the popup choose a good positioning.
 * @api stable
 */
ol.Overlay.Video = function (options)
{	var self = this;
	var elt = $("<div>");
	//待定
	this.logFlag = false;
	this.element = options.element = elt.get(0);
	this.offsetBox = options.offsetBox;
	// Anchor div
	$("<div>").addClass("anchor").appendTo(elt);
	var d = $("<div>").addClass('ol-overlaycontainer-stopevent').appendTo(elt);
	//Video
	this.video=$("<div>").addClass('video').attr('id','video').appendTo(d).get(0);
	// Closebox
	this.closeBox = options.closeBox;
        this.onclose = options.onclose;      
        this.onshow = options.onshow;      
	$("<button>").addClass("closeBox").addClass(options.closeBox?"hasclosebox":"")
				.attr('type', 'button')
				.prependTo(d)
				.click(function()
				{	self.hide();
					self.closeVideo();
				});
	// Stop event
	options.stopEvent=false;
	d.on("mousedown touchstart", function(e){ e.stopPropagation(); })

	ol.Overlay.call(this, options);
	this.video.addEventListener("click",function(evt){
		self.login();
		self.videoPlay();
	});
        // call setPositioning first in constructor so getClassPositioning is called only once
	this.setPositioning(options.positioning);
	this.setPopupClass(options.popupClass);
}
ol.inherits(ol.Overlay.Video, ol.Overlay);

/**
 * Get CSS class of the popup according to its positioning.
 * @private
 */
ol.Overlay.Video.prototype.getClassPositioning = function ()
{	var c = "";
	var pos = this.getPositioning();
	if (/bottom/.test(pos)) c += "ol-popup-bottom ";
	if (/top/.test(pos)) c += "ol-popup-top ";
	if (/left/.test(pos)) c += "ol-popup-left ";
	if (/right/.test(pos)) c += "ol-popup-right ";
	if (/^center/.test(pos)) c += "ol-popup-middle ";
	if (/center$/.test(pos)) c += "ol-popup-center ";
	return c;
}

/**
 * Set CSS class of the popup.
 * @param {string} class name.
 * @api stable
 */
ol.Overlay.Video.prototype.setClosebox = function (b)
{	this.closeBox = b;
	if (b) $(this.element).addClass("hasclosebox");
	else $(this.element).removeClass("hasclosebox");
}

/**
 * Set the CSS class of the popup.
 * @param {string} class name.
 * @api stable
 */
ol.Overlay.Video.prototype.setPopupClass = function (c)
{	$(this.element).removeClass()
		.addClass("ol-popup "+(c||"default")+" "+this.getClassPositioning()+(this.closeBox?" hasclosebox":""));
}

/**
 * Add a CSS class to the popup.
 * @param {string} class name.
 * @api stable
 */
ol.Overlay.Video.prototype.addPopupClass = function (c)
{	$(this.element).addClass(c);
}

/**
 * Remove a CSS class to the popup.
 * @param {string} class name.
 * @api stable
 */
ol.Overlay.Video.prototype.removePopupClass = function (c)
{	$(this.element).removeClass(c);
}

/**
 * Remove a CSS class to the popup.
 * @param {string} class name.
 * @api stable
 */
ol.Overlay.Video.prototype.setPositioning = function (pos)
{	
        if (pos === undefined)
            return;
        if (/auto/.test(pos))
	{	this.autoPositioning = pos.split('-');
		if (this.autoPositioning.length==1) this.autoPositioning[1]="auto";
	}
	else this.autoPositioning = false;
	pos = pos.replace(/auto/g,"center");
	if (pos=="center") pos = "bottom-center";
	this.setPositioning_(pos);
}
ol.Overlay.Video.prototype.setPositioning_ = function (pos)
{	ol.Overlay.prototype.setPositioning.call(this, pos);
	$(this.element).removeClass("ol-popup-top ol-popup-bottom ol-popup-left ol-popup-right ol-popup-center ol-popup-middle");
	$(this.element).addClass(this.getClassPositioning());
}

/** Check if popup is visible
* @return {boolean}
*/
ol.Overlay.Video.prototype.getVisible = function ()
{	
	return $(this.element).hasClass("visible");
};

/**
 * Set the position and the content of the popup.
 * @param {ol.Coordinate|string} the coordinate of the popup or the HTML content.
 * @param {string|undefined} the HTML content (undefined = previous content).
 * @api stable
 */
ol.Overlay.Video.prototype.show = function (coordinate, html)
{	if (!html && typeof(coordinate)=='string') 
	{	html = coordinate; 
		coordinate = null;
	}
	
	var self = this;
	var map = this.getMap();
	if (!map) return;
	
	if (html && html !== this.prevHTML) 
	{	// Prevent flickering effect
		this.prevHTML = html;
		$(this.content).html("").append(html);
		// Refresh when loaded (img)
		$("*", this.content).on('load',function()
		{	map.renderSync();
		})
	}

	if (coordinate) 
	{	// Auto positionning
		if (this.autoPositioning)
		{	var p = map.getPixelFromCoordinate(coordinate);
			var s = map.getSize();
			var pos=[];
			if (this.autoPositioning[0]=='auto')
			{	pos[0] = (p[1]<s[1]/3) ? "top" : "bottom";
			}
			else pos[0] = this.autoPositioning[0];
			pos[1] = (p[0]<2*s[0]/3) ? "left" : "right";
			this.setPositioning_(pos[0]+"-"+pos[1]);
			if (this.offsetBox)
			{	this.setOffset([this.offsetBox[pos[1]=="left"?2:0], this.offsetBox[pos[0]=="top"?3:1] ]);
			}
		}
		// Show
		this.setPosition(coordinate);
		// Set visible class (wait to compute the size/position first)
		$(this.element).parent().show();
                if (typeof (this.onshow) == 'function') this.onshow();
		this._tout = setTimeout (function()
		{	$(self.element).addClass("visible"); 
		}, 0);
	}
}

/**
 * Hide the popup
 * @api stable
 */
ol.Overlay.Video.prototype.hide = function ()
{	if (this.getPosition() == undefined) return;
	if (typeof (this.onclose) == 'function') this.onclose();
	this.setPosition(undefined);
	if (this._tout) clearTimeout(this._tout);
	$(this.element).removeClass("visible");
}
/**
 * 
 */
ol.Overlay.Video.prototype.videoPlay= function videoPlay()
 {
     
     if(this.logFlag)
     {
         this.startPreview(73);
     }
 }
 //ocx视频播放
 ol.Overlay.Video.prototype.startPreview=function startPreview(cameraId) {
     $("#video").css("display", "block");
     var OCXobj = document.getElementById("PreviewOcx");
     var ret = OCXobj.StartTask_Preview_FreeWnd(cameraId);
 }
 //ocx登录
 ol.Overlay.Video.prototype.login=function login()
 {
     //this.video.innerHTML = "<object clsid=\'{AC036352-03EB-4399-9DD0-602AB1D8B6B9}\' id=\'PreviewOcx\' width=\'300\' height=\'300\' name=\'ocx\' type=\'application/x-itst-activex\'></object>";
     video.innerHTML = "<object classid=\'clsid:AC036352-03EB-4399-9DD0-602AB1D8B6B9\' id=\'PreviewOcx\' width=\'300\' height=\'300\' name=\'ocx\'></object>";
     var userName = "admin";
     var pw = "trkj@88888";
     var ipAdd = "192.168.5.203";
     var port = "80";
     // var userName = videoInfo["PlatformUserName"];
     // var pw = videoInfo["PlatformPassword"];
     // var ipAdd = videoInfo["PlatformIP"];
     // var port = videoInfo["PlatformPort"];
     if (!this.validateInteger(port, "端口")) {
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
             //alert("登录成功！");
             this.logFlag = true;
             // showMethodInvokedInfo("Login,GetResourceInfo 接口调用成功！");
             break;
         case -1:
             //clearTree();
            // alert("登录失败！");
             this.logFlag = false;
             // showMethodInvokedInfo("Login接口调用失败！错误码：" + OCXobj.GetLastError());
             break;
         default:
             break;
     }
 }

 ol.Overlay.Video.prototype.validateInteger=function validateInteger(value, label) {
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
 ol.Overlay.Video.prototype.closeVideo=function closeVideo()
 {
         var OCXobj = document.getElementById("PreviewOcx");
         var ret = OCXobj.Logout();
         switch (ret) {
             case 0:
                 OCXobj.StopAllPreview();
                 //init();
                 //alert("退出成功！");
               
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

