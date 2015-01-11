define(['mock', 'jquery'], function (Mock, $) {

    Mock.mockjax($);
    Mock.mock(/rs\/adp\/launch/, function () {

        return {
            "status": true,
            "placeId": "1",
            "ideaId": "3",
            "ideaType": 1,
            "token": "",
            "content": {
                "0": {
                    "title": "最终幻想14",
                    "src": "//p2.youxi.bdimg.com/r/image/2014-11-24/7a4dab107d518f07bb18c054d3c42e32.jpg",
                    "href": "//www.baidu.com"
                }
            }
        };


    });

});