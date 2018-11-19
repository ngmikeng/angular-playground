const gulp = require('gulp');
const concat = require('gulp-concat');
const del = require('del');
const runSequence = require('run-sequence');
const inject = require('gulp-inject');
const injectString = require('gulp-inject-string');
const connect = require('gulp-connect');

const buildConfig = require('./build.config.json');
const scripts = buildConfig.sources;
const vendorScripts = buildConfig.vendors;
const styles = buildConfig.styles;
const templates = buildConfig.templates;
const package = require('./package.json');
const buildDir = './dist/';
const profile = 'dist';

gulp.task('css', () =>
  gulp.src(styles)
  .pipe(concat('style.css'))
  .pipe(gulp.dest(buildDir))
  .pipe(connect.reload())
);

gulp.task('js', () =>
  gulp.src(scripts)
  .pipe(concat('script.js'))
  .pipe(gulp.dest(buildDir))
  .pipe(connect.reload())
);

gulp.task('html', () =>
  gulp.src(templates)
  .pipe(gulp.dest(buildDir))
  .pipe(connect.reload())
);

gulp.task('assets', () => {
  return gulp.src([
      'assets/**/*'
    ])
    .pipe(gulp.dest(buildDir))
    .pipe(connect.reload());
});

gulp.task('browser-sync', () => {
  browserSync.init(null, {
    open: true,
    server: {
      baseDir: buildDir
    }
  })
});

gulp.task('clean', () => del([buildDir]));

gulp.task('build', ['css', 'js', 'html', 'assets']);

gulp.task('default', callback => {
  runSequence('clean', 'build', 'browser-sync', callback);
  gulp.watch(['./src/**/*.css'], ['css']);
  gulp.watch(['./src/**/*.js'], ['js']);
  gulp.watch(['./src/**/*.html'], ['html']);
  gulp.watch(['./assets/**/*.*'], ['assets']);
});

gulp.task('copy-files', ['copy-index', 'copy-js-files', 'copy-vendor-files', 'html2js']);

gulp.task('copy-index', function () {
  return gulp.src(['src/index.html']).pipe(gulp.dest(buildDir + '/'));
});

gulp.task('index', function () {
  var vendorScriptPaths = [];
  vendorScriptPaths = vendorScripts.map(function (path) {
    var array = path.split('/');
    return profile + '/vendor/**/' + array[array.length - 1];
  });

  var scriptPaths = vendorScriptPaths.concat([
    profile + '/**/*.module.js',
    profile + '/**/*.js',
    profile + '/app/**/*.js'
  ]);

  var sources = gulp.src(scriptPaths, {
    read: false
  });

  return gulp.src(profile + '/index.html')
    .pipe(inject(sources, {
      relative: true
    }))
    .pipe(injectString.replace('%%VERSION_NUMBER%%', package.version))
    .pipe(gulp.dest(profile))
    .pipe(connect.reload());
});

gulp.task('webserver', function () {
  connect.server({
    root: profile,
    livereload: true
  });
});

gulp.task('copy-index', function () {
  return gulp.src('src/index.html').pipe(gulp.dest(profile + '/'));
});

gulp.task('copy-js-files', function () {
  return gulp.src(['src/**/*.js', '!src/**/*.spec.js']).pipe(gulp.dest(profile + '/'));
});

gulp.task('copy-vendor-files', function () {
  return gulp.src(vendorScripts).pipe(gulp.dest(profile + '/vendor/'));
});

gulp.task('copy-files', ['copy-vendor-files', 'copy-js-files']);

gulp.task('build-dev', function () {
  runSequence('clean', 'copy-files', 'css', 'html', 'assets', 'copy-index', 'index', 'webserver');
});

gulp.task('watch', ['build-dev'], function () {
  gulp.watch('src/**/*.js', function () {
    runSequence('copy-js-files');
  });
  gulp.watch(['./src/**/*.css'], ['css']);
  gulp.watch('./src/index.html', function () {
    runSequence('copy-index', 'index');
  });
  gulp.watch(['./src/**/*.html', '!./src/index.html'], ['html']);
  gulp.watch(['./assets/**/*.*'], ['assets']);
});
