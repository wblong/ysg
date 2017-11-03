//样式设置
	var styleFunction=function(feature,resolution){
		var style=null;
		var properties=feature.getProperties();
		if(properties.mag<3.0){
			style=new ol.style.Style({
				image: new ol.style.Circle({
					radius:3,
					fill:new ol.style.Fill({
						color:'rgba(0,255,0,0.5)'
					}),
					stroke:new ol.style.Stroke({
						color:'black',
						size:1
					})
				})
			});
		}else if(properties.mag>=3.0&&properties.mag<5.0){
			style=new ol.style.Style({
				image:new ol.style.Circle({
					radius:5,
					fill:new ol.style.Fill({
						color:'rgba(255,255,0,0.7)',
					}),
					stroke:new ol.style.Stroke({
						color:'black',
						size:1
					})
				})
			});
		}else{
			style=new ol.style.Style({
				image:new ol.style.Circle({
					radius:7,
					fill:new ol.style.Fill({
						color:'rgba(255,0,0,0.7)',
					}),
					stroke:new ol.style.Stroke({
						color:'black',
						size:1
					})
				})
			});
			
		}
		return [style];
	};
//选择
var selectClick=new ol.interaction.Select({
	
});
$(function() {
	//加载图层
	var geo=new ol.layer.Vector({
		source:new ol.source.Vector({
			url:"all_day.geojson",
			format:new ol.format.GeoJSON()
		}),
		style:styleFunction,
		wrapX: false
	});
	
	//加载地图
    var map=new ol.Map({
		target:"map",
		layers:[new ol.layer.Tile({
			source:new ol.source.OSM()
		}),
		geo
		],
		view:new ol.View({
			center:[0,0],
			zoom:2
		})
	});
	//显示信息元素
	var element = document.getElementById('popup');
	var popup = new ol.Overlay({
		element: element,
		positioning: 'bottom-center',//定位
		stopEvent: false,//阻止事件触发
		offset: [0, -10]//偏移值
		});
	map.addOverlay(popup);
	map.addInteraction(selectClick);
	selectClick.on("select",function(event){
			var feature=event.selected[0];
			var coordinates=feature.getGeometry().getCoordinates();
			popup.setPosition(coordinates);
			//bootstrap 悬停框
			$(element).popover({
				'placement':'top',//位置在上面
				'html':true,//插入HTML
				'content':feature.getProperties().title,
				'title':"提示"
			});
			//显示弹出框
			$(element).popover('show');
		
	});
	
});