const { src, dest, parallel, watch } = require('gulp');
const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const rename = require("gulp-rename");
const uglify = require('gulp-uglify');
const merge = require('merge-stream');

// Minify compiled CSS
function css() {
    return src('scss/oli.scss')
        .pipe(sass())
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest('dist/css'));
};

// Minify JS
function js() {
    return src('js/oli.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest('dist/js'));
};

// Bring third party dependencies from node_modules into vendor directory
function copy() {
    const bootstrap = src('./node_modules/bootstrap/dist/**/*').pipe(dest('./dist/vendor/bootstrap'));
    const fontAwesome = src('./node_modules/font-awesome/**/*').pipe(dest('./dist/vendor/font-awesome'));
    const jquery = src([
        './node_modules/jquery/dist/*',
        '!./node_modules/jquery/dist/core.js'
    ]).pipe(dest('./dist/vendor/jquery'));
    return merge(bootstrap, fontAwesome, jquery);
}

function html() {
    const img = src('img/**/*').pipe(dest('dist/img'));
    const html = src(['index.html', 'robots.txt']).pipe(dest('dist'));
    return merge(img,html);
}

function watchFiles() {
    watch("./scss/**/*", css);
    watch("./js/**/*", js);
    watch("./*.html", html);
}

exports.css = css;
exports.js = js;
exports.watch = watchFiles;
exports.default = parallel(js, css, copy, html);
