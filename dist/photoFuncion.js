var onePhotoInfo = [];
var onePhotoDetailInfo;
var OmPhotoInfo, BsPhotoInfo, BsExistPhotoIds = [];
function InterviewPhotoOm()
{
    $.ajax({
        type: 'POST',
        url: '/ashx/PhotoFunction.ashx?Method=AccessPhotoInfo',
        dataType: 'json',
        cache: false,
        success: function (msg) {
            OmPhotoInfo = msg;
            InterviewPhotoBS();
            //CreatePhotoTable(msg);
        },
        error: function (err) {
            alert(err);
        }


    });
   
}
function InterviewPhotoBS()
{
    $.ajax({
        type: 'POST',
        url: '/ashx/BSCalibrationInfo.ashx?Method=BSCalibrationFun',
        dataType: 'json',
        data: "Type=相机",
        cache: false,
        success: function (msg) {
            BsPhotoInfo = msg;
            getExistPhotoIds();
            CreatePhotoTable(OmPhotoInfo, BsExistPhotoIds);
            //在地图上标定已存在的相机
            CalibrationExistPhoto();
        },
        error: function (err) {
            alert(err);
        }


    });
}
function CalibrationExistPhoto()
{
   var  pointstyle = new ol.style.Style({
        image: new ol.style.Icon(({
            src: "../images/photo_16.png"
        }))

    });
    for(var i=0;i<BsPhotoInfo.length;i++)
    {
        var BsPhotocoord=[BsPhotoInfo[i]["Longitude"], BsPhotoInfo[i]["Latitude"]];
        
         var BsPhotofeature =new ol.Feature({
             geometry: new ol.geom.Point(ol.proj.transform(BsPhotocoord,'EPSG:4326','EPSG:3857'))
        });
        BsPhotofeature.setStyle(pointstyle);
        BsPhotofeature.setProperties(BsPhotoInfo[i]);
        PhotoFeatureList.push(BsPhotofeature);
        PhotoSource.addFeature(BsPhotofeature);
        PhotoSource.refresh();
        
    }
}
function getExistPhotoIds()
{
    for(var i=0;i<OmPhotoInfo.length;i++)
    {
        for(var j=0;j<BsPhotoInfo.length;j++)
        {
            var OmId = OmPhotoInfo[i]["Id"];
            var BsId = BsPhotoInfo[j]["CameraId"];
            if(OmId==BsId)
            {
                BsExistPhotoIds.push(OmId);
            }
        }
    }
}
//绘制相机标定列表
function CreatePhotoTable(OmPhotoInfo, BsExistPhotoIds)
{
    var existFlag = false;
    var photoInfo = document.getElementById("photoInfo");
    photoInfo.innerHTML = "";
    var htmlTable=""
    for (var i = 0; i < OmPhotoInfo.length; i++) {
        existFlag = false;
        var Id = OmPhotoInfo[i]["Id"]
        var Name = OmPhotoInfo[i]["Name"];
        var nextRow = photoInfo.insertRow(i);
        // nextRow.style.backgroundColor = ((i % 2 == 0) ? "#ffffff" : "#f8f8ff");
        nextRow.style.backgroundColor="#777f8d";
        nextRow.style.border = "1px solid #C2D3FC";
        var newCellCartonNo = nextRow.insertCell(0);
        newCellCartonNo.innerHTML = Id;
        newCellCartonNo.align = "center";
        newCellCartonNo.width = "48";
        newCellCartonNo = nextRow.insertCell(1);
        newCellCartonNo.innerHTML = Name;
        newCellCartonNo.align = "center";
        newCellCartonNo.width = "140";
        newCellCartonNo = nextRow.insertCell(2);
        for (var j = 0; j < BsExistPhotoIds.length; j++)
        {
            var BsId = BsExistPhotoIds[j];
            if(BsId==Id)
            {
                existFlag = true;
                break;
            }
        }
        if (existFlag) {
            newCellCartonNo.innerHTML = "<img onClick='mycl(this,\"photoInfo\",\"" + OmPhotoInfo[i]["Type"] + "\",\"" + OmPhotoInfo[i]["Id"] + "\")' src='../images/已标记.png' title='" + Name + "' style='cursor:hand' align=absmiddle>";
        }
        else {
            newCellCartonNo.innerHTML = "<img onClick='mycl(this,\"photoInfo\",\"" + OmPhotoInfo[i]["Type"] + "\",\"" + OmPhotoInfo[i]["Id"] + "\")' src='../images/标记01.png' title='" + Name + "' style='cursor:hand' align=absmiddle>";
        }
        newCellCartonNo.align = "center";
        newCellCartonNo.width = "50";
        newCellCartonNo = nextRow.insertCell(3);
        newCellCartonNo.innerHTML = "<img onClick='videoPlays(this,\"photoInfo\",\"" + OmPhotoInfo[i]["Id"] + "\")' src='../images/play_16.png' title='视频播放' style='cursor:hand' align=absmiddle>";
        newCellCartonNo.align = "center";
        newCellCartonNo.width = "50";
        newCellCartonNo = nextRow.insertCell(4);
        newCellCartonNo.innerHTML = "<img onClick='deletePhoto(this,\"photoInfo\",\"" + OmPhotoInfo[i]["Id"] + "\")' src='../images/删除01.png' title='相机删除' style='cursor:hand;width:14px;height:14px' align=absmiddle>";
        newCellCartonNo.align = "center";
        newCellCartonNo.width = "35";
    }
 //   photoInfo.innerHTML = htmlTable;
}
//删除相机
function deletePhoto(object, id, photoId)
{
    var srcElem = findParentObj(event.srcElement, "TR");
    var objTable = document.getElementById(id);
    for (var k = 0; k < objTable.rows.length; k++) {
        //objTable.rows[k].style.backgroundColor = ((k % 2 == 0) ? "#ffffff" : "#f8f8ff");
        objTable.rows[k].style.backgroundColor = "#777f8d";
    }
    srcElem.style.backgroundColor = "#4D4D4D";
    //判断是否已经标定
    if (draw != null)
    {
        map.removeInteraction(draw);
    }
    if (object.parentElement.parentElement.cells[2].childNodes[0].src.indexOf("已标记.png") != -1)//如果存在
    {
      
        //删除数据库中的相机
        deleteCalibrationInfo(object, "相机", photoId);
    }
    else
    {
        alert("相机还没有标定，不能执行删除操作！");
    }
    if (object.parentElement.parentElement.cells[3].childNodes[0].src.indexOf("close_16.png") != -1)//如果存在
    {

        
        object.parentElement.parentElement.cells[3].childNodes[0].src = "../images/play_16.png";
        //退出视频
        closeVideo();
    }
}
//删除数据库中的相机
function deleteCalibrationInfo(object,type, id)
{
    $.ajax({
        type: 'POST',
        url: '/ashx/DeleteCalibrationInfo.ashx?Method=deleteCalibrationInfo',
        dataType: 'text',
        data: "Type=相机&id=" + id,
        success: function (result) {
            //InterviewPhotoBS();
            object.parentElement.parentElement.cells[2].childNodes[0].src = "../images/标记01.png";
            //删除图层要素
            var deleteFeature = selectFeature("CameraId", id);
            deleteSourceFeature(PhotoSource, deleteFeature);
            
        },
        error:function(error)
        {
            alert(error);
        }

    });
}
function mycl(object,id,Type,photoId)
{
    map.removeInteraction(draw);
    onePhotoInfo = [];
    var srcElem = findParentObj(event.srcElement, "TR");
    var objTable = document.getElementById(id);
    for (var k = 0; k < objTable.rows.length; k++) {
        // objTable.rows[k].style.backgroundColor = ((k % 2 == 0) ? "#ffffff" : "#f8f8ff");
        objTable.rows[k].style.backgroundColor = "#777f8d";
    }
    srcElem.style.backgroundColor = "#4D4D4D";
    //获取选中相机的ID和名称
    var parentobj = object.parentElement.parentElement;
    onePhotoInfo.push(parentobj.childNodes[0].innerHTML);
    onePhotoInfo.push(parentobj.childNodes[1].innerHTML);
    onePhotoInfo.push(Type);
    //根据相机ID获取相机类型
    //for (var i = 0; i < msg.length; i++) {
    //    var Id = msg[i]["Id"];
    //    if(Id==parentobj.childNodes[0].innerHTML)
    //    {
    //        onePhotoInfo.push(msg[i]["Type"]);
    //    }
    //}
    if (object.src.indexOf("已") == -1)
    {
        addCalibration();
    }
    else 
    {
        //在地图上闪烁相机
        selectFeatureByAttribute("CameraId", photoId);

    }
}
var flashFeatureStyle, flashFeature=null;
var flashFeatureIndex = null;
function selectFeatureByAttribute(AttributeName, AttributeValue)
{
    if (flashFeature != null)
    {
        if(flashFeature.getStyle()==null)
        {
            flashFeature.setStyle(flashFeatureStyle);
            PhotoSource.addFeature(flashFeature);
        }
    }
    var features = PhotoSource.getFeatures();
    var selectedByAttriFeature;//实际应用中设置成全局变量
   
    for (var i = 0, ii = features.length; i < ii; i++) {
        if (features[i].values_[AttributeName].toString() === AttributeValue.toString()) {
            flashFeatureIndex = i;
            selectedByAttriFeature = features[i];
            break;
        }
    }
    var mapview = map.getView().setCenter(selectedByAttriFeature.values_.geometry.flatCoordinates);
    //显示标注
    var content = "<div style=\"background-color:#a7abb3;color:white\">" + selectedByAttriFeature.values_.DeviceName + "</div>";
    //alert(feature.getGeometry().getCoordinates());
    popups.show(selectedByAttriFeature.getGeometry().getCoordinates(), content);
    map.addOverlay(popups);//加载弹出框
    //flashFeature = selectedByAttriFeature;
    //flashFeatureStyle = selectedByAttriFeature.getStyle();
    //flashFeature.setStyle(null);
    //PhotoSource.removeFeature(flashFeature);

   // pointFeature = selectedByAttriFeature;
   
   
   // pointFeature.setStyle(null);
}
//根据属性选择要素
function selectFeature(AttributeName, AttributeValue)
{
    var features = PhotoSource.getFeatures();
    var selectedByAttriFeature;//实际应用中设置成全局变量

    for (var i = 0, ii = features.length; i < ii; i++) {
        if (features[i].values_[AttributeName].toString() === AttributeValue.toString()) {
            flashFeatureIndex = i;
            selectedByAttriFeature = features[i];
            break;
        }
    }
    return selectedByAttriFeature;
}
//删除图层要素
function deleteSourceFeature(source,feature)
{
    source.removeFeature(feature);
}
var radius = 0;
//视频播放
function videoPlays(object,tableId,videoId)
{
    if (draw != null) {
        map.removeInteraction(draw);
      
    }
    var srcElem = findParentObj(event.srcElement, "TR");
    var objTable = document.getElementById(tableId);
    for (var k = 0; k < objTable.rows.length; k++) {
        // objTable.rows[k].style.backgroundColor = ((k % 2 == 0) ? "#ffffff" : "#f8f8ff");
        objTable.rows[k].style.backgroundColor = "#777f8d";
    }
    srcElem.style.backgroundColor = "#4D4D4D";
    //判断是否已经标定
    
    if (object.parentElement.previousElementSibling.firstChild.src.indexOf("已标记.png")!=-1)
    {
    var src=object.src;
    if (src.indexOf("play")!=-1)
    {
        object.src = "../images/close_16.png";
        var video = document.getElementById("video");
        if (video.innerHTML != "")
        {
            var parentobj = object.parentElement.parentElement.parentElement;
            for(var i=0;i<parentobj.childNodes.length;i++)
            {
                var childNode = parentobj.childNodes[i];
                if(childNode.childNodes[0].innerHTML!=videoId)
                {
                    if(childNode.childNodes[3].firstChild.src.indexOf("close")!=-1)
                    {
                        childNode.childNodes[3].firstChild.src = "../images/play_16.png";
                    }
                }
            }
            closeVideo();
        }
        VideoDetailInfo(videoId);
        
    }
    else
    {
        object.src = "../images/play_16.png";
        closeVideo();
    }
    }
    else
    {
        alert("相机还未标定！");
    }
   

}
function findParentObj(obj, strTagName, strId) {
    while (obj && !(!strTagName || obj.tagName == strTagName.toUpperCase()) &&
        (!strId || obj.id == strId)
      )
        obj = obj.parentElement;
    return obj;
}


function VideoDetailInfo(videoId)
{
    $.ajax({
        type: 'POST',
        url: '/ashx/VideoPlay.ashx?Method=videoPlayFun',
        dataType: 'json',
        data:"cameraId="+videoId,
        cache: false,
        success: function (videoInfo) {
            onePhotoDetailInfo = videoInfo;
            videoPlay(videoInfo);
           // alert(videoInfo);
        },
        error: function (err) {
            alert(err);
        }


    });
}


function tableShowAndClose()
{
    
    var cameraTable = $("#DeviceList");
    var cameraTableleft = cameraTable[0].style.left;
    var showAndClose = $("#closeAndShow");
    if (cameraTableleft == "-15%")
    {
        $("#DeviceList").animate({ left: "0.1%" }, "slow");
        // cameraTable.css("left", "0.1%");
        $("#closeAndShow").animate({ marginLeft: "13.7%" }, "slow");
        //showAndClose.css("margin-left", "13.7%");
    }
    else
    {
        $("#DeviceList").animate({ left: "-15%" }, "slow");
        //cameraTable.css("left", "-15%");
        $("#closeAndShow").animate({ marginLeft: "0.1%" }, "slow");
        //showAndClose.css("margin-left","0.1%");
    }
   
   // cameraTable.css();
}