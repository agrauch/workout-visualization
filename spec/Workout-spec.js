define(['models/Workout', 'fixtures/workout-fixture'], function (Workout, workoutFixture) {
  describe('workout model', function () {
    var workout = new Workout(),
        sampleLength = 3600;
    workout.set(workoutFixture);
    
    it('should provide direct access to samples', function () {
      expect(workout.samples().length).toBe(sampleLength);
    });
    
    describe('best average power', function () {
      it('should calculate the best average 1 minute power', function () {
        expect(workout.bestAveragePowerForDuration(1)).toBe(160);
      });
      
      it('should calculate the best average 5 minute power', function () {
        expect(workout.bestAveragePowerForDuration(5)).toBe(158);
      });
    });
    
    describe('data series', function () {
      var dataSeries = workout.dataSeries();
      
      it('should generate a cadence data series with each cadence value', function () {
        expect(dataSeries.Cadence.length).toBe(sampleLength);
      });
      
      it('should generate a distance data series with each distance value', function () {
        expect(dataSeries.HeartRate.length).toBe(sampleLength);
      });
      
      it('should generate a elevation data series with each elevation value', function () {
        expect(dataSeries.Elevation.length).toBe(sampleLength);
      });
      
      it('should generate a heart rate data series with each heart rate value', function () {
        expect(dataSeries.HeartRate.length).toBe(sampleLength);
      });
      
      it('should generate a power data series with each power value', function () {
        expect(dataSeries.Power.length).toBe(sampleLength);
      });
      
      it('should generate a speed data series with each speed value', function () {
        expect(dataSeries.Speed.length).toBe(sampleLength);
      });
      
      it('should generate a temperature data series with each temperature value', function () {
        expect(dataSeries.Temperature.length).toBe(sampleLength);
      });
      
      it('should generate a two element array for each item in series with seconds in the first position', function () {
        var first = _.first(dataSeries.Temperature);
        expect(first.length).toBe(2);
        expect(_.first(first)).toBe(1);
      });
    });
    
    describe('gps path', function () {
      var gpsPath = workout.gpsPath();
      
      it('should generate a gps path with each latitude/longitude pair', function () {
        expect(gpsPath.length).toBe(sampleLength);
      });
      
      it('should generate a two element array for each item in gps path', function () {
        expect(_.first(gpsPath).length).toBe(2);
      });
    });
  });
});