define(['models/Workout', 'views/GraphLayout', 'views/StatsLayout', 'views/MapLayout'], function (Workout, GraphLayout, StatsLayout, MapLayout) {
  var app = new Backbone.Marionette.Application(),
      workout = new Workout();
  
  app.addRegions({
    graph: '#workout-graph',
    stats: '#workout-stats',
    map: '#workout-map'
  });
  
  app.addInitializer(function () {
    var viewOptions = {
      model: workout
    };
    
    app.graph.show(new GraphLayout(viewOptions));
    app.stats.show(new StatsLayout(viewOptions));
    app.map.show(new MapLayout(viewOptions));
    
    workout.fetch();
  });
  
  return app;
});