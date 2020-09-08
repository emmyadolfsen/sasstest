// Variabler
const { src, dest, watch, series, parallel } = require("gulp");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const browserSync = require('browser-sync').create();



// Sökvägar
const files = {
    htmlPath: "src/**/*.html",
    // cssPath: "src/**/*.css",
    jsPath: "src/**/*.js",
    imagePath: "src/images/*",
    htmlmin: "src/*.html",
    sassPath: "src/sass/*.scss"
}

// Gör om sassfil till css
// lägg till i pub/css/main.css
// minifiera
function sassTask() {
    return src(files.sassPath)
        .pipe(concat('main.css'))
        .pipe(sass().on("error", sass.logError))
        .pipe(cleanCSS())
        .pipe(dest('pub/css'))
        .pipe(browserSync.stream());
}

// Minifiera html-filer och kopiera
function htmlTask() {
    return src(files.htmlPath)
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest('pub'))
        .pipe(browserSync.stream());
}


// Minifiera med imagemin och kopiera
function imageTask() {
    return src(files.imagePath)
        .pipe(imagemin())
        .pipe(dest('pub/images'))
        .pipe(browserSync.stream());
}

// Sammanslå js-filer och minifiera med uglify
function jsTask() {
    return src(files.jsPath)
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(dest('pub/js'))
        .pipe(browserSync.stream());
}

/*
// Sammanslå css-filer och minifiera med cleanCSS
function cssTask() {
    return src(files.cssPath)
        .pipe(concat('main.css'))
        .pipe(cleanCSS())
        .pipe(dest('pub/css'))
        .pipe(browserSync.stream());
}
*/
function watchTask() {
    browserSync.init({
        server: {
            baseDir: './pub/'
        }
    });
    watch([files.htmlPath, files.imagePath, files.jsPath, files.sassPath],
        parallel(htmlTask, imageTask, jsTask, sassTask)).on('change', browserSync.reload);
}

/*
// Watcher, håller koll på om någon av filerna ändras
function watchTask() {
    watch([files.htmlPath, files.imagePath, files.jsPath, files.cssPath, files.sassPath],
        parallel(htmlTask, imageTask, cssTask, jsTask, sassTask).on('change', browserSync.reload);
    );
}
*/


// Kör globalt
exports.default = series(
    parallel(htmlTask, imageTask, sassTask, jsTask),
    watchTask

)