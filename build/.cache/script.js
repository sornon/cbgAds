/*TMODJS:{"version":5,"md5":"969745d1eda1e22bdbd0c5323714d4c8"}*/
template('script',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,placeName=$data.placeName,width=$data.width,height=$data.height,placeId=$data.placeId,$out='';$out+='﻿<!--广告位：';
$out+=$escape(placeName);
$out+=' 请粘贴到广告位所在位置-->\r\n<div class="cbg-Ads"\r\n     style="display:inline-block;width:';
$out+=$escape(width);
$out+='px;height:';
$out+=$escape(height);
$out+='px"\r\n     data-place-id="';
$out+=$escape(placeId);
$out+='"></div>\r\n\r\n<script>\r\n    //代码：每个页面只需投放一次,放在页面最后\r\n    (function (window) {\r\n\r\n        if (window[\'_cbgAds\']) {\r\n            return;\r\n        }\r\n\r\n        var loadScript = function () {\r\n            var script = document.createElement(\'script\');\r\n            script.async = true;\r\n            script.src = \'//cp01-rdqa-dev368.cp01.baidu.com:8884/all.js\';\r\n            document.body.appendChild(script);\r\n        }\r\n\r\n        var iframe = document.createElement(\'iframe\');\r\n        (iframe.frameElement || iframe).style.cssText = "display:none";\r\n        iframe.src = "javascript:false";\r\n        iframe.setAttribute(\'id\', \'cbgAdsRuntime\');\r\n        document.body.appendChild(iframe);\r\n\r\n        var doc = (iframe.contentWindow.document || iframe.contentDocument);\r\n        doc.open().write(\'<body onload="(\' + loadScript.toString() + \'())">\');\r\n        doc.close();\r\n        window[\'_cbgAds\'] = true;\r\n\r\n    }(window));\r\n</script>\r\n';
return new String($out);
});