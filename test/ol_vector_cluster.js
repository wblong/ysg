$.getJSON(options.url, function(result) {
 

var features=[];
$(result).each(function(i, val) {

geom = new ol.geom.Point(ol.proj.transform([ val.lat, val.lng ], 'EPSG:4326', 'EPSG:3857'));

feature = new ol.Feature(geom);
features.push(feature);

feature.data = val;

});

// 添加到矢量数据源
var vectorSource = new ol.source.Vector({
features : features
});

//添加到聚合数据源，如果不用这个的话，就会得到许多的点
var clusterSource = new ol.source.Cluster({
distance: 40,
source: vectorSource
});

//设定图层数据源
tmpLayer.setSource(null);
tmpLayer.setSource(clusterSource);
tmpLayer.setStyle(createStyle);

that.setLayerVisible(options.id, true);

});