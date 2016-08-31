'use strict';

var gulp = require('gulp');

var concat     = require('gulp-concat'),
    jshint     = require('gulp-jshint'),
    htmlmin    = require('gulp-htmlmin'),
    sass       = require('gulp-sass'),
    gutil      = require('gulp-util'),
    minifyCSS  = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps');

var browserSync = require('browser-sync').create();

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    },
  })
})

gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss
    .pipe(sass())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('build', ['sass', 'build-js', 'assetCopy', 'html']);

gulp.task('clean', function () {
const exec = require('child_process').exec

exec('rm -rf build/*')

});

gulp.task('html', function() {
  return gulp.src('app/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true, html5: true}))
    .pipe(concat('index.html'))
    .pipe(gulp.dest('dist/'))

});

gulp.task('build-js', function() {
  return gulp.src('app/js/**/*.js')
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


gulp.task('assetCopy', function() {

  return gulp.src('app/assets/**/*') // Gets all binary asset files
  .pipe(browserSync.reload({
    stream: true
  }))
    .pipe(gulp.dest('dist/assets/'))

});

gulp.task('watch', ['browserSync', 'sass'], function (){
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('src/assets/**/*', ['assetCopy']);
  gulp.watch('src/**/*.html',  ['html']);
  gulp.watch('src/js/**/*.js',  ['build-js']);

  gulp.watch("build/**/*.*").on('change',browserSync.reload );
});

gulp.task('default', ['build', 'browserSync', 'watch'])
