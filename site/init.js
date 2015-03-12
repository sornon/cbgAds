define(function (require, exports, module) {

    var $ = require('jquery'),
        window = require('window'),
        service = require('site/service');

    require('site/jquery-swfobject');


    var _$ = $.proxy($.fn.find, $(window.document));
    var referrer = window.document.referrer;

    function addDomain(src) {

        if (src.match('^\/[^/].+')) { //match /asdsad/这样的 //baidu.com 和 http://baidu.com 都不match
            return '//adp.baidu.com' + src
        }
        return src;
    }

    /*
       before you start
       注意ie6的一些问题
     */

    module.exports = function () {

        _$('.cbg-Ads').each(function () {

            var $this = $(this);
            var placeId = $this.data('placeId');

            service.getContent({
                placeId: placeId,
                referUrl: referrer
            })

            .done(function (data) {

                $this.data('cbgAdsInfo', data);
                var outHtml;

                //view 0
                if (data.status === true && data.content['0']) {

                    data.content['0'].src = addDomain(data.content['0'].src);

                    if (data.cru) {   // 支持新的跳转方式

                        data.content['0'].link = data.cru + '&' + $.param({
                            referUrl: referrer
                        });

                        outHtml = require('templatesamd/view0')(data.content['0']);

                        $this.html(outHtml)

                        .find('img').one('load', function () {

                            service.logJsonp(data.dsu, {
                                referUrl: referrer
                            });
                        });

                    } else {    //支持老的跳转方式

                        data.content['0'].link = data.content['0'].href;
                        outHtml = require('templatesamd/view0')(data.content['0']);

                        $this.on('click', function () {
                            service.log({
                                placeId: data.placeId,
                                ideaId: data.ideaId,
                                ideaType: data.ideaType,
                                token: data.token,
                                _random: data._random,
                                referUrl: referrer
                            });
                        })

                        .html(outHtml)

                        .find('img').one('load', function () {

                            service.log({
                                placeId: data.placeId,
                                ideaId: data.ideaId,
                                ideaType: data.ideaType,
                                token: data.token,
                                _random: data._random,
                                referUrl: referrer,
                                isDis: 1
                            });

                        });
                    }
                }

            })

            .done(function (data) {

                if (data.status === true && data.content['1']) {

                    var content = data.content['1'];

                    // 如果没有domain，增加 adp.baidu.com
                    content.src = addDomain(content.src);

                    // 修改link 增加 referUrl参数
                    content.link = data.cru + '&' + $.param({
                        referUrl: referrer
                    });

                    var width = $this.width();
                    var height = $this.height();

                    content.width = width;
                    content.height = height;

                    var outHtml = require('templatesamd/view1')(content);

                    $this.html(outHtml)

                    .find('div[flashwrap]')

                    .flash({
                        swf: content.src,
                        width: width,
                        height: height,
                        wmode: 'transparent',
                        flashvars: {

                        },
                        hasVersionFail: function (options) {

                            return false; // returning false means the expressInstaller document will not be used
                        }
                    })

                    .end()

                    // shim for ie7
                    .on('mousedown', function (e) {
                        if (e.which === 1) {
                            window.open(content.link);
                        }
                    })
                    // flash 加载成功后发请求
                    .map(function (index, elem) {

                        var flashElement = $(elem).find('object')[0];
                        var count = 0;

                        var interval = window.setInterval(function () {

                            if (count > 10) {
                                window.clearInterval(interval);
                                return;
                            }

                            if (typeof flashElement.PercentLoaded !== 'undefined' && flashElement.PercentLoaded() == 100) {
                                window.clearInterval(interval);

                                service.logJsonp(data.dsu, {
                                    referUrl: referrer
                                });

                                return;
                            }

                            count += 1;

                        }, 1000);

                        return $(elem);
                    });

                }

            })

            .done(function (data) {

                if (data.status === true && data.content['2']) {

                    var slotId = data.content['2'];

                    service.getMjs().done(function () {

                       // window.BAIDU_CLB_fillSlotAsync(slotId, $this[0]);
                        window.BAIDU_CLB_DUP2_fillSlotAsync(slotId, $this[0]);

                    });

                }

            })

            .fail(function () {

            });

        });
    }

});
