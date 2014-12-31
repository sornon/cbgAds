(function(){
 var require = cbgAds_1230.require; 
 var define = cbgAds_1230.define;

define('site/init',['jquery'], function ($) {

    return function ($) {

        console.log($.fn.jquery);
        console.log(window.jQuery.fn.jquery);

    }

 
});
}());