/*
 * grunt-assaas
 * hazan.me
 *
 * Copyright (c) 2014 Jon Hazan
 * Licensed under the MIT license.
 */

'use strict';
var rest = require('restler');
var fs = require('fs');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('assaas', 'Grunt plugin to take advantage of the ASSAAS Direct Conversion API to remove the need to have SASS installed on the local machine', function() {
    
    var done = this.async();
    
    this.files.forEach(function(f){
      
      var filepath = f.src[0];
      var dest = f.dest;
      
      if (!grunt.file.exists(filepath)) {
        grunt.fail.warn('Source file "' + filepath + '" not found.');
        return false;
      }
      
      fs.stat(filepath, function(err, stats) {
        if (err) {
          grunt.fail.warn('Error: ' + err);
          done(err);
        } else if (stats.isFile()) {
          var fileSize = stats.size;
          rest.post('http://assaas.hazan.me/convert', {
            multipart: true,
            data: {
              'file': rest.file(filepath, null, fileSize, null, 'text/css')
            }
          }).on('complete', function(data) {
            console.log(dest);
            fs.mkdirSync('tmp');
            fs.writeFile(dest, data, function(err) {
              if(err) {
                grunt.fail.warn('Error: ' + err);
                done(err);
              } else {
                done(data);
              }
            }); 
          });
        }
      });
        
    });
  });
    //this.files.forEach(function(f){});
      /*rest.post('http://assaas.hazan.me/convert', {
        multipart: true,
        data: {
          'file': rest.file(f, null, null, null, 'text/css')
        }
      }).on('complete', function(data) {
        console.log(data);
      });*/
    
    // Merge task-specific and/or target-specific options with these defaults.
    /*var options = this.options({
      punctuation: '.',
      separator: ', '
    });*/
    /*var rest = require('./restler');
    // multipart request sending a 321567 byte long file using https
    this.files.forEach(function(f) {
      rest.post('http://assaas.hazan.me/convert', {
        multipart: true,
        data: {
          'file': rest.file(f, null, null, null, 'text/css')
        }
      }).on('complete', function(data) {
        console.log(data);
      });
    }*/

    // Iterate over all specified file groups.
    /*this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        return grunt.file.read(filepath);
      }).join(grunt.util.normalizelf(options.separator));

      // Handle options.
      src += options.punctuation;

      // Write the destination file.
      grunt.file.write(f.dest, src);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });*/
  //});

};
