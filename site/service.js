define(['jquery', 'window'], function ($, window) {

    function getContent(config) {

        return $.ajax({
            //url: 'http://10.205.82.57:8181/rs/adp/launch',
            //url: 'http://10.99.31.12:8181/rs/adp/launch',

            //url: 'http://adplaunch.baidu.com/rs/adp/launch',
            url: 'http://baichuan.baidu.com/rs/adp/launch',
            data: {
                placeId: config.placeId,
                referUrl: config.referUrl
            },
            dataType: 'jsonp',
            cache: false,
            timeout: 10000
        });

        //return $.Deferred(function (deferred) {

        //    setTimeout(function () {

        //        deferred.resolve({
        //            "status": true,
        //            "placeId": "1",
        //            "ideaId": "3",
        //            "ideaType": Math.random(100),
        //            "token": "",
        //            "content":
        //                {
        //                    "0":
        //                      { "title": "最终幻想14", "src": "http://p2.youxi.bdimg.com/r/image/2014-11-24/7a4dab107d518f07bb18c054d3c42e32.jpg", "href": "//www.baidu.com" }
        //                }
        //        });

        //    }, 10);

        //});
    }

    function log(data) {

        var img = new Image();
        //var baseUrl = 'http://10.205.82.57:8181/rs/logger/stat?';
        //var baseUrl = 'http://adplaunch.baidu.com/rs/logger/stat?';
        var baseUrl = 'http://baichuan.baidu.com/rs/logger/stat?';
 
        var query = $.param(data);

        img.src = baseUrl + query;
        img.onload = img.onerror = function () {
            img = null;
        };

    }
    
    //http://stackoverflow.com/questions/1007981/how-to-get-function-parameter-names-values-dynamically-from-javascript
    var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
    var ARGUMENT_NAMES = /([^\s,]+)/g;

    function getParamNames(func) {

        var fnStr = func.toString().replace(STRIP_COMMENTS, '');
        var result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
        if (result === null)
            result = [];
        return result;
    }


    function loadScript(url, error, loaded) {

        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.async = true;
        script.onerror = error;

        if (script.readyState) {
            script.onreadystatechange = function () {
                if (this.readyState == 'loaded' || this.readyState == 'complete') {
                    loaded();
                }
            }
        } else {
            script.onload = loaded;
        }

        window.document.body.appendChild(script);
    }


    function getMjs() {

        return $.Deferred(function (deferred) {

            loadScript('//cbjs.baidu.com/js/m.js', deferred.reject, deferred.resolve);

        });

    }


    return {
        getContent: getContent,
        log: log,
        getFnParam: getParamNames,
        getMjs: getMjs
    };

});