//加载JSON数据
    mainxiu.loaddata=function(options)
    {
        var that=this;
        var styleCache = {};
        var colors=['rgba(0, 153, 102, 0.99)',
        'rgba(255, 222, 51, 0.99)',
        'rgba(255, 153, 51, 0.99)',
        'rgba(204, 0, 51, 0.99)',
        'rgba(102, 0, 51, 0.99)',
        'rgba(126, 0, 35, 0.99)'];
        var createStyle = function(feature, resolution) {

            var colorkey=0;
            var reskey=2;

            var dataval= parseFloat(feature.data.aqi);
            if(dataval>=0 && dataval<=50)
            {
                colorkey=0;
            }else if(dataval>50 && dataval<=100)
            {
                colorkey=1;
            }
            else if(dataval>100 && dataval<=150)
            {
                colorkey=2;
            }
            else if(dataval>150 && dataval<=200 )
            {
                colorkey=3;
            }
             else if(dataval>200 && dataval<=300 )
            {
                colorkey=4;
            }
            else
            {
                colorkey=5;
            }

            if(resolution<4)
            {
                reskey=16;
            }else  if(resolution<19)
            {
                 reskey=12;
            }
           else  if(resolution<76)
            {
                 reskey=8;
            }
            else  if(resolution<305)
            {
                 reskey=6;
            }
            else
            {
               reskey=3;
            }
           var style = styleCache[colorkey+"-"+reskey];
            if (!style) {

              style = [new ol.style.Style({
                image: new ol.style.Circle({
                  radius: reskey,
                  fill: new ol.style.Fill({
                    color: colors[colorkey],
                  })
                })

              })];
              styleCache[colorkey+"-"+reskey]=style;
            }

            return style;
        };

        $.getJSON(options.url, function(result) {

            var tmpLayer = that.getLayerById(options.id);

            if (tmpLayer == null)
            {
                tmpLayer = new ol.layer.Image({
                    id: options.id,
                    opacity: 0.95,
                    maxzoom: 1224,
                    minzoom: 0.0001
                });
                that.olmap.addLayer(tmpLayer);
            }

            var features=[];
        $(result).each(function(i, val) {

        geom = new ol.geom.Point(ol.proj.transform([ parseFloat(val.g[1]), parseFloat(val.g[0]) ], 'EPSG:4326', 'EPSG:3857'));

        feature = new ol.Feature(geom);
        features.push(feature);

        feature.data = val;

        });

        // Source and vector layer
        var vectorSource = new ol.source.Vector({
        features : features
        });

            var vimage= new ol.source.ImageVector({
                source:vectorSource,
            });
         

            vimage.setStyle(createStyle);

            tmpLayer.setSource(null);
            tmpLayer.setSource(vimage);

            that.setLayerVisible(options.id, true);

        });
    };