define(['text!templates/panel-layout.html', 'views/MapView'], function(panelLayoutTemplate, MapView) {
  return Backbone.Marionette.Layout.extend({
    template: _.template(panelLayoutTemplate),    
    modelEvents: {
      'change': 'renderMap'
    },
    onRender: function () {
      this.$el.find('.header').text('Workout Map');
    },
    regions: {
      map: '.panel-body'
    },
    renderMap: function () {
      // Don't set a model for the view since we don't want to call toJSON on the workout model
      this.map.show(new MapView({gpsPath: this.model.gpsPath()}));
    }
  });
});