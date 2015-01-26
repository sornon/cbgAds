define(['jquery'], function ($) {

    function getContent(config) {

        return $.ajax({
            //url: 'http://10.205.82.57:8181/rs/adp/launch',
            //url: 'http://10.99.31.12:8181/rs/adp/launch',

            url: 'http://adplaunch.baidu.com/rs/adp/launch',
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
        //            "ideaType": 1,
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
        var baseUrl = 'http://10.205.82.57:8181/rs/logger/stat?';
        var query = $.param(data);

        img.src = baseUrl + query;
        img.onload = img.onerror = function () {
            img = null;
        };

    }

    return {
        getContent: getContent,
        log: log
    };

});