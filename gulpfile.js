var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var wrap = require("gulp-wrap");
var eventStream = require('event-stream');
var streamqueue = require('streamqueue');

var rjs = require('gulp-requirejs');
var insert = require('gulp-insert');

//loaderScript
gulp.task('loader', function () {

    var stream1 = gulp.src('./lib/esl.js').pipe(uglify({ preserveComments: 'some' }));
    var stream2 = gulp.src('./adsLoader.js').pipe(uglify({ preserveComments: 'some' }));;

    //wrap adsLoader with 
    stream2.pipe(wrap('(function(){\n var require = cbgAds_1230.require; \n var define = cbgAds_1230.define;\n<%= contents %>\n}());'));

    streamqueue({ objectMode: true }, stream1, stream2)
               .pipe(concat('adsLoader.js'))
               .pipe(gulp.dest('./build/'));

});


gulp.task('require', function () {

    gulp.src('./')
       //.pipe(rjs({
       //    baseUrl: './',
       //    out: 'all_delay.js',
       //    optimize: 'none',
       //    mainConfigFile: 'config.js',   //项目的 config.js 用于配置是否依赖jquery，别名，等
       //    optimizeAllPluginResources: true,   //打包html模板
       //    stubModules: ['text', 'normalize'],  //上线不依赖 require-text插件
       //    preserveLicenseComments: true, //
       //    findNestedDependencies: true,    //保证依赖全部打包进来
       //    pragmasOnSave: {
       //        excludeRequireCss: true
       //    }//,
       //    //wrap: {
       //    //    start: "var cbgAds_1230 = (function () {",
       //    //    end: "\n return { require: require, define: define }; \n}());"
       //    //}
       //}))
        .pipe(rjs({
            baseUrl: './',
            out: 'all.js',
            optimize: 'none',
            include: ["bower_components/jquery/dist/jquery.min", 'site/main'],
            mainConfigFile: 'config.js',   //项目的 config.js 用于配置是否依赖jquery，别名，等
            optimizeAllPluginResources: true,   //打包html模板
            stubModules: ['text', 'normalize'],  //上线不依赖 require-text插件
            preserveLicenseComments: true, //
            findNestedDependencies: true,    //保证依赖全部打包进来
            pragmasOnSave: {
                excludeRequireCss: true
            },
            wrapShim: true,
            //wrap: {
            //    start: "var cbgAds_1230 = (function () {",
            //    end: "\n return { require: require, define: define }; \n}());"
            //}
        }))
        //.pipe(uglify())
        //.pipe(insert.prepend('/*! Copyright 2014 Baidu Inc. All Rights Reserved. */'))
        //.pipe(wrap('(function(){\n var require = cbgAds_1230.require; \n var define = cbgAds_1230.define;\n<%= contents %>\n}());'))
        .pipe(gulp.dest('build/'));

    //gulp.src('./')
    //   .pipe(rjs({
    //       baseUrl: './',
    //       out: 'init.js',
    //       optimize: 'none',

    //       mainConfigFile: 'config.js',   //项目的 config.js 用于配置是否依赖jquery，别名，等
    //       optimizeAllPluginResources: true,   //打包html模板
    //       stubModules: ['text', 'normalize'],  //上线不依赖 require-text插件
    //       preserveLicenseComments: true, //
    //       findNestedDependencies: true,    //保证依赖全部打包进来
    //       pragmasOnSave: {
    //           excludeRequireCss: true
    //       },
    //       wrap: true
    //   }))
    //   //.pipe(wrap('(function(){\n var require = cbgAds_1230.require; \n var define = cbgAds_1230.define;\n<%= contents %>\n}());'))
    //   .pipe(gulp.dest('build/site'));

});


gulp.task('run', ['require', 'loader']);


var tmodjs = require('gulp-tmod');

gulp.task('tmod-convert', function () {
 
    return gulp.src('templates/*.html')
          .pipe(tmodjs({
              base: 'templates/',
              output: 'templatesamd',
              compress: false,
              type: 'cmd',
              minify: false
          }));

});



gulp.task('tmod-script', function () {

    return gulp.src('inject/*.html')
          .pipe(tmodjs({
              base: 'inject/',
              output: 'build',
              compress: false,
              type: 'default',
              minify: false
          }));

});