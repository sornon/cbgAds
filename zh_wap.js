var adMshow_122398339327 = false, useAdTicket_122398339327 = false;
(function () {
    usrFr = getFr(freeFr) - 1;
    if (usrFr == "" || usrFr == "undefined" || usrFr == null) { usrFr = 0 }
    var adlist = new Array(994207, 994202, 994203, 994205);

    //document.write('<div id="baidu_dup_' + adlist[usrFr] + '"></div>');
    //替换成 cbg广告位
    document.write('<div class="cbg-Ads" data-place-id=' + adlist[usrFr] + '"></div>');

    //(BAIDU_DUP = window.BAIDU_DUP || []).push(['fillAsync', adlist[usrFr], 'baidu_dup_' + adlist[usrFr]]);
    //替换成 cbg广告位
    (function (e) {
        if (e._cbgAds) return;
        var t = function () { var e = document.createElement('script'); e.async = true, e.src = '//static.pay.baidu.com/resource/ads/all.js', document.body.appendChild(e) },
        n = document.createElement("iframe"); (n.frameElement || n).style.cssText = "display:none", n.src = "javascript:false",
        n.setAttribute("id", "cbgAdsRuntime"), document.body.appendChild(n);
        var c = n.contentWindow.document || n.contentDocument; c.open().write('<body onload="(' + t + '())">'), c.close(), e._cbgAds = !0
    }(window));
})();