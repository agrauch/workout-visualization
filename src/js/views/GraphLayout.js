define(['text!templates/panel-layout.html', 'views/GraphView'], function(panelLayoutTemplate, GraphView) {
  return Backbone.Marionette.Layout.extend({
    template: _.template(panelLayoutTemplate),    
    modelEvents: {
      'change': 'renderGraph'
    },
    onRender: function () {
      this.$el.find('.header').text('Workout Data');
    },
    regions: {
      graph: '.panel-body'
    },
    renderGraph: function () {
      // Don't set a model for the view since we don't want to call toJSON on the workout model
      this.graph.show(new GraphView({dataSeries: this.model.dataSeries()}));
    }
  });
});