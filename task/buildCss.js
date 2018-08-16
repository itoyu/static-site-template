const { join } = require('path')
const gulp = require('gulp')
const rename = require('gulp-rename')
const gulpif = require('gulp-if')
const sourcemaps = require('gulp-sourcemaps')
const sass = require('gulp-sass')
const globImporter = require('node-sass-glob-importer')
const autoprefixer = require('gulp-autoprefixer');
const { isProd, destAssetDir } = require('./util')

const sassImporters = [globImporter()]
const autoPrefixerSetting = {
  browsers: ['last 5 versions', 'ie >= 11', 'Android >= 4.4','ios_saf >= 8'],
  cascade: false
}


const buildCss = (...srcArgs) => {
  return gulp
    .src(...srcArgs)
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulpif(!isProd, sourcemaps.init()))
    .pipe(sass({ importer: sassImporters, outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(autoprefixer(autoPrefixerSetting))
    .pipe(gulpif(!isProd, sourcemaps.write('.')))
    .pipe(gulp.dest(join(destAssetDir, 'css')))
}

module.exports = buildCss
