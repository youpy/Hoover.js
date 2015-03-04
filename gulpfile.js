'use strict';

var gulp = require('gulp'),
    connect = require('gulp-connect'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    paths = {
      watch: [
        'build/**/*.js',
        'example/**/*.js',
        'example/**/*.css',
        'example/**/*.html',
        '!**/.#*'
      ],
      build: ['lib/**/*.js', './index.js'],
      root: ['example', 'build']
    };

gulp.task('connect', function() {
  connect.server({
    root: paths.root,
    livereload: true
  });
});

gulp.task('watch', function() {
  gulp.watch(paths.watch, ['reload']);
  gulp.watch(paths.build, ['build']);
});

gulp.task('build', function() {
  gulp.src('index.js')
    .pipe(browserify())
    .pipe(uglify())
    .pipe(concat('hoover.min.js'))
    .pipe(gulp.dest('./build/js'));
});

gulp.task('reload', function() {
  gulp.src('')
    .pipe(connect.reload());
});

gulp.task('default', ['connect', 'watch']);
