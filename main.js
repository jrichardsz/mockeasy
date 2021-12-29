function locationHashChanged() {
  console.log(`loading custom controller: ${location.hash}`);
  var fragment = location.hash.replace("#", "");
  loadController("fragment");
}
window.onhashchange = locationHashChanged;


document.addEventListener("DOMContentLoaded", function(event) {
    // Your code to run since DOM is loaded and ready
    console.log("loading default controller");
    if(location.hash==""){
      loadController("DefaultController");
    }
});

function loadController(controllerId){
  var controller = window._context[controllerId];
  if (!controller) {
    console.log("There are not any Controler asociated to this route: " + controllerId);
    return;
  }
  controller.start();
}
