'use strict';

var extension_name = 'Facebook-Notifier';

var gulp = require('gulp'),
    fs = require('fs'),
    del = require('del'),
    vinylpaths = require('vinyl-paths'),
    cleanhtml = require('gulp-cleanhtml'),
    cleancss = require('gulp-clean-css'),
    jshint = require('gulp-jshint'),
    stripdebug = require('gulp-strip-debug'),
    uglify = require('gulp-uglify'),
    zip = require('gulp-zip'),
    crx = require('gulp-crx');

// clean build directory
gulp.task('clean', function() {
    return gulp.src('build/*')
        .pipe(vinylpaths(del));
});

// copy static files
gulp.task('copy', function() {
    gulp.src('src/*.png')
        .pipe(gulp.dest('build'));
    gulp.src('src/*.mp3')
        .pipe(gulp.dest('build'));
    gulp.src('src/_locales/**')
        .pipe(gulp.dest('build/_locales'));
    return gulp.src('src/manifest.json')
        .pipe(gulp.dest('build'));
});

// copy and compress HTML files
gulp.task('html', function() {
    return gulp.src('src/*.html')
        .pipe(cleanhtml())
        .pipe(gulp.dest('build'));
});

// run scripts through JSHint
gulp.task('jshint', function() {
    return gulp.src('src/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// copy vendor scripts
// and uglify all other scripts
gulp.task('scripts', ['jshint'], function() {
    gulp.src('src/vendor/**/*.js')
        .pipe(gulp.dest('build/vendor'));
    return gulp.src(['src/*.js', '!src/vendor/**/*.js'])
        .pipe(stripdebug())
        .pipe(uglify())
        .pipe(gulp.dest('build'));
});

// copy and minify CSS
gulp.task('styles', function() {
    gulp.src('src/**/*.min.css')
        .pipe(gulp.dest('build'));
    return gulp.src(['src/*.css', '!src/vendor/**/*.css'])
        .pipe(cleancss({root: 'src', keepSpecialComments: 0}))
        .pipe(gulp.dest('build'));
});

// build
gulp.task('build', ['html', 'scripts', 'styles', 'copy']);

// build ditributable (ZIP)
gulp.task('zip', ['build'], function() {
    var manifest = require('./build/manifest.json'),
        distFileName = extension_name + '_v' + manifest.version + '.zip';
    return gulp.src(['build/**'])
        .pipe(zip(distFileName))
        .pipe(gulp.dest('dist'));
});

// build distributable (CRX) extension
gulp.task('crx', ['zip'], function() {
    var manifest = require('./build/manifest.json'),
        crxFileName = extension_name + '_v' + manifest.version + '.crx';
    return gulp.src('build')
        .pipe(crx({
          privateKey: fs.readFileSync('./certs/key', 'utf8'),
          filename: crxFileName
        }))
        .pipe(gulp.dest('dist'));
});

// run all tasks after build directory has been cleaned
gulp.task('default', ['clean'], function() {
    gulp.start('crx');
});
