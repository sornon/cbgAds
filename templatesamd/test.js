/*TMODJS:{"version":1,"md5":"1fc4b4d8f1674bf11b0abf3acfd2dfd6"}*/
define(function(require) {
    return require("./template")("test", function($data) {
        "use strict";
        var $utils = this, $escape = ($utils.$helpers, $utils.$escape), name = $data.name, age = $data.age, $out = "";
        return $out += "<div>\r\n\r\n    ", $out += $escape(name), $out += "\r\n</div>\r\n\r\n<p>", 
        $out += $escape(age), $out += "</p>", new String($out);
    });
});