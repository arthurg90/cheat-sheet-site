let gulp = require('gulp');
let cleanCSS = require('gulp-clean-css');
let rename = require('gulp-rename');
let sass = require('gulp-sass');
let watch = require('gulp-watch');
let gulpSequence = require('gulp-sequence');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify');
let pump = require('pump');

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

gulp.task('scripts', function() {
  return gulp.src(['./js/jquery-3.2.1.slim.js', './js/popper.js', './js/bootstrap.js',])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./js-dist/'));
});

gulp.task('compress', function (cb) {
  pump([
        gulp.src('./js-dist/*.js'),
        uglify(),
        gulp.dest('./js-dist/')
    ],
    cb
  );
});

gulp.task('js', function(callback){
    gulpSequence('scripts', 'compress')(callback)
});

gulp.task('watch', function () {
	gulp.watch('./scss/*.scss', ['styles']);
    gulp.watch('./js/*.js', ['js']);
});

