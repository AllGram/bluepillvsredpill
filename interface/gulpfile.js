'use strict';

/*
	Load dependencies
*/
var gulp = require('gulp');
var es = require('event-stream');

var $ = require('gulp-load-plugins')();

var stylish = require('jshint-stylish');

var glob = {
	src: {
		scripts: ['public/scripts/**/**/*.js', 'public/scripts/**/*.js', 'public/scripts/*.js'],
		styles: 'public/styles/index.less'
	},
	dist: {
		scripts: 'public_build/scripts',
		styles: 'public_build/styles',
	},
	bower: {
		scripts: 'public/bower_components/',
		styles: 'public/bower_components/**/*.css'
	}
};

gulp.task('scripts', function () {
	return gulp.src(glob.src.scripts)
		.pipe($.jshint())
		.pipe($.jshint.reporter(stylish))
		.pipe($.uglify())
		.pipe($.concat('index.min.js'))
		.pipe(gulp.dest(glob.dist.scripts));
});

gulp.task('styles', function () {
	return gulp.src(glob.src.styles)
		.pipe($.less())
		.pipe($.rename({
			suffic: '.min'
		}))
		.pipe($.cssmin())
		.pipe(gulp.dest(glob.dist.styles));

});

gulp.task('vendor', function () {

});