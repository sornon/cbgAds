define(['jquery',
        'window',
        'swfobject',
        'site/service',
        'require',
        'templatesamd/view0'], function ($, window, swfobject, service, require) {

    return function () {
 

        //$('<img src = "./delay.jpg" />').on('load', function () {
        //    console.log('abc');
        //    //$(window.document.body).append(this);

        //});

        //var content = $('<div />').appendTo(window.document.body);

        //swfobject.embedSWF("http://static.googleadsserving.cn/pagead/imgad?id=CICAgKDjo7_CMhCsAhj6ATII_OC2zb4J2bw",
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


        //$('<div />', {
        //    id: 'BAIDU_CLB_AD_IFRAME_666982'
        //})
        //    .appendTo('body');

        //$('<div />', {
        //    id: 'BAIDU_CLB_AD_IFRAME_u1825627'
        //})
        //   .appendTo('body');



        //$.getScript('//cbjs.baidu.com/js/m.js')
        //.done(function () {

        //    BAIDU_CLB_fillSlotAsync('666982', 'BAIDU_CLB_AD_IFRAME_666982'); // pb页顶部网盟广告

        //    BAIDU_CLB_fillSlotAsync('u1825627', 'BAIDU_CLB_AD_IFRAME_u1825627');

        //});

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

        var $ads = $(window.document).find('.cbg-Ads');
        var referrer = window.document.referrer;


        $ads.each(function () {

            var $this = $(this);
            var placeId = $this.data('placeId');

            service.getContent({
                placeId: placeId,
                referrer: referrer
            })

            .done(function (data) {

                $this.data('cbgAdsInfo', data);
                var outHtml;

                //view 0
                if (data.content['0']) {

                    outHtml = require('templatesamd/view0')(data.content['0']);

                }

                $this.html(outHtml);

            })

            .fail(function () {

            });

        });

 
      



    }

});