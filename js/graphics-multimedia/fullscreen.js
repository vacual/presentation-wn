document.cancelFullScreen = document.webkitCancelFullScreen
		|| document.mozCancelFullScreen || document.exitFullscreen;

document.addEventListener('keydown', function(e) {
	switch (e.keyCode) {
	case 13: // ENTER. ESC should also take you out of fullscreen by default.
		e.preventDefault();
		document.cancelFullScreen();
		break;
	}
}, false);

function doFullScreen(elem) {
	if (elem.webkitRequestFullScreen) {
		elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
	} else if (elem.mozRequestFullScreen) {
		elem.mozRequestFullScreen();
	} else if (elem.requestFullScreen) {
		elem.requestFullScreen();
	}
}

function onFullScreenChange() {
	console.log("fullscreen change!");
};

function enterFullscreen(elem) {
	var elem = elem || document.body;
	elem.onwebkitfullscreenchange = onFullScreenChange;
	elem.onmozfullscreenchange = onFullScreenChange;
	elem.onfullscreenchange = onFullScreenChange;
	if (document.webkitIsFullScreen) {
		document.cancelFullScreen();
	} else {
		doFullScreen(elem);
	}
}

document.getElementById('fs-slide-fs').onclick = function(e) {
	enterFullscreen(document.querySelector('#fullscreen-api'));
};
document.getElementById('fs-snippet-fs').onclick = function(e) {
	enterFullscreen(document.querySelector('#fs-snippet'));
};
