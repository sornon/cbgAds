function loadMultiScripts() {

    var scripts = ['./build/all_delay.js'];

    var head = document.getElementsByTagName('head')[0];
    var loadedCount = 0;

    for (var i = 0 ; i < scripts.length; i++) {
        loadScript(scripts[i], loaded);
    }

    //加载script
    function loadScript(url) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.async = true;
        //script.onerror = loaded;

        if (script.readyState) {
            script.onreadystatechange = function () {
                if (this.readyState == 'loaded' || this.readyState == 'complete') {
                    loaded();
                }
            }
        } else {
            script.onload = loaded;
        }
        head.appendChild(script);
    }

    //所有script均加载
    function loaded() {
        loadedCount += 1;

        if (loadedCount === scripts.length) {
            //done && done();
        }
    }
}


function loadIframe(url, id) {

    var iframe = document.createElement('iframe');
    (iframe.frameElement || iframe).style.cssText = "display:none";
    iframe.src = "javascript:false";
    var where = document.getElementsByTagName('script')[0];
    where.parentNode.insertBefore(iframe, where);
    var doc = (iframe.contentWindow.document || iframe.contentDocument);
    //doc.open().write('<body onload="' +
    //    'var js = document.createElement(\'script\');' +
    //    'js.type = \'text/javascript\';' +
    //    'js.async = true;' +
    //    (id ? 'js.id = \'' + id + '\';' : '') +
    //    'js.src = \'' + url + '\';' +
    //    'document.body.appendChild(js);' +
    //    '">');
    //doc.close();

 
    doc.open().write('<body onload="(' + loadMultiScripts.toString() + '())">');
    doc.close();

}

 

//loadMultiScripts(["./delay2.js"]);

loadIframe();

