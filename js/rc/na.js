	document.getElementById('request-permission').addEventListener('click', function() {
		window.webkitNotifications.requestPermission();
	}, false);

	document.getElementById('show-tweets').addEventListener('click', function() {
		readList();
	}, false);

	function readList() {
		var list = [
		      	{
		    		"icon":"assets/refresh.png",
		    		"title":"One",
		    		"message":"This is the first Notification."
		    	},
		    	{
		    		"icon":"assets/refresh.png",
		    		"title":"Two",
		    		"message":"This is the second Notification."
		    	}
		    	
		];
		fetchList(list);
	}

	function fetchList(data) {
		var n;
		var i = data.length;
		while (i--) {
			n = data[i];
			if (window.webkitNotifications.checkPermission() == 0) {
				// note the show()
				window.webkitNotifications.createNotification(
				n.icon,
				n.title,
				n.message).show();
			} else {
				// Note that we can't call requestPermission from here as we are in the callback function and not triggered just on user action
				alert('You have to click on "Set notification permissions for this page" first to be able to receive notifications.');
				return;
			}
		}
	}
