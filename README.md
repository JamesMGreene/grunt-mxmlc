# grunt-mxmlc

> A Grunt task plugin to compile Adobe Flex/ActionScript/MXML/FLV/etc. apps with the `mxmlc` compiler from the Apache/Adobe Flex SDK.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the
[Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to
create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and
use Grunt plugins. Once you're familiar with that process, you may install this
plugin with this command:

```shell
npm install grunt-mxmlc --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-mxmlc');
```

## The "mxmlc" task

### Overview
In your project's Gruntfile, add a section named `mxmlc` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  mxmlc: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.rawConfig
Type: `String`
Default value: `''`

A string value that is used as the raw configuration for the `mxmlc` command line arguments, minus the input and output files.


### Usage Examples

#### Basic AIR Application

```js
grunt.initConfig({
  mxmlc: {
    options: {
      rawConfig: '+configname=air'
    },
    example: {
      files: {
        'dist/example.swf': ['src/example.as']
      }
    }
  }
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
 - 0.1.0: Published to NPM on 2013-08-14.
    - Initial release with only support for `options.rawConfig` until I can dedicate some time to the `options` code.
    - Targeting Adobe Flex SDK v4.6.0 for the time being but will revert back to Adobe Flex SDK v3.0.0 and
      go all the way up once I get the rest of this module (i.e. the `options` code) worked out.


## License
Copyright (c) 2013 James M. Greene  
Licensed under the MIT license.
