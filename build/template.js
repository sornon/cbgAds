/*TMODJS:{"version":"1.0.0"}*/
!function() {
    function template(filename, content) {
        return (/string|function/.test(typeof content) ? compile : renderFile)(filename, content);
    }
    function toString(value, type) {
        return "string" != typeof value && (type = typeof value, "number" === type ? value += "" : value = "function" === type ? toString(value.call(value)) : ""), 
        value;
    }
    function escapeFn(s) {
        return escapeMap[s];
    }
    function escapeHTML(content) {
        return toString(content).replace(/&(?![\w#]+;)|[<>"']/g, escapeFn);
    }
    function each(data, callback) {
        if (isArray(data)) for (var i = 0, len = data.length; len > i; i++) callback.call(data, data[i], i, data); else for (i in data) callback.call(data, data[i], i);
    }
    function resolve(from, to) {
        var DOUBLE_DOT_RE = /(\/)[^/]+\1\.\.\1/, dirname = ("./" + from).replace(/[^/]+$/, ""), filename = dirname + to;
        for (filename = filename.replace(/\/\.\//g, "/"); filename.match(DOUBLE_DOT_RE); ) filename = filename.replace(DOUBLE_DOT_RE, "/");
        return filename;
    }
    function renderFile(filename, data) {
        var fn = template.get(filename) || showDebugInfo({
            filename: filename,
            name: "Render Error",
            message: "Template not found"
        });
        return data ? fn(data) : fn;
    }
    function compile(filename, fn) {
        if ("string" == typeof fn) {
            var string = fn;
            fn = function() {
                return new String(string);
            };
        }
        var render = cache[filename] = function(data) {
            try {
                return new fn(data, filename) + "";
            } catch (e) {
                return showDebugInfo(e)();
            }
        };
        return render.prototype = fn.prototype = utils, render.toString = function() {
            return fn + "";
        }, render;
    }
    function showDebugInfo(e) {
        var type = "{Template Error}", message = e.stack || "";
        if (message) message = message.split("\n").slice(0, 2).join("\n"); else for (var name in e) message += "<" + name + ">\n" + e[name] + "\n\n";
        return function() {
            return "object" == typeof console && console.error(type + "\n\n" + message), type;
        };
    }
    var cache = template.cache = {}, String = this.String, escapeMap = {
        "<": "&#60;",
        ">": "&#62;",
        '"': "&#34;",
        "'": "&#39;",
        "&": "&#38;"
    }, isArray = Array.isArray || function(obj) {
        return "[object Array]" === {}.toString.call(obj);
    }, utils = template.utils = {
        $helpers: {},
        $include: function(filename, data, from) {
            return filename = resolve(from, filename), renderFile(filename, data);
        },
        $string: toString,
        $escape: escapeHTML,
        $each: each
    }, helpers = template.helpers = utils.$helpers;
    template.get = function(filename) {
        return cache[filename.replace(/^\.\//, "")];
    }, template.helper = function(name, helper) {
        helpers[name] = helper;
    }, "function" == typeof define ? define(function() {
        return template;
    }) : "undefined" != typeof exports ? module.exports = template : this.template = template, 
    /*v:5*/
    template("script", function($data) {
        "use strict";
        var $utils = this, $escape = ($utils.$helpers, $utils.$escape), placeName = $data.placeName, width = $data.width, height = $data.height, placeId = $data.placeId, $out = "";
        return $out += "<!--广告位：", $out += $escape(placeName), $out += ' 请粘贴到广告位所在位置-->\r\n<div class="cbg-Ads"\r\n     style="display:inline-block;width:', 
        $out += $escape(width), $out += "px;height:", $out += $escape(height), $out += 'px"\r\n     data-place-id="', 
        $out += $escape(placeId), $out += "\"></div>\r\n\r\n<script>\r\n    //代码：每个页面只需投放一次,放在页面最后\r\n    (function (window) {\r\n\r\n        if (window['_cbgAds']) {\r\n            return;\r\n        }\r\n\r\n        var loadScript = function () {\r\n            var script = document.createElement('script');\r\n            script.async = true;\r\n            script.src = '//cp01-rdqa-dev368.cp01.baidu.com:8884/all.js';\r\n            document.body.appendChild(script);\r\n        }\r\n\r\n        var iframe = document.createElement('iframe');\r\n        (iframe.frameElement || iframe).style.cssText = \"display:none\";\r\n        iframe.src = \"javascript:false\";\r\n        iframe.setAttribute('id', 'cbgAdsRuntime');\r\n        document.body.appendChild(iframe);\r\n\r\n        var doc = (iframe.contentWindow.document || iframe.contentDocument);\r\n        doc.open().write('<body onload=\"(' + loadScript.toString() + '())\">');\r\n        doc.close();\r\n        window['_cbgAds'] = true;\r\n\r\n    }(window));\r\n</script>\r\n", 
        new String($out);
    });
}();