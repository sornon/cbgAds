/*TMODJS:{"version":2,"md5":"d9e6835a2d99aa03627f20d0b0372884"}*/
define(function(require) {
    return require("./template")("view0", function($data) {
        "use strict";
        var $utils = this, $escape = ($utils.$helpers, $utils.$escape), link = $data.link, src = $data.src, title = $data.title, $out = "";
        return $out += '<a href="', $out += $escape(link), $out += '" target="_blank">\r\n    <img src="', 
        $out += $escape(src), $out += '" title="', $out += $escape(title), $out += '" alt="', 
        $out += $escape(title), $out += '" />\r\n</a>\r\n', new String($out);
    });
});