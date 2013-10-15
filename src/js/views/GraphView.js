define(['text!templates/placeholder.html'], function(placeholderTemplate) {
  return Backbone.Marionette.ItemView.extend({
    template: _.template(placeholderTemplate),    
    onShow: function () {
      $.plot(this.$el.find('.placeholder'), [
        {label: 'cadence', data: this.options.dataSeries.Cadence},
        {label: 'heart rate', data: this.options.dataSeries.HeartRate},
        {label: 'power', data: this.options.dataSeries.Power},
        {label: 'speed', data: this.options.dataSeries.Speed},
        {label: 'elevation', data: this.options.dataSeries.Elevation}
      ], {
        xaxis: {
          tickSize: 600,
          tickFormatter: function (val) {
            return (val / 60);
          },
          axisLabel: 'Workout Duration (minutes)',
          axisLabelUseCanvas: true
        }
      });
    }
  });
});