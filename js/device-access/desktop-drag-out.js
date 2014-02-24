(function() {
	var files = document.querySelectorAll('.dragout');
	for (var i = 0, file; file = files[i]; ++i) {
		file.setAttribute('draggable', 'true'); // Don't really need, but good practice.
		file.addEventListener('dragstart', function(evt) {
			var href = this.getAttribute('href');
			var download = this.getAttribute('data-downloadurl');
			var meta = download.split(':', 2);
			var l = location;
			var url = meta[0] + ':' + meta[1] + ':' + l.protocol + '//' + l.host + l.pathname + href;
			evt.dataTransfer.setData('DownloadURL', url);
		}, false);
	}
})();
