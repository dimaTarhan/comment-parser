const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const runSequence = require('run-sequence');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');

const distDirectory = 'dist';
const mainBlob = 'src/index.html';
const stylesBlob = 'src/sass/*.scss';
const jsBlob = 'src/js/*.js';

gulp.task('default', function () {
    return runSequence('build', 'serve');
});

gulp.task('build', function () {
    return runSequence(
        'cleanDist',
        ['processStyles', 'processHtml', 'processJs']
    );
});

gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: distDirectory
        }
    });

    gulp.watch(mainBlob, function () {
        return runSequence('processHtml', 'reloadBrowser');
    });

    gulp.watch(stylesBlob, function () {
        return runSequence('processStyles', 'reloadBrowser');
    });

    gulp.watch(jsBlob, function () {
        return runSequence('processJs', 'reloadBrowser');
    });

});

gulp.task('cleanDist', function () {
    return gulp.src(distDirectory, {read: false, allowEmpty: true}).pipe(clean());
});

gulp.task('processHtml', function () {
    return gulp.src(mainBlob)
        .pipe(gulp.dest(distDirectory));
});

gulp.task('processJs', function () {
    return gulp.src(jsBlob)
        .pipe(gulp.dest('dist/js/'));
});

gulp.task('processStyles', function () {
    return gulp.src(stylesBlob)
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('reloadBrowser', function (done) {
    browserSync.reload();
    done();
});



