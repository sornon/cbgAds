/*
@author: https://github.com/21paradox
广告位加载器
*/

// win是顶层的 window对象
// var win = window == top ? window : top;

define('window', [], function () {
    return window == window.parent ? window : window.parent;
});

// document 是顶层的document
define('document', [], function () {
    return window == top ? window.document : top.document;
});




require.config({
    baseUrl: 'http://localhost:54653/',
    paths: {
        'jquery': 'bower_components/jquery/dist/jquery.min',
        'mock': 'bower_components/mockjs/dist/mock'
    }
});


require(['site/init', 'window', 'jquery'], function (init, window, $) {

    $(window.document).ready(function () {
        init();
    });

});


