define(['jquery', 'window'], function ($, window) {

    return function () {

         //console.log(window.jQuery.fn.jquery);
 

        $('<img src = "./delay.jpg" />').on('load', function () {
            console.log('abc');
            $(window.document.body).append(this);

        });

    }

});