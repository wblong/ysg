// <div id="tab-query">
// 	<ul class="first">
// 	  <li> 
// 		   <a href="#">目录A</a>
// 		   <ul class="second">
// 				<li><a  href="##">二级目录A</a></li>
// 				<li><a  href="##">二级目录B</a></li>
// 		   </ul>
// 	  </li>
// 	  <li> 
// 		   <a href="#">目录B</a>
// 		   <ul class="second">
// 				<li><a  href="##">二级目录A</a>
// 					<div>
// 						<p>姓名：张三</p>
// 						<p>驾照：3333333</p>
// 						<p>手机:182333333</p>
// 		  			</div>			
// 				</li>
// 				<li><a  href="##">二级目录B</a>	
// 				</li>
// 		   </ul>
// 	  </li>
// 	</ul>
// </div>   
  $(function(){
  /*
  条件及搜索框
   */
  var start_time=new Date().Format("yyyy-MM-ddT00:00:00");  
  var end_time=new Date().Format("yyyy-MM-ddT23:59:59"); 
  $("#start_time").val(start_time);
  $("#end_time").val(end_time);
  $("#filter").click(function(){
    $(".content_panel").toggle();
    $("#tab-query").hide();
  });
  $("#search a").click(function(){
    $("#tab-query").toggle();
    $(".content_panel").hide();
    //开始时间
    console.log($("#start_time").val());
    console.log($("#end_time").val());
    console.log($("#camera").is(':checked'));
    console.log($("#jika").is(':checked'));
  });
  // $("#search a").blur(function(){
  //     $("#tab-query").hide();

  //  });
  // $("#filter").blur(function(){
  //     $(".content_panel").hide();
  //  });
  // document.getElementById('queryform').addEventListener('submit', function (evt) {
         
  //         console.log(this.start_time.value);
  //         console.log(this.end_time.value);
  //         console.log(this.jika.checked);
  //         console.log(this.camera.checked);
  //         //首先清除原有的所有要素
  //         $('#tab-query .first').empty();
  //         //jika
  //         if (this.jika.checked) {
  //          //创建一级目录
  //          var url="http://192.168.5.239/api/Data/GetCurrentCars?sdt={0}&edt={1}".format(this.start_time.value,this.end_time.value);
  //          console.log(url);
  //          $.ajax({
  //                      type:"get",//post
  //                      url:url,
  //                      dataType:"json",
  //                      success: function(data){
  //                        console.log(data);
  //                        QueryData(data,realTimeLayer,0);
  //                      },
  //                      error:function(){  
  //                         console.log('fail');  
  //                      }  
  //                  });
  //          //console.log("test");
  //         }
          
      
  //     });
        /*
        *================================结果查询结果
         */
  	    $("#tab-query .first>li>a").click(function(){
  	    	//隐藏其他
  	    	 $("#tab-query .content").hide(300);
  	    	 $(this).parents().siblings().children(".second").hide(300);
  		     $(this).siblings(".second").toggle(300);
  		     
  		     
  		});
  	    $("#tab-query .second>li>a").hover(function(){
  	    	 //隐藏其他的
  	         $("#tab-query .content").hide();
             //$("#tab-query .second").hide();
  	         $(this).siblings(".content").toggle();
  			
  		});
  		$("#tab-query").hover(function(){
  		    
  		   // $("#tab-query .second").hide();
  		    },function(){
  		    $("#tab-query .content").hide();
  		  });
      $("#tab-query .content").click(function(){
          alert("test");
      });
  });
  /*
  * 测试数据
   */
 var g_Data=[[122.01886410, 30.65775163],[122.01819891, 30.65740092],[122.02577347, 30.65634878],[122.02521557, 30.65570272],
 [122.03576731, 30.65214009],
 [122.02297854, 30.65524124],[122.03061747, 30.65561042],[122.02855754, 30.65553659],[122.01619792, 30.65546275],
 [122.02812838, 30.65693946]];
 var g_Class=["集卡","相机","AGV","桥吊","轨道吊","龙门吊","轮胎吊","球机","枪机"];
 /*
 * JSON 数据转换成GeoJSON数据
  */
 var ConvertToGeoJSON= function convertTogeojson(data,_class){
    var geojsonObject={};
    geojsonObject.type="FeatureCollection";
    var features=[]; 
    for(var i=0;i<data.length;i++){
        var feature={};
        feature.type="Feature";
        var properties={};
        //遍历每一个对象
        var json=data[i];
        for(var key in json){
            if (typeof(json[key])!=='object') {
                properties[key]=json[key];
            }
        }
        properties["class"]=_class||json["Class"];
        feature.properties=properties;
        var geometry={};
        geometry.type="Point";
        geometry.coordinates=[json["Longitude"],json["Latitude"]];
        feature.geometry=geometry;
        features.push(feature);
    }
    geojsonObject.features=features;
    var features= (new ol.format.GeoJSON()).readFeatures(geojsonObject,{dataProjection:'EPSG:4326',featureProjection:'EPSG:3857'});
    var i=0;
    features.forEach(function(feature){
      feature.setId(i);
      feature.setGeometry(new ol.geom.Point(ol.proj.transform(g_Data[i%g_Data.length],'EPSG:4326','EPSG:3857')));
      i++;
    });
    return features;
  };
  /*
  *动态创建侧边栏
   */
  var QueryData=function(data,layer,_class){
      var features=ConvertToGeoJSON(data,_class);
      var source=realTimeLayer.getSource();
      //realTimeLayer.setSource(new ol.source.Vector({features:features}));
      console.log(data);
      source.addFeatures(features);
      //创建一级目录
      var ul_first=$('#tab-query .first');
      var li=$('<li>');
      var a=$('<a>').attr('href','#').text(g_Class[_class]);
      a.click(function(){
               $("#tab-query .content").hide(300);
               // $(this).parents().siblings().children(".second").hide();
               $(this).siblings(".second").toggle(300);
      });
      a.appendTo(li);
      features.forEach(function(feature){
          //创建二级目录
          var ul_second=$("<ul>").addClass('second');
          var li_second=$("<li>");
          var name=feature.get("Name")||g_Class[_class];
          $('<a>').attr("href","##").text(name).hover(function(){
          //隐藏其他的
                $("#tab-query .content").hide();
                 $(this).siblings(".content").toggle();
          }).click(function(){
              OutlineInfo(feature);
          }).appendTo(li_second);
          //显示详细信息
          var content = feature.getProperties();
          var html='';
          Object.keys(content).forEach(function(key){
              if (typeof(feature.get(key))!=="object") {
                html+="<p><b>{0}</b>: {1}</p>".format(key,feature.get(key));
              }
          });
          var div_content=$("<div>").addClass('content').html(html).appendTo(li_second);
          li_second.appendTo(ul_second);
          ul_second.appendTo(li);
          li.prependTo(ul_first);
      });
  };

/*
显示简略信息
 */
var OutlineInfo=function(feature){
    //显示简略信息
    var p = feature.getGeometry().getFirstCoordinate();
    editor.getView().animate({ center:p });
    var popup_content="<div class='content'>";
    var class_;
    if (feature.get('Id')!==null) {
        popup_content+="<p><b>{0}<b> : {1}</p>".format("Id",feature.get("Id"));
    }
    if (feature.get('Name')!==null) {
        popup_content+="<p><b>{0}<b> : {1}</p>".format("Name",feature.get("Name"));
    }
    if (feature.get('Class')!==null) {
        class_=feature.get('Class');
        popup_content+="<p><b>{0}<b> : {1}</p>".format("Class",feature.get("Class"));
    }
      popup_content+="</div>";
      //播放视频
      if (class_==2) {
        try{
          bound.player("1");
        }
        catch(err){
          console.log(err);
        }
      }else{
        var popup=editor.getOverlayById('1');
        popup.show(p,popup_content); 
      }
};

/**/
//桥吊
var bridgeCraneUrl="http://192.168.5.239/api/Data/GetBridgeCrane";
//龙门吊
var gantryCraneUrl="http://192.168.5.239/api/Data/GetTrackCrane";
//轨道吊
var trackCraneUrl="http://192.168.5.239/api/Data/GetTrackCrane";
//车辆
var carsUrl="http://192.168.5.239/api/Data/GetCurrentCars";
//相机信息
var camerasUrl="http://192.168.5.239/api/Data/GetCameras";
//报警信息
var alarmUrl="http://192.168.5.239/api/Data/GetCurrentAlarms";
/*
*异步加载数据
 */
var loadData=function(url,layer){
  $.ajax({
              type:"get",//post
              url:url,
              dataType:"json",
              success: function(data){
                var features= ConvertToGeoJSON(data,"");
                layer.getSource().addFeatures(features);
              },
              error:function(){  
                 console.log('fail');  
              }  
          });
};