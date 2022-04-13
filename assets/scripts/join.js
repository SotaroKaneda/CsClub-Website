$(document).ready(function() {

    // get current time in EST
    var timeEST = new Date().getTime() + (new Date().getTimezoneOffset() * 1000 * 60) - (240 * 1000 * 60);

    for (let event of events) {

		var datestring = '';
		var eventPassed = false;

		if (event.hasOwnProperty('date')) {

        // determine if the event has passed
        eventPassed = (event.date * 1000) < timeEST;

        // if the event has passed, skip it
        if (eventPassed) {continue;}

        // convert timestamp to string
        var d = new Date(event.date * 1000);
        datestring = d.toLocaleString('en-US', {month: 'short', day: 'numeric'}) + 
            ' @ ' + d.toLocaleString('en-US', {hour: 'numeric', minute: '2-digit', hour12: true, timezone: 'America/New_York'});

		} else {
			datestring = '(Date & Time TBA)';
		}

        // determine if the event is available to RSVP
        var available = event.hasOwnProperty('rsvp') && !eventPassed;

        var event_div = `<div class="event">
        <div class="event-name">
                ${event.hasOwnProperty('name') ? event.name : 'TBA'}
            </div>
            <div class="event-desc">
                <span class="date">${datestring}</span>
                <span class="room">${event.loc}</span>
                <a target="_blank" class="red-button ${available ? '' : 'disabled'}" href="${available ? event.rsvp : 'javascript:void(0);'}">${available ? '' : '<img src="../assets/images/icons/lock.png" />'} RSVP</a>
            </div>
        </div>`;

        // show the event
        $('#next-event').append(event_div);

        // break out of the loop, we're done here
        break;

    }

});
