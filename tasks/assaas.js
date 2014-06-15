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
};
