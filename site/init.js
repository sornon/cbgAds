define(function (require, exports, module) {

    var $ = require('jquery'),
        window = require('window'),
        service = require('site/service'),
        alog = require('site/alog');

    require('site/jquery-swfobject');


    var _$ = $.proxy($.fn.find, $(window.document));
    var referrer = window.document.referrer;

    function addDomain(src) {

        if (src.match('^\/[^/].+')) { //match /asdsad/这样的 //baidu.com 和 http://baidu.com 都不match
            return '//adp.baidu.com' + src
        }
        return src;
    }
    // 检测点击事件
    function trackClick($this, data) {

        var overiFrame = false;
        var blurFire = false;

        $this.on({
            mouseenter: function () {
                overiFrame = true;
            },
            mouseleave: function () {

                //hack for firefox/chrome(future)
                setTimeout(function () {
                    overiFrame = false;
                });
            }
        });

        $(window).on('blur', function () {

            if (overiFrame) {

                service.logJsonp(data.cru, {
                    referUrl: referrer
                }, data);

                setTimeout(function () {
                    overiFrame = false;
                     $(window).focus();
                });

             }
        })
            // 过滤出 firefox window
        .filter(function () {
            return /Firefox/.test(window.navigator.userAgent);
        })

        .on('visibilitychange', function () {
 
            if (overiFrame && window.document.hidden) {

                service.logJsonp(data.cru, {
                    referUrl: referrer
                }, data);

            }
        });

        return $this;
    }


    /*
       before you start
       注意ie6的一些问题
     */

    module.exports = function () {

        var adsPromise = _$('.cbg-Ads').map(function () {

            var $this = $(this);
            var placeId = $this.data('placeId');

            return service.getContent({
                placeId: placeId,
                referUrl: referrer
            })

            .done(function (data) {

                $this.data('cbgAdsInfo', data);
                var outHtml;

                //view 0
                if (data.content['0'] || data.content['3']) {

                    var content = data.content['0'] || data.content['3'];

                    content.src = addDomain(content.src);

                    //if (data.cru) {   // 支持新的跳转方式

                    content.link = data.cru + '&' + $.param({
                        referUrl: referrer
                    });

                    outHtml = require('templatesamd/view0')(content);

                    $this.html(outHtml)

                    .find('img').one({
                        load: function () {

                            service.logJsonp(data.dsu, {
                                referUrl: referrer
                            }, data);

                        },
                        error: function () {

                            alog('exception.fire', 'catch', {
                                msg: '广告图片加载失败',
                                path: placeId
                            });
                        }
                    });

                    //} else {    //支持老的跳转方式

                    //    data.content['0'].link = data.content['0'].href;
                    //    outHtml = require('templatesamd/view0')(data.content['0']);

                    //    $this.on('click', function () {
                    //        service.log({
                    //            placeId: data.placeId,
                    //            ideaId: data.ideaId,
                    //            ideaType: data.ideaType,
                    //            token: data.token,
                    //            _random: data._random,
                    //            referUrl: referrer
                    //        });
                    //    })

                    //    .html(outHtml)

                    //    .find('img').one('load', function () {

                    //        service.log({
                    //            placeId: data.placeId,
                    //            ideaId: data.ideaId,
                    //            ideaType: data.ideaType,
                    //            token: data.token,
                    //            _random: data._random,
                    //            referUrl: referrer,
                    //            isDis: 1
                    //        });

                    //    });
                    //}
                }

            })

            .done(function (data) {

                if (data.content['1'] || data.content['4']) {

                    var content = data.content['1'] || data.content['4'];

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
                                }, data);

                                return;
                            }

                            count += 1;

                        }, 1000);

                        return $(elem);
                    });

                }

            })

            .done(function (data) {

                if (data.content['2']) {

                    var name = data.content['2'].idName;
                    var id = data.content['2'].idValue;
                    var src = data.content['2'].jsSrc;
                    var logTimer = $.now();
                    service.getMjs(src).done(function () {
                        if (name === 'cpro_id') {
                            window.BAIDU_CLB_DUP2_fillSlotAsync(id, $this[0]);
                        } else if (name === 'BAIDU_CLB_SLOT_ID') {
                            window.BAIDU_CLB_fillSlotAsync(id, $this[0]);
                        } else if (name === 'FTAPI_slotid') {
                            window._FTAPI_.init(id, { target: $this[0] });
                        }
                        //nginx log
                        service.logGif({
                            action: 'getMjs_done',
                            name: name,
                            placeId: placeId,
                            time : $.now() - logTimer
                        });
                        logTimer = $.now();
                        alog('speed.set', 'c_002', new Date());
                        alog.fire("mark");

                    });

                    var count = 0;
                    var time0 = $.now();

                    var deferred = $.Deferred(function (deferred) {

                        var interval = window.setInterval(function () {

                            if (count > 100) {
                                window.clearInterval(interval);
                                deferred.reject();
                                return;
                            }

                            if ($this.find('iframe').length || $this.find('img').length || $this.find('object').length) {
                                window.clearInterval(interval);

                                //nginx log
                                service.logGif({
                                    action: 'display',
                                    name: name,
                                    placeId: placeId,
                                    time : $.now() - logTimer
                                });
                                service.logJsonp(data.dsu, {
                                    referUrl: referrer
                                }, data);

                                deferred.resolve();
                                return;
                            }

                            count += 1;

                        }, 100);

                    })

                    .fail(function () {

                        //nginx log
                        service.logGif({
                            action: 'getMjs_fail',
                            name: name,
                            placeId: placeId,
                            id: id
                        });
                        alog('cus.fire', 'count', 'z_Error_iframeLoad');

                        if (name === 'cpro_id') {

                        } else if (name === 'BAIDU_CLB_SLOT_ID') {

                            alog('exception.fire', 'catch', {
                                msg: '广告（网盟）加载失败',
                                path: placeId
                            });

                        } else if (name === 'FTAPI_slotid') {

                            alog('exception.fire', 'catch', {
                                msg: '广告（互众）加载失败',
                                path: placeId
                            });

                        }

                        if (id === '994198') {
                            service.logGif({
                                idName: 994198,
                                success: false
                            });
                        }

                    })

                    .done(function () {

                        if (name === 'cpro_id') {

                        } else if (name === 'BAIDU_CLB_SLOT_ID') {
                            alog('cus.fire', 'count', 'z_adsType_wm:success');

                        } else if (name === 'FTAPI_slotid') {
                            alog('cus.fire', 'count', 'z_adsType_hz:success');
                        }

                        if (id === '994198') {
                            service.logGif({
                                idName: 994198,
                                success: true
                            });
                        }

                    })

                    .always(function () {

                        alog('speed.set', 'c_003', new Date());
                        alog.fire("mark");

                        alog('speed.set', 'drt', new Date());

                        if (name === 'cpro_id') {

                        } else if (name === 'BAIDU_CLB_SLOT_ID') {
                            alog('cus.fire', 'time', { z_wmTime: $.now() - time0 });

                        } else if (name === 'FTAPI_slotid') {
                            alog('cus.fire', 'time', { z_hzTime: $.now() - time0 });
                        }
                    });

                    trackClick($this, data);

                }

            })

            .done(function (data) {

                if (data.content['5']) {
                    var html = data.content['5'].str;

                    var $iframe = $('<iframe />', window.document)

                    .attr({
                        src: "javascript:false",
                        width: $this.width(),
                        height: $this.height(),
                        frameBorder: 0,
                        cbgAdsVm: html
                    })

                    .appendTo($this)

                    .on('load', function () {

                        service.logJsonp(data.dsu, {
                            referUrl: referrer
                        }, data);

                    });

                    var doc = $iframe.contents()[0];

                    doc.open();
                    doc.write('<style>*{margin:0;padding0;border:0}</style>');
                    doc.write('<body>' + html + '</body>');
                    doc.close();

                    trackClick($this, data);
                }
            })

            .fail(function () {


            });

        });


    }


});