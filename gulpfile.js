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
        .pipe(gulp.dest('css'));
};

// Minify JS
function minifyJs() {
    return gulp.src('js/agency.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('js'));
};

// Bring third party dependencies from node_modules into vendor directory
function copy() {
    // Bootstrap
    var bootstrap = gulp.src('./node_modules/bootstrap/dist/**/*')
        .pipe(gulp.dest('./vendor/bootstrap'));
    // Font Awesome
    var fontAwesome = gulp.src('./node_modules/@fortawesome/**/*')
        .pipe(gulp.dest('./vendor'));
    // jQuery
    var jquery = gulp.src([
        './node_modules/jquery/dist/*',
        '!./node_modules/jquery/dist/core.js'
    ]).pipe(gulp.dest('./vendor/jquery'));
    return merge(bootstrap, fontAwesome, jquery);
}

function css() {
    return gulp.src('scss/oli.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'));
}

// Run everything
gulp.task("default", gulp.series(css, gulp.parallel(minifyJs, minifyCss, copy)));
