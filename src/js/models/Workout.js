define(function () {
  return Backbone.Model.extend({
    url: 'http://www.trainingpeaks.com/TPWebServices/REST/PublicWorkouts/Workout/X5PX7HY5N5Y4W5XA7DDRPTKELA',         
    sync: function(method, model, options) {
      // Override to force JSONP request
      var that = this;
      var params = _.extend({
          type: 'GET',
          dataType: 'jsonp',
          url: that.url,
          processData: false
      }, options);

      return $.ajax(params);
    },    
    samples: function () {
      return this.get('FlatSamples').Samples;
    },   
    bestAveragePowerForDuration: function (minutes) {
      // Keep a sliding total of power outputs for the number of minutes we are looking for.
      // Recalculate the average as each new second from the sample stream is added. Set the max average if the current average is the highest. 
      var secondOffset,
          sumPower = 0, 
          averagePower = 0, 
          maxAverage = 0,
          samples = this.samples(),
          durationSeconds = minutes * 60;
      
      _.each(samples, function (sample, sampleIndex) {
        secondOffset = sampleIndex + 1;
        sumPower += sample.Power;
        if (secondOffset >= durationSeconds) {
          averagePower = sumPower / durationSeconds;
          if (averagePower > maxAverage) {
            maxAverage = averagePower;
          }
          
          sumPower -= samples[secondOffset - durationSeconds].Power;
        }
      });
      
      return maxAverage;
    },    
    dataSeries: function () {
      // Covert the data values from each sample into a time indexed series of data points 
      var dataSeries = {
            Cadence: [],
            Distance: [],
            Elevation: [],
            HeartRate: [],
            Power: [],
            Speed: [],
            Temperature: []
          };
          
      _.each(this.samples(), function (sample) {
        _.each(dataSeries, function (series, seriesName) {
          series.push([sample.MillisecondsOffset / 1000, sample[seriesName]]);
        });
      });
      
      return dataSeries;
    },    
    gpsPath: function () {
      // Convert the latitude and longitude values from each sample into an array of points
      var gpsPath = [];
      
      _.each(this.samples(), function (sample) {
        if (typeof sample.Latitude === 'number' && typeof sample.Longitude === 'number') {
          gpsPath.push([sample.Latitude, sample.Longitude]);
        }
      });
      
      return gpsPath;
    }
  });
});