'use strict';

var gulp = require('gulp'),
    connect = require('gulp-connect'),
    paths = {
      root: ['example', 'build']
    };

gulp.task('connect', function() {
  connect.server({
    root: paths.root
  });
});
