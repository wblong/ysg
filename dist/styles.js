/*
样式符号
*/
var editor;
var select = new ol.interaction.Select({});
//样式函数
var styleFunction=function(feature,resolution){
			var zoom=editor.getView().getZoom();
			var style=null;
			var class_=feature.get('class');
			if(class_==="1"||class_===1){
				
				style=styles['car'];
			}
			else if(class_==="2"||class_===2){
				style=styles['camera'];
			}
			else if (class_==="3"||class_===3) {
				style=styles['agv'];
			}
			else if (class_==="4"||class_===4) {
				style=styles['qdiao'];
			}
			else if (class_==="5"||class_===5) {
				style=styles['gdiao'];
			}
			else if (class_==="6"||class_===6) {
				style=styles['ldiao'];
			}
			else if (class_==="7"||class_===7) {
				style=styles['alarm'];
			}
			else if (class_==="8"||class_===8) {
				style=styles['pos'];
			}
			else{
				style=styles['geoMarker'];
			}
			if (zoom===12) {
				return [styles['point']];
			}
			else{
				style.getImage().setScale(zoom/25);
				return [style];
			}
			
		};

//样式json对象
var styles={
		'alarm':new ol.style.Style({
			image:new ol.style.Icon({
				anchor:[0.5,0.5],
				src:'../res/alarm.png',
				
			})
		}),
		'car':new ol.style.Style({
			image:new ol.style.Icon({
				anchor:[0.5,0.5],
				src:'../res/car.png',
				
			})
		}),
		'camera':new ol.style.Style({
			image:new ol.style.Icon({
				anchor:[0.5,0.5],
				src:'../res/camera.png',
				
			})
		}),
		'agv':new ol.style.Style({
			image:new ol.style.Icon({
				anchor:[0.5,0.5],
				src:'../res/agv.png',
				
			})
		}),
		'qdiao':new ol.style.Style({
			image:new ol.style.Icon({
				anchor:[0.5,0.5],
				src:'../res/qdiao.png',
				
			})
		}),
		'ldiao':new ol.style.Style({
			image:new ol.style.Icon({
				anchor:[0.5,0.5],
				src:'../res/ldiao.png',
				
			})
		}),
		'gdiao':new ol.style.Style({
			image:new ol.style.Icon({
				anchor:[0.5,0.5],
				src:'../res/gdiao.png',
				
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
           radius: 10,
           snapToPixel: false,
           fill: new ol.style.Fill({color: 'black'}),
           stroke: new ol.style.Stroke({
             color: 'white', width: 2
           })
         })
         })
	};
