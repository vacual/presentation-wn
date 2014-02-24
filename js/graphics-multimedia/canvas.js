var canvasContext = document.getElementById("canvas-area").getContext("2d");
canvasContext.fillRect(50, 25, 150, 100);
canvasContext.beginPath();
canvasContext.arc(150, 110, 100, Math.PI * 1 / 2, Math.PI * 3 / 2, false);
canvasContext.lineWidth = 15;
canvasContext.lineCap = 'round';
canvasContext.strokeStyle = 'rgba(255, 127, 0, 0.5)';
canvasContext.stroke();
