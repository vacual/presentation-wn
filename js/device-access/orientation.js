function OrientationSlide(slide) {
	this._slide = document.querySelector(slide);
	this._lastBeta = 0;
	this._lastGamma = 0;
	this._x = document.querySelector('#orientation-x');
	this._y = document.querySelector('#orientation-y');
	this._z = document.querySelector('#orientation-z');
}
OrientationSlide.prototype.orientationListener = function(evt) {
	ori._x.textContent = evt.beta;
	ori._y.textContent = evt.alpha;
	ori._z.textContent = evt.gamma;
	// For FF3.6+
	if (!evt.gamma && !evt.beta) {
		evt.gamma = -(evt.x * (180 / Math.PI));
		evt.beta = -(evt.y * (180 / Math.PI));
	}

	var overThreshold = Math.abs(evt.gamma) > 4 || Math.abs(evt.beta) > 4;
	var gamma = overThreshold ? evt.gamma : 0;
	var beta = overThreshold ? evt.beta : 0;

	if (this._lastGamma != gamma || this._lastBeta != beta) {
		var zindex = 0;
		var layers = document.querySelectorAll('.layer');
		for (var i = 0, elem; elem = layers[i]; ++i) {
			zindex++;
			var x = Math.round(1.5 * gamma * zindex);
			var y = Math.round(1.5 * beta * zindex);
			var style = elem.style;
			style.left = x.toString() + 'px';
			style.top = y.toString() + 'px';
			style.webkitTransform = 'rotateY(' + (-2.0 * gamma)
					+ 'deg) rotateX(' + (-2.0 * beta) + 'deg)';
			style.MozTransform = 'rotateY(' + (-2.0 * gamma) + 'deg) rotateX('
					+ (-2.0 * beta) + 'deg)';
		}
		this._lastGamma = gamma;
		this._lastBeta = beta;
	}
};
OrientationSlide.prototype.onunload = function(evt) {
	window.removeEventListener('deviceorientation', this.orientationListener, false);
	window.removeEventListener('MozOrientation', this.orientationListener, false);
};
OrientationSlide.prototype.onload = function(evt) {
	window.addEventListener('deviceorientation', this.orientationListener, false);
	window.addEventListener('MozOrientation', this.orientationListener, false);
};
var ori = new OrientationSlide('#device-orientation');

if (!('ondeviceorientation' in window) && !(window.onmozorientation)) {
	document.querySelector('#device-orientation p').style.display = 'block';
}
