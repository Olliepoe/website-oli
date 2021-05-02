const { src, dest, parallel, watch } = require('gulp');
const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const rename = require("gulp-rename");
const uglify = require('gulp-uglify');
const merge = require('merge-stream');
const target = 'docs';

// Minify compiled CSS
function css() {
    return src('scss/oli.scss')
        .pipe(sass())
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest(target + '/css'));
};

// Minify JS
function js() {
    return src('js/oli.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest(target + '/js'));
};

// Bring third party dependencies from node_modules into vendor directory
function copy() {
    const bootstrap = src('./node_modules/bootstrap/dist/**/*').pipe(dest('./' + target + '/vendor/bootstrap'));
    const fontAwesome = src('./node_modules/font-awesome/**/*').pipe(dest('./' + target + '/vendor/font-awesome'));
    const jquery = src([
        './node_modules/jquery/dist/*',
        '!./node_modules/jquery/dist/core.js'
    ]).pipe(dest('./' + target + '/vendor/jquery'));
    const easing = src('./node_modules/jquery.easing/**/*').pipe(dest('./' + target + '/vendor/jquery.easing'));
    return merge(bootstrap, fontAwesome, jquery, easing);
}

function html() {
    const img = src('img/**/*').pipe(dest(target + '/img'));
    const html = src(['index.html', 'robots.txt']).pipe(dest(target));
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
