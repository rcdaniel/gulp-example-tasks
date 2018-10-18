var gulp = require('gulp');
var colors = require('ansi-colors');
var newer = require('gulp-newer');
var less = require('gulp-less');
var postcss = require('gulp-postcss');
var cleancss = require('gulp-clean-css');
let rename = require('gulp-rename');
let autoprefixer = require('autoprefixer');
let imagemin = require('gulp-imagemin');
let terser = require('gulp-terser');
let babel = require('gulp-babel');


let postcssOptions = [autoprefixer];

gulp.task('default', function() {
    console.log('Tarea por ' + colors.green('defecto.'));
});

gulp.task('random', function() {
    console.log('Tarea ' + colors.cyan('random.'));
});

gulp.task('less-to-css', function() {

    console.log('Ejecutando tarea ' + colors.green('less-to-css.'));

    return gulp.src('src/css/*.less').pipe(newer({
        dest: 'dist/css',
        ext: '.css',
        extra: 'src/css/includes/**/*.less',
    })).pipe(less()).pipe(gulp.dest('dist/css'))
});

gulp.task('less-post-css', function() {

    console.log('Ejecutando tarea ' + colors.green('less-post-css.'));

    return gulp.src('src/css/*.less')
    .pipe(less())
    .pipe(postcss(postcssOptions))
    .pipe(gulp.dest('dist/css'))
    .pipe(cleancss())
    .pipe(rename({ suffix: '.min'}))
    .pipe(gulp.dest('dist/css'))
});

gulp.task('images', function() {

});

gulp.task('terser-js', function() {
    return gulp.src(['./src/js/index.js'])
	.pipe(newer({
        dest: 'dist/js',
        ext: '.min.js',
        extra: './src/js/**/*.js',
    }))
    .pipe(terser())
    .on('error', err => { 
       console.log('[ERROR] ', err); 
    })
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('dist/js'))
});

gulp.task('babel-js', function() {
    return gulp.src(['./src/js/index.js'])
    .pipe(babel({
        presets: ['@babel/env']
    }))
	.pipe(newer({
        dest: 'dist/js',
        ext: '.min.js',
        extra: './src/js/**/*.js',
    }))
    .pipe(terser())
    .on('error', err => { 
       console.log('[ERROR] ', err); 
    })
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('dist/js'))
});