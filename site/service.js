define(['jquery', 'window'], function ($, window) {

    function getContent(config) {

        //return $.ajax({
        //    //url: 'http://10.205.82.57:8181/rs/adp/launch',
        //    //url: 'http://10.99.31.12:8181/rs/adp/launch',

        //    //url: 'http://adplaunch.baidu.com/rs/adp/launch',
        //    url: 'http://baichuan.baidu.com/rs/adp/launch',
        //    data: {
        //        placeId: config.placeId,
        //        referUrl: config.referUrl
        //    },
        //    dataType: 'jsonp',
        //    cache: false,
        //    timeout: 10000
        //});

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

        //return $.Deferred(function (deferred) {

        //    setTimeout(function () {

        //        deferred.resolve({
        //            "status": true,
        //            "content": {
        //                "1": {
        //                    "title": "thuti",
        //                    "src": "http://test.gtcdn.gaitu.cn/delay.swf",
        //                    "href": "http://www.baidu.com"
        //                }
        //            },
        //            "cru": "http://baichuan.baidu.com/redirecting?key=cGxhY2VJZD0xNDIzNTgxNjAzMzIwJmlkZWFJZD0xNDIzNjQzNTgzMTAyMSZpZGVhVHlwZT0xJnRva2VuPTVhZjM5NWZiLWQ5NjgtNDZmYi1iNjk0LTZhMWNmY2QwYjUyMiZyYW5kb209MzAyZTMwMzI=",
        //            "dsu": "http://baichuan.baidu.com/rs/logger/stat?key=cGxhY2VJZD0xNDIzNTgxNjAzMzIwJmlkZWFJZD0xNDIzNjQzNTgzMTAyMSZpZGVhVHlwZT0xJnRva2VuPTVhZjM5NWZiLWQ5NjgtNDZmYi1iNjk0LTZhMWNmY2QwYjUyMiZyYW5kb209MzAyZTMwMzImaXNEaXM9MQ=="
        //        });


        //    }, 10);

        //});


        return $.Deferred(function (deferred) {

            setTimeout(function () {

                deferred.resolve({
                    "status": true,
                    "content": {
                        // "2": "904459"
                        "2": "u1978671"
                    },
                    "cru": "http://baichuan.baidu.com/redirecting?key=cGxhY2VJZD0xNDIzNTgxNjAzMzIwJmlkZWFJZD0xNDIzNjQzNTgzMTAyMSZpZGVhVHlwZT0xJnRva2VuPTVhZjM5NWZiLWQ5NjgtNDZmYi1iNjk0LTZhMWNmY2QwYjUyMiZyYW5kb209MzAyZTMwMzI=",
                    "dsu": "http://baichuan.baidu.com/rs/logger/stat?key=cGxhY2VJZD0xNDIzNTgxNjAzMzIwJmlkZWFJZD0xNDIzNjQzNTgzMTAyMSZpZGVhVHlwZT0xJnRva2VuPTVhZjM5NWZiLWQ5NjgtNDZmYi1iNjk0LTZhMWNmY2QwYjUyMiZyYW5kb209MzAyZTMwMzImaXNEaXM9MQ=="
                });


            }, 10);

        });



        //return $.Deferred(function (deferred) {

        //    setTimeout(function () {

        //        deferred.resolve({
        //            "status": true,
        //            "content": {
        //                "0": {
        //                    "title": "thuti",
        //                    "src": "http://p2.youxi.bdimg.com/r/image/2015-02-05/890f47de2868c23545cf3597ffc94bf2.jpg",
        //                    "href": "http://www.baidu.com"
        //                }
        //            },
        //            "cru": "http://baichuan.baidu.com/redirecting?key=cGxhY2VJZD0xNDIzNTgxNjAzMzIwJmlkZWFJZD0xNDIzNjQzNTgzMTAyMSZpZGVhVHlwZT0xJnRva2VuPTVhZjM5NWZiLWQ5NjgtNDZmYi1iNjk0LTZhMWNmY2QwYjUyMiZyYW5kb209MzAyZTMwMzI=",
        //            "dsu": "http://baichuan.baidu.com/rs/logger/stat?key=cGxhY2VJZD0xNDIzNTgxNjAzMzIwJmlkZWFJZD0xNDIzNjQzNTgzMTAyMSZpZGVhVHlwZT0xJnRva2VuPTVhZjM5NWZiLWQ5NjgtNDZmYi1iNjk0LTZhMWNmY2QwYjUyMiZyYW5kb209MzAyZTMwMzImaXNEaXM9MQ=="
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

    function logJsonp(logurl, data) {

        return $.ajax({
            url: logurl,
            data: data,
            dataType: 'jsonp',
            cache: false,
            timeout: 1000
        });
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


    var mjsLoaded = false;
    var deferred;


    function getMjs() {

        if (!mjsLoaded) {

            deferred = $.Deferred();

            mjsLoaded = true;

            //loadScript('//cbjs.baidu.com/js/m.js', function () {
            loadScript('//cpro.baidustatic.com/cpro/ui/c.js', function () {

                mjsLoaded = false;
                deferred.reject();

            }, function () {

                deferred.resolve();

            });

        }

        return deferred.promise();
    }


    return {
        getContent: getContent,
        log: log,
        getFnParam: getParamNames,
        getMjs: getMjs,
        logJsonp: logJsonp
    };

});