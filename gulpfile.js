'use strict';
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const pug = require('gulp-pug');
const browserSync = require('browser-sync').create();
const rename = require('gulp-rename');

const reload = browserSync.reload;

// Compile sass files to css
gulp.task('sass', function() {
    return gulp.src('assets/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(plumber({
            errorHandler: function(error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('assets/css/'))
        .pipe(browserSync.reload({ stream: true }))
});

// Compile pug files to html
gulp.task('pug', () => {
    return gulp.src('pug/*.pug')
        .pipe(plumber({
            errorHandler: function(error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('./'))
});

// the working directory
gulp.task('browser-sync', ['sass', 'pug'], function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});



// Watch files comiling
gulp.task('watch', function() {
    gulp.watch('assets/scss/*.scss', ['sass']);
    gulp.watch('pug/*.pug', ['pug']);
    gulp.watch('*.html').on('change', reload);
    gulp.watch('assets/css/*.css').on('change', reload);
});


gulp.task('default', ['watch', 'browser-sync']);