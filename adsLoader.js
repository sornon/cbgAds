/*! 
author: https://github.com/21paradox
广告位加载器
*/

var require = cbgAds_1230.require,
    define = cbgAds_1230.define;

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


cbgAds_1230.done = function () {

    require(['site/delay', 'jquery'], function (init, $) {
        init($);
    });
}

//function loadMultiScripts(scripts, done) {

//    var scripts = ['./delay2.js'];

//    var head = document.getElementsByTagName('head')[0];
//    var loadedCount = 0;

//    for (var i = 0 ; i < scripts.length; i++) {
//        loadScript(scripts[i], loaded);
//    }

//    //加载script
//    function loadScript(url) {
//        var script = document.createElement('script');
//        script.type = 'text/javascript';
//        script.src = url;
//        script.async = true;
//        script.onerror = loaded;

//        if (script.readyState) {
//            script.onreadystatechange = function () {
//                if (this.readyState == 'loaded' || this.readyState == 'complete') {
//                    loaded();
//                }
//            }
//        } else {
//            script.onload = loaded;
//        }
//        head.appendChild(script);
//    }

//    //所有script均加载
//    function loaded() {
//        loadedCount += 1;

//        if (loadedCount === scripts.length) {
//            //done();
//        }
//    }

//    window.parent.cbgAds_1230
//}


//function loadIframe(url, id) {

//    var iframe = document.createElement('iframe');
//    (iframe.frameElement || iframe).style.cssText = "display:none";
//    iframe.src = "javascript:false";
//    var where = document.getElementsByTagName('script')[0];
//    where.parentNode.insertBefore(iframe, where);
//    var doc = (iframe.contentWindow.document || iframe.contentDocument);

//    doc.open().write('<body onload="(' + loadMultiScripts.toString() + '(window.parent.))">');
//    doc.close();

//}



