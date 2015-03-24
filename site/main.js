/*
@author: https://github.com/21paradox
广告位加载器
*/

// win是父层的 window对象
// window.parent ? window : window.parent;

define('window', [], function () {
    return window == window.parent ? window : window.parent;
});

// document 是父层的document
define('document', ['window'], function (window) {
    return window.document;
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


