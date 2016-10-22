/*!***************************************************************************
 *****************************************************************************
 **
 ** Filename    : Gulpfile.js for OpenDataHG6
 **
 *****************************************************************************
 ****************************************************************************/

/**
 ** JSLint overrides
    global document, window, alert, console, require, notify
    jslint nomen: true
    jshint -W117
 **/


(function () {
    // this function is strict...
    'use strict';


    //////////////////////////////////////////////////////////////////////////////
    //
    // Gulp functions/libraries
    //
    //////////////////////////////////////////////////////////////////////////////

    // Include plugins
    const gulp              = require('gulp'),
          autoReload        = require('gulp-auto-reload'),
          browserSync       = require('browser-sync').create(),
          cache             = require('gulp-cache'),
          changed           = require('gulp-changed'),
          changedInPlace    = require('gulp-changed-in-place'),
          chalk             = require('chalk'),
          cleanCss          = require('gulp-clean-css'),
          concat            = require('gulp-concat'),
          csslint           = require('gulp-csslint'),
          del               = require('del'),
          debug             = require('gulp-debug'),
          eventstream       = require('event-stream'),
          fs                = require('fs'),
          gulpLoadPlugins   = require('gulp-load-plugins'),
          gulpif            = require('gulp-if'),
          gutil             = require('gulp-util'),
          http              = require('http'),
          imagemin          = require('gulp-imagemin'),
          jscs              = require('gulp-jscs'),
          jshint            = require('gulp-jshint'),
          leasot            = require('leasot'),
          less              = require('gulp-less'),
          lesshint          = require('gulp-lesshint'),
          lessReporter      = require('gulp-csslint-less-reporter'),
          lessSourcemap     = require('gulp-less-sourcemap'),
          minifyCSS         = require('gulp-minify-css'),
          ngAnnotate        = require('gulp-ng-annotate'),
          notify            = require('gulp-notify'),
          parseFilePath     = require('parse-filepath'),
          path              = require('path'),
          plugins           = gulpLoadPlugins(),
          read              = require('fs').readFileSyn,
          reporter          = require('gulp-less-reporter'),
          reload            = browserSync.reload,
          rename            = require('gulp-rename'),
          rimraf            = require('gulp-rimraf'),
          runSequence       = require('run-sequence'),
          st                = require('st'),
          stripDebug        = require('gulp-strip-debug'),
          sourcemaps        = require('gulp-sourcemaps'),
          spawn             = require('child_process').spawn,
          tap               = require('gulp-tap'),
          taskListing       = require('gulp-task-listing'),
          through           = require('through2'),
          todo              = require('gulp-todo'),
          uglify            = require('gulp-uglify'),
          webserver         = require('gulp-server-livereload'),
          customReporter    = function(file) {
              gutil.log(gutil.colors.cyan(file.csslint.errorCount) +
                        ' errors in ' + gutil.colors.magenta(file.path));
              file.csslint.results.forEach(function(result) {
                  gutil.log(result.error.message+' on line '+result.error.line);
              });
          },

    //////////////////////////////////////////////////////////////////////////////
    //
    // Pathnames to src files
    //
    //////////////////////////////////////////////////////////////////////////////

        paths = {
            app: 'src',
            build: 'build',
            buildFiles: [
                'src/css/allcss.css',
                'src/js/alljs.js',
                'src/lib/*.js',
                'src/css/allcss.min.css',
                'src/js/alljs.min.js',
                'src/json/*.json',
                'src/fonts/*',
                'src/font-awesome/{,/*}*/*',
                'src/*.html',
                'src/partials/{,/*}*/*.html',
                'src/img/*',
                '!src/img/{,/*}/Thumbs.db',
                '!src/img/{,/*}/*.ini'
            ],
            build_html: [
                'build/*.html',
                'build/{,/*}*/*.html'
            ],            
            dev_less: [
                'src/less/main.less',
                'src/less/navbar.less',
                'src/less/footer.less',
                'src/less/sections.less',
                'src/less/uiGrid.less',
                'src/less/*.less',
                '!src/less/variables.less',
                '!src/less/mixins.less'
            ],
            dev_css: [
                'src/css/main.css',
                'src/css/navbar.css',
                'src/css/footer.css',
                'src/css/sections.css',
                '!src/css/vendor.css',
                '!src/css/vendor.min.css',
                '!src/css/allcss.css',
                '!src/css/allcss.min.css'
            ],
            dev_js: [
                'src/js/app.js',
                'src/js/app.config.js',
                'src/js/app.run.js',
                'src/js/misc.js',
                'src/js/controllers/about.controller.js',
                'src/js/controllers/home.controller.js',
                'src/js/controllers/ui.calendar.controller.js',
                'src/js/controllers/*.js',
                'src/js/directives/*.js',
                'src/js/filters/*.js',
                'src/js/services/*.js',
                '!src/js/vendor.js',
                '!src/js/vendor.min.js',
                '!src/js/alljs.js',
                '!src/js/alljs.min.js'
            ],
            dev_html: [
                'src/*.html',
                'src/{,/*}*/*.html'
            ],
            dev_html_partials: [
                'src/partials/{,/*}*/*.html'
            ],
            dist: 'dist',
            distFiles: [
                'build/css/allcss.css',
                'build/css/allcss.min.css',
                'build/js/alljs.js',
                'build/js/alljs.min.js',
                'build/json/*.json',
                'build/fonts/*',
                'build/font-awesome',
                'build/*.html',
                'build/partials/{,/*}*/*.html',
                'build/img/{,/*}*/*',
                'build/favicon.ico',
                'build/apple-touch-icon.png',
                '!build/img/{,/*}/Thumbs.db',
                '!build/img/{,/*}/*.ini'
            ],            
            gulp: [
                'GulpFile.js'
            ],
            pkg: [
                'package.json',
                'bower.json',
                '.jshintrc',
                '.csslintrc'
            ],
            images: [
                'src/favicon.ico',
                'src/apple-touch-icon.png',
                '!src/img/{,/*}/Thumbs.db',
                '!src/img/{,/*}/*.ini'
            ],
            jpg: [
                'src/img/{,/*}/*.jpg'
            ],
            gif: [
                'src/img/{,/*}/*.gif'
            ],
            png: [
                'src/img/{,/*}/*.png'
            ],
            vid: [
                'src/img/{,/*}/*.wmv',
                'src/img/{,/*}/*.mov'
            ],
            json: [
                'src/json/*.json'
            ],
            font_awesome: [
                'src/font-awesome/{,/*}/*'
            ],
            vendor_css: [
                'bower_components/angular-ui/build/angular-ui.css',
                'bower_components/angular-ui-grid/ui-grid.css',
                'bower_components/bootstrap/dist/css/bootstrap.css',
                'bower_components/bootstrap/dist/css/bootstrap-theme.css',
                'bower_components/font-awesome/css/font-awesome.css',
                '!src/css/vendor.css',
                '!src/css/vendor.min.css'
            ],
            vendor_css_map: [
                'bower_components/bootstrap/dist/css/bootstrap.css.map',
                'bower_components/bootstrap/dist/css/bootstrap-theme.css.map',
                'bower_components/font-awesome/css/font-awesome.css.map'
            ],
            vendor_lib: [
                'bower_components/angular-ui/common/module.js',
                'bower_components/angular-ui-bootstrap/src/carousel/carousel.js',
                'bower_components/angular-ui-calendar/src/calendar.js',
                'bower_components/angular-ui-event/dist/event.js',
                'node_modules/angular-ui-grid/ui-grid.js',
                'bower_components/angular-ui-scroll/dist/ui-scroll.js',
                'bower_components/angular-ui-scrollpoint/dist/scrollpoint.js',
                'node_modules/angular-ui-sortable/dist/sortable.js',
                'bower_components/html5shiv/dist/html5shiv.js',
                'bower_components/modernizr/bin/modernizr',
                'bower_components/moment/moment.js',
                'bower_components/respond/js/respond.js',
                '!src/js/vendor.js',
                '!src/js/vendor.min.js'
            ],
            vendor_js: [
                'bower_components/jquery/dist/jquery.js',
                'bower_components/jquery-ui/jquery-ui.js',
                'bower_components/bootstrap/dist/js/bootstrap.js',
                'node_modules/angular/angular.js',
                'node_modules/angular-animate/angular-animate.js',
                'node_modules/angular-bootstrap/ui-bootstrap.js',
                'node_modules/angular-resource/angular-resource.js',
                'bower_components/angular-touch/angular-touch.js',
                'bower_components/angular-ui/build/angular-ui.js',
                'bower_components/angular-ui/build/angular-ui-ieshiv.js',
                'bower_components/angular-ui-router/release/angular-ui-router.js',
                'bower_components/ngAnimate/js/angular.min.js',
                'node_modules/requirejs/require.js',
                'node_modules/underscore/underscore.js',
                '!bower_components/bootstrap/dist/js/npm.js',
                '!src/js/vendor.js',
                '!src/js/vendor.min.js'
            ],
            vendor_js_map: [
                'bower_components/angular/angular.min.js.map',
                'bower_components/angular-animate/angular-animate.min.js.map',
                'bower_components/angular-resource/angular-resource.min.js.map',
                'bower_components/angular-touch/angular-touch.min.js.map',
                'bower_components/jquery/dist/jquery.min.map',
                'bower_components/underscore/underscore-min.map'
            ]
        }

    //////////////////////////////////////////////////////////////////////////////
    //
    // GULP custom functions
    //
    //////////////////////////////////////////////////////////////////////////////

    function errorAlert(error){
        plugins.notify.onError({title: 'Error', message: ' : ^<%= error.message %^>',
            sound: 'Sosumi'})(error); //Error Notification
        console.log(error.toString());//Prints Error to Console
        this.emit('end'); //End function
    };

    function baseFileName(fullFileName){
        if(fullFileName === '') return 'Undefined';
        console.log(fullFileName);
        var farray = ('<%= file.relative %>').split('.');
        return farray[0];
    };

    function pparsePath() {
        return through.obj(function (file, enc, callback) {
            //console.log('file.base : ' + file.base);
            //console.log('file.cwd  : ' + file.cwd);
            //console.log('file.path : ' + file.path);
            console.log('parsePath : ' + path.relative(path.join(file.cwd, file.base), file.path))
            callback();
        });
    }

    function parsePath() {
        return through.obj(function (file, enc, callback) {
            (path.relative(path.join(file.cwd, file.base), file.path));
            callback();
        });
    }
    
    //////////////////////////////////////////////////////////////////////////////
    //
    // GULP supporting tasks
    //
    //////////////////////////////////////////////////////////////////////////////

    // Static server
    //
    // Synchronize any browser attached to this server
    gulp.task('browser-sync', function() {
        browserSync.init({
            server: {
                baseDir: paths.app
            }
        });
    });


    // Check to see if Gulpfile.js was changed
    gulp.task('gulp', function () {
        return gulp.src(paths.gulp)
            // Only get the files that changed since the last time it was run
            .pipe(plugins.changed('last_change', {hasChanged: changed.compareLastModifiedTime}))
            // Report that the file has changed
            .pipe(plugins.notify(' *** file.relative: [<%= file.relative %>] has changed!'))
            // Run the file through the linter
            .pipe(plugins.jshint())
            // Copy to the last_change directory
            .pipe(gulp.dest('last_change'));
            // Resynchronize the browser
            //.pipe(plugins.browserSync.stream());
    });

    // RUN: gulp pkg
    //
    // Check to see if .jshintrc was changed
    gulp.task('pkg', function () {
        return gulp.src(paths.pkg)
            // Only get the files that changed since the last time it was run
            .pipe(plugins.changed('last_change', {hasChanged: changed.compareLastModifiedTime}))
            // Report that the file has changed
            .pipe(plugins.notify(' *** <%= file.relative %> changed!'))
            // Copy to the last_change directory
            .pipe(gulp.dest('last_change'));
            // Resynchronize the browser
            //.pipe(browserSync.stream());
    });

    //////////////////////////////////////////////////////////////////////////////
    //
    // CLEAN - Remove target files and prepare for a new compile
    //
    //////////////////////////////////////////////////////////////////////////////

    // Delete the built files in the src directory.
    gulp.task('clean:src', function (callback) {
        console.log('Cleaning src directories');
        return gulp.src([
                paths.app + '/css/allcss.css',
                paths.app + '/css/allcss.min.css',
                paths.app + '/css/vendor.css',
                paths.app + '/css/vendor.min.css',
                paths.app + '/js/alljs.js',
                paths.app + '/js/alljs.min.js',
                paths.app + '/js/vendor.js',
                paths.app + '/js/vendor.min.js'                
            ], { read: false })
            // Notify that the file is being processed
            .pipe(plugins.debug(' *** <%= file.relative %> is being removed!'))
            // Remove all files in these directories
            .pipe(plugins.rimraf({ force: true }));
    });

    // Delete everything in the build directory.
    gulp.task('clean:build', function (callback) {
        console.log('Cleaning build directories');
        return gulp.src([
                paths.build + '/*'
            ], { read: false })
            // Notify that the file is being processed
            .pipe(plugins.debug(' *** <%= file.relative %> is being removed!'))
            // Remove all files in these directories
            .pipe(plugins.rimraf({ force: true }));
    });

    // Delete everything in the dist directory.
    gulp.task('clean:dist', function () {
        console.log('Cleaning dist directories');
        return gulp.src([
                paths.dist + '/*'
            ], { read: false })
            // Notify that the file is being processed
            .pipe(plugins.debug(' *** <%= file.relative %> is being removed!'))
            // Remove all files in these directories
            .pipe(plugins.rimraf({ force: true }));
    });

    // Clean src, build, and dist directories
    gulp.task('clean', ['clean:dist', 'clean:build', 'clean:src'], function (callback) {
        console.log('Cleaning completed!');
    });

    
    //////////////////////////////////////////////////////////////////////////////
    //
    // TODOS - Read file todo remarks and create an associated Todo.md file
    //
    //////////////////////////////////////////////////////////////////////////////

    // get filenames relative to project root (where your Gulpfile is)
    gulp.task('todos', function (callback) {
        runSequence(
            'todo:dev:less',
            'todo:dev:js',
            callback
        );
    });

    gulp.task('todo:dev:js', function () {
        gulp.src(paths.dev_js)
            // Search for TODO entries in the JS source code
            .pipe(plugins.todo({absolute: true}))
            // Notify that the file is being created
            .pipe(plugins.debug(' *** TODO_js.md being created!'))
            // - output a TODO_js.md with your todos
            .pipe(plugins.todo.reporter('json', {fileName: 'TODO_js.md'}))
            // Create a TODO_js.md in root directory
            .pipe(gulp.dest('./'));
    });

    gulp.task('todo:dev:less', function () {
        gulp.src(paths.dev_less)
            // Search for TODO entries in the LESS source code
            .pipe(plugins.todo({absolute: true}))
            // Notify that the file is being created
            .pipe(plugins.debug(' *** TODO_less.md being created!'))
            // - output a TODO_less.md with your todos
            .pipe(plugins.todo.reporter('json', {fileName: 'TODO_less.md'}))
            // Create a TODO_js.md in root directory
            .pipe(gulp.dest('./'));
    });

    //////////////////////////////////////////////////////////////////////////////
    //
    // LESS files
    //
    //////////////////////////////////////////////////////////////////////////////

    // RUN: gulp dev:less:lint
    //
    // Run each custom less file through the linter
    gulp.task('dev:less:lint', function () {
        return gulp.src(paths.dev_less, {base: paths.app})
            .pipe(plugins.debug( 'dev:less:lint : <%= file.relative %>' ))
            .pipe(lesshint({
                // Options
                // file.lesshint.success = true, // or false
                // file.lesshint.resultCount = 0, // number of results returned by lesshint
                // file.lesshint.results = []; // lesshint results
            }))
            .pipe(lesshint.reporter());
    });

    //////////////////////////////////////////////////////////////////////////////
    //
    // CSS files
    //
    //////////////////////////////////////////////////////////////////////////////

    // RUN: gulp dev:css
    //
    // Compile each custom less file into their respective css file
    gulp.task('dev:css',  ['dev:less:lint'], function () {
        return gulp.src(paths.dev_less)
            // Run the LESS compiler
            .pipe(plugins.less())
            // Determine if the CSS file is identical to the one in the css directory
            .pipe(plugins.changed(paths.app + '/css/', {extension: '.css'}))
            .pipe(plugins.debug( '*** <%= file.relative %> changed!' ))
            // Then write the css file into the src directory
            .pipe(gulp.dest(paths.app + '/css'));
    });

    // RUN: gulp dev:css:map
    //
    // Compile each custom less file into their respective css file
    gulp.task('dev:css:map', ['dev:css'], function () {
        return gulp.src(paths.dev_less)
            // Create the Less sourcemaps for each changed file
            .pipe(plugins.lessSourcemap(
                {sourceMap: {
                    sourceMapRootpath: '/less/' // Optional absolute or relative path to the less files
                }}
            ))
            //.pipe(plugins.changed(paths.app + '/css/', {extension: '.map'}));
            .pipe(plugins.debug( 'dev:css:map : Creating <%= file.relative %>!' ))
            // Then write the map file into the src/css directory
            .pipe(gulp.dest(paths.app + '/css/'));
    });

    // RUN: gulp create_all_css
    //
    // Concatenate all custom css files into a single allcss.css file
    // and store it in the src directory.
    gulp.task('create_all_css', ['dev:css:map'], function () {
        return gulp.src(paths.dev_css)
            .pipe(plugins.debug( 'create_all_css : <%= file.relative %>' ))
            // Concatenate the files together
            .pipe(plugins.concat('allcss.css'))
            .pipe(plugins.changed(paths.app + '/css/', {hasChanged: changed.compareSha1Digest}))
            // Copy the file to the css directory
            .pipe(plugins.debug('Creating allcss.css in the ' + paths.app + '/css directory'))
            .pipe(gulp.dest(paths.app + '/css'));
            //.on('error', gutil.log.onError('Error copying to the directory : <%= error.message %>'))
            // Resynchronize the browser
            //.pipe(browserSync.stream());
    });

    // RUN: gulp create_all_css_map
    //
    // Create a map file for the allcss.css file
    // and store it in the src directory.
    gulp.task('create_all_css_map', ['create_all_css'], function () {
        return gulp.src(paths.app + '/css/allcss.css')
            // Create a Less sourcemap for allcss.css
            .pipe(plugins.lessSourcemap(
                {sourceMap: {
                    sourceMapRootpath: 'css/' // Optional absolute or relative path to the css files
                }}
            ));

    });

    // RUN: gulp minify_all_css
    //
    // Minify the allcss.css file into allcss.min.css and store it
    // in the src directory.
    gulp.task('minify_all_css', ['create_all_css'], function () {
        return gulp.src(paths.app + '/css/allcss.css')
            .pipe(plugins.debug( 'minify_all_css : <%= file.relative %>' ))
            // Initialize the sourcemap for that file
            //.pipe(plugins.sourcemaps.init())
            // Create a minified version of the all inclusive CSS file
            .pipe(plugins.debug('Minifying <%= file.relative %>!'))
            // Minify allcss.css
            .pipe(plugins.cleanCss(
                [
                    {debug: true},
                    {compatibility: 'ie8' },
                    //{sourceMap: {
                    //    sourceMapRootpath: paths.app + '/css/' // Optional absolute or relative path to the css files
                    //}},
                    function(details) {
                        console.log(details.name + ': ' + details.stats.originalSize);
                        console.log(details.name + ': ' + details.stats.minifiedSize);
                    }
                ]
            ))
            //.pipe(plugins.sourcemaps.write())
            // Rename the output filename
            .pipe(plugins.rename('allcss.min.css'))
            .pipe(plugins.debug('Comparing <%= file.relative %> in memory to allcss.min.css'))
            .pipe(plugins.changed(paths.app + '/css/', {hasChanged: changed.compareSha1Digest}))
            // Copy the minified css file to the src/css directory
            .pipe(plugins.notify('Creating <%= file.relative %> in the ' + paths.app + '/css directory'))
            .pipe(gulp.dest(paths.app + '/css/'));

    });

    // RUN: gulp font-awesome
    //
    // Copy all font-awesome files in the src directory into the build directory.
    gulp.task('font-awesome', function () {
        return gulp.src(paths.font_awesome)
            // Only get the files that changed since the last time it was run
            .pipe(plugins.changed(paths.build + '/font-awesome'))
            .pipe(debug('--- <%= file.relative %> changed'))
            // If any of the files have changed, copy them to the build directory
            .pipe(gulp.dest(paths.build + '/font-awesome/'));
            //.on('error', gutil.log('Error copying to the build directory : <%= error.message %>'));
    });

    // RUN: gulp copy_vendor_css_map
    //
    // Copy all vendor css map files into the js directory
    gulp.task('copy_vendor_css_map', function () {
        return gulp.src(paths.vendor_css_map)
            // Only get the files that changed since the last time it was run
            .pipe(plugins.changed(paths.app + '/css/'))
            .pipe(debug('--- <%= file.relative %> changed'))
            // Copy the file into the src/css directory
            .pipe(gulp.dest(paths.app + '/css/'));
    });

    // RUN: gulp copy_vendor_css
    //
    // Copy all vendor css files into the css directory
    gulp.task('copy_vendor_css', ['copy_vendor_css_map'], function () {
        return gulp.src(paths.vendor_css, paths.vendor_css_map)
            // Only get the files that changed since the last time it was run
            .pipe(plugins.changed(paths.app + '/css/'))
            .pipe(debug('--- <%= file.relative %> changed'))
            // Copy the file into the src/css directory
            .pipe(gulp.dest(paths.app + '/css/'));
    });

    // RUN: gulp create_vendor_css
    //
    // Concatenate all vendor css files into a single vendor.css file
    gulp.task('create_vendor_css', ['copy_vendor_css'], function () {
        return gulp.src(paths.vendor_css)
            .pipe(plugins.debug('Concatenating <%=  file.relative %> into vendor.css!'))
            // Concatenate all vendor css files into vendor.css
            .pipe(plugins.concat('vendor.css'))
            // Copy the file into the src/css directory
            .pipe(gulp.dest(paths.app + '/css/'));
    });

    // RUN: gulp minify_vendor_css
    //
    // Minify the vendor css file and store it in the src and build css directories.
    gulp.task('minify_vendor_css', ['create_vendor_css'], function () {
        return gulp.src(paths.app + '/css/vendor.css')
            .pipe(plugins.debug('Minifying ' + paths.app + '/css/vendor.css!'))
            .pipe(plugins.minifyCss())
            // Create a minified version of the all inclusive CSS file
            .pipe(plugins.debug('Renaming <%= file.relative %> to vendor.min.css!'))
            // Rename the output filename
            .pipe(plugins.rename('vendor.min.css'))
            // Copy the minified css file to the src/css directory
            .pipe(gulp.dest(paths.app + '/css/'))
            // Resynchronize the browser
            .pipe(browserSync.stream());
    });

    //////////////////////////////////////////////////////////////////////////////
    //
    // HTML files
    //
    //////////////////////////////////////////////////////////////////////////////

    // RUN: gulp dev:html:lint
    //
    // Run each custom html file through the lint syntax checker
    //.pipe(plugins.jshint.extract('auto|always|never'))
    gulp.task('dev:html:lint', function () {
        return gulp.src(paths.dev_html)
            .pipe(plugins.debug('Linting HTML file <%= file.relative %>'))
            // if extract flag is not defined, the default value is 'auto'
            .pipe(plugins.jshint.extract('auto'))
            // Run the html file through the linter
            .pipe(plugins.jshint())
            // Report any problems using the 'stylish' formatter
            .pipe(plugins.jshint.reporter('jshint-stylish', { verbose: true }));
    });

    // RUN: gulp dev:html
    //
    // Copy each custom html file to the build directory structure
    gulp.task('dev:html', ['dev:html:lint'],function () {
        return gulp.src(paths.dev_html)
            // Only get the files that changed since the last time it was run
            .pipe(plugins.changed(paths.app + '/', {hasChanged: changed.compareLastModifiedTime} ))
            // Idenfity the files that have changed
            .pipe(debug('--- <%= file.relative %> changed'))
            .pipe(plugins.debug('dev:html: *** <%= file.relative %> changed!'))
            // Resynchronize the browser
            .pipe(browserSync.stream());
    });

    //////////////////////////////////////////////////////////////////////////////
    //
    // JS files
    //
    //////////////////////////////////////////////////////////////////////////////

    // RUN: gulp dev:js:lint
    //
    // Run each custom js file through the lint syntax checker
    gulp.task('dev:js:lint', function () {
        return gulp.src(paths.dev_js)
            // Only get the files that changed since the last time it was run
            .pipe(plugins.changed(paths.app + '/js/', {hasChanged: changed.compareLastModifiedTime}))
            // Identify the files being linted
            .pipe(debug('--- <%= file.relative %> changed'))
            // ng-annotate adds and removes AngularJS dependency injection annotations.
            .pipe(plugins.ngAnnotate())
            // Run the file through the linter
            .pipe(plugins.jshint())
            // Report any problems using the 'stylish' formatter
            .pipe(plugins.jshint.reporter('jshint-stylish', { verbose: true }));
            // ng-annotate adds and removes AngularJS dependency injection annotations.
            //.pipe(plugins.ngAnnotate());            
    });

    // RUN: gulp create_all_js
    //
    // Concatenate all custom js files into a single alljs.js file,
    // uglify it, and store it in the src and build js directories.
    gulp.task('create_all_js', ['dev:js:lint'], function () {
        return gulp.src(paths.dev_js)
            .pipe(plugins.debug('<%= path.relative %>'))
            // Remove Debug Code
            //.pipe(notify('Removing debug code from <%= file.relative %>'))
            .pipe(plugins.stripDebug())
            // Initialize sourcemap data
            //.pipe(plugins.sourcemaps.init())
            // Concatenate this js file into the alljs.js file
            .pipe(debug('Concatenating: <%= file.relative %> into alljs.js!'))
            .pipe(plugins.concat('alljs.js'))
            // Save the alljs.js file into the src/js directory
            .pipe(debug('Writine alljs.js to the ' + paths.app + '/js directory'))
            .pipe(gulp.dest(paths.app + '/js/'));
            // Write the sourcemap info for this file
            //.pipe(plugins.sourcemaps.write())
            //.pipe(gulp.dest(paths.app + '/js/'));
    });

    // RUN: gulp minify_all_js
    //
    // Concatenate all custom js files into a single alljs.js file,
    // uglify it, and store it in the src and build js directories.
    gulp.task('minify_all_js', ['create_all_js'], function () {
        return gulp.src(paths.dev_js)
        //return gulp.src(paths.app + '/js/alljs.js')
            .pipe(plugins.jshint('.jshintrc'))
            .pipe(plugins.jshint.reporter('jshint-stylish', { verbose: true }))
            .pipe(plugins.concat('alljs.js'))
            .pipe(gulp.dest(paths.app + '/js/'))
            // Initialize sourcemap for alljs.js
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.rename({suffix: '.min'}))
            .pipe(plugins.uglify({
                preserveComments: 'all'
            })
            .on('error', function (e) {
                gutil.log('uglify (' + e + ') : ' + e.message);
                return this.end();
            }))
            // Write the sourcemap info for this file
            .pipe(plugins.sourcemaps.write())
            .pipe(gulp.dest(paths.app + '/js/'))
            // Resynchronize the browser
            .pipe(browserSync.stream())
            .pipe(notify({ message: 'minify_all_js task complete' }));
    });

    // RUN: gulp copy_vendor_js_map
    //
    // Copy all vendor js map files into the js directory
    gulp.task('copy_vendor_js_map', function () {
        return gulp.src(paths.vendor_js_map)
            // Only get the files that changed since the last time it was run
            .pipe(plugins.changed(paths.app + '/lib/'))
            .pipe(debug('--- <%= file.relative %> changed'))
            // Copy the file into the src/js directory
            .pipe(gulp.dest(paths.app + '/lib/'));
    });

    // RUN: gulp copy_vendor_lib
    //
    // Copy all vendor js files into the js directory
    gulp.task('copy_vendor_lib', function () {
        return gulp.src(paths.vendor_lib)
            //.pipe(notify('Reviewing <%= file.relative %> for changes!'))
            // Only get the files that changed since the last time it was run
            .pipe(plugins.changed(paths.app + '/lib/'))
            .pipe(debug('--- <%= file.relative %> changed'))
            // Copy the file into the src/lib directory
            .pipe(gulp.dest(paths.app + '/lib/'));
    });

    // RUN: gulp create_vendor_js
    //
    // Concatenate all vendor js files into a single vendor.js file
    // and store it in the src js directory.
    gulp.task('create_vendor_js', ['copy_vendor_lib', 'copy_vendor_js_map'], function () {
        return gulp.src(paths.vendor_js)
            //.pipe(notify('Reviewing <%= file.relative %> for inclusion in vendor.js!'))
            .pipe(plugins.concat('vendor.js'))
            .pipe(plugins.changed(paths.app + '/js', {hasChanged: changed.compareLastModifiedTime}))
            .pipe(debug('--- <%= file.relative %> changed'))
            .pipe(gulp.dest(paths.app + '/js/'));
            // Resynchronize the browser
            //.pipe(browserSync.stream());
    });

    // RUN: gulp minify_vendor_js
    //
    // Concatenate all vendor js files into a single vendor.js file,
    // uglify it, and store it in the src and build js directories.
    gulp.task('minify_vendor_js', ['create_vendor_js'], function () {
        return gulp.src(paths.app + '/js/vendor.js')
            .pipe(jshint('.jshintrc'))
            .pipe(jshint.reporter('default'))
            .pipe(concat('vendor.js'))
            .pipe(gulp.dest(paths.app + '/js/'))
            .on('error', gutil.log( 'Error copying to the ' + paths.app + '/js directory : <%= error.message %>'))
            .pipe(rename({suffix: '.min'}))
            .pipe(plugins.uglify( ({
                preserveComments: 'none'
            }).on('error', function(uglify) {
                console.error('uglify: ' + uglify.message + ' on line ' + uglify.line);
                this.emit('end');
            }))
            .on('error', function (e) {
                console.error('uglify: ' + e.message + ' on line ' + e.line);
                return this.end();
            }) )
            .pipe(gulp.dest(paths.app + '/js/'))
            .on('error', gutil.log( 'Error copying to the ' + paths.build + '/js directory : <%= error.message %>'))
            // Resynchronize the browser
            .pipe(browserSync.stream())
            .pipe(notify({ message: 'minify_vendor_js task complete' }));

    });

    //////////////////////////////////////////////////////////////////////////////
    //
    // MISCELLANEOUS - Other files
    //
    //////////////////////////////////////////////////////////////////////////////

    // RUN: gulp json
    //
    // Check to see if new modules were loaded in packages.json or bower.json
    gulp.task('json', function () {
        return gulp.src(paths.json)
            // Only get the files that changed since the last time it was run
            .pipe(plugins.changed(paths.build, {hasChanged: changed.compareLastModifiedTime}))
            .pipe(debug('--- <%= file.relative %> changed!'));

    });


    //////////////////////////////////////////////////////////////////////////////
    //
    // Optimize the images
    //
    //////////////////////////////////////////////////////////////////////////////

    // RUN: gulp jpgs
    //
    // Optimize the jpg images
    gulp.task('jpgs', function () {
        return gulp.src(paths.jpg)
            // Only get the files that changed since the last time it was run
            .pipe(plugins.changed('.'))
            // Optimize video
            .pipe(plugins.cache(plugins.imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })));
    });

    // RUN: gulp gifs
    //
    // Optimize the gif images
    gulp.task('gifs', function () {
        return gulp.src(paths.gif)
            // Only get the files that changed since the last time it was run
            .pipe(plugins.changed('.'))
            // Optimize video
            .pipe(plugins.cache(plugins.imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })));
    });

    // RUN: gulp pngs
    //
    // Optimize the png images
    gulp.task('pngs', function () {
        return gulp.src(paths.png)
            // Only get the files that changed since the last time it was run
            .pipe(plugins.changed('.'))
            // Optimize video
            .pipe(plugins.cache(plugins.imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })));
    });

    // RUN: gulp videos
    //
    // Optimize the videos
    gulp.task('videos', function () {
        return gulp.src(paths.vid)
            .pipe(plugins.changed('.'))
            // Optimize video
            .pipe(plugins.cache(plugins.imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })));
    });

    // RUN: gulp images
    //
    // Optimize all image files
    gulp.task('images', ['pngs', 'videos', 'gifs', 'jpgs'], function () {
        return gulp.src(paths.images)
            .pipe(plugins.changed('.'))
            // Optimize video
            .pipe(plugins.cache(plugins.imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })));
    });

    // RUN: gulp dev
    //
    // Build all custom development components
    gulp.task('dev', ['dev:html', 'minify_all_css', 'minify_all_js'], function () {
        console.log(chalk.yellow("building custom dev files"));
        return gulp.src(paths.app)
            .pipe(browserSync.stream());
    });

    // RUN: gulp vendor
    //
    // Build all custom development components
    gulp.task('vendor', ['font-awesome', 'create_vendor_css', 'create_vendor_js'], function () {
        console.log(chalk.yellow("building vendor files"));
        return ;
    });

    // RUN: gulp src
    //
    gulp.task('src', ['dev', 'vendor', 'json', 'images'], function () {
        console.log(chalk.yellow("building src directory files"));
        return ;
    });

    // RUN: gulp buildFiles
    //
    gulp.task('buildFiles', function () {
        return gulp.src(paths.buildFiles, {base: path.resolve( 'src')} )
            .pipe(plugins.debug(chalk.yellow('file.relative : <%= file.relative %>' )))
            .pipe(plugins.changed(paths.build, {hasChanged: changed.compareLastModifiedTime}))
            .pipe(notify(' -- <%= file.relative %>'))
            .pipe(gulp.dest(paths.build));
    });

    // RUN: gulp distFils
    //
    gulp.task('distFiles', function () {
        return gulp.src(paths.distFiles, {base: path.resolve( 'build')} )
            .pipe(plugins.changed(paths.dist, {hasChanged: changed.compareLastModifiedTime}))
            .pipe(notify(' -- <%= file.relative %>'))
            .pipe(gulp.dest(paths.dist));
    });


    //////////////////////////////////////////////////////////////////////////////
    //
    // Run command sequences
    //
    //////////////////////////////////////////////////////////////////////////////


    // RUN: gulp build
    //
    gulp.task('build', [
    ], function (callback) {
        console.log(chalk.yellow('Starting the build without a pre-cleaning!'));
        runSequence(
            'src',
            'todos',
            'buildFiles',
            callback
        );
    });

    // RUN: gulp dist
    // This copies the files currently in the build directory to the dist directory.
    // The contents of the dist directory is what is copied into production.
    //
    gulp.task('dist', function (callback) {
        console.log(chalk.yellow('Starting dist without a pre-cleaning!'));
        runSequence(
            'distFiles',
            callback
        );
    });

    // RUN: gulp server
    //
    // watch files for changes and reload
    gulp.task('server', function() {
        console.log(chalk.green("\nChanging directories to " + paths.app + "\n" ));
        browserSync.init({
            server: {
                baseDir: paths.app,
                cwd: paths.app
            }
        });
    });

    // RUN: gulp
    //
    // The default task
    gulp.task('default', 
        ['server'], 
        function (callback) {
            runSequence(
                'watch',
                callback
            );
            plugins.reload;
        }
    );

    
    // RUN: gulp help
    //
    gulp.task('help', plugins.taskListing);


    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////
    // RUN: gulp watch
    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////
    //
    // Rerun the task when a file changes
    gulp.task('watch', function () {

        // gulpfile.js
        gulp.watch('gulpfile.js', process.exit);

        gulp.watch(paths.gulp,                      ['gulp'])
            .on('change', browserSync.reload);

        gulp.watch(paths.pkg,                       ['pkg'])
            .on('change', browserSync.reload);

        gulp.watch(paths.gulp, function (file) {
            console.log('---watch activated');
            if (file.type === 'changed') {
                console.log('---watch : file change detected - recompiling ...');
                plugins.autoReload(file.path);
            }
        });

        gulp.watch(
            [
                paths.dev_less,
                paths.app + '/less/variables.less',
                paths.app + '/less/mixins.less',
                paths.vendor_css,
                paths.dev_html,
                paths.dev_js,
                paths.vendor_js
            ],                                      ['src'],
            function (event) {
                console.log('\n gulp watch\t: Event type: '
                    + event.type); // added, changed, or deleted
                console.log('\t\t\t: Event path: '
                    + event.path); // The path of the modified file
            }).on('change', browserSync.reload);
        gulp.watch(paths.json,                      ['json'])
            .on('change', browserSync.reload);
        gulp.watch(paths.jpg,                       ['jpg'])
            .on('change', browserSync.reload);
        gulp.watch(paths.gif,                       ['gif'])
            .on('change', browserSync.reload);
        gulp.watch(paths.png,                       ['png'])
            .on('change', browserSync.reload);
        gulp.watch(paths.vid,                       ['videos'])
            .on('change', browserSync.reload);
        gulp.watch(paths.images,                    ['images'])
            .on('change', browserSync.reload);
    });

}());
