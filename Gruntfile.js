module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jasmine: {
      units: {
        src: [],
        options: {
          specs: 'spec/*-spec.js',
          vendor: [
            'src/libs/jquery-2.0.3.min.js',
            'src/libs/underscore-min.js',
            'src/libs/backbone-min.js'
          ],
          template: require('grunt-template-jasmine-requirejs'),
          templateOptions: {
            requireConfig: {
              baseUrl: 'src/js/',
              paths: {
                fixtures: '../../fixtures'
              }
            }
          },
          keepRunner: true
        }
      }
    },
    jshint: {
      all: ['Gruntfile.js', 'src/js/**/*.js', 'spec/**/*.js', 'fixtures/*.js']
    },
    connect: {
      server: {
        options: {
          base: 'src',
          port: 3000,
          keepalive: true
        }
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-connect');
};