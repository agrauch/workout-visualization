define(['text!templates/stats.html'], function(statsTemplate) {
  return Backbone.Marionette.ItemView.extend({
    template: _.template(statsTemplate)
  });
});