// based on https://gist.github.com/Fishrock123/8ea81dad3197c2f84366
var gulp = require('gulp');

var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');


var source = require('vinyl-source-stream')
var buffer = require('vinyl-buffer')
var merge = require('utils-merge')

var rename = require('gulp-rename')
var uglify = require('gulp-uglify')
var sourcemaps = require('gulp-sourcemaps')


/* nicer browserify errors */
var gutil = require('gulp-util')
var chalk = require('chalk')

function map_error(err) {
  if (err.fileName) {
    // regular error
    gutil.log(chalk.red(err.name)
      + ': '
      + chalk.yellow(err.fileName.replace(__dirname + '/src/', ''))
      + ': '
      + 'Line '
      + chalk.magenta(err.lineNumber)
      + ' & '
      + 'Column '
      + chalk.magenta(err.columnNumber || err.column)
      + ': '
      + chalk.blue(err.description))
  } else {
    // browserify error..
    gutil.log(chalk.red(err.name)
      + ': '
      + chalk.yellow(err.message))
  }

  this.end()
}

gulp.task('default', function () {
  var args = merge(watchify.args, { debug: true })
  var bundler = watchify(browserify('./src/pom.js', args)).transform(babelify, { /* opts */ })
  bundle_js(bundler)

  bundler.on('update', function () {
    bundle_js(bundler)
  })
})

function bundle_js(bundler) {
  return bundler.bundle()
    .on('error', map_error)
    .pipe(source('pom.js'))
    .pipe(buffer())
    .pipe(gulp.dest('dist'))
    .pipe(rename('pom.min.js'))
    .pipe(sourcemaps.init({ loadMaps: true }))
      // capture sourcemaps from transforms
      .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'))
}

// Without watchify
gulp.task('browserify', function () {
  var bundler = browserify('./src/pom.js', { debug: true }).transform(babelify, {/* options */ })

  return bundle_js(bundler)
})

// Without sourcemaps
gulp.task('browserify-production', function () {
  var bundler = browserify('./src/pom.js').transform(babelify, {/* options */ })

  return bundler.bundle()
    .on('error', map_error)
    .pipe(source('pom.js'))
    .pipe(buffer())
    .pipe(rename('pom.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('pom'))
})
