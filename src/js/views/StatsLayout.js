define(['text!templates/panel-layout.html', 'views/StatsView'], function(panelLayoutTemplate, StatsView) {
  return Backbone.Marionette.Layout.extend({
    template: _.template(panelLayoutTemplate),    
    modelEvents: {
      'change': 'renderStats'
    },
    regions: {
      stats: '.panel-body'
    },
    onRender: function () {
      this.$el.find('.header').text('Workout Stats');
    },
    renderStats: function () {
      var statsModel = new Backbone.Model({
        bestOneMinutePower: this.model.bestAveragePowerForDuration(1),
        bestFiveMinutePower: this.model.bestAveragePowerForDuration(5),
        bestTenMinutePower: this.model.bestAveragePowerForDuration(10),
        bestTwentyMinutePower: this.model.bestAveragePowerForDuration(20)
      });
      
      this.stats.show(new StatsView({model: statsModel}));
    }
  });
});