$(document).ready(function() {

    $('body').on('click', '.secret', function() {
        $('.popup-overlay').fadeIn(600);
        $('#b').fadeIn(600);
    });

    // uncomment this line for snow
    // particlesJS.load('first', 'https://csclub.sice.indiana.edu/assets/scripts/vendor/snow.json', function() {});

});
