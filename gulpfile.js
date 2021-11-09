const gulp = require("gulp");
const gulpSASS = require('gulp-sass');
const gulpClean = require('gulp-clean');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const prefix = require('gulp-autoprefixer');
const minifyJS = require('gulp-js-minify');
const minifyIMG = require('gulp-imagemin');
const browserSync = require('browser-sync').create();

gulp.task('instance:start', (done) => {
    browserSync.init({
        server: {
            baseDir: "build"
        }
    });
    done();
});

gulp.task('instance:reload', (done) => {
    browserSync.reload();
    done();
});

gulp.task('build:delete', (done) => {
    return gulp.src('build/*', {read: false})
        .pipe(gulpClean({force: true}));
});

gulp.task('handle:HTML', (done) => {
    gulp.src('build/index.html', {read: false, allowEmpty: true})
        .pipe(gulpClean({force: true}));
    gulp.src("index.html")
        .pipe(gulp.dest("build/"));
    done();
});

gulp.task('handle:CSS', (done) => {
    gulp.src('build/css/*', {read: false})
        .pipe(gulpClean({force: true}));
    gulp.src("./src/scss/*.scss")
        .pipe(gulpSASS().on('error', gulpSASS.logError))
        .pipe(concat('styles.min.css'))
        .pipe(prefix())
        .pipe(cleanCSS({level: 2}))
        .pipe(gulp.dest("build/css/"));
    done();
});

gulp.task('handle:JS', (done) => {
    gulp.src('./build/scripts/*', {read: false})
        .pipe(gulpClean({force: true}));
    gulp.src("./src/scripts/*.js")
        .pipe(concat('scripts.min.js'))
        .pipe(minifyJS())
        .pipe(gulp.dest("build/scripts/"));
    done();
});

gulp.task('handle:images', (done) => {
    gulp.src('build/img/*', {read: false})
        .pipe(gulpClean({force: true}));
    gulp.src("./src/img/**/*.*")
        .pipe(minifyIMG())
        .pipe(gulp.dest("build/img/"));
    done();
});

gulp.task('handle:resources', gulp.parallel("handle:HTML","handle:CSS", "handle:JS", "handle:images"));

gulp.task("build:watch", () => {
    gulp.watch("./src/scss/*.scss", gulp.series("handle:HTML", "instance:reload"));
    gulp.watch("./src/scss/*.scss", gulp.series("handle:CSS", "instance:reload"));
    gulp.watch("./src/scripts/*.js", gulp.series("handle:JS", "instance:reload"));
    gulp.watch("./src/img/*.png", gulp.series("handle:images", "instance:reload"));
    gulp.watch("index.html", gulp.series("instance:reload"))
});

gulp.task('build', gulp.series("build:delete", "handle:resources"));
gulp.task('dev', gulp.series("build", "instance:start", "build:watch"));