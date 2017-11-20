var PhotoFeatureList = [];//相机要素数据集
        var PhotoSource = new ol.source.Vector({ features: PhotoFeatureList });
        var PhotoClusterSource = new ol.source.Cluster({
            distance: 40,
            source: PhotoSource
        });
        var PhotoVector = new ol.layer.Vector({
            source: PhotoClusterSource,
            style: function (feature) {
                var PhotoStyleCache = {};
                var size;
                if (flag) {
                    size = 1;
                }
                else {
                    size = feature.get('features').length;

                }
                var style = PhotoStyleCache[size];
                if (!style) {
                    style = new ol.style.Style({
                        image: new ol.style.Icon({
                            src: "../images/photo_16.png"
                        }),
                        text: new ol.style.Text({
                            text: size.toString(),
                            fill: new ol.style.Fill({
                                color: '#fff'
                            })
                        })
                    });
                    PhotoStyleCache[size] = style;
                }
                return style;
            }

        });