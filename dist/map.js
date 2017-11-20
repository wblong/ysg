﻿var map;
function mapLoad() {
    map = new ol.Map({
        view: new ol.View({
            center: [0, 0],
            zoom: 1
        }),
        layers: [
          new ol.layer.Tile({
              source: new ol.source.OSM()
          })
        ],
        target: 'MapDiv'
    });
}