
var init = function() {
  var targetLoopTime = 1000;

  function timeDelay(delayms) {
    var start = performance.now();
    while (performance.now() - start < delayms);
  }
  
  function changeHtml() {
    var randomNumber = Math.random()*15;
    timeDelay(randomNumber);
    $("#textField").html("Random Number: " + randomNumber.toFixed()
    + "<br />Average Wait: " + timedLoop.getLoopTime().toFixed()
    + "<br />My Wait: " + timedLoop.getFunctionLoopTime("timedLoop-0").toFixed()
    + "<br />Function 1 Wait: " + timedLoop.getFunctionLoopTime("function-1").toFixed(3)
    + "<br />Function 2 Wait: " + timedLoop.getFunctionLoopTime("function-2").toFixed(3)
    + "<br />Function 3 Wait: " + timedLoop.getFunctionLoopTime("function-3").toFixed(3)
    );
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
  timedLoop.registerFunction(testFunction_1, "function-1", {}, 50);
  timedLoop.registerFunction(testFunction_2, "function-2");
  timedLoop.registerFunction(testFunction_3, "function-3");
  timedLoop.setLoopTime(targetLoopTime);
  timedLoop.start();
  
}

window.addEventListener('DOMContentLoaded', init, false);