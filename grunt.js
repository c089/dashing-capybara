module.exports = function(grunt) {
  grunt.initConfig({
    concat: {
      dist: {
        src: ['node_modules/faye/browser/faye-browser-min.js', 'lib/client/index.js'],
        dest: 'public/javascripts/client.js'
      }
    },
    lint: {
      src: ['app.js'],
    }
  });
  grunt.registerTask('default', 'lint concat');
};
