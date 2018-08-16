const gulp = require('gulp')
const babel = require('gulp-babel')
const register = require('babel-register')
const { join } = require('path')
const { create: createbrowserSync } = require('browser-sync')
const {
  createRenderMiddleware,
  build: buildFiles,
} = require('real-world-website-render-helper')
const webpack = require('webpack')
const del = require('del')
const bs = createbrowserSync()

const buildCss = require('./task/buildCss')
const buildHtml = require('./task/buildHtml')
const webpackConfig = require('./webpack.config')

const {
  isProd,
  basePath,
  destDir,
  destBaseDir,
  toPosixPath,
} = require('./task/util')

const renderHelperConfig = {
  input: 'src/html',
  inputExt: 'pug',
  output: destBaseDir,
  outputExt: 'html',
  render: buildHtml,
}

const html = () => {
  return buildHtml(['src/html/**/*.pug', '!' + 'src/html/**/_*.pug']).pipe(bs.stream({ match: '**/*.html' }))
}
const css = () => {
  return buildCss('./src/scss/style.scss').pipe(bs.stream({ match: '**/*.css' }))
}
const js = (done) => {
  const compiler = webpack(webpackConfig)
  let isFirst = true

  const callback = (err, stats) => {
    if (err) {
      console.error(err.stack || err)
      if (err.details) {
        console.error(err.details)
      }
      return
    }

    console.log(
      stats.toString({
        chunks: false,
        colors: true,
      })
    )

    if (isFirst) {
      done()
      isFirst = false
      return
    }

    bs.reload('*.js')
  }

  if (isProd) {
    compiler.run(callback)
    return
  }

  compiler.watch({}, callback)
}

const serve = (done) => {
  bs.init(
    {
      notify: false,
      ui: false,
      server: {
        baseDir: [destDir],
        routes: {
          [basePath]: 'public',
        },
      },
      startPath: toPosixPath(join(basePath, '/')),
      ghostMode: false,
      open: false,
    },
    done
  )
}

const copy = () => {
  return gulp.src('public/assets/img/**/*', { dot: true }).pipe(gulp.dest(join(destDir,'assets/img')))
  return gulp.src('public/assets/video/**/*', { dot: true }).pipe(gulp.dest(join(destDir,'assets/video')))
  return gulp.src('public/assets/font/**/*', { dot: true }).pipe(gulp.dest(join(destDir,'assets/font')))
}

const clean = () => {
  return del(destDir)
}

const watch = (done) => {
  const options = {
    delay: 50,
  }

  const reload = (done) => {
    bs.reload()
    done()
  }

  gulp.watch('src/scss/**/*.scss', options, css)
  gulp.watch(['src/html/**/*', 'public/**/*'], options, html)
  done()
}

// prettier-ignore
gulp.task('default', gulp.series(
  clean,
  gulp.parallel(html, css, copy, js),
  serve,
  watch
))
