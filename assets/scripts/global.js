$(document).ready(function() {

    $('.navbar').hide();
    $('.scroll-down').hide();

    setTimeout(function() {
        $('.big-slide.first .text').animate({opacity: 1, top: '46%'}, 1500, 'easeOutQuart');
    }, 100);
    setTimeout(function() {
        $('.navbar').fadeIn(500);
    }, 500);
    setTimeout(function() {
        $('.navbar').addClass('done');
    }, 1000);
    setTimeout(function() {
        $('.scroll-down').fadeIn(500);
    }, 1200);

    var prevScroll = $(window).scrollTop();

    $(window).scroll(function() {

        var currScroll = $(window).scrollTop();

        if (prevScroll > currScroll) {
            $('.navbar').addClass('show');
        } else {
            $('.navbar').removeClass('show');
        }

        prevScroll = currScroll;

        if ($(window).scrollTop() > 200) {
            $('.navbar').addClass('up');
        } else {
            $('.navbar').removeClass('up');
        }

        if ($(window).scrollTop() > 400) {
            $('.navbar').addClass('sticky');
        } else {
            $('.navbar').removeClass('sticky');
        }

        $('.big-slide').each(function(i, section) {
            if (!$('.big-slide').eq(i).hasClass('first') && !$('.big-slide').eq(i).hasClass('done') && ($(window).scrollTop() + $(window).height()) > $('.big-slide').eq(i).offset().top + 300) {
                setTimeout(function() {
                    $('.big-slide').eq(i).find('.text').animate({opacity: 1, top: '50%'}, 1000);
                    $('.big-slide').eq(i).find('.image-right').animate({opacity: 1, right: '15%'}, 1000);
                    $('.big-slide').eq(i).find('.image-left').animate({opacity: 1, left: '15%'}, 1000);
                }, 200);
                $('.big-slide').eq(i).addClass('done');
            }
        });

    });

    $('body').on('click tap', '.hamburger', function() {
        $(this).toggleClass('is-active');
        // hide
        if ($('.dropdown-menu').hasClass('show')) {
            $('.navbar').removeClass('dropdown');
            if ($(window).scrollTop() > 400) {
                $('.navbar').addClass('sticky');
            }
            $('.dropdown-menu').removeClass('show');
            $('.dropdown-menu').animate({top: '-100%'}, 600, 'easeOutExpo');
            setTimeout(function() {
                $('.dropdown-menu ul li').css('margin-left', '0');
                $('.dropdown-menu ul li').css('opacity', '0');
                $('.dropdown-menu ul li').removeClass('done');
                $('.dropdown-menu').hide();
            }, 600);
        // show
        } else {
            $('.navbar').removeClass('sticky').removeClass('up').addClass('dropdown');
            $('.dropdown-menu').show();
            $('.dropdown-menu').addClass('show');
            $('.dropdown-menu').animate({top: 0}, 600, 'easeOutExpo');
            setTimeout(function() {
                $('.dropdown-menu ul li').each(function(idx) {
                    setTimeout(function() {
                        $('.dropdown-menu ul li').eq(idx).animate({marginLeft: '20px', opacity: 1}, 500, 'easeOutQuart');
                        setTimeout(function() {
                            $('.dropdown-menu ul li').eq(idx).addClass('done');
                        }, 300);
                    }, idx*100);
                });
            }, 180);
        }
    });

    $('body').on('click tap', '.popup-x', function() {
        $(this).parent().fadeOut(600);
        $('.popup-overlay').fadeOut(600);
    });

});
