(function() {
	var transPlayChanged = document.querySelector('#trans-play-changed'), transPlayStage = document.querySelector("#trans-play-stage"),
	transPlayPerspective = document.querySelector("#trans-play-perspective"),
	transPlayOriginX = document.querySelector("#trans-play-origin-x"), transPlayOriginY = document.querySelector("#trans-play-origin-y"),
	transPlayX = document.querySelector('#trans-play-x'), transPlayY = document.querySelector('#trans-play-y'), transPlayZ = document.querySelector('#trans-play-z'),
	transPlayXRot = document.querySelector('#trans-play-x-rot'), transPlayYRot = document.querySelector('#trans-play-y-rot'), transPlayZRot = document.querySelector('#trans-play-z-rot'),
	transPlayXScale = document.querySelector('#trans-play-x-scale'), transPlayYScale = document.querySelector('#trans-play-y-scale'), 
	transPlaySkew = document.querySelector('#trans-play-skew');

	transPlayZ.value = 0;
	transPlayPerspective.value = 800;

	transPlayChanged.style.webkitTransform = "translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)";

	var inputs = document.querySelectorAll('#trans-play-controls input');
	var inputLength = inputs.length;
	for (var int = 0; int < inputLength; int++) {
		var i = inputs.item(int);
		i.addEventListener('change', function(event) {
			var input = event.target;
			var span = input.parentElement.querySelector('span');
			span.textContent = input.value;
			transPlayChanged.style.webkitTransform = 
				"translateX(" + transPlayX.value + "px) " +
				"translateY(" + transPlayY.value + "px) " +
				"translateZ(" + transPlayZ.value + "px) " + 
				"rotateX(" + transPlayXRot.value + "deg) " + 
				"rotateY(" + transPlayYRot.value + "deg) " + 
				"rotateZ(" + transPlayZRot.value + "deg) " + 
				"scaleX(" + (transPlayXScale.value / 100) + ") " + 
				"scaleY(" + (transPlayYScale.value / 100) + ") " + 
				"skew(" + transPlaySkew.value + "deg)";

			transPlayStage.style.webkitPerspective = transPlayPerspective.value;

			transPlayChanged.style.webkitTransformOriginX = transPlayOriginX.value + "%";
			transPlayChanged.style.webkitTransformOriginY = transPlayOriginY.value + "%";
		}, false);
	}
})();
