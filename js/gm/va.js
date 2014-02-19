var videoClip = document.getElementById('va-vclip');
var videoPlayButton = document.getElementById('va-v-play-button');
var videoPauseButton = document.getElementById('va-v-pause-button');
videoClip.addEventListener('ended', onVideoFinished, false);

function playVideo() {
	videoClip.play();
	videoPlayButton.disabled = true;
	videoPauseButton.disabled = false;
}

function pauseVideo() {
	videoClip.pause();
	videoPlayButton.disabled = false;
	videoPauseButton.disabled = true;
}

function muteUnMuteVideo() {
	document.getElementById('va-v-mute').value = videoClip.muted ? 'Mute' : 'Unmute';
	videoClip.muted = videoClip.muted ? false : true;
}

function onVideoFinished() {
	videoPlayButton.disabled = false;
	videoPauseButton.disabled = true;
}

function addReflection() {
	videoClip.style.webkitBoxReflect = videoClip.style.webkitBoxReflect !== '' ? ''
			: "below 0px -webkit-linear-gradient(top, transparent, transparent 55%, white) 0 0 0 0 stretch stretch";
}

var audioClip = document.getElementById('va-aclip');
var audioPlayButton = document.getElementById('va-a-play-button');
var audioPauseButton = document.getElementById('va-a-pause-button');
audioClip.addEventListener('ended', onAudioFinished, false);

function playAudio() {
	audioClip.play();
	audioPlayButton.disabled = true;
	audioPauseButton.disabled = false;
}

function pauseAudio() {
	audioClip.pause();
	audioPlayButton.disabled = false;
	audioPauseButton.disabled = true;
}

function muteUnMuteAudio() {
	document.getElementById('va-a-mute').value = audioClip.muted ? 'Mute' : 'Unmute';
	audioClip.muted = audioClip.muted ? false : true;
}

function onAudioFinished() {
	audioPlayButton.disabled = false;
	audioPauseButton.disabled = true;
}
