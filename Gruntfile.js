/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    assetsPath: 'assets/',
    distPath: '_me/assets/',
    componentPath: 'bower_components/',
    
    less: {
      me: {
        options: {
          paths: ['<%= lessPath %>'],
          cleancss: true
        },
        files: {
          '<%= distPath %>css/me.min.css': ['<%= assetsPath %>less/me.less'],
          '<%= distPath %>css/font-awesome.min.css': ['<%= componentPath %>fontawesome/less/font-awesome.less']
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
          '<%= bowerPath %>mustache/mustache.min.js',
          '<%= bowerPath %>bootstrap/dist/js/bootstrap.min.js',
          '<%= bowerPath %>jquery.appear.js/jquery.appear.js',
          '<%= bowerPath %>jquery.easing/js/jquery.easing.min.js',
          '<%= assetsPath %>js/core/respond.js',
          '<%= assetsPath %>js/core/animate.js',
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
              '<%= assetsPath %>fonts/**', 
              '<%= assetsPath %>images/**', 
              '<%= assetsPath %>js/libs/**'
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
            dest: '<%= distPath %>/fonts/fontawesome/'
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
        files: ['<%= lessPath %>**/*.less'],
        tasks: ['less']
      },
      scripts: {
        files: ['<%= jsPath %>**/*.js'],
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