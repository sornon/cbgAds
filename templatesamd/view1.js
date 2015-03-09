/*TMODJS:{"version":13,"md5":"57c44585f92202c8ca1e82fb048d87b4"}*/
define(function(require) {
    return require("./template")("view1", function($data) {
        "use strict";
        var $utils = this, $escape = ($utils.$helpers, $utils.$escape), link = $data.link, width = $data.width, height = $data.height, $out = "";
        return $out += '<div style="position: relative">\r\n    <div flashwrap></div>\r\n    <a href="', 
        $out += $escape(link), $out += '" target="_blank"\r\n       style="position:absolute;width:', 
        $out += $escape(width), $out += "px; height:", $out += $escape(height), $out += 'px;top:0px;left:0px;display:block;z-index:40">\r\n    </a>\r\n</div>\r\n', 
        new String($out);
    });
});