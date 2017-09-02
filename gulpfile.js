const gulp = require('gulp')
const sass = require('gulp-sass')

gulp.task('sass', () => {
    return gulp.src('./styles/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'));
})

gulp.task('default', ['sass'], () => { })
gulp.task('sass:watch', () => {
    gulp.watch('./styles/*.scss', ['sass']);
})