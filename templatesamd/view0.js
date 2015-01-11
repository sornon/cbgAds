/*TMODJS:{"version":1,"md5":"2247788c80b603fa135cb59d33152aaf"}*/
define(function(require) {
    return require("./template")("view0", function($data) {
        "use strict";
        var $utils = this, $escape = ($utils.$helpers, $utils.$escape), href = $data.href, src = $data.src, title = $data.title, $out = "";
        return $out += '<a href="', $out += $escape(href), $out += '" target="_blank">\r\n    <img src="', 
        $out += $escape(src), $out += '" title="', $out += $escape(title), $out += '" alt="', 
        $out += $escape(title), $out += '" />\r\n</a>\r\n', new String($out);
    });
});