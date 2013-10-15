define(function () {
  function generateSamples() {
    var seconds,
        samples = [];
    
    for (seconds = 1; seconds <= 3600; seconds++) {
      samples.push({
        'Cadence': '',
        'Distance': '',
        'Elevation': '',
        'HeartRate': '',
        'Latitude': 1,
        'Longitude': 1,
        'MillisecondsOffset': seconds * 1000,
        'Power': 100 + Math.ceil(seconds / 60),
        'Speed': '',
        'Temperature': ''
      });
    }
    return samples;
  }
  
  return {
    'FlatSamples': {
      'Samples': generateSamples()
    }
  };  
});
