
var init = function() {
  var targetLoopTime = 1000;

  function timeDelay(delayms) {
    var start = performance.now();
    while (performance.now() - start < delayms);
  }

  function changeHtml() {
    var randomNumber = Math.random()*targetLoopTime*.5;
    $("#textField").html("Random Number: " + randomNumber.toFixed() + "<br />AvgWait: " + timedLoop.getLoopTime().toFixed() + "<br />LastWait: " + timedLoop.getWaitTime().toFixed());
    timeDelay(randomNumber);
  }
  
  timedLoop.registerFunction(changeHtml);
  timedLoop.setLoopTime(targetLoopTime);
  timedLoop.startInterval();
  
}

window.addEventListener('DOMContentLoaded', init, false);