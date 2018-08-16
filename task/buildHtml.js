const { join, parse, relative, normalize } = require('path')
const gulp = require('gulp')
const pug = require('gulp-pug')
const fs = require('fs')
const data = require('gulp-data')
const path = require('path')
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
const { isProd, destDir } = require('./util')

const locals = {
  'site': JSON.parse(fs.readFileSync('src/data/data.json'))
}
const renderHtml = (...srcArgs) => {
  return gulp
    .src(...srcArgs)
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(data(function(file) {
      locals.relativePath = path.relative(file.base, file.path.replace(/.pug$/, '.html'));
        return locals;
    }))
    .pipe(pug({
      locals: locals,
      basedir: '../src',
      pretty: true
    }))
    .pipe(gulp.dest(destDir))
}

module.exports = renderHtml
