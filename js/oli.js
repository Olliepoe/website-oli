(function($) {
    "use strict"; // Start of use strict

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: (target.offset().top - 54)
                }, 1000, "easeInOutExpo");
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll-trigger').click(function() {
        $('.navbar-collapse').collapse('hide');
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $('body').scrollspy({
        target: '#mainNav',
        offset: 56
    });

    $('.copyright date').html(new Date().getFullYear());
    var birthday = new Date(1997, 1, 11).getTime();
    var years = new Date(Date.now() - birthday).getUTCFullYear();
    var age =  Math.abs(years - 1970);
    $('.age').append(age + ' jaar');

    $(window).scroll(function() {
        $("#mainNav").toggleClass('navbar-shrink', $("#mainNav").offset().top > 100);
    }).scroll();
})(jQuery); // End of use strict
