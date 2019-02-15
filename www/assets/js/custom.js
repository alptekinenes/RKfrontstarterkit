// Tooltip
$(function() {
    $('[data-toggle="tooltip"]').tooltip();
});

// Popover
$(function() {
    $("[data-toggle=popover]").popover()
});

// Wow effected web elements
$(window).on('load', function(e) {
    new WOW().init();
});

// Lazy load
jQuery(function($) {
    $("[data-src],[data-bg],.lazy").lazyLoadXT({
        // options optional
    });
});

// Sticky functions
let footerBottomAdjust = $("footer").height() + 50;

$(".sticky-top-0").sticky({
    topSpacing: 0
});

$(".sticky-top-10").sticky({
    topSpacing: 10,
    bottomSpacing: footerBottomAdjust
});

$(".sticky-top-20").sticky({
    topSpacing: 20,
    bottomSpacing: footerBottomAdjust
});

$(".sticky-top-30").sticky({
    topSpacing: 30,
    bottomSpacing: footerBottomAdjust
});

$(".sticky-top-40").sticky({
    topSpacing: 40,
    bottomSpacing: footerBottomAdjust
});

$(".sticky-top-50").sticky({
    topSpacing: 50,
    bottomSpacing: footerBottomAdjust
});

$(".sticky-top-60").sticky({
    topSpacing: 60,
    bottomSpacing: footerBottomAdjust
});

$(".sticky-top-70").sticky({
    topSpacing: 70,
    bottomSpacing: footerBottomAdjust
});

$(".sticky-top-80").sticky({
    topSpacing: 80,
    bottomSpacing: footerBottomAdjust
});

$(".sticky-top-90").sticky({
    topSpacing: 90,
    bottomSpacing: footerBottomAdjust
});

$(".sticky-top-100").sticky({
    topSpacing: 100,
    bottomSpacing: footerBottomAdjust
});

// Check target click
$("html").click(function(event) {
    if (!$(event.target).is(".ex *")) {
        //
    } else {
        //
    }
});

// Dynamic background
$(".shbg").each(function() {
    let attr = $(this).attr("data-shbg");
    if (typeof attr !== typeof undefined && attr !== false) {
        $(this).css("background-image", "url(" + attr + ")");
    }
});

// Trunk8 - cut text line
function cutline() {
    $(".cut-1-line").trunk8({
        lines: 1
    });
    $(".cut-2-line").trunk8({
        lines: 2
    });
    $(".cut-3-line").trunk8({
        lines: 3
    });
    $(".cut-4-line").trunk8({
        lines: 4
    });
    $(".cut-5-line").trunk8({
        lines: 5
    });
}

$(window).on('load', function() {
    cutline();
});

$(window).on('resize', function() {
    cutline();
});

// Object fit pollyfill
$(function() {
    objectFitImages();
});

// Public mobile functions
$(window).bind('DOMContentLoaded load resize', function() {
    if ($(window).innerWidth() <= 992) {
        //
    } else {
        //
    }
});

// Fastclick
window.addEventListener('load', function() {
    new FastClick(document.body);
}, false);