/*TMODJS:{"version":1,"md5":"596721ddfa776e52357e63e29b905487"}*/
define(function(require) {
    return require("./template")("dp", function($data) {
        "use strict";
        var $utils = this, $escape = ($utils.$helpers, $utils.$escape), name = $data.name, $out = "";
        return $out += "<title>", $out += $escape(name), $out += '</title>\r\n<script>\r\n// pc和mobile端会稍有不同，必须严格按照该文档来部署\r\nvoid function(g,f,j,c,h,d,b){g.alogObjectName=h,g[h]=g[h]||function(){(g[h].q=g[h].q||[]).push(arguments)},g[h].l=g[h].l||+new Date,d=f.createElement(j),d.async=!0,d.src=c,b=f.getElementsByTagName(j)[0],b.parentNode.insertBefore(d,b)}(window,document,"script","http://img.baidu.com/hunter/alog/alog.min.js","alog");void function(){function c(){return;}window.PDC={mark:function(a,b){alog("speed.set",a,b||+new Date);alog.fire&&alog.fire("mark")},init:function(a){alog("speed.set","options",a)},view_start:c,tti:c,page_ready:c', 
        new String($out);
    });
});