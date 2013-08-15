/*
 * grunt-mxmlc
 * https://github.com/JamesMGreene/grunt-mxmlc
 *
 * Copyright (c) 2013 James M. Greene
 * Licensed under the MIT license.
 */

'use strict';

var childProcess = require('child_process');
var mxmlcOptions = require('./lib/options');
var flexSdk = require('flex-sdk');
var async = require('async');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('mxmlc', 'A Grunt task plugin to compile Adobe Flex/ActionScript/MXML/FLV/etc. apps with the `mxmlc` compiler from the Apache/Adobe Flex SDK.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var defaults = mxmlcOptions.getDefaults();
    var options = this.options(defaults);
    var done = this.async();

    var workerFn = function(f, callback) {
      // Concat specified files.
      var srcList = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.error('Source file "' + filepath + '" not found.');
          return false;
        }
        else {
          return true;
        }
      });

      // Handle options.
      // TODO: Start using the real defaults soon-ish
      //var cmdLineOpts = mxmlcOptions.toCommandLineFormat(options);
      // TEMPORARY HACK!
      var cmdLineOpts = options.rawConfig.split(/\s+/g);
      if (f.dest) {
        cmdLineOpts.push('-output');
        cmdLineOpts.push(f.dest);
      }
      cmdLineOpts.push('--');
      cmdLineOpts.push.apply(cmdLineOpts, srcList);


      grunt.verbose.writeln('mxmlc path: ' + flexSdk.bin.mxmlc);
      grunt.verbose.writeln('options: ' + JSON.stringify(cmdLineOpts));

      // Compile!
      childProcess.execFile(flexSdk.bin.mxmlc, cmdLineOpts, function(err, stdout, stderr) {
        // TODO: Probably want to do something more here...? Not positive yet.
        if (!err) {
          grunt.log.writeln('File "' + f.dest + '" created.');
        }
        else {
          grunt.log.error(err.toString());
          grunt.verbose.writeln('stdout: ' + stdout);
          grunt.verbose.writeln('stderr: ' + stderr);

          if (options.force === true) {
            grunt.log.warn('Should have failed but will continue because this task had the `force` option set to `true`.');
          }
          else {
            grunt.fail.warn('FAILED');
          }

        }

        callback(err);
      });
    };

    var maxConcurrency = 1;
    var q = async.queue(workerFn, maxConcurrency);
    q.drain = done;

    // Iterate over all specified file groups.
    q.push(this.files);
  });
};
