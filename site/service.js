define(['jquery'], function ($) {

    function getContent(config) {

        //return $.ajax({
        //    url: 'http://172.22.158.10:8080/rs/adp/launch',
        //    data: {
        //        placeId: config.placeId,
        //        referUrl: config.referUrl
        //    },
        //    dataType: 'jsonp',
        //    cache: false,
        //    timeout: 10000
        //});


       

        return $.Deferred(function (deferred) {

            setTimeout(function () {

                deferred.resolve({
                    "status": true,
                    "placeId": "1",
                    "ideaId": "3",
                    "ideaType": 1,
                    "token": "",
                    "content":
                        {
                            "0":
                              { "title": "最终幻想14", "src": "http://p2.youxi.bdimg.com/r/image/2014-11-24/7a4dab107d518f07bb18c054d3c42e32.jpg", "href": "//www.baidu.com" }
                        }
                });

            }, 10);

        });



    }

    return {
        getContent: getContent
    };

});