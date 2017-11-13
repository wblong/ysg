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
 var Data=[[122.01886410, 30.65775163],[122.01819891, 30.65740092],[122.02577347, 30.65634878],[122.02521557, 30.65570272],
 [122.03576731, 30.65214009],
 [122.02297854, 30.65524124],[122.03061747, 30.65561042],[122.02855754, 30.65553659],[122.01619792, 30.65546275],
 [122.02812838, 30.65693946]];
 var ConvertToGeoJSON= function convertTogeojson(data){
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
        properties["class"]="1";
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
      feature.setGeometry(new ol.geom.Point(ol.proj.transform(Data[i%Data.length],'EPSG:4326','EPSG:3857')));
      i++;
    });
    return features;
  };