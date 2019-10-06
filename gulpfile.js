const gulp = require('gulp');
const { watch, series } = require('gulp');
const babel = require('gulp-babel');
const nodemon = require('gulp-nodemon')
const fs = require('fs')

gulp.task('start', (done) => {
  nodemon({
    script: 'dist/server.js',
    watch: ['restart'],
    done,
  })
})

gulp.task('build', (cb) => {
  gulp.src('src/**/*.js')
    .pipe(babel({
      presets: [
        ['@babel/preset-env', { "useBuiltIns": "usage", "corejs": "3.0.0", }]
      ]
    }))
    .pipe(gulp.dest('dist'))
    .on('end', () => {
      cb();
      fs.writeFile('restart', Date.now(), () => {})
    });
})

gulp.task('watch', (cb) => {
  watch('src/**/*.js', series('build'))
  cb()
})

gulp.task('dev', series('build', 'watch', 'start'))
  