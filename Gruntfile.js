module.exports = function (grunt) {
  'use strict';

  grunt.loadNpmTasks('grunt-jslint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-sync');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');


// Project Configuration.
grunt.initConfig({
  
  watch: {
    scripts: {
      files: ['src/javascript/**/*.js', 'src/html/**/*.html'],
      tasks: ['jslint', 'qunit', 'devel'],
      options: {
        interrupt: true,
        spawn: false
      }
    }
  },

  qunit: {
    all: ['src/javascript/test/TestRunner.html']
  },

  jslint: {
    all: {
      src: ['src/javascript/**/*.js'],
      directives: {
        // true to allow assignment expressions
        "ass": false,

        // true to allow bitwise operators
        "bitwise": false,

        // true if standard browser globals should be predefined
        "browser": true,

        // true to allow Google Closure idioms
        "closure": false,

        // true to allow "continue" statement
        "continue": false,

        // true if CouchDB globals should be predefined
        "couch": false,

        // true to allow debugger statements
        "debug": false,

        // true if browser globals useful in development should be predefined
        "devel": true,

        // true to allow == and !=
        "eqeq": false,

        // true if ES6 globals should be predefined
        "es6": false,

        // true to allow eval
        "evil": false,

        // true to allow unfiltered "for ... in"
        "forin": false,
        
        "globals": "define",

        // Set a specific tab width
        "indent": 0,

        // The maximum number of warnings reported
        "maxerr": 50,

        // The maximum number of characters in a line
        "maxlen": 0,

        // true to allow uncapitalized constructors
        "newcap": false,

        // true if Node.js globals should be predefined
        "node": false,

        // true to allow dangling underscore in identifiers
        "nomen": true,

        // true to stop on first error
        "passfail": false,

        // true to allow ++ and --
        "plusplus": false,

        // true to allow . and [^...]. in RegExp
        "regexp": false,

        // true if Rhino globals should be predefined
        "rhino": false,

        // true to allow missing `use strict` pragma
        "sloppy": false,

        // true if blocking ('...Sync') methods can be used.
        "stupid": false,

        // true to allow inefficient subscripting
        "sub": false,

        // true to allow TODO comments
        "todo": true,

        // true to allow unused parameters
        "unparam": true,

        // true to allow more than 1 vars in a function
        "vars": false,

        // true to ignore white-space rules
        "white": true,
      }
    }
  },

  requirejs: {
    main: {
      options: {
        baseUrl: "src/javascript",
        include: ['main'],
        optimize: 'none',
        out: 'dist/main.js',
        skipSemiColonInsertion: true,
        findNestedDependencies: true,
        skipModuleInsertion: true,
        onBuildWrite: function(name, path, contents ) {
          contents = contents.replace(/define\((.|\s)*?\{/, '');
          contents = contents.replace(/"use strict";/, '');          
          contents = contents.replace(/return\s*.*;\s*\}\);/, '');     
          contents = contents.replace(/\}\);/, '');
          return contents;
        }
      }
    }
  },

  uglify: {
    main: {
      files: {
        'dist/javascript/main.min.js': ['dist/main.js']
      }
    },
    vendor: {
      files: {
        'dist/vendor/vendor.min.js': ['dist/vendor/vendor.js']
      }
    }
  },

  processhtml: {
    prod: {
      files: {
        'dist/index.html': ['src/html/index.html']
      }
    }
  },

  htmlmin: {                                     
    prod: {                                     
      options: {                                 
        removeComments: true,
        collapseWhitespace: true
      },
      files: {                                  
        'dist/index.html': 'dist/index.html', 
      }
    }
  },

  sync: {
    assets: {
      files: [{cwd: 'assets',  src: ['**'], dest: 'dist/assets'}],
      updateAndDelete: true,
      verbose: true 
    },

    vendor: {
      files: [{cwd: 'vendor', src: ['**'], dest: 'dist/vendor'}],
      updateAndDelete: true,
      verbose: true 
    },

    javascript: {
      files: [{cwd: 'src/javascript', src: ['**'], dest: 'dist/javascript'}],
      updateAndDelete: true,
      verbose: true 
    },
    
    html: {
      files: [{cwd: 'src/html', src: ['**'], dest: 'dist'}],
      updateAndDelete: false,
      verbose: true 
    }
  },
  
  concat: {
    options: {
      separator: '\n',
    },
    vendor: {
      src: [
        'vendor/jquery.js', 
        'vendor/json2.js', 
        'vendor/underscore.js',
        'vendor/backbone.js',
        'vendor/backbone.wreqr.js',
        'vendor/backbone.babysitter.js',
        'vendor/backbone.marionette.js',
        'vendor/bootstrap.js'],
      dest: 'dist/vendor/vendor.js',
    }
  },

  clean: {
    prod: ["dist/main.js", "dist/vendor/vendor.js"],
    all: ["dist"]
  }
});

  
  grunt.registerTask('prod', ['jslint',
                              'qunit',
                              'clean:all', 
                              'concat:vendor',
                              'uglify:vendor',
                              'requirejs:main', 
                              'uglify:main',
                              'sync:assets',
                              'processhtml:prod', 
                              'htmlmin:prod',
                              'clean:prod']);

  grunt.registerTask('devel', ['sync:html',
                               'sync:javascript', 
                               'sync:vendor',
                               'sync:assets']);
                               
  grunt.registerTask('default', ['devel']);

};
