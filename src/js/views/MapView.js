define(['text!templates/placeholder.html'], function(placeholderTemplate) {
  function constructMap (mapElement) {
    var map = L.map(mapElement);
      
    L.tileLayer('http://{s}.tile.cloudmade.com/139797865f1042d3affabfa714e81936/997/256/{z}/{x}/{y}.png', {
      maxZoom: 18
    }).addTo(map);
    
    return map;
  }
  
  function constructDrawControls(featureGroup) {
    return new L.Control.Draw({
      draw: {
        polyline: false,
        polygon: false,
        circle: false,
        marker: false
      },
      edit: {
        featureGroup: featureGroup
      }
    });
  }
  
  function findIntersectingPath(gpsPoints, layerBounds) {
    // get points on the gps path that intersect this layer
    var intersectingPoints = _.filter(gpsPoints, function (point) {
      return layerBounds.contains(point);
    });
    
    // if we have an intersection, return a new path with bold weight
    if (_.some(intersectingPoints)) {
      return L.polyline(intersectingPoints, {
        color: 'black',
        weight: 8
      });
    }
  }
  
  function drawCreatedEventHandler(map, gpsPath, drawnItems) {
    return function (e) {
      var layer = e.layer,
          intersectingPath = findIntersectingPath(gpsPath.getLatLngs(),layer.getBounds());
      
      // if we have an intersection, add the intersecting path
      if (intersectingPath) {
        map.addLayer(intersectingPath);
      }
      
      // remove the intersecting path when the corresponding layer is removed
      layer.on('remove', function () {
        layer.off('remove');
        
        if (intersectingPath) {
          map.removeLayer(intersectingPath);
        }
      });
      
      drawnItems.addLayer(layer);
    };
  }
  
  return Backbone.Marionette.ItemView.extend({
    template: _.template(placeholderTemplate),
    onShow: function () {
      var mapElement = this.$el.find('.placeholder'),
          drawnItems = new L.FeatureGroup(),
          gpsPath = L.polyline(this.options.gpsPath, {
            color: 'black', 
            weight: 3
          }),
          map = constructMap(_.first(mapElement))
                .addLayer(drawnItems)
                .addControl(constructDrawControls(drawnItems));      
                
      map.on('draw:created', drawCreatedEventHandler(map, gpsPath, drawnItems));
      gpsPath.addTo(map);
      map.fitBounds(gpsPath.getBounds());
    }
  });
});