/* test b.js */

var TESTB = {};
;(function ($) {
    // comment test
    $.path = 'b.js';
    $.say = function () {
        alert('hello world')
    }

})(TESTB);