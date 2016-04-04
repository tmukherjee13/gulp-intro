/* File: gulpfile.js */

var gulp = require('gulp'),
    cleancss = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    htmlmin = require('gulp-htmlmin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    size = require('gulp-size'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    clean = require('gulp-clean');

var SOURCE_DIR = 'files/source/';
var BUILD_DIR = 'files/build/';
var PRODUCTION_JS_FILE = 'production.min.js';
var PRODUCTION_CSS_FILE = 'production.min.css';



/**
 * Minimize CSS files
 */
gulp.task('clean-css',['clean'], function() {
    return gulp.src(SOURCE_DIR+'**/*.css')
    	.pipe(size())
        .pipe(cleancss())
        .pipe(gulp.dest(BUILD_DIR))
        .pipe(size());
});


/**
 * Minimize JS files 
 */
gulp.task('clean-js',['clean'], function() {
    return gulp.src(SOURCE_DIR+'**/*.js')
    	.pipe(size())
        .pipe(uglify())
        .on('error', gutil.log)
        .pipe(concat(PRODUCTION_JS_FILE))
        .pipe(gulp.dest(BUILD_DIR))
        .pipe(size());
});


/**
 * Search for systax errors in js files
 */

gulp.task('lint-js', function() {
  return gulp.src(SOURCE_DIR+'**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});



/**
 * Minimize image files
 */
gulp.task('optimize-images',['clean'], function() {
    return gulp.src(SOURCE_DIR+'**/*.{jpg,jpeg,png,gif,JPG,JPEG}')
    	.pipe(size())
        .pipe(imagemin({
            optimizationLevel: 9,
            progessive: true,
            interlaced: true
        }))
        .pipe(gulp.dest(BUILD_DIR))
        .pipe(size());
});


/**
 * Minimize HTML
 */
gulp.task('minify-html',['clean'], function() {
    return gulp.src('source/**/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('production/'));
});

gulp.task('default', function() {
    return gutil.log('Gulp is running!');
});

gulp.task('clean', function () {  
  return gulp.src(BUILD_DIR, {read: false})
    .pipe(clean());
});