var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var wrap = require("gulp-wrap");
var eventStream = require('event-stream');
var streamqueue = require('streamqueue');

var rjs = require('gulp-requirejs');

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
       .pipe(rjs({
           baseUrl: './',
           out: 'init.js',
           optimize: 'none',
          
           mainConfigFile: 'config.js',   //项目的 config.js 用于配置是否依赖jquery，别名，等
           optimizeAllPluginResources: true,   //打包html模板
           stubModules: ['text', 'normalize'],  //上线不依赖 require-text插件
           preserveLicenseComments: true, //
           findNestedDependencies: true,    //保证依赖全部打包进来
           pragmasOnSave: {
               excludeRequireCss: true
           },
           wrap: true
       }))
       //.pipe(wrap('(function(){\n var require = cbgAds_1230.require; \n var define = cbgAds_1230.define;\n<%= contents %>\n}());'))
       .pipe(gulp.dest('build/site'));

});


gulp.task('run', ['require', 'loader']);
