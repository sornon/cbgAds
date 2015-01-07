/*
@author: https://github.com/21paradox
广告位加载器
*/

//win是顶层的 window对象
//var win = window == top ? window : top;

define('window', [], function () {
    return window == top ? window : top;
});

//如果有jquery 而且 jquery 版本大于1.7，就用页面上的 jquery, 否则使用打包好的jquery
//if (win.jQuery && win.jQuery.fn.on) {

//    define('jquery', [], function () {
//        return win.jQuery;
//    });

//}


require.config({
    baseUrl: 'http://localhost:54653/',
    paths: {
        'jquery': 'bower_components/jquery/dist/jquery.min',
        'swfobject': 'bower_components/swfobject/swfobject/src/swfobject'
    },
    shim: {
        'swfobject': {
            exports: 'swfobject'
        }
    }

    //waitSeconds: 2,
    //map: {
    //    // '*' means all modules will get 'jquery-private'
    //    // for their 'jquery' dependency.
    //    '*': { 'jquery': 'jquery-private' },

    //    // 'jquery-private' wants the real jQuery module
    //    // though. If this line was not here, there would
    //    // be an unresolvable cyclic dependency.
    //    'jquery-private': { 'jquery': 'jquery' }
    //}
});

// http://requirejs.org/docs/jquery.html#noconflictmap
// and the 'jquery-private' module, in the
// jquery-private.js file:
//define('jquery-private', ['jquery'], function (jq) {
//    return jq.noConflict(true);
//});


require(['site/init'], function (init) {
    main = init();
});


