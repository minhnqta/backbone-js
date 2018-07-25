/* jshint strict: false */
/* globals require, console */
var gulp = require('gulp');
var exit = require('gulp-exit');
var connect = require('gulp-connect');

var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var hbsfy = require('hbsfy');

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

var sass = require('gulp-sass');
var minifyCSS = require('gulp-csso');
var cache = require('gulp-cache');

function compile(watch) {
    var bundler = watchify(
      browserify('./app/index.js', { debug: true })
      .transform(hbsfy)
      .transform(babelify, {
        // Use all of the ES2015 spec
        presets: ["es2015"],
        sourceMaps: true
      })
    );

    function rebundle() {
      return bundler
        .bundle()
        .on('error', function (err) {
            console.error(111, err);
            this.emit('end');
        })
        .pipe(source('script.js'))
        .pipe(buffer())
        .pipe(rename('script.min.js'))
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('_dist'));
    }

    if (watch) {
      bundler.on('update', function () {
          console.log('-> bundling...');
          rebundle();
      });

      rebundle();
    } else {
      rebundle().pipe(exit());
    }
}

gulp.task('babel', function () {
  return compile(true);
});

gulp.task('styles', function () {
  gulp.src('app/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(rename('styles.min.css'))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(minifyCSS())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('_dist'));
});

gulp.task('index', function() {
  gulp.src('app/index.html')
    .pipe(gulp.dest('_dist'));
});

gulp.task('clearCache', function() {
  return cache.clearAll();
});

gulp.task('connect', function() {
  connect.server({
    port: 8709,
    root: '_dist',
    livereload: true
  });
});

gulp.task('build', gulp.parallel(['index', 'styles', 'babel']));

gulp.task('watch', gulp.series(['build']), function() {
  gulp.watch('app/**/*.*', ['build']);
});

gulp.task('default',
  gulp.parallel([
    'clearCache',
    'connect',
    'watch'
  ])
);
