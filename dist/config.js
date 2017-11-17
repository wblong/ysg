/*
GIS服务
 */
var MapServerIP="http://192.168.5.239:8080/geoserver/";
/*
WebAPI Data
 */
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
MQ
 */
var websocket="ws://192.168.5.203:15674/ws";
var MQ="http://192.168.5.203:15674/stomp";
var MQ_user='trkj';
var MQ_passwd='trkj';
/*
测试数据
 */
//     new ol.layer.Tile({
	        // 		visible: false,
	        // 		name:'ysg-tile',
	        // 		source: new ol.source.TileWMS({
	        //   			url: 'http://localhost:8080/geoserver/ysg/wms',
			      //     params: {'FORMAT': 'image/png', 
			      //              'VERSION': '1.1.1',
			      //              tiled: true,
			      //           STYLES: '',
			      //           LAYERS: 'ysg:jizhuangxiang',
			      //        tilesOrigin: 13582132.823772825 + "," + 3587341.8755370886
			      //     }
			      //   })
			      // }),
			//  new ol.layer.Image({
   //          	name:'洋山港-集装箱',
			// 	source: new ol.source.ImageWMS({
			// 		url: MapServerIP+'ysg/wms',
			// 		params: {'LAYERS': 'ysg:jizhuangxiang','VERSION':'1.1.0'},
			// 		serverType: 'geoserver',
   //       	 })
			// }),