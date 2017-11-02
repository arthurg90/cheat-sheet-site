let gulp = require('gulp');
let cleanCSS = require('gulp-clean-css');
let rename = require('gulp-rename');
let sass = require('gulp-sass');
let watch = require('gulp-watch');
let gulpSequence = require('gulp-sequence')
let tabify = require('gulp-tabify');

gulp.task('sass', function () {
    var stream = gulp.src('./scss/styles.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css/'))
        .pipe(rename('styles.css'));
    return stream;
});

gulp.task('minify-css', () => {
  return gulp.src('css/styles.css')
	.pipe(cleanCSS({compatibility: 'ie8'}))
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('./css/'));
});

gulp.task('styles', function(callback){
	gulpSequence('sass', 'minify-css')(callback)
});

gulp.task('watch', function () {
	gulp.watch('./scss/*.scss', ['styles']);
});

//tabs to spaces plugin
gulp.task('tabify', function () {
  return gulp.src('./js/app.js')
    .pipe(tabify(4, true))
    .pipe(gulp.dest('./tabify/js'));
});