var geolocationSample = (function() {
	var map = null;
	var geolog = document.querySelector('#geo-log');
	var geoMap = document.querySelector('#geo-map');

	function showPosition(position) {
		geolog.textContent = "You're within " + position.coords.accuracy
				+ " meters of (" + position.coords.latitude + ", "
				+ position.coords.longitude + ")";
		var point = new BMap.Point(position.coords.longitude, position.coords.latitude);
		map.centerAndZoom(point,15);
		var marker = new BMap.Marker(new BMap.Point(position.coords.longitude, position.coords.latitude));
		map.addOverlay(marker);
	}

	function handlePositionError(evt) {
		geolog.textContent = evt.message;
	}

	function successPositionHandler(evt) {
		// Load map if it doesn't already exist and when user clicks the button.
		if (!map) {
			map = new BMap.Map(geoMap);
			var point = new BMap.Point(116.307, 39.9830);
			map.centerAndZoom(point,15);
			map.enableScrollWheelZoom();
		}

		if (navigator.geolocation) {
			geolog.style.visibility = 'visible';
			geolog.textContent = 'Looking for location...';
			navigator.geolocation.getCurrentPosition(showPosition, handlePositionError);
			// Also monitor position as it changes.
			// navigator.geolocation.watchPosition(showPosition,
			// handlePositionError);
		} else {
			geolog.textContent = 'Oops! Your browser does not support geolocation.';
		}
	}

	document.querySelector('#geo-see-position').addEventListener('click',
			successPositionHandler, false);
	geoMap.addEventListener('click', successPositionHandler, false);
})();
