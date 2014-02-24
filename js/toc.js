(function(){
	var tocList = document.querySelector('#toc-list');
	var transitionList = document.querySelectorAll('.transition-slide');
	var transitionListLength = transitionList.length;
	for (var i = 0; i < transitionListLength; i++) {
		var transitionSection = transitionList.item(i);
		var transitionId = transitionSection.id;
		var transitionHeader = transitionSection.querySelector('header h2');
		var transitionImage = transitionSection.querySelector('img');
		var transitionTitle = transitionHeader.textContent;
		var li = document.createElement('li');
		var a = document.createElement('a');
		var img = document.createElement('img');
		a.href = "#/" + transitionId;
		a.textContent = transitionTitle;
		img.src = transitionImage.src;
		li.appendChild(a);
		li.appendChild(img);
		tocList.appendChild(li);
	}
	console.log(tocList);
})();
