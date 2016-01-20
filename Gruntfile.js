/*global module:false*/
module.exports = function(grunt) {
  // Load all tasks
  //require('load-grunt-tasks')(grunt);
  // Show elapsed time
  //require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({
    assetsPath: 'assets/',
    distPath: 'assets/',
    componentPath: 'bower_components/',
    
    less: {
      me: {
        options: {
          //paths: ['<%= lessPath %>'],
          cleancss: true
        },
        files: {
          '<%= distPath %>css/me.min.css': ['<%= assetsPath %>less/me.less'],
          '<%= distPath %>css/font-awesome.min.css': ['<%= assetsPath %>less/core/_fontawesome.less']
        }
      }
    },
    
    uglify: {
      options: {
        mangle: false,
        preserveComments: false,  
        banner: '/*This is a personal project for "me". Copyright 2016 Ben Korody <me@benkorody.com>*/'
      },
      me: {
        files: {
          '<%= distPath %>js/me.min.js': [
            //'<%= bowerPath %>angular/angular.min.js',
            //'<%= bowerPath %>mustache/mustache.min.js',
            //'<%= bowerPath %>bootstrap/dist/js/bootstrap.min.js',
            //'<%= bowerPath %>jquery.appear.js/jquery.appear.js',
            //'<%= bowerPath %>jquery.easing/js/jquery.easing.min.js',
            '<%= assetsPath %>js/core/respond.js',
            '<%= assetsPath %>js/core/animate.js',
            '<%= assetsPath %>js/lib/impress.js',
            '<%= assetsPath %>js/me.js'
          ],
          
        }
      }
    },
    
    copy: {
      me: {
        files: [
          {
            flatten: true, 
            src: [
              '<%= assetsPath %>font/**', 
              '<%= assetsPath %>img/**', 
              '<%= assetsPath %>js/lib/**',
              '<%= assetsPath %>download/**'
            ], 
            dest: '_me/'
          },
          {
            flatten: true,
            expand: true,
            //cwd: '<%= componentPath %>',
            src: [
              '<%= componentPath %>fontawesome/fonts/*', 
            ],
            dest: '<%= distPath %>font/fontawesome/'
          },
          {
            flatten: true,
            expand: true,
            src: [
              '<%= componentPath %>jquery/jquery.min.js', 
              '<%= componentPath %>jquery/jquery.min.map', 
            ],
            dest: '<%= distPath %>/js/lib/'
          }
        ],
      },
    },

    watch: {
      options: {
        //spawn: true,
        //livereload: true,
      },
      css: {
        files: ['<%= assetsPath %>**/*.less'],
        tasks: ['less']
      },
      scripts: {
        files: ['<%= assetsPath %>**/*.js'],
        tasks: ['uglify'],
      },
    }
      
  });

  // 
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task.
  grunt.registerTask('default', ['less', 'uglify', 'copy']);

};