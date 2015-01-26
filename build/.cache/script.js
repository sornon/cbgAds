/*TMODJS:{"version":6,"md5":"e011063ad06ddac4e1330bc443b8eefe"}*/
template('script',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,placeName=$data.placeName,width=$data.width,height=$data.height,placeId=$data.placeId,$out='';$out+='﻿<!--广告位：';
$out+=$escape(placeName);
$out+=' 请粘贴到广告位所在位置-->\r\n<div class="cbg-Ads"\r\n     style="display:inline-block;width:';
$out+=$escape(width);
$out+='px;height:';
$out+=$escape(height);
$out+='px"\r\n     data-place-id="';
$out+=$escape(placeId);
$out+='"></div>\r\n\r\n<script>\r\n    //代码：每个页面只需投放一次,放在页面最后\r\n    (function (e) {\r\n        if (e._cbgAds) return;\r\n        var t = function () { var e = document.createElement(\'script\'); e.async = true, e.src = \'//static.pay.baidu.com/resource/ads/all.js\', document.body.appendChild(e) },\r\n        n = document.createElement("iframe"); (n.frameElement || n).style.cssText = "display:none", n.src = "javascript:false",\r\n        n.setAttribute("id", "cbgAdsRuntime"), document.body.appendChild(n);\r\n        var c = n.contentWindow.document || n.contentDocument; c.open().write(\'<body onload="(\' + t + \'())">\'), c.close(), e._cbgAds = !0\r\n    }(window));\r\n</script>\r\n';
return new String($out);
});