var nativeDragDrop = (function() {
	var dragZone = document.querySelector('#dnd-drag-zone');
	var dropZone = document.querySelector('#dnd-drop-zone');
	dragZone.addEventListener('dragstart', function(event) {
		return true;
	}, true);
	dragZone.addEventListener('dragend', function(event) {
		return true;
	}, true);
	dropZone.addEventListener('dragenter', function(event) {
		if (event.preventDefault)
			event.preventDefault();
		this.className = 'hovering';
		return false;
	}, false);
	dropZone.addEventListener('dragover', function(event) {
		if (event.preventDefault)
			event.preventDefault(); // allows us to drop
		return false;
	}, false);
	dropZone.addEventListener('dragleave', function(event) {
		if (event.preventDefault)
			event.preventDefault(); // allows us to drop
		this.className = '';
		return false;
	}, false);
	dropZone.addEventListener('drop', function(event) {
		if (event.preventDefault)
			event.preventDefault();
		var imgPassed = null;
		var types = event.dataTransfer.types;
		for (var i = 0; i < types.length; i++) {
			if (types[i] == 'text/uri-list') {
				imgPassed = event.dataTransfer.getData('text/uri-list');
			}
		}
		if (imgPassed) {
			var cEl = document.createElement('canvas');
			cEl.width = 200;
			cEl.height = 100;
			var ctx = cEl.getContext('2d');
			var img_buffer = document.createElement('img');
			img_buffer.src = imgPassed;
			img_buffer.style.display = 'none';
			document.body.appendChild(img_buffer); // this line only needed in safari
			img_buffer.onload = function() {
				ctx.drawImage(img_buffer, 0, 0, 100, 100);
			}
			this.innerHTML = '';
			this.appendChild(cEl);
		} else {
			if (event.dataTransfer.getData('text')) {
				this.innerHTML = event.dataTransfer.getData('text');
			} else if (event.dataTransfer.getData('text/plain')) {
				this.innerHTML = event.dataTransfer.getData('text/plain');
			}
		}
		return false;
	}, false);
})();
