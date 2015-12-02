var gulp = require('gulp');
var webpack = require('webpack-stream');
var minify = require('gulp-minify-css');

gulp.task('static:dev', function() {
  gulp.src('app/**/*.html')
  .pipe(gulp.dest('build/'));
});

gulp.task('css:dev', function() {
	return gulp.src([
		'app/css.base.css',
		'app/css.layout.css',
		'app/css.module.css'])
	.pipe(concatCss('styles.min.css'));
	.pipe(minifyCss());
	.pipe(gulp.dest('build/'));
});

gulp.task('css:watch', function () {
	gulp.watch('./app/css/**/*.css');
});

gulp.task('webpack:dev', function() {
  return gulp.src('app/js/entry.js')
  .pipe(webpack({
    output: {
      filename: 'bundle.js'
    }
  }))
  .pipe(gulp.dest('build/'));
});

gulp.task('webpack:test', function() {
	return gulp.src('test/client/test_entry.js')
	.pipe(webpack({
		output: {
			filename: 'test_bundle.js'
		}
	}))
	.pipe(gulp.dest('test/client'));
});

gulp.task('build:dev', ['webpack:dev', 'static:dev', 'css:dev']);
gulp.task('default', ['build:dev']);
