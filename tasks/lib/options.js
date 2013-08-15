/*
 * grunt-mxmlc
 * https://github.com/JamesMGreene/grunt-mxmlc
 *
 * Copyright (c) 2013 James M. Greene
 * Licensed under the MIT license.
 */

'use strict';

function optionToString(optionKey, optionValue) {
  var optionStr;
  if (optionKey && (optionValue != null)) {
    switch (typeof optionValue) {
      case 'boolean':
      case 'number':
      case 'string':
        optionStr = optionKey + '=' + optionValue;
        break;
        
      default:
        optionStr = '';
        break;
    }
  }
  return optionStr;
}

var api = {

  getDefaults: function() {
    return {

      // Use the `rawConfig` string to ignore all other `options`
      rawConfig: null,
    
      // http://livedocs.adobe.com/flex/3/html/help.html?content=compilers_16.html
      metadata: {
        // `-title "Adobe Flex Application"`
        title: 'Adobe Flex Application',
        // `-description "http://www.adobe.com/flex"`
        description: 'http://www.adobe.com/flex',
        // `-publisher "The Publisher"`
        publisher: 'unknown',
        // `-creator "The Author"`
        creator: 'unknown',
        // `-language=EN`
        // `-language+=klingon`
        language: 'EN',
        // `-localized-title "The Color" en-us -localized-title "The Colour" en-ca`
        localizedTitle: null,
        // `-localized-description "Standardized Color" en-us -localized-description "Standardised Colour" en-ca`
        localizedDescription: null,
        // `-contributor "Contributor #1" -contributor "Contributor #2"`
        contributor: null,
        // `-date "Mar 10, 2013"`
        date: null
      },

      // http://livedocs.adobe.com/flex/3/html/help.html?content=compilers_18.html
      application: {
        // `-default-size 240 240`
        layoutSize: {
          width: null,
          height: null
        },
        // `-default-frame-rate=24`
        frameRate: 24,
        // `-default-background-color=0x869CA7`
        backgroundColor: null,
        // `-default-script-limits 1000 60`
        scriptLimits: {
          maxRecursionDepth: 1000,
          maxExecutionTime: 60
        }
      },

      // http://livedocs.adobe.com/flex/3/html/help.html?content=compilers_19.html
      // `-library-path+=libraryPath1 -library-path+=libraryPath2`
      libraries: [],

      // http://livedocs.adobe.com/flex/3/html/help.html?content=compilers_14.html
      // http://livedocs.adobe.com/flex/3/html/help.html?content=compilers_17.html
      // http://livedocs.adobe.com/flex/3/html/help.html?content=compilers_20.html
      // http://livedocs.adobe.com/flex/3/html/help.html?content=compilers_21.html
      compiler: {
        // `-accessible=false`
        'accessible': false,
        // `-actionscript-file-encoding=UTF-8`
        'actionscriptFileEncoding': null,
        // `-allow-source-path-overlap=false`
        'allowSourcePathOverlap': false,
        // `-as3=true`
        'as3': true,
        // `-benchmark=true`
        'benchmark': true,
        // `-context-root context-path`
        'contextRoot': null,
        // `-debug=false`
        'debug': false,
        // `-defaults-css-files filePath1 ...`
        'defaultsCssFiles': [],
        // `-defaults-css-url http://example.com/main.css`
        'defaultsCssUrl': null,
        // `-define=CONFIG::debugging,true -define=CONFIG::release,false`
        // `-define+=CONFIG::bool2,false -define+=CONFIG::and1,"CONFIG::bool2 && false"
        // `-define+=NAMES::Company,"'Adobe Systems'"`
        'defines': {},
        // `-es=true -as3=false`
        'es': false,
        // `-externs className1 ...`
        'externs': [],
        // `-external-library-path+=pathElement`
        'externalLibraries': [],
        'fonts': {
          // `-fonts.advanced-anti-aliasing=false`
          advancedAntiAliasing: false,
          // `-fonts.languages.language-range "Alpha and Plus" "U+0041-U+007F,U+002B"`
          // USAGE:
          // ```
          // languages: [{
          //   lang: 'Alpha and Plus',
          //   range: ['U+0041-U+007F', 'U+002B']
          // }]
          // ```
          languages: [],
          // `-fonts.local-fonts-snapsnot filePath`
          localFontsSnapshot: null,
          // `-fonts.managers flash.fonts.JREFontManager flash.fonts.BatikFontManager flash.fonts.AFEFontManager`
          // NOTE: FontManager preference is in REVERSE order (prefers LAST array item).
          //       For more info, see http://livedocs.adobe.com/flex/3/html/help.html?content=fonts_06.html
          managers: [],
        },
        
        // TODO: CONTINUE!
        
        
        // `-incremental=false`
        'incremental': false,
        
        // TODO: CONTINUE!
      }
    };
  },
  
  toCommandLineFormat: function(options) {
    var optionStr,
        optionsList = [];
    if (options) {
      Object.keys(options).forEach(function(key) {
        optionStr = optionToString(key, options[key]);
        if (optionStr) {
          optionsList.push(optionStr);
        }
      });
    }
    return optionsList.join(' ') + ' -- ';
  }
  
};

module.exports = api;