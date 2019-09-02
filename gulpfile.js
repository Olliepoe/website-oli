var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var merge = require('merge-stream');

// Minify compiled CSS
function minifyCss() {
    return gulp.src('css/oli.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/css'));
};

// Minify JS
function minifyJs() {
    return gulp.src('js/oli.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/js'));
};

// Bring third party dependencies from node_modules into vendor directory
function copy() {
    var bootstrap = gulp.src('./node_modules/bootstrap/dist/**/*').pipe(gulp.dest('./dist/vendor/bootstrap'));
    var fontAwesome = gulp.src('./node_modules/font-awesome/**/*').pipe(gulp.dest('./dist/vendor/font-awesome'));
    var jquery = gulp.src([
        './node_modules/jquery/dist/*',
        '!./node_modules/jquery/dist/core.js'
    ]).pipe(gulp.dest('./dist/vendor/jquery'));
    return merge(bootstrap, fontAwesome, jquery);
}

function html() {
    const img = gulp.src('img/**/*').pipe(gulp.dest('dist/img'));
    const html = gulp.src(['index.html', 'robots.txt']).pipe(gulp.dest('dist'));
    return merge(img,html);
}

function css() {
    return gulp.src('scss/oli.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'));
}

// Run everything
gulp.task("default", gulp.series(css, gulp.parallel(minifyJs, minifyCss, copy, html)));
