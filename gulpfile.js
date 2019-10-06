const gulp = require('gulp');
const { watch, series } = require('gulp');
const babel = require('gulp-babel');
const nodemon = require('gulp-nodemon')
const fs = require('fs')
const ts = require('gulp-typescript')
const del = require('del')

const tsProject = ts.createProject('tsconfig.json', {
  target: 'es2017',
  module: 'commonjs'
})

gulp.task('start', (done) => {
  nodemon({
    script: 'dist/server.js',
    watch: ['restart'],
    done,
  })
})

gulp.task('build', (cb) => {
  gulp.src('src/**/*.ts')
    .pipe(tsProject())
    .js.pipe(gulp.dest('dist'))
    .on('end', () => {
      cb();
      fs.writeFile('restart', Date.now(), () => { })
    });
})

gulp.task('watch', (cb) => {
  watch('src/**/*.ts', series('build'))
  cb()
})

gulp.task('clean', (cb) => {
  del(['dist'])
  cb()
})

gulp.task('dev', series('clean', 'build', 'watch', 'start'))
