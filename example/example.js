
var init = function() {
  var targetLoopTime = 50;

  function timeDelay(delayms) {
    var start = Date().now;
    while (Date().now - start < delayms);
  }

  function changeHtml() {
    var randomNumber = Math.random()*targetLoopTime;
    $("#textField").html("Random Number: " + randomNumber.toFixed() + "<br />AvgWait: " + timedLoop.getLoopTime().toFixed());
    timeDelay(randomNumber);
  }
  
  timedLoop.registerFunction(changeHtml);
  timedLoop.setLoopTime(targetLoopTime);
  timedLoop.startInterval();
  
}

window.addEventListener('DOMContentLoaded', init, false);