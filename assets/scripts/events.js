$(document).ready(function() {

    $('body').on('click tap', '#hide-past', function() {
	if ($('.old').css('display') == 'none') {
		$('.old').css('display', 'inline-block');
		$('#hide-past').html('Hide past events');
	} else {
		$('.old').css('display', 'none');
		$('#hide-past').html('Show past events');
	}
	
    });

    // get current time in EST
    var timeEST = new Date().getTime() + (new Date().getTimezoneOffset() * 1000 * 60) - (240 * 1000 * 60);

    for (let event of events) {

		var datestring = '';
		var eventPassed = false;

		if (event.hasOwnProperty('date')) {

        // determine if the event has passed
        eventPassed = (event.date * 1000) < timeEST;

        // convert timestamp to string
        var d = new Date(event.date * 1000);
        datestring = d.toLocaleString('en-US', {month: 'short', day: 'numeric'}) + 
            ' @ ' + d.toLocaleString('en-US', {hour: 'numeric', minute: '2-digit', hour12: true, timezone: 'America/New_York'});

		} else {
			datestring = 'Date TBA';
		}

        // determine if the event is available to RSVP
        var available = event.hasOwnProperty('rsvp') && event['rsvp'] != 'None' && !eventPassed;

        // construct event div
        var event_div = `<div class="event ${eventPassed ? 'old' : ''}">
            <div class="event-name">
                <span class="event-span">
		    <span class="event-tagline">${event.hasOwnProperty('tagline') ? event.tagline : ''}</span>
		    ${event.hasOwnProperty('name') ? event.name : 'TBA'}
		</span>
            </div>
            <div class="event-desc">
                <span class="date">${datestring}</span>
                <span class="room">${event.loc}</span>
                <a target="_blank" class="red-button ${available ? '' : 'disabled'}" ${available ? `href="${event.rsvp}"` : ''} ${eventPassed ? 'title="This event has already passed."' : (available ? '' : 'title="This event is not available to RSVP yet."')} >${available ? '' : '<img src="../assets/images/icons/lock.png" />'} RSVP</a>
            </div>
        </div>`;

        // add the event
        $('.calendar').append(event_div);

    }

    $(window).scroll(function() {

        for (var i = 0; i < $('.event').length; i++) {
	    // reveal events within the window
	    (function() {
	        var event = $('.event').eq(i);
                if (!event.hasClass('done') && $(window).scrollTop() + $(window).height() > event.offset().top) {
                    if (event.hasClass('old')) {
                        event.animate({opacity: 0.3, top: 0}, 1000);
                    } else {
                        event.animate({opacity: 1, top: 0}, 1000);
                    }
		    setTimeout(function() {
		        event.addClass('done');
      		    }, 1000);
                }
	    })();
        }
    
    });

});
