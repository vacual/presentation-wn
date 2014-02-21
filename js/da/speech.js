function speechContent(ln) {
	var input = document.querySelector('#speech-content-' + ln);
	var msg = new SpeechSynthesisUtterance();
	msg.text = input.value;
	msg.lang = ln;
	msg.volume = 1; // 0 to 1
	msg.rate = 1; // 0.1 to 10
	msg.pitch = 0.4; //0 to 2
	
	msg.onend = function(e) {
		console.log('Finished in ' + event.elapsedTime + ' seconds.');
	};

	speechSynthesis.speak(msg);
}

