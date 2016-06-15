var gulp = require('gulp');
var babel = require("gulp-babel");

gulp.task('build', function() {
  return gulp.src('js/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});

gulp.task('default', function() {
  gulp.watch('js/**/*.*', ['build']);
});