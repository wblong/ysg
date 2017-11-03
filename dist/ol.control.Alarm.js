/**
 * @classdesc
 * 
 *
 * @constructor
 * @extends {ol.control.Control}
 * @param {olx.control.ControlOptions} options Control options.
 */
ol.control.Alarm = function (opt_options) {
    
    var options = opt_options || {};
    var _this = this;

    var controlDiv = document.createElement('div');
    controlDiv.className = options.className || 'ol-alarm ol-unselectable ol-control';
    
    var alarmButton = document.createElement('button');
    alarmButton.title = options.tipLabel || '报警信息';
    alarmButton.textContent = options.label || '';

    alarmButton.addEventListener('click', function (evt) {
        var url='http://192.168.5.239/api/Data/GetCurrentAlarms';
        $.ajax({
            type:"get",//post
            url:url,
            dataType:"json",
            success: function(data){

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
                        properties[key]=json[key];
                    }
                    feature.properties=properties;
                    var geometry={};
                    geometry.type="Point";
                    geometry.coordinates=[json["Longitude"],json["Latitude"]];
                    feature.geometry=geometry;
                    features.push(feature);
                  }
                  geojsonObject.features=features;
                  //
                  var vectorSource=new ol.source.Vector({
                        features:(new ol.format.GeoJSON()).readFeatures(geojsonObject,{dataProjection:'EPSG:4326',featureProjection:'EPSG:3857'})
                  });
                  var realTimeLayer=_this.getMap().getLayerManager().getLayer("realTimeLayerID");
                  realTimeLayer.setSource(vectorSource);
                  realTimeLayer.setStyle(styles['alarm']);
            },
            error:function(){  
                 alert('fail');  
            }  
        });

    });

    controlDiv.appendChild(alarmButton);
	
    ol.control.Control.call(this, {
        element: controlDiv,
        target: options.target
    });
};

ol.inherits(ol.control.Alarm, ol.control.Control);