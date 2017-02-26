var timedLoop = (function (timedLoop, undefined) {

	'use strict';

	// private variables
	var logicFunctions = [];
	var loopStart = 0; // Initial Loop Time
	var loopDeltaTime = 0; // Delta Time of loop
	var loopTimeDiff = 0; // Difference between LoopTime and dT_Loop
	var loopTIME = 50; // Desired loop time in milliseconds
	var loopWait = 50; // Wait time for setTimeout
	var loopAverage = 0; // Wait time for setTimeout
	var actualWait = 0; // time elapsed until setTimeout actual calls function, this takes into account that other functions and actions are happening
	var waitDifference = 0;
	var previousTime = 0;
	var nowTime = 0;

	// exposed variables
	timedLoop.loopId = 0;

	timedLoop.setLoopTime = function (desiredLoopTime) {
		// Browser does not allow lower than 4ms delay, check for that condition
		loopTIME = (desiredLoopTime >= 4) ? desiredLoopTime : 4;
		loopWait = loopTIME;
		loopAverage = loopTIME;
	}

	timedLoop.registerFunction = function (newFunction, newData, priority) {
		var NewFunction = {};

		NewFunction.pointer = newFunction;
		NewFunction.data = newData || {};
		NewFunction.priority = priority || 1;

		logicFunctions.push(NewFunction);
	}

	timedLoop.startInterval = function () {
		timedLoop.loopIntervalId = setInterval(function () {
			previousTime = nowTime;
			nowTime = performance.now();
			var timeDiff = nowTime - previousTime;

			loopAverage = loopAverage * .9 + .1 * (timeDiff);

			for (var iLoop = 0; iLoop < logicFunctions.length; iLoop++) {
				logicFunctions[iLoop].pointer(logicFunctions[iLoop].data);
			}
		}, loopTIME);
	}

	timedLoop.stop = function () {
		clearTimeout(timedLoop.loopId);
	}

	timedLoop.getLoopTime = function () {
		return loopAverage; // in ms
	}

	return timedLoop;
})(timedLoop || {});