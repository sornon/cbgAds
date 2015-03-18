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

                    var name = data.content['2'].idName;
                    var id = data.content['2'].idValue;
                    var src = data.content['2'].jsSrc;

                    service.getMjs(src).done(function () {

                        if (name === 'cpro_id') {
                            window.BAIDU_CLB_DUP2_fillSlotAsync(id, $this[0]);
                        } else if (name === 'BAIDU_CLB_SLOT_ID') {
                            window.BAIDU_CLB_fillSlotAsync(id, $this[0]);
                        } else if (name === 'FTAPI_slotid') {
                            window._FTAPI_.init(id, { target: $this[0] });
                        }

                    });

                    var count = 10;

                    var interval = window.setInterval(function () {

                        if (count > 10) {
                            window.clearInterval(interval);
                            return;
                        }

                        if ($this.find('iframe').length || $this.find('img').length || $this.find('object').length) {
                            window.clearInterval(interval);

                            service.logJsonp(data.dsu, {
                                referUrl: referrer
                            });

                            return;
                        }

                        count += 1;

                    }, 200);

                    var overiFrame = false;

                    $this.on({
                        mouseenter: function () {
                            overiFrame = true;
                        },
                        mouseleave: function () {
                            overiFrame = false;
                        }
                    });

                    $(window).on('blur', function () {
                        if (overiFrame) {

                            service.logJsonp(data.cru, {
                                referUrl: referrer
                            });

                        }
                    });

                }

            })

            .done(function (data) {
                if (data.status === true && data.content['3']) {
                    var html = data.content['3'].str;
                    var parent = window.parent.document;
                    var iframe = parent.createElement('iframe');
                    (iframe.frameElement || iframe).style.cssText = "margin:0;padding0;border:0";
                    iframe.src = "javascript:false";
                    iframe.setAttribute('id', 'cbgAdsExt_'+data.content['3'].aid;
                    iframe.width = $this.width();
                    iframe.height = $this.height();
                    iframe.scrolling = 'no';
                    iframe.frameBorder = 0;
                    $this[0].appendChild(iframe);

                    var doc = (iframe.contentWindow.document || iframe.contentDocument);
                    doc.open();
                    var attr = [
                        'compatMode',
                        'currentScript',
                        'pointerLockElement',
                        'activeElement',
                        'characterSet',
                        'readyState',
                        'defaultCharset',
                        'charset',
                        'location',
                        'lastModified',
                        'anchors',
                        'scripts',
                        'forms',
                        'links',
                        'plugins',
                        'embeds',
                        'applets',
                        'images',
                        'head',
                        'cookie',
                        'URL',
                        'domain',
                        'referrer',
                        'title',
                        'designMode',
                        'dir',
                        'contentType',
                        'styleSheets',
                        'defaultView',
                        'documentURI',
                        'xmlStandalone',
                        'xmlVersion',
                        'xmlEncoding',
                        'inputEncoding',
                        'documentElement',
                        'implementation',
                        'doctype',
                        'parentElement',
                        'textContent',
                        'baseURI',
                        'localName',
                        'namespaceURI',
                        'ownerDocument'
                    ];
                    for(var i = 0; i < attr.length; i++){
                        doc[i] = parent[i];
                    }
                    doc.write('<style>*{margin:0;padding0;border:0}</style>');
                    doc.write(html);
                    doc.close();
                }
            })

            .fail(function () {

            });

        });

        $.when.apply(null, adsPromise)

                .done(function () {

                    var mzParams = $.map(arguments, function (val, key) {


                    });


                });


    }

});
