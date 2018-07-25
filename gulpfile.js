'use strict';

var gulp = require('gulp');
var hbsfy = require('hbsfy');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-csso');
var clean = require('gulp-clean');
var cache = require('gulp-cache');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var browserify = require('gulp-browserify');

gulp.task('styles', function () {
  gulp.src('app/**/*.scss')
    .pipe(minifyCSS())
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('_dist'));
});

gulp.task('script', function(){
  gulp.src('app/index.js')
    .pipe(browserify({ transform: 'hbsfy' }))
    .pipe(concat('script.js'))
    .pipe(gulp.dest('_dist'));
});

gulp.task('index', function() {
  gulp.src('app/index.html')
    .pipe(gulp.dest('_dist'));
});

gulp.task('watch', ['build'], function() {
  gulp.watch('app/**/*.*', ['build']);
});

gulp.task('clearCache', function() {
  cache.clearAll();
});

gulp.task('clean', function() {
  gulp.src('_dist')
    .pipe(clean({ force: true }));
});

gulp.task('webserver', function() {
  connect.server({
    livereload: true,
    root: '_dist'
  });
});

gulp.task('default', ['clean', 'clearCache', 'webserver', 'watch']);

gulp.task('build', ['index', 'styles', 'script']);
