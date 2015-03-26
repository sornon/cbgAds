define(function (require, exports, module) {

    var $ = require('jquery'),
        window = require('window');

    var logIframe = $('<iframe />', window.document)

                .attr({
                    src: "javascript:false",
                    frameBorder: 0,
                    style: "display: none",
                    id: "cbgAdsLog"
                })

                .appendTo(window.document.body);

    var iframedoc = logIframe.contents()[0];

    var dpHtml = require('text!templates/dp.html');

    //cbgAds 监控模块
    iframedoc.open();
    iframedoc.write(dpHtml);
    iframedoc.close();

    var logIframeWindow = logIframe[0].contentWindow;
    var alog = logIframeWindow.alog;

    module.exports = alog;

});