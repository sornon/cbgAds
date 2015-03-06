/*TMODJS:{"version":10,"md5":"7471a7a4dca9c732ae44dd346fb69cc1"}*/
define(function(require) {
    return require("./template")("view1", function($data) {
        "use strict";
        var $utils = this, $escape = ($utils.$helpers, $utils.$escape), link = $data.link, $out = "";
        return $out += '<div style="position: relative">\r\n    <div flashwrap style="position: relative; z-index: 1;"></div>\r\n\r\n    <iframe src="javascript:\'\'" frameborder="0" style="position: absolute; width: 1000px; height: 224px; top: 0px; left: 0px;display: block"></iframe>\r\n    <a href="', 
        $out += $escape(link), $out += '" target="_blank" style="position: absolute; width: 1000px; height: 224px; top: 0px; left: 0px;display: block;z-index:999"></a>\r\n</div>\r\n', 
        new String($out);
    });
});