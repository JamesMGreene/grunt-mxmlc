// nodeunit-based Functionality Tests

'use strict';

var fs = require('fs');
var path = require('path');

fs.existsSync = fs.existsSync || path.existsSync;


module.exports = {
  testCompileSuccess: function(test) {
    test.expect(2);

    var targetSource = path.join(__dirname, 'testData', 'testApp.as');
    var targetBinary = path.join(__dirname, 'testData', 'testApp.swf');

    test.strictEqual(fs.existsSync(targetSource), true, 'input source file should exist');
    test.strictEqual(fs.existsSync(targetBinary), true, 'compiled output binary should exist');

    test.done();
  },
  testCompileFailureDueToSynaxError: function(test) {
    test.expect(2);

    var targetSource = path.join(__dirname, 'testData', 'errorApp.as');
    var targetBinary = path.join(__dirname, 'testData', 'errorApp.swf');

    test.strictEqual(fs.existsSync(targetSource), true, 'input source file should exist');
    test.strictEqual(fs.existsSync(targetBinary), false, 'compiled output binary should NOT exist');

    test.done();
  },
};
