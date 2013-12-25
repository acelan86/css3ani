'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    sass: {
      dist : {
        files: [
          {expand: true, cwd: 'src/css/', ext: '.css', dest: 'release/css/', src: ['**/*.scss']}
        ]
      }
    },
    imagemin: {                          // Task
      dist: {                            // Target
        options: {                       // Target options
          optimizationLevel: 3
        },
        files: [
          {expand: true, cwd: 'release/img/', dest: 'release/img/', src: ['**/*.png']}
        ]
      }
    },
    watch: {
      script : {
        files: 'src/**/*',
        tasks: ['sass']
      }
    },
    connect: {
      server: {
        options: {
          port: 1234
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // Default task.
  grunt.registerTask('default', ['sass', 'imagemin', 'connect', 'watch']);
  grunt.registerTask('nouglify', ['sass', 'imagemin', 'connect', 'watch']);
  grunt.registerTask('nowatch', ['sass', 'imagemin', 'connect', 'uglify']);

};
