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
var sourcemaps = require('gulp-sourcemaps');
var runSequence = require('run-sequence');

gulp.task('main', function(){
  return gulp.src('app/index.js')
    .pipe(sourcemaps.init())
      .pipe(browserify({ transform: 'hbsfy' }))
      .pipe(concat('script.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('_dist'));
});

gulp.task('script', function(){
  return gulp.src('app/**/*.js')
    .pipe(sourcemaps.init())
      .pipe(browserify())
      .pipe(concat('script.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('_dist'));
});

gulp.task('styles', function () {
  return gulp.src('app/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(minifyCSS())
    .pipe(concat('styles.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('_dist'));
});

gulp.task('clean', function() {
  return gulp.src('_dist', { read: false })
    .pipe(clean({ force: true }));
});

gulp.task('index', function() {
  return gulp.src('app/index.html')
    .pipe(gulp.dest('_dist'));
});

gulp.task('clearCache', function() {
  cache.clearAll();
});

gulp.task('webserver', function() {
  connect.server({
    livereload: true,
    root: '_dist'
  });
});

gulp.task('watch', function() {
  gulp.watch('app/**/*.*', ['build']);
});

gulp.task('build', ['index', 'styles', 'main']);

gulp.task('default', ['clearCache', 'clean'], function() {
  runSequence('build', 'webserver', 'watch');
});
