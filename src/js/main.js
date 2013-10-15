require.config({
  paths: {
    jquery : '../libs/jquery-2.0.3.min',
    underscore: '../libs/underscore-min',
    backbone: '../libs/backbone-min',
    marionette: '../libs/backbone.marionette.min',
    flot: '../libs/flot/jquery.flot.min',
    axislabels: '../libs/flot/jquery.flot.axislabels',
    leaflet: '../libs/leaflet/leaflet',
    leafletdraw: '../libs/leaflet/leaflet.draw',
    text: '../libs/requirejs/text',
    templates: '../templates'
  },
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      exports: 'Backbone',
      deps: ['jquery','underscore']
    },
    marionette: {
      exports: 'Backbone.Marionette',
      deps: ['backbone']
    },
    flot: {
      deps: ['jquery']
    },
    axislabels: {
      deps: ['flot']
    },
    leaflet: {
      exports: 'L'
    },
    leafletdraw: {
      deps: ['leaflet']
    }
  }
});

require(['marionette', 'flot', 'axislabels', 'leaflet', 'leafletdraw'], function() {
  require(['workout-visualization-app'], function (workoutVisualizationApp) {
    workoutVisualizationApp.start();
  });
});