/*! 
author: https://github.com/21paradox
广告位加载器
*/

require.config({
    baseUrl: 'http://localhost:54653/',
    paths: {
        'jquery': 'lib/jquery'
    },
    waitSeconds: 2
});

//如果有jquery 而且 jquery 版本大于1.7，就用页面上的 jquery
if (jQuery && jQuery.fn.on) {

    define('jquery', [], function () {
        return jQuery;
    });

}

require(['site/init', 'jquery'], function (init, $) {
    init($);
});