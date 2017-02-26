# timedLoop
Javascript library for creating timed loops for game logic
<br />

##Usage

```javascript
  // Function you want to run every loop
  var yourLogic = function (data) {
    //some code
  }
  var yourData = {};
  
  // Register the functions, at least one function should be registered
  timedLoop.registerFunction(yourLogic, yourData, 1); // (function, function data, priority)
  
  // Set loopTime, default is 50ms if function is not called
  timedLoop.setLoopTime(50); // time in ms
  
  // Call start when ready
  timedLoop.start();
  
  // While running call this to get the average looptime of the timed loop
  console.log('Loop Time: ' + timedLoop.getLoopTime().toFixed()));
  
  // Call stop if you need to stop the loop
  timedLoop.stop()

```
