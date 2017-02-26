
var init = function() {
  var targetLoopTime = 1000;

  function timeDelay(delayms) {
    var start = Date().now;
    while (Date().now - start < delayms);
  }
  
  function changeHtml() {
    var randomNumber = Math.random()*targetLoopTime;
    $("#textField").html("Random Number: " + randomNumber.toFixed() + "<br />AvgWait: " + timedLoop.getLoopTime().toFixed());
    timeDelay(randomNumber);
  }
  function testFunction_1() {
    console.log("1");
  }
  function testFunction_2() {
    console.log("2");
  }
  function testFunction_3() {
    console.log("3");
  }
  
  timedLoop.registerFunction(changeHtml);
  timedLoop.registerFunction(testFunction_1, "timedloop-1", {}, 50);
  timedLoop.registerFunction(testFunction_2);
  timedLoop.registerFunction(testFunction_3);
  timedLoop.setLoopTime(targetLoopTime);
  timedLoop.start();
  
}

window.addEventListener('DOMContentLoaded', init, false);