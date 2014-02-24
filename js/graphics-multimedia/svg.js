// insert SVG using script until SVG in HTML5 is more widely supported
// (currently supported in IE 9 and Firefox nightlies only)
var container = document.getElementsByClassName('svg')[0];
var svgns = 'http://www.w3.org/2000/svg';
var svg = document.createElementNS(svgns, 'svg');
svg.setAttribute('width', '400px');
svg.setAttribute('height', '200px');

// our linearGradient
var defs = document.createElementNS(svgns, 'defs');
var gradient = document.createElementNS(svgns, 'linearGradient');
gradient.setAttribute('id', 'myGradient');
gradient.setAttribute('x1', '0%');
gradient.setAttribute('y1', '100%');
gradient.setAttribute('x2', '100%');
gradient.setAttribute('y2', '0%');
var stop = document.createElementNS(svgns, 'stop');
stop.setAttribute('offset', '5%');
stop.setAttribute('stop-color', 'red');
gradient.appendChild(stop);
stop = document.createElementNS(svgns, 'stop');
stop.setAttribute('offset', '95%');
stop.setAttribute('stop-color', 'blue');
stop.setAttribute('stop-opacity', '0.5');
gradient.appendChild(stop);
defs.appendChild(gradient);
svg.appendChild(defs);

// our example circle
var circle = document.createElementNS(svgns, 'circle');
circle.setAttribute('cx', '50%');
circle.setAttribute('cy', '50%');
circle.setAttribute('r', 50);
circle.setAttribute('fill', 'url(#myGradient)');
circle.setAttribute('stroke-color', 'red');
circle.addEventListener('mousedown', function() {
	alert('hello');
}, false);
svg.appendChild(circle);
container.appendChild(svg);

function changeSvgCircleRadius() {
	var r = document.getElementById('svg-circle-r').value;
	document.getElementById('svg-circle-r-value').innerHTML = r;
	circle.setAttribute('r', r);
}

