function DefaultController() {

  var canvas;
  var canvasContext;
  var helper = window._context["Helper"];
  var xAxisCoodinate;
  var yAxisCoodinate;
  var imageDimension;
  var desiredRows = 10;
  var desiredCols = 6;

  this.start = () => {

    this.showMouseCoordinates();
    this.initCanvas()
    this.drawImage();
    this.drawSquares();

    // fetch('./config.json')
    //   .then(function(response) {
    //     return response.json();
    //   })
    //   .then(function(jsonResponse) {
    //     console.log(jsonResponse);
    //   });
  };

  this.initCanvas = () => {
    canvas = document.getElementById('canvas');
    canvasContext = canvas.getContext('2d');

    // resize the canvas to fill browser window dynamically
    window.addEventListener('resize', resizeCanvas, false);

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      /**
       * Your drawings need to be inside this function otherwise they will be reset when
       * you resize the browser window and the canvas goes will be cleared.
       */
      //  drawStuff();
    }

    resizeCanvas();
    canvas.addEventListener('click', this.onClick);
  };

  this.onClick = (e) => {
    var cellPositionInfo = this.computeCurrentCellPosition(e);
    this.drawImageFromUrl("./images/mock-r9c4.png")
  };

  this.computeCurrentCellPosition = (e) => {
    var eventX = e.pageX - canvas.offsetLeft;
    var eventY = e.pageY - canvas.offsetTop;

    var x = 0;
    if (eventX <= xAxisCoodinate) {
      x = 0;
    } else if (eventX > xAxisCoodinate + imageDimension.width) {
      x = xAxisCoodinate + imageDimension.width;
    } else {
      x = eventX - xAxisCoodinate;
    }

    var y = 0;
    if (eventY <= yAxisCoodinate + imageDimension.height) {
      y = eventY;
    } else if (eventY > yAxisCoodinate + imageDimension.height) {
      y = yAxisCoodinate + imageDimension.height;
    } else {
      x = eventY - yAxisCoodinate;
    }

    var cellHeigth = Math.round(imageDimension.height / desiredRows);
    var currentRow = -1;
    for (i = 0; i < desiredRows; i++) {
      if (y > yAxisCoodinate + i * cellHeigth && y < yAxisCoodinate + (i + 1) * cellHeigth) {
        currentRow = i + 1;
      }
    }

    var cellWidth = Math.round(imageDimension.width / desiredCols);
    var currentCol = -1;
    for (i = 0; i < desiredCols; i++) {
      //+xAxisCoodinate is required because if the event x is 500 but image x is at 400, our desired x is 100 i.e 500-100
      //if I want to determine in which col is, I need to compute
      //100>500+cell width which is false
      //solution
      //100 + 400 >500+cell
      if (x + xAxisCoodinate > xAxisCoodinate + i * cellWidth && x + xAxisCoodinate < xAxisCoodinate + (i + 1) * cellWidth) {
        currentCol = i + 1;
      }
    }

    return [x, y, currentRow, currentCol]
  };

  this.showMouseCoordinates = () => {
    // https://stackoverflow.com/a/39483455/3957754
    // Getting 'Info' div in js hands
    var info = document.getElementById('info');

    addEventListener('mousemove', (e) => {
      var cellPositionInfo = this.computeCurrentCellPosition(e);
      info.innerHTML = `
      Position X : ${cellPositionInfo[0]}  <br/>
      Position Y : ${cellPositionInfo[1]}  <br/>
      Row : ${cellPositionInfo[2]}  <br/>
      Col : ${cellPositionInfo[3]}`;
    }, false);
  };

  this.drawImage = () => {
    var img = document.getElementById("home");
    var width = img.width;
    var height = img.height;
    imageDimension = helper.calculateAspectRatioFit(width, height, window.innerWidth, window.innerHeight);

    xAxisCoodinate = Math.round(window.innerWidth / 2 - imageDimension.width / 2);
    yAxisCoodinate = 0;
    canvasContext.drawImage(img, xAxisCoodinate, yAxisCoodinate, imageDimension.width, imageDimension.height);
  };

  this.drawImageFromUrl = (imageUrl) => {
    var newImage = new Image();
    newImage.onload = ()=> {
      var width = newImage.width;
      var height = newImage.height;
      var newImageDimension = helper.calculateAspectRatioFit(width, height, window.innerWidth, window.innerHeight);
      canvasContext.drawImage(newImage, xAxisCoodinate, yAxisCoodinate, newImageDimension.width, newImageDimension.height);
    };
    newImage.src = imageUrl;

  };

  this.drawSquares = () => {

    canvasContext.beginPath();
    canvasContext.strokeStyle = 'red';

    var cellHeigth = Math.round(imageDimension.height / desiredRows);
    for (i = 0; i < desiredRows; i++) {
      canvasContext.moveTo(xAxisCoodinate, yAxisCoodinate + i * cellHeigth);
      canvasContext.lineTo(xAxisCoodinate + imageDimension.width, yAxisCoodinate + i * cellHeigth);
      canvasContext.stroke();
    }

    var cellWidth = Math.round(imageDimension.width / desiredCols);
    for (i = 0; i < desiredCols; i++) {
      canvasContext.moveTo(xAxisCoodinate + i * cellWidth, yAxisCoodinate);
      canvasContext.lineTo(xAxisCoodinate + i * cellWidth, yAxisCoodinate + imageDimension.height);
      canvasContext.stroke();
    }
    // canvasContext.stroke();
  };

  this.draw2 = () => {
    //Position parameters used for drawing the rectangle
    var x = 100;
    var y = 150;
    var width = 200;
    var height = 150;

    var canvas = document.createElement('canvas'); //Create a canvas element
    //Set canvas width/height
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    //Set canvas drawing area width/height
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    //Position canvas
    canvas.style.position = 'absolute';
    canvas.style.left = 0;
    canvas.style.top = 0;
    canvas.style.zIndex = 100000;
    canvas.style.pointerEvents = 'none'; //Make sure you can click 'through' the canvas
    document.body.appendChild(canvas); //Append canvas to body element
    var context = canvas.getContext('2d');
    //Draw line
    context.beginPath();
    context.moveTo(496, 535);
    context.lineTo(496, 119);
    context.stroke();
  };

  function computeGridCoordinates(x, y, w, h, desiredRows, desiredCols) {
    var cellHeigth = Math.round(h / desiredRows);
    for (i = 0; i < desiredRows; i++) {
      console.log(x, y + i * cellHeigth);
      console.log(x + w, y + i * cellHeigth);
    }
  }

}


if (typeof window._context === 'undefined') {
  window._context = {};
}
window._context["DefaultController"] = new DefaultController();
