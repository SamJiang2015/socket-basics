var gulp = require('gulp');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var streamify = require('gulp-streamify');

var notifier = require('node-notifier');
var htmlreplace = require('gulp-html-replace');

var path = {
	HTML: './src/web/index.html',
	ALL: ['./src/web/jsx/*.jsx', './src/server/*', './src/web/index.html', './src/web/css/*'],
	JSX: ['./src/web/jsx/*.jsx'],
	CSS: ['./src/web/css/*.css'],
	SERVER_JS: ['./src/server/*.js'],
	ENTRY_POINT: './src/web/jsx/app.jsx',	
	OUT: 'build.js',
	MINIFIED_OUT: 'build.min.js',
	DEST: 'dist',
	DEST_WEB: 'dist/public',
	DEST_WEB_SRC: 'dist/public/js',
	DEST_WEB_CSS: 'dist/public/css',
	DEST_WEB_BUILD: 'dist/public/build'	
};

var notify = function(error) {
  var message = 'In: ';
  var title = 'Error: ';

  if(error.description) {
    title += error.description;
  } else if (error.message) {
    title += error.message;
  }

  if(error.filename) {
    var file = error.filename.split('/');
    message += file[file.length-1];
  }

  if(error.lineNumber) {
    message += '\nOn Line: ' + error.lineNumber;
  }

  notifier.notify({title: title, message: message});
};

// Development task 1: copy index.html file
gulp.task('copy-html', function() {
	gulp.src(path.HTML)
	.pipe(gulp.dest(path.DEST_WEB));
});

// Development task 2: copy css file
gulp.task('copy-css', function() {
	gulp.src(path.CSS)
	.pipe(gulp.dest(path.DEST_WEB_CSS));
});

// Development task 3: copy server js files
gulp.task('copy-server-js', function() {
	gulp.src(path.SERVER_JS)
	.pipe(gulp.dest(path.DEST));
});


// Development task 3: main task
gulp.task('watch', function() {
	gulp.watch(path.HTML, ['copy-html']);
	gulp.watch(path.CSS, ['copy-css']);

	var watcher = watchify(browserify({
		entries: [path.ENTRY_POINT],
		transform: [reactify],
		extensions: ['.jsx'],
		debug: true,
		cache: {}, packageCache: {}, fullPaths: true
	}));

	return watcher.on('update', function() {
		watcher.bundle()
		.pipe(source(path.OUT))
		.pipe(gulp.dest(path.DEST_WEB_SRC))
		console.log('Updated');
	})
	.bundle()
	.on('error', notify)
	.pipe(source(path.OUT))
	.pipe(gulp.dest(path.DEST_WEB_SRC));
});

gulp.task('default', ['copy-server-js','copy-html', 'copy-css', 'watch']);

// Production task: concat all JS files, minify them and output to the build folder
gulp.task('build', function() {
	browserify({
		entries: [path.ENTRY_POINT],
		transform: [reactify]
	})
		.bundle()
		.pipe(source(path.MINIFIED_OUT))
		.pipe(streamify(uglify(path.MINIFIED_OUT)))
		.pipe(gulp.dest(path.DEST_WEB_BUILD));
	});

// also replace the js reference in index.html to the minified version
gulp.task('replaceHTML', function() {
	gulp.src(path.HTML)
	.pipe(htmlreplace({
		'js': 'build/' + path.MINIFIED_OUT
	}))
	.pipe(gulp.dest(path.DEST_WEB));
})


gulp.task('production', ['copy-server-js','replaceHTML', 'copy-css', 'build']);
