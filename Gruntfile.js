/*
 * grunt-mxmlc
 * https://github.com/JamesMGreene/grunt-mxmlc
 *
 * Copyright (c) 2013 James M. Greene
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['test/testData/**/*.swf']
    },

    // Configuration to be run (and then tested).
    mxmlc: {
      options: {
        rawConfig: '+configname=air'
      },
      testCompileSuccess: {
        files: {
          'test/testData/testApp.swf': ['test/testData/testApp.as']
        }
      },
      testCompileFailureDueToSynaxError: {
        options: {
          force: true
        },
        files: {
          'test/testData/errorApp.swf': ['test/testData/errorApp.as']
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('default', ['jshint', 'clean', 'mxmlc', 'nodeunit', 'clean']);

  // By default, lint and run all tests.
  grunt.registerTask('travis', ['jshint', 'clean', 'mxmlc', 'nodeunit', 'clean']);

};
