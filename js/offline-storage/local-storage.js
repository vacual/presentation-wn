var localStorage = (function() {
	try {
		(window.localStorage.getItem) // will throw in Firefox under some settings
	} catch (e) {
		return; // quit because dom.storage.enabled is false
	}
	var area = document.querySelector('#os');
	// place content from previous edit
	if (!area.value) {
		area.value = window.localStorage.getItem('value');
	}
	updateLog(false);
	// your content will be saved locally
	document.querySelector('#ws-save').addEventListener('click',function() {
		window.localStorage.setItem('value', area.value);
		window.localStorage.setItem('timestamp',(new Date()).getTime());
		updateLog(true);
	}, false);

	function updateLog(new_save) {
		var log = document.querySelector("#ws-log");
		var delta = 0;
		if (window.localStorage.getItem('value')) {
			delta = ((new Date()).getTime() - (new Date()).setTime(window.localStorage.getItem('timestamp'))) / 1000;
			if (new_save) {
				log.textContent = 'Saved. Content will be available after browser refresh/reopen.';
				setTimeout(function() {
					log.textContent = '';
				}, 3000);
			} else {
				log.textContent = 'last saved: ' + delta + 's ago';
			}
		}
	}
})();
