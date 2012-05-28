/* test a.js */

var TESTA = {};
;(function ($) {
    // comment test
    $.path = 'a.js';
    $.func = function () {
        console.log($.path);
    };
    $.more = function () {
        alert(66)
    }

})(TESTA);