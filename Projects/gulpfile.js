var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var less = require('gulp-less');
var cssClean = require('gulp-clean-css');
var htmlMin = require('gulp-htmlmin');
var livereload = require('gulp-livereload');
var connect = require('gulp-connect');
var open = require('open');

gulp.task('js',function(){
    return gulp.src('src/js/*.js')
    .pipe(concat('build.js'))
    .pipe(gulp.dest('dist/js/'))
    .pipe(uglify())
    .pipe(rename({suffix:'.min'}))
    .pipe(gulp.dest('dist/js/'))
    .pipe(livereload())
    .pipe(connect.reload())
});

gulp.task('less', function(){
    return gulp.src('src/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('src/css/'))
    .pipe(livereload())
    .pipe(connect.reload())
});

gulp.task('css',['less'], function(){
    return gulp.src('src/css/*.css')
    .pipe(concat('build.css'))
    .pipe(rename({suffix:'.min'}))
    .pipe(cssClean({compatibility:'ie8'}))
    .pipe(gulp.dest('dist/css/'))
    .pipe(livereload())
    .pipe(connect.reload())
});

gulp.task('html', function(){
    return gulp.src('index.html')
    .pipe(htmlMin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist/'))
    .pipe(livereload())
    .pipe(connect.reload())
});

gulp.task('watch',['default'], function(){
    livereload.listen();
    gulp.watch('src/js/*.js',['js']);
    gulp.watch(['src/css/*.css','src/less/*.less'],['css']);

});

gulp.task('server',['default'], function(){
    connect.server({
        root: 'dist/',
        livereload: true,
        port: 5000
    })
})

gulp.task('default',['js','less','css','html']);

open('http://localhost:5000/');