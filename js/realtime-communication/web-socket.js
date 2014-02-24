(function() {
  var wsSecureCb;
  var wsSecureCbLabel;
  var wsUri;
  var wsConsoleLog;
  var wsConnectBut;
  var wsDisconnectBut;
  var wsMessage;
  var wsSendBut;
  var wsClearLogBut;

  var wsUserDisconnectedFlag;

  function wsHandlePageLoad() {

    wsSecureCb = document.getElementById("ws-secure");
    wsSecureCb.onclick = wsToggleTls;
    
    wsSecureCbLabel = document.getElementById("ws-secure-label")
    
    wsUri = document.getElementById("ws-uri");
    wsToggleTls();
    
    wsConnectBut = document.getElementById("ws-connect");
    wsConnectBut.onclick = wsDoConnect;
    
    wsDisconnectBut = document.getElementById("ws-disconnect");
    wsDisconnectBut.onclick = wsDoDisconnect;
    
    wsMessage = document.getElementById("ws-message");

    wsSendBut = document.getElementById("ws-send");
    wsSendBut.onclick = wsDoSend;

    wsConsoleLog = document.getElementById("ws-console-log");

    wsClearLogBut = document.getElementById("ws-clear-log");
    wsClearLogBut.onclick = wsClearLog;

    wsUserDisconnectedFlag = false;
    
    wsSetGuiConnected(false);
  }

  function wsToggleTls() {
    if (wsSecureCb.checked) {
      wsUri.value = "wss://echo.websocket.org";
    } else {
      wsUri.value = "ws://echo.websocket.org";
    }
  }

  function wsDoConnect() {
    if (!window.WebSocket) {
      wsLogToConsole('<span style="color: red;"><strong>Error:</strong>' + 
          'Your browser does not have native support for WebSocket</span>',
          true);
      return;
    }
    wsConnectBut.disabled = true;
    websocket = new WebSocket(wsUri.value);
    websocket.onopen = function(evt) { wsOnOpen(evt) };
    websocket.onclose = function(evt) { wsOnClose(evt) };
    websocket.onmessage = function(evt) { wsOnMessage(evt) };
    websocket.onerror = function(evt) { wsOnError(evt) };
  }

  function wsDoDisconnect() {
    wsUserDisconnectedFlag = true;
    websocket.close()
  }
  
  function wsDoSend() {
    wsLogToConsole("SENT: " + wsMessage.value);
    websocket.send(wsMessage.value);
  }

  function wsLogToConsole(message, ignoreSecureTag) {
    var pre = document.createElement("p");
    pre.style.wordWrap = "break-word";
    pre.innerHTML = "";
    if (!ignoreSecureTag) {
      pre.innerHTML = wsGetSecureTag();
    }
    pre.innerHTML = pre.innerHTML+message;
    wsConsoleLog.appendChild(pre);

    while (wsConsoleLog.childNodes.length > 50) {
      wsConsoleLog.removeChild(wsConsoleLog.firstChild);
    }

    wsConsoleLog.scrollTop = wsConsoleLog.scrollHeight;
  }

  function wsOnOpen(evt) {
    wsLogToConsole("CONNECTED");
    wsSetGuiConnected(true);
  }
  
  function wsOnClose(evt) {
    wsLogToConsole("DISCONNECTED");

    //console.log("wsUserDisconnectedFlag=" + wsUserDisconnectedFlag);
    // If the user tried a regular WebSocket connection it it closed because of
    // an intermediary firewall or proxy server, then display a note advising them
    // to use a secure WebSocket instead.
    //
    if (!wsUserDisconnectedFlag && !wsSecureCb.checked) {
      wsLogToConsole("NOTE: If the connection failed, check the <strong>" + 
          "Use secure WebSocket (TLS/SSL)</strong> checkbox and try again.",
          true);
    }

    wsUserDisconnectedFlag = false;

    wsSetGuiConnected(false);
  }
  
  function wsOnMessage(evt) {
    wsLogToConsole('<span style="color: blue;">RESPONSE: ' + evt.data+'</span>');
  }

  function wsOnError(evt) {
    wsLogToConsole('<span style="color: red;">ERROR:</span> ' + evt.data);
  }

  function wsSetGuiConnected(isConnected) {
    wsUri.disabled = isConnected;
    wsConnectBut.disabled = isConnected;
    wsDisconnectBut.disabled = !isConnected;
    wsMessage.disabled = !isConnected;
    wsSendBut.disabled = !isConnected;
    wsSecureCb.disabled = isConnected;
    labelColor = isConnected ? "#999999" : "black";
    wsSecureCbLabel.style.color = labelColor;
  }

  function wsClearLog() {
    while (wsConsoleLog.childNodes.length) {
      wsConsoleLog.removeChild(wsConsoleLog.lastChild);
    }
  }

  function wsGetSecureTag() {
    return wsSecureCb.checked ?
        '<img src="src/websocket/tls-lock.png" width="6px" height="9px"> ' : '';
  }

  window.addEventListener("load", wsHandlePageLoad, false);

})();
