define(['jquery',
        'window',
        'site/jquery-swfobject',
        'site/service',
        'require',
        'templatesamd/view0',
        'templatesamd/view1'], function ($, window, swfobject, service, require) {

   /*
      before you start
      注意ie6的一些问题

    */

 

    return function () {
 
       //var content = $('<div />').appendTo(window.document.body);

        //swfobject.embedSWF("http://static.googleadsserving.cn/pagead/imgad?id=CICAgKDjo7_CMhCsAhj6ATII_OC2zb4J2bw",
        //swfobject.embedSWF(" http://test.gtcdn.gaitu.cn/delay.swf",
           
        //    content[0],
        //    "900",
        //    "250",
        //    "9.0.0",
        //    "expressInstall.swf",
        //    {
        //        clickTAG: "http://www.googleadservices.com/pagead/aclk%3Fsa%3DL%26ai%3DCCb-_95WsVLPoOYLH9AWmyYHYCsuOx5YG2-nn5P0BwI23ARABIOrgvh5gnbnQgZAFoAGr9IH6A8gBBKkCQ1H3KEyahT6oAwGqBJYBT9BaRgpuCL5JG-ZyVWEBdFx_1CBYaNbcsebIcKQjQUDommOXGORsnu69Mb48wC0uaNqPvPLTfE2YT9amTXkDl9sFT2MffG4ZxmLyWiLpsMaBDirLnRjxSVJl011eAEc7xgaks3ZkaxSJD6UN2CmKHtTO8RyvoA-tw2P6zetXtmNkalefyNm5yJO87oSmsqG8Th2XaXWuiAYBoAYEgAe7n4Ag%26num%3D1%26cid%3D5GhW16lbBk7UrexLSSMRG4lv%26sig%3DAOD64_2Hy6QtsyryKFpRHvC4tmH1UyNFRw%26client%3Dca-pub-7090564139599510%26adurl%3Dhttp://www.ef.com.cn/online/lp/cn/2014yr/ee/131226_lp_master.aspx%253Fctr%253Dcn%2526ptn%253Dsmgg%2526etag%253Dsmgg-bj-aliceltd-image-dco",
        //        bannerSID: "http://img3.tbcdn.cn/tfscom/T1eiCQFuReXXXgzXjX.xml"
        //    },
        //    {
        //        loop: true,
        //        menu: true,
        //        wmode: 'direct',

        //    });

        //function loadScript(url, loaded) {
        //    var script = document.createElement('script');
        //    script.type = 'text/javascript';
        //    script.src = url;
        //    script.async = true;
        //    //script.onerror = loaded;

        //    if (script.readyState) {
        //        script.onreadystatechange = function () {
        //            if (this.readyState == 'loaded' || this.readyState == 'complete') {
        //                loaded();
        //            }
        //        }
        //    } else {
        //        script.onload = loaded;
        //    }
        //    window.document.body.appendChild(script);
        //}


        //loadScript('//cbjs.baidu.com/js/m.js', function () {
           

        //});


        //service.getMjs().done(function () {

        //    //window.BAIDU_CLB_fillSlotAsync('923533', 'BAIDU_CLB_AD_IFRAME_923533'); // pb页顶部网盟广告

        //    //如果 cbgAds 里面有被注入的方法
        //    if ($.isArray(window.cbgAds)) {

        //        $.each(window.cbgAds, function (index, fn) {

        //            if (!$.isFunction(fn)) {
        //                return;
        //            }

        //            var params = service.getFnParam(fn);
        //            var paramsToCall = $.map(params, function (param) {
        //                return window[param];
        //            });

        //            fn.apply(null, paramsToCall);

        //        });

        //        setTimeout(function () {

        //            //http://stackoverflow.com/questions/2381336/detect-click-into-iframe-using-javascript
        //            //http://www.baidu.com/dan.php?c=IZ0qn
        //            //http://www.baidu.com/cpro.php?izRK00jJey_YLl2-2V

        //            var overiFrame = false;

        //            _$('#ad-banner iframe').hover(function () {
        //                overiFrame = !overiFrame;
        //            });


        //            $(window).blur(function () {
        //                if (overiFrame) {
        //                    console.log('link');
        //                }
        //            })

        //        }, 1000)

        //    }

        //});


        function check(num) {

            if ($.isNumeric(num)) {
                if (parseInt(num) < num && parseInt(num + 1) > num) {
                    return true;
                }
                return false;
            }
            return false;
        }


        //var content = $('<div />').appendTo(window.document.body);

        // swfobject.embedSWF(" http://test.gtcdn.gaitu.cn/delay.swf",

        //    content[0],
        //    "900",
        //    "250",
        //    "9.0.0",
        //    "expressInstall.swf",
        //    {
        //        clickTAG: "http://www.googleadservices.com/pagead/aclk%3Fsa%3DL%26ai%3DCCb-_95WsVLPoOYLH9AWmyYHYCsuOx5YG2-nn5P0BwI23ARABIOrgvh5gnbnQgZAFoAGr9IH6A8gBBKkCQ1H3KEyahT6oAwGqBJYBT9BaRgpuCL5JG-ZyVWEBdFx_1CBYaNbcsebIcKQjQUDommOXGORsnu69Mb48wC0uaNqPvPLTfE2YT9amTXkDl9sFT2MffG4ZxmLyWiLpsMaBDirLnRjxSVJl011eAEc7xgaks3ZkaxSJD6UN2CmKHtTO8RyvoA-tw2P6zetXtmNkalefyNm5yJO87oSmsqG8Th2XaXWuiAYBoAYEgAe7n4Ag%26num%3D1%26cid%3D5GhW16lbBk7UrexLSSMRG4lv%26sig%3DAOD64_2Hy6QtsyryKFpRHvC4tmH1UyNFRw%26client%3Dca-pub-7090564139599510%26adurl%3Dhttp://www.ef.com.cn/online/lp/cn/2014yr/ee/131226_lp_master.aspx%253Fctr%253Dcn%2526ptn%253Dsmgg%2526etag%253Dsmgg-bj-aliceltd-image-dco",
        //        bannerSID: "http://img3.tbcdn.cn/tfscom/T1eiCQFuReXXXgzXjX.xml"
        //    },
        //    {
        //        loop: true,
        //        menu: true,
        //        wmode: 'direct',

        //    });




        var _$ = $.proxy($.fn.find, $(window.document));

        //var $ads = $(window.document).find('.cbg-Ads');

        var referrer = window.document.referrer;

        function addDomain(src) {

            if (src.match('^\/[^/].+')) { //match /asdsad/这样的 //baidu.com 和 http://baidu.com 都不match
                return '//adp.baidu.com' + src
            }
            return src;
        }


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

                    //if (data.content['0'].src.match('^\/[^/].+')) { //match /asdsad/这样的 //baidu.com 和 http://baidu.com 都不match
                    //    data.content['0'].src = '//adp.baidu.com' + data.content['0'].src;
                    //}

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

                    var outHtml = require('templatesamd/view1')(content);

                    var div = $this.html(outHtml)

                        .find('div[flashwrap]')

                        .flash({
                            swf: 'http://test.gtcdn.gaitu.cn/delay.swf',
                            width: width,
                            height: height,
                            wmode: 'transparent',
                            flashvars: {

                            }
                        });

                    $this.find('iframe').on('click', function () {
                        alert(123);
                    });

                }

            })


            .fail(function () {

            });

        });


    }

});