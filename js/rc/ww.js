var webWorkerSample = (function() {
		"use strict";

		var SQUARE_SIZE = 50;
		var MOVEMENT_STEP = 5;

		var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

		// Set up the worker
		var running = false;
		var statusDiv = document.getElementById('ww-status');
		var wrapperDiv = document.getElementById('ww-animation-wrapper');
		var button = document.getElementById('ww-toggle-worker');
		var worker = new Worker('assets/webworkers/cruncher.js'); // path is relative to the main HTML file
		worker.addEventListener('message', function(event) {
			var currentStatus = statusDiv.innerHTML;
			statusDiv.innerHTML = "<p>"	+ event.data + "</p>" + currentStatus;
			if (event.data === "Done!") {
				running = false;
				button.value = "Start Worker";
			}
		});

		button.onclick = function() {
			running = !running;
			if (running) {
				statusDiv.innerHTML = "";
				button.innerHTML = "Stop Worker";
			} else {
				button.innerHTML = "Start Worker";
			}
			worker.postMessage('');
		};

		// Set up the animated square
		var square = document.getElementById('ww-square');
	    square.style.left = '0px';
	    var touchLeft = false;
	    var touchRight = false;

		function moveSquare() {
			var wrapperWidth = wrapperDiv.offsetWidth;
			var left = parseInt(square.style.left, 10);
			var right = left + SQUARE_SIZE;
			
			if(left <= 0) {
				touchLeft = true;
				touchRight = false;
			}
			if (right >= wrapperWidth) {
				touchLeft = false;
				touchRight = true;
			}
			
			if (touchRight) {
				square.style.left = left - MOVEMENT_STEP + 'px';
			}
			if (touchLeft) {
				square.style.left = left + MOVEMENT_STEP + 'px';
			}
			requestAnimationFrame(moveSquare);
		}

		square.onclick = function(event) {
			requestAnimationFrame(moveSquare);
		};

}());
