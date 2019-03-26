'use strict';
const gulp = require('gulp');
const wait = require('gulp-wait');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const gutil = require('gulp-util');
const pugInheritance = require('gulp-pug-inheritance');
const pug = require('gulp-pug');
const changed = require('gulp-changed');
const cached = require('gulp-cached');
const gulpif = require('gulp-if');
const filter = require('gulp-filter')
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const babelify = require('babelify');
const browserify = require('browserify');
const watchify = require('watchify');
const watch = require('gulp-watch');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const minify = require('gulp-minify');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

// Compile pug files to html
gulp.task('pug', () => {
    return gulp.src('dev/pug/**/*.pug')
        .pipe(plumber({
            errorHandler: function(err) {
                notify.onError({
                    title: "Gulp pug error in " + err.plugin,
                    message: err.message
                })(err);
                gutil.beep();
                this.emit('end');
            }
        }))
        .pipe(changed('./www/', { extension: '.html' }))
        .pipe(gulpif(global.isWatching, cached('pug')))
        .pipe(pugInheritance({ basedir: 'dev/pug', skip: 'node_modules' }))
        .pipe(filter(function(file) {
            return !/\/_/.test(file.path) && !/^_/.test(file.relative);
        }))
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('./www/'))
        .pipe(reload({ stream: true }))
});

gulp.task('setWatchPugInheritance', function() {
    global.isWatching = true;
});

// Compile sass files to css
gulp.task('sass', () => {
    return gulp.src('dev/scss/*.scss')
        .pipe(wait(1000))
        .pipe(plumber({
            errorHandler: function(err) {
                notify.onError({
                    title: "Gulp scss error in " + err.plugin,
                    message: err.message
                })(err);
                gutil.beep();
                this.emit('end');
            }
        }))
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('www/assets/css/'))
        .pipe(reload({ stream: true }))
});

gulp.task('cssVendor', () => {
    return gulp.src('dev/css/vendor/**/*.css')
        .pipe(wait(1000))
        .pipe(plumber({
            errorHandler: function(err) {
                notify.onError({
                    title: "Gulp cssVendor error in " + err.plugin,
                    message: err.message
                })(err);
                gutil.beep();
                this.emit('end');
            }
        }))
        .pipe(gulp.dest('www/assets/css/vendor/'))
        .pipe(reload({ stream: true }))
});

gulp.task('fontsVendor', () => {
    return gulp.src('dev/css/vendor/**/fonts/*.{ttf,eot,otf,svg,woff,woff2}')
        .pipe(gulp.dest('www/assets/css/vendor/'))
        .pipe(reload({ stream: true }))
});

gulp.task('img', () => {
    return gulp.src('dev/img/**/*.{png,gif,jpg,svg,jpeg,webp}')
        .pipe(gulp.dest('www/assets/img/'))
        .pipe(reload({ stream: true }))
});

gulp.task('json', () => {
    return gulp.src('dev/json/**/*.json')
        .pipe(gulp.dest('www/assets/json/'))
        .pipe(reload({ stream: true }))
});

gulp.task('jsVendor', () => {
    return gulp.src('dev/js/vendor/*.js')
        .pipe(plumber({
            errorHandler: function(err) {
                notify.onError({
                    title: "Gulp jsVendor error in " + err.plugin,
                    message: err.message
                })(err);
                gutil.beep();
                this.emit('end');
            }
        }))
        .pipe(gulp.dest('www/assets/js/vendor/'))
        .pipe(reload({ stream: true }))
});

gulp.task('es6', es6);
function es6 (watch) {
    let b = browserify({
            entries: 'dev/js/app.js',
        })
        .transform(babelify.configure({
            presets: ['@babel/preset-env'],
        }));
        if (watch) b = watchify(b);

          let rebundle = function() {
            gutil.log(gutil.colors.green('Bundling scripts...'));
            return b.bundle()
              .on('error', function(err) {
                gutil.beep();
                gutil.log(gutil.colors.red('Error (Browserify): ' + err.message));
              })
              .pipe(source('app.js'))
              .pipe(buffer())
              .pipe(sourcemaps.init({loadMaps: true}))
              .pipe(sourcemaps.write('./'))
              .pipe(gulp.dest('www/assets/js/'))
              .pipe(reload({ stream: true }))
            ;
          };

          b.on('update', function() {
            return rebundle();
          });

          return rebundle();
                
};

// the working directory
gulp.task('browser-sync', ['sass', 'pug', 'setWatchPugInheritance', 'cssVendor', 'fontsVendor', 'img', 'json', 'jsVendor', 'es6'], function() {
    browserSync.init({
        server: {
            baseDir: "./www/"
        }
    });
});

// Watch files comiling
gulp.task('watch', function() {
    gulp.watch('dev/pug/**/*.pug', ['pug']);
    gulp.watch('dev/scss/**/*.scss', ['sass']);
    gulp.watch('dev/css/vendor/**/*.css', ['cssVendor']);
    gulp.watch('dev/js/vendor/*.js', ['jsVendor']);
    gulp.watch('dev/img/**/*.*', ['img']);
    gulp.watch('dev/json/**/*.json', ['json']);
});

gulp.task('default', ['watch', 'browser-sync']);