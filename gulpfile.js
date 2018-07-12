/**
* Gulp tasks.
*/
const gulp = require('gulp'),
  addsrc = require('gulp-add-src'),
  concat = require('gulp-concat'),
  obfuscator = require('gulp-javascript-obfuscator'),
  ngAnnotate = require('gulp-ng-annotate'),
  bump = require('gulp-bump'),
  runSequence = require('run-sequence'),
  del = require('del'),
  uglify = require('gulp-uglify-es').default,
  template = require('gulp-template')
  packageInfo = require('./package.json');

const dir = {
  dist: 'dist',
  src: 'src'
};

// Clean up task
gulp.task('clean', function(cb) {
  return del([dir.dist], {force: true}, cb);
});

// Combine JS files.
gulp.task('combine', function () {
    return gulp.src([
        dir.src + '/**/*.module.js',
        dir.src + '/**/*.config.js',
        dir.src + '/**/*.controller.js',
        dir.src + '/**/*.component.js',
    ])
    .pipe(ngAnnotate())
    .pipe(uglify().on('error', function(e) {
      console.log(e);
      throw new Error('Can\'t uglify properly');
    }))
    .pipe(concat('ngSignHere.min.js', {newLine: ';'}))
    .pipe(gulp.dest(dir.dist));
});

// Build Task
gulp.task('build', function(cb) {
  runSequence(
    'clean',
    'combine',
    cb
  );
});

// Default task
gulp.task('default', function(cb) {
  runSequence('build', cb);
});
