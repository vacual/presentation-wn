var indexedDbSample = (function() {
	var _idb;
	var _idbName = 'Test';
	var _idbRequest;
	var _idbLog = document.getElementById('idb-log');
	var _idResultsWrapper = document.getElementById('idb-results-wrapper');

	// IndexedDB spec is still evolving, various browsers keep it
	// behind various flags and implementation varies.
	if(!('indexedDB' in window)){
		if ('webkitIndexedDB' in window) {
			window.indexedDB = window.webkitIndexedDB;
			window.IDBTransaction = window.webkitIDBTransaction;
		} else if ('moz_indexedDB' in window) {
			window.indexedDB = window.moz_indexedDB;
		}
	}

	if (window.indexedDB) {
		_idbRequest = window.indexedDB.open(_idbName);
		_idbRequest.onerror = _idbError;
		_idbRequest.onupgradeneeded = function(event) {
			var vct = event.target.transaction;
			_idb = event.target.result;
			_createObjectStore();
		}
		_idbRequest.addEventListener('success',
			function(event) {
				_idb = event.target.result;
				_idbShow(event);
			}, false);
	}

	function _idbError(event) {
		_idbLog.innerHTML += '<p class="error">Error: '	+ event.message + ' (' + event.code + ')</p>';
	}

	function _idbShow(event) {
		if (!_idb.objectStoreNames.contains('sampleObjectStore')) {
			_idbLog.innerHTML = "<p>Object store not yet created.</p>";
			return;
		}

		var html = [];
		var transaction = _idb.transaction(['sampleObjectStore'], 'readonly'); // Read is default.
		var request = transaction.objectStore('sampleObjectStore').openCursor(); // Get all results.

		// This callback will continue to be called until we have no more results.
		request.onsuccess = function(e) {
			var cursor = e.target.result;
			if (!cursor) {
				_idResultsWrapper.innerHTML = '<ul class="record-list" id="idb-results">' + html.join('') + '</ul>';
				return;
			}
			html.push(
				'<li><span class="keyval" contenteditable onblur="indexedDbSample.updateKey(\'',
				cursor.key, '\', this)">', cursor.key, '</span> ',
				'=> <span class="keyval" contenteditable onblur="indexedDbSample.updateValue(\'',
				cursor.key, '\', this)">', cursor.value, '</span>&nbsp; ',
				'<a href="javascript:void(0)" onclick="indexedDbSample.deleteKey(\'',
				cursor.key,	'\')">[Delete]</a></li>');
			cursor['continue']();
		}
		request.onerror = _idbError;
	}

	function _createObjectStore(){
		if (!_idb.objectStoreNames.contains('sampleObjectStore')) {
			try {
				var objectStore = _idb.createObjectStore('sampleObjectStore', null); // FF is requiring the 2nd keyPath arg. It can be optional :(
				_idbLog.innerHTML = "<p>Object store created.</p>";
			} catch (err) {
				_idbLog.innerHTML = '<p class="error">Error in Create ObjectStore: ' + err.toString() + '</p>';
			}
		} else {
			_idbLog.innerHTML = '<p class="error">Object store already exists.</p>';
		}
	}

	function _idbSet() {
		if (!_idb) {
			if (_idbRequest) {
				_idbRequest.addEventListener('success', deleteObjectStore, false); // If indexedDB is still opening, just queue this up.
			}
			return;
		}

		if (!_idb.objectStoreNames.contains('sampleObjectStore')) {
			_idbLog.innerHTML = "<p class=\"error\">Object store doesn't exist.</p>";
			return;
		}

		// Create a transaction that locks the world.
		var objectStore = _idb.transaction(['sampleObjectStore'], 'readwrite').objectStore("sampleObjectStore");
		var request = objectStore.put(document.getElementById('idb-value').value, document.getElementById('idb-key').value);
		request.onerror = _idbError;
		request.onsuccess = _idbShow;
	}

	function _updateKey(key, element) {
		var newKey = element.textContent;
		console.log(newKey);
		var transaction = _idb.transaction(['sampleObjectStore'], 'readwrite'); // Create a transaction that locks the world.
		var objectStore = transaction.objectStore("sampleObjectStore");
		var request = objectStore.get(key);
		request.onerror = _idbError;
		request.onsuccess = function(event) {
			var value = event.target.result;
			var request;
			if (objectStore['delete']) {
				request = objectStore['delete'](key);
			} else {
				request = objectStore.remove(key);
			}
			request.onerror = _idbError;
			request.onsuccess = function(event) {
				var request = objectStore.add(value, newKey);
				request.onerror = _idbError;
				request.onsuccess = _idbShow;
			};
		};
	}

	function _updateValue(key, element) {
		var transaction = _idb.transaction(['sampleObjectStore'], 'readwrite'); // Create a transaction that locks the world.
		var objectStore = transaction.objectStore("sampleObjectStore");
		var request = objectStore.put(element.textContent, key);
		request.onerror = _idbError;
		request.onsuccess = _idbShow;
	}

	function _deleteKey(key) {
		var transaction = _idb.transaction(['sampleObjectStore'], 'readwrite'); // Create a transaction that locks the world.
		var objectStore = transaction.objectStore("sampleObjectStore");
		var request;
		if (objectStore['delete']) {
			request = objectStore['delete'](key);
		} else {
			request = objectStore.remove(key);
		}
		request.onerror = _idbError;
		request.onsuccess = _idbShow;
	}

	function _idbDelete() {
		if (window.indexedDB) {
			indexedDB.deleteDatabase(_idbName);
			_idbLog.innerHTML = "<p>Delete Database success.</p>";
		}
	}

	return {
		idbSet : _idbSet,
		idbDelete : _idbDelete,
		updateKey : _updateKey,
		updateValue : _updateValue,
		deleteKey : _deleteKey
	}
})();
