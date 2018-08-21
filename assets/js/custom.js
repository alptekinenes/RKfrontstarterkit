$(document).ready(function(e) {
    //tooltip
    $(function() {
        $('[data-toggle="tooltip"]').tooltip();
    });

    //popover yukle
    $(function() {
        $("[data-toggle=popover]").popover()
    });


    //wow efektli objeler - effect div load/animate
    $(window).on('load', function(e) {
        new WOW().init();
    });

    //lazy load
    jQuery(function($) {
        $(".lazy").lazyLoadXT();
        $.lazyLoadXT.onload.addClass = 'animated fadeIn';
    });

    //trunk8
    $('.cut-1-line').trunk8({
        lines: 1
    });
    $('.cut-2-line').trunk8({
        lines: 2,
        fill: '&hellip;'
    });
    $('.cut-3-line').trunk8({
        lines: 3
    });
    $('.cut-4-line').trunk8({
        lines: 4
    });
    $('.cut-5-line').trunk8({
        lines: 5
    });

    //fastclick
    window.addEventListener('load', function() {
        new FastClick(document.body);
    }, false);



});