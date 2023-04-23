const stationList = document.getElementById('station-list');
const radioPlayer = document.getElementById('radio-player');

stationList.addEventListener('click', function(event) {
	const target = event.target;
	if (target.nodeName === 'LI') {
		const stationUrl = target.getAttribute('data-src');
		radioPlayer.setAttribute('src', stationUrl);
		radioPlayer.play();
	}
});