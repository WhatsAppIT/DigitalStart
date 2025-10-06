const gulp = require('gulp');
const concat = require('gulp-concat-css');
const plumber = require('gulp-plumber');
const del = require('del');
const browserSync = require('browser-sync').create();
const build = gulp.series(clean, gulp.parallel(html, css, image, favicon, logo, vendor, scripts));
const watchapp = gulp.parallel(build, watchFiles, serve);

function html() {
    return gulp.src('src/**/*.html')
    .pipe(plumber())
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.reload({stream: true}));
}

function scripts() {
    return gulp.src('src/**/*.js')
    .pipe(plumber())
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.reload({stream: true}));
}

function css() {
    return gulp.src('src/blocks/**/*.css')
    .pipe(plumber())
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.reload({stream: true}));
}

function image() {
    return gulp.src('src/image/**/*.{jpg,png,svg,gif,ico,webp,avif}', { encoding: false })
    .pipe(gulp.dest('dist/image'))
    .pipe(browserSync.reload({stream: true}));
}

function favicon() {
    return gulp.src('src/favicon/**/*.{jpg,png,svg,gif,ico,webp,avif}', { encoding: false })
    .pipe(gulp.dest('dist/favicon'))
    .pipe(browserSync.reload({stream: true}));
}

function logo() {
    return gulp.src('src/logo-svg/**/*.{jpg,png,svg,gif,ico,webp,avif}')
    .pipe(gulp.dest('dist/logo-svg'))
    .pipe(browserSync.reload({stream: true}));
}

function vendor() {
    return gulp.src('src/vendor/**/*.{jpg,png,svg,gif,ico,woff2,woff,webp,avif}')
    .pipe(gulp.dest('dist/vendor'))
    .pipe(browserSync.reload({stream: true}));
}

function clean() {
    return del('dist');
}

function watchFiles() {
  gulp.watch(['src/**/*.html'], html);
  gulp.watch(['src/**/*.js'], scripts);
  gulp.watch(['src/blocks/**/*.css'], css);
  gulp.watch(['src/image/**/*.{jpg,png,svg,gif,ico,webp,avif}'], image);
}

function serve() {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });
}

exports.watchapp = watchapp;
exports.build = build;
exports.scripts = scripts;
exports.clean = clean;
exports.image = image; 
exports.favicon = favicon; 
exports.logo = logo; 
exports.vendor = vendor; 
exports.css = css;
exports.html = html;
exports.default = watchapp;