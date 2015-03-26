define(['jquery', 'window', 'site/alog'], function ($, window, alog) {

    var guid = !function {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }()
    function getContent(config) {

        return $.ajax({
            //url: 'http://baichuan.baidu.com/rs/adp/launch',
            url: 'http://5v.baidu.com/rs/adp/launch',
            data: {
                placeId: config.placeId,
                referUrl: config.referUrl
            },
            dataType: 'jsonp',
            cache: false,
            timeout: 10000,
            beforeSend: function (jqXHR, settings) {
                jqXHR.startTime = $.now();
                //nginx log
                service.logGif({
                    action: 'getContent_before',
                    placeId: config.placeId
                });
            }
        })

         .then(function (data, a, jqXHR) {

             var type;
             if (!data.content || !data.status) {
                //nginx log
                service.logGif({
                    action: 'getContent_null',
                    placeId: config.placeId
                });
                return $.Deferred().reject(data);
             }

             // ios 8.1 /ios 8.2 might have errors
             //$.each(data.content, function (key, val) {
             //    data.content.type = key;
             //    type = 'z_launchType' + key;

             //    alert('each each');
             //});

             // https://github.com/jquery/jquery/issues/2145
             var keys = [];
             for (var key in data.content) {
                keys.push(key);
                 data.content.type = key;
                 type = 'z_launchType' + key;
             }
            //nginx log
            service.logGif({
                action: 'getContent_done',
                placeId: config.placeId,
                type:keys.join(',')
            });

             alog('cus.fire', 'count', 'z_launchSuccess');

             if ($.type(type) === 'undefined') {
                 alog('cus.fire', 'count', 'z_launchType_null');

                 alog('exception.fire', 'catch', {
                     msg: 'type无法识别',
                     path: JSON.stringify(data)
                 });

             } else {

                 alog('cus.fire', 'count', type);
             }

             //var url = window.location.href;
             //var arr = url.split("/");
             //var result = arr[0] + "//" + arr[2];

             //if (result === 'http://v.baidu.com') {
             //    alog('cus.fire', 'count', type + '(from:http://v.baidu.com)');
             //}

             var time = $.now() - jqXHR.startTime;
             // 区分 网盟和互众
             if (data.content.type == 2) {

                 if (data.content['2'].idName == 'cpro_id') {
                     alog('cus.fire', 'count', 'z_adsType_wm');
                 } else if (data.content['2'].idName == 'FTAPI_slotid') {
                     alog('cus.fire', 'count', 'z_adsType_hz');
                 }

                 //nginx log
                service.logGif({
                    action: 'getContent_during',
                    placeId: config.placeId,
                    time:time,
                    dspid: data.content['2'].idName
                });
             }

             alog('cus.fire', 'time', { z_launchTime: time });

             alog('speed.set', 'c_001', new Date());
             alog.fire("mark");

             return data;
         })

        .fail(function () {

                 
             //nginx log
            service.logGif({
                action: 'getContent_fail',
                placeId: config.placeId
            });
            alog('cus.fire', 'count', 'z_launchError');

            alog('speed.set', 'c_001', new Date());
            alog.fire("mark");

            alog('speed.set', 'c_002', new Date());
            alog.fire("mark");

            alog('speed.set', 'c_003', new Date());
            alog.fire("mark");

            alog('speed.set', 'drt', new Date());
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

                if (config.placeId == 3) {
                    deferred.resolve({
                        "status": true,
                        "content": {
                            "3": {
                                aid: '3',
                                str: '<script type="text/javascript">var cpro_id = "u1825627";</script><script src="http://cpro.baidustatic.com/cpro/ui/c.js" type="text/javascript"></script>'
                            },
                            type: 3
                        },
                        "dsu": "http://baichuan.baidu.com/rs/logger/stat?key=cGxhY2VJZD0xNDIzNTgxNjAzMzIwJmlkZWFJZD0xNDIzNjQzNTgzMTAyMSZpZGVhVHlwZT0xJnRva2VuPTVhZjM5NWZiLWQ5NjgtNDZmYi1iNjk0LTZhMWNmY2QwYjUyMiZyYW5kb209MzAyZTMwMzImaXNEaXM9MQ=="
                    });
                } if (config.placeId == 4) {

                    deferred.resolve({
                        "status": true,
                        "content": {
                            "3": {
                                aid: '3',
                                str: ' <script>FTAPI_slotid = 1008515</script><script src="http://pic.fastapi.net/sdk/js/a.js" charset="utf-8"></script>'
                            },
                            type: 3

                        },
                        "dsu": "http://baichuan.baidu.com/rs/logger/stat?key=cGxhY2VJZD0xNDIzNTgxNjAzMzIwJmlkZWFJZD0xNDIzNjQzNTgzMTAyMSZpZGVhVHlwZT0xJnRva2VuPTVhZjM5NWZiLWQ5NjgtNDZmYi1iNjk0LTZhMWNmY2QwYjUyMiZyYW5kb209MzAyZTMwMzImaXNEaXM9MQ=="
                    });

  
                } else {
                    //deferred.resolve({
                    //    "status": true,
                    //    "content": {
                    //        //"2": {
                    //        //    idValue: "923533",
                    //        //    idName: "BAIDU_CLB_SLOT_ID",
                    //        //    jsSrc: "http://cbjs.baidu.com/js/m.js"
                    //        //}

                    //        "2": {
                    //            //idValue: "1008346",
                    //            idValue: "1008515",
                    //            idName: "FTAPI_slotid",
                    //            jsSrc: "http://pic.fastapi.net/sdk/js/_a.js"
                    //        },
                    //        type: 2
                    //    },
                    //    "dsu": "http://baichuan.baidu.com/rs/logger/stat?key=cGxhY2VJZD0xNDIzNTgxNjAzMzIwJmlkZWFJZD0xNDIzNjQzNTgzMTAyMSZpZGVhVHlwZT0xJnRva2VuPTVhZjM5NWZiLWQ5NjgtNDZmYi1iNjk0LTZhMWNmY2QwYjUyMiZyYW5kb209MzAyZTMwMzImaXNEaXM9MQ=="
                    //});

                    deferred.resolve({
                        "status": true,
                        "content": {
                            "0": {
                                "title": "thuti",
                                "src": "http://p2.youxi.bdimg.com/r/image/2015-02-05/890f47de2868c23545cf3597ffc94bf2.jpg",
                                "href": "http://www.baidu.com"
                            }
                        },
                        "cru": "http://baichuan.baidu.com/redirecting?key=cGxhY2VJZD0xNDIzNTgxNjAzMzIwJmlkZWFJZD0xNDIzNjQzNTgzMTAyMSZpZGVhVHlwZT0xJnRva2VuPTVhZjM5NWZiLWQ5NjgtNDZmYi1iNjk0LTZhMWNmY2QwYjUyMiZyYW5kb209MzAyZTMwMzI=",
                        "dsu": "http://baichuan.baidu.com/rs/logger/stat?key=cGxhY2VJZD0xNDIzNTgxNjAzMzIwJmlkZWFJZD0xNDIzNjQzNTgzMTAyMSZpZGVhVHlwZT0xJnRva2VuPTVhZjM5NWZiLWQ5NjgtNDZmYi1iNjk0LTZhMWNmY2QwYjUyMiZyYW5kb209MzAyZTMwMzImaXNEaXM9MQ=="
                    });

                }


            }, Math.random() * 300);

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

    function logJsonp(logurl, data, rawData) {

        return $.ajax({
            url: logurl,
            data: data,
            dataType: 'jsonp',
            cache: false,
            timeout: 5000
        })

         .done(function () {
             alog('cus.fire', 'count', 'z_log');
             //alog('cus.fire', 'count', 'z_logType' + rawData.content.type);
         })

        .fail(function () {
            alog('cus.fire', 'count', 'z_logError');
            //alog('cus.fire', 'count', 'z_logType' + rawData.content.type + ':error');
        });

    }



    function logGif(data) {

        var img = new Image();
        var baseUrl = 'http://5v.baidu.com/statistics/tj.gif?';
        var query = $.param(data);

        img.src = baseUrl + query + '&r=' + new Date() + '&guid=' + guid;
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

        var head = window.document.head || $('head', window.document)[0] || window.document.documentElement;
        var script = window.document.createElement('script');

        script.type = 'text/javascript';
        script.src = url;
        script.async = true;
        script.onerror = error;

        //  从jquery script.js 中拷过来
        script.onload = script.onreadystatechange = function (_, isAbort) {

            if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {

                // Handle memory leak in IE
                script.onload = script.onreadystatechange = null;

                // Remove the script
                //if (script.parentNode) {
                //    script.parentNode.removeChild(script);
                //}

                // Dereference the script
                script = null;

                // Callback if not abort
                if (!isAbort) {
                    loaded();
                }
            }
        };

        head.insertBefore(script, head.firstChild);
    }

    // 新建调用script的缓存
    var scriptsCache = {};

    function getMjs(src) {

        var url = src || '//cbjs.baidu.com/js/m.js';

        // 如果有缓存 直接返回 promise
        if (scriptsCache[url]) {
            return scriptsCache[url];
        }

        // 没有缓存 新建一个deferred
        var deferred = $.Deferred();

        loadScript(url, function () {

            // 加载失败 清除缓存
            delete scriptsCache[url];

            deferred.reject();

        }, deferred.resolve);

        var promise = deferred.promise();

        // url里是 promise
        scriptsCache[url] = promise;

        deferred.always(function () {
            alog('speed.set', 'c_002', new Date());
            alog.fire("mark");
        })

       .fail(function () {

           alog('speed.set', 'c_003', new Date());
           alog.fire("mark");

           alog('speed.set', 'drt', new Date());
       });

        return deferred.promise();
    }

    return {
        getContent: getContent,
        log: log,
        getFnParam: getParamNames,
        getMjs: getMjs,
        logJsonp: logJsonp,
        logGif: logGif,
        guid : guid
    };

});