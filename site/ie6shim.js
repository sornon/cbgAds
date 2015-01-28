
var isIE6 = (window.navigator.userAgent || "").toLowerCase().indexOf("msie 6") !== -1;

if (isIE6 && window == top) {
    //window = top;
    //document = window.document;

    window.document = window.top.document;
}

