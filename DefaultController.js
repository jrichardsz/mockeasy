function DefaultController(){

  this.start = () => {

    this.showMouseCoordinates();
    this.draw2();

    fetch('./config.json')
      .then(function(response) {
        return response.json();
      })
      .then(function(jsonResponse) {
        console.log(jsonResponse);
      });
  };

  this.showMouseCoordinates = () => {
    // https://stackoverflow.com/a/39483455/3957754
    // Getting 'Info' div in js hands
    var info = document.getElementById('info');

    // Creating function that will tell the position of cursor
    // PageX and PageY will getting position values and show them in P
    function tellPos(p){
    info.innerHTML = 'Position X : ' + p.pageX + '<br />Position Y : ' + p.pageY;
    }
    addEventListener('mousemove', tellPos, false);
  };

  this.draw2 = () => {
    //Position parameters used for drawing the rectangle
    var x = 100;
    var y = 150;
    var width = 200;
    var height = 150;

    var canvas = document.createElement('canvas'); //Create a canvas element
    //Set canvas width/height
    canvas.style.width='100%';
    canvas.style.height='100%';
    //Set canvas drawing area width/height
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    //Position canvas
    canvas.style.position='absolute';
    canvas.style.left=0;
    canvas.style.top=0;
    canvas.style.zIndex=100000;
    canvas.style.pointerEvents='none'; //Make sure you can click 'through' the canvas
    document.body.appendChild(canvas); //Append canvas to body element
    var context = canvas.getContext('2d');
    //Draw line
    context.beginPath();
    context.moveTo(496,535);
    context.lineTo(496, 119);
    context.stroke();
  };

}


if(typeof window._context === 'undefined'){
   window._context = {};
}
window._context["DefaultController"] =  new DefaultController();
