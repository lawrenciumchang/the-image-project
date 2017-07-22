var gulp      = require('gulp');
var plumber   = require('gulp-plumber');
var sass      = require('gulp-sass');
var webserver = require('gulp-webserver');
var opn       = require('opn');
var inject    = require('gulp-inject');

var sourcePaths = {
  styles: ['./sass/**/*.scss']
};

var distPaths = {
  styles: './css'
};

var server = {
  host: 'localhost',
  port: '9001'
}

gulp.task('sass', function () {
  gulp.src(sourcePaths.styles)
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest(distPaths.styles));
});

gulp.task('index', function () {
    gulp.src('./index.html')
      .pipe(inject(gulp.src('./js/**/*.js', {read: false}), {relative: true}))
      .pipe(gulp.dest('./'));
});

gulp.task('webserver', function() {
  gulp.src('.')
    .pipe(webserver({
      host:             server.host,
      port:             server.port,
      livereload:       true,
      directoryListing: false
    }));
});

gulp.task('openbrowser', function() {
  opn('http://' + server.host + ':' + server.port, {app: ['google chrome']});
});

gulp.task('watch', function(){
  gulp.watch(sourcePaths.styles, ['sass']);
});

gulp.task('build', ['sass']);

gulp.task('default', ['build', 'index', 'webserver', 'watch', 'openbrowser']);
