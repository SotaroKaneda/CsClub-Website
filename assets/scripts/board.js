$(document).ready(function() {

    function addOfficer(i) {
        var profile = officers[i];
        $('.board').append(`
        <div class="board-slide ${i % 2 == 0 ? '' : 'gray'}">
            <table>
                <tr>
                    <td class="member-portrait" style="background-image: url('../assets/images/portraits/${profile.photo}')">
                    </td>
                    <td>
                        <h1>${profile.name}</h1>
                        <h2>${profile.rank}</h2>
                        <b>Year:</b> ${profile.year}<br />
                        <b>Major${profile.major.length > 1 ? 's' : ''}:</b> ${profile.major.join(', ')}<br />
                        <b>Specialization${profile.spec.length > 1 ? 's' : ''}:</b> ${profile.spec.join(', ')}<br />
                        ${profile.hasOwnProperty('minor') ? `
                        <b>Minor${profile.minor.length > 1 ? 's' : ''}:</b> ${profile.minor.join(', ')}<br />
                        ` : ''}
						${profile.hasOwnProperty('current') ? `
						<b>Currently:</b> ${profile.current}<br />
						` : ''}<br />
                        ${profile.hasOwnProperty('home') ? `
						<b>Hometown:</b> ${profile.home}<br />
						` : ''}
						${profile.hasOwnProperty('hobby') ? `
                        <b>Hobbies:</b> ${profile.hobby}<br /><br />
						` : ''}
                        <a class="red-button" href="mailto:${profile.email}">Contact</a>
                    </td>
                </tr>
            </table>
        </div>`);
    }

    for (var i = 0; i < officers.length; i++) {
        addOfficer(i);
    }
    
    $(window).scroll(function() {

        $('.board-slide').each(function(i, section) {
            if (($(window).scrollTop() + $(window).height()) > $('.board-slide').eq(i).offset().top + 300) {
                setTimeout(function() {
                    $('.board-slide').eq(i).find('table').animate({opacity: 1, top: 0}, 1000);
                }, 200);
            }
        });

    });

});
