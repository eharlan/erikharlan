'use strict';

var gulp = require('gulp');

var concat     = require('gulp-concat'),
    jshint     = require('gulp-jshint'),
    htmlmin    = require('gulp-htmlmin'),
    sass       = require('gulp-sass'),
    gutil      = require('gulp-util'),
    minifyCSS  = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');

    var browserSync = require('browser-sync').create();

    // Static server
    gulp.task('browserSync', function() {
        browserSync.init({
            server: {
                baseDir: "./dist"
            }
        });
    });


gulp.task('html', function() {
  return gulp.src('app/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true, html5: true}))
    .pipe(concat('index.html'))
    .pipe(gulp.dest('dist/'))

});

gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in scss
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(concat('style.min.css'))
    .pipe(browserSync.reload({
      stream: true
    }))
    .pipe(gulp.dest('dist/css/'))

});

gulp.task('build', ['sass', 'build-js', 'assetCopy', 'html']);

gulp.task('clean', function () {
const exec = require('child_process').exec

exec('rm -rf dist/*')

});

gulp.task('assetCopy', function() {

  return gulp.src('app/assets/**/*') // Gets all binary asset files
  .pipe(browserSync.reload({
    stream: true
  }))
    .pipe(gulp.dest('dist/assets/'))

});

gulp.task('compile-coffeejs', function() {
  gulp.src('app/js/coffee/**/*.coffee')
    .pipe(coffeeify())
    //.pipe(uglify({
      // inSourceMap:
      // outSourceMap: "app.js.map"
  //  }))
    .pipe(gulp.dest('dist/js/coffee.js'))
});


gulp.task('build-js', function() {
  return gulp.src(['app/js/vendor/jquery-3.2.0.js',
  'app/js/vendor/bootstrap.js',
  'app/js/vendor/system.js','app/js/vendor/config-typescript.js','aurelia-core.js','aurelia-routing.js',
  'app/js/!(vendor)/**/*.js'])
    .pipe(sourcemaps.init())
      .pipe(concat('index.js'))
      //only uglify if gulp is ran with '--type production'
      .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
    .pipe(sourcemaps.write())
    .pipe(browserSync.reload({
      stream: true
    }))
    .pipe(gulp.dest('dist/js'));
});


gulp.task('watch', function (){
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/assets/**/*', ['assetCopy']);
  gulp.watch('app/**/*.html',  ['html']);
  gulp.watch('app/js/**/*.js',  ['build-js']);

  gulp.watch("dist/**/*.*").on('change',browserSync.reload );

});

gulp.task('default', ['browserSync', 'build', 'watch']);
