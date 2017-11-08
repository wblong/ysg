/*
样式符号
*/
var styles;
var editor;
var styleFunction;
var select = new ol.interaction.Select({});
$(function(){
		styles={
		'alarm':new ol.style.Style({
			image:new ol.style.Icon({
				anchor:[0.5,0.5],
				src:'res/alarm.png',
				
			})
		}),
		'car':new ol.style.Style({
			image:new ol.style.Icon({
				anchor:[0.5,0.5],
				src:'res/car.png',
				
			})
		}),
		'camera':new ol.style.Style({
			image:new ol.style.Icon({
				anchor:[0.5,0.5],
				src:'res/camera.png',
				
			})
		}),
		'agv':new ol.style.Style({
			image:new ol.style.Icon({
				anchor:[0.5,0.5],
				src:'res/agv.png',
				
			})
		}),
		'qdiao':new ol.style.Style({
			image:new ol.style.Icon({
				anchor:[0.5,0.5],
				src:'res/qdiao.png',
				
			})
		}),
		'ldiao':new ol.style.Style({
			image:new ol.style.Icon({
				anchor:[0.5,0.5],
				src:'res/ldiao.png',
				
			})
		}),
		'gdiao':new ol.style.Style({
			image:new ol.style.Icon({
				anchor:[0.5,0.5],
				src:'res/gdiao.png',
				
			})
		}),
		'point':new ol.style.Style({
			image:new ol.style.Circle({
				radius:1,
				fill:new ol.style.Fill({
					color:'black'
				}),
				stroke:new ol.style.Stroke({
					color:'white'
				})
			})
		}),
		'route': new ol.style.Style({
		         stroke: new ol.style.Stroke({
		           width: 3, color: [237, 212, 0, 0.8]
		         })
		       }),
       'icon': new ol.style.Style({
         image: new ol.style.Icon({
           anchor: [0.5, 1],
           src: '../res/icon2.png'
         })
       }),
       'pos': new ol.style.Style({
         image: new ol.style.Icon({
           anchor: [0.5, 1],
           src: '../res/pos.png'
         })
       }),
       'geoMarker': new ol.style.Style({
         image: new ol.style.Circle({
           radius: 4,
           snapToPixel: false,
           fill: new ol.style.Fill({color: 'black'}),
           stroke: new ol.style.Stroke({
             color: 'white', width: 2
           })
         })
         })
	};
	
});
