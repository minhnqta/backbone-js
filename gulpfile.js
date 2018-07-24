'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var wrap = require('gulp-wrap');
var clean = require('gulp-clean');
var cache = require('gulp-cache');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var declare = require('gulp-declare');
var minifyCSS = require('gulp-csso');
var handlebars = require('gulp-handlebars');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('views', function(){
  gulp.src('app/**/*.hbs')
    .pipe(handlebars())
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      namespace: 'MyApp.templates',
      noRedeclare: true, // Avoid duplicate declarations
    }))
    .pipe(gulp.dest('_dist/'));
});

gulp.task('html', function(){
  gulp.src('app/**/*.html')
    .pipe(gulp.dest('_dist/'));
});

gulp.task('styles', function () {
  gulp.src('app/styles/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(minifyCSS())
    .pipe(sourcemaps.init())
    .pipe(concat('styles.min.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('_dist'));
});

gulp.task('script', function(){
  return gulp.src('app/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('script.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('_dist'))
});

gulp.task('copy', function() {
  gulp.src('app/index.html')
    .pipe(gulp.dest('_dist'));
});

gulp.task('watch', ['build'], function() {
  gulp.watch('app/**/*.*', ['build']);
});

gulp.task('webserver', function() {
  connect.server({
    livereload: true,
    root: '_dist'
  });
});

gulp.task('clearCache', function() {
  cache.clearAll()
});

gulp.task('clean', function() {
  gulp.src('_dist')
    .pipe(clean({ force: true }));
});

gulp.task('default', ['clean', 'build', 'webserver', 'watch']);

gulp.task('build', ['clearCache', 'copy', 'views', 'html', 'styles', 'script']);
