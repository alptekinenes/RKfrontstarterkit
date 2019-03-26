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

// the working directory
gulp.task('browser-sync', ['sass', 'pug', 'setWatchPugInheritance'], function() {
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
    gulp.watch('www/assets/js/**/*.js').on('change', reload);
});

gulp.task('default', ['watch', 'browser-sync']);