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

	timedLoop.start = function () {
		loopStart = performance.now();
		timedLoop.loopId = setTimeout(function () {
			var beforeFunctionCall = performance.now();
			actualWait = beforeFunctionCall - loopStart;
			// get difference between actual wait and expected wait,
			// this is on a per loop basis
			waitDifference = (actualWait - loopWait);
			//don't let waitDifference grow larger than the loopWait
			if (Math.abs(waitDifference) > loopWait * 3) {
				waitDifference = 0; // reset it
			}

			//***LOGIC GOES HERE***//
			for (var iLoop = 0; iLoop < logicFunctions.length; iLoop++) {
				logicFunctions[iLoop].pointer(logicFunctions[iLoop].data);
			}
			//***END LOGIC***//

			//*****NO LOGIC AFTER HERE******//
			// Get total elapsed time in between calls and get average
			previousTime = nowTime;
			nowTime = performance.now();
			var funcCallTime = nowTime - beforeFunctionCall;
			var timeDiff = nowTime - previousTime;
			// Apply first order filter to smooth out average
				loopAverage = loopAverage * .9 + .1 * (timeDiff);
			console.log("d:" + timeDiff);
			// if (timeDiff < 200) {
			// 	loopAverage = loopAverage * .9 + .1 * (timeDiff);
			// }

			//determine what the next wait time should be
			loopWait = loopTIME - funcCallTime - waitDifference;
			if (loopWait < 2) {
				loopWait = 2; // don't let loop time lower than 1 ms
			}
			//**********END******************//
			timedLoop.start(); // lastly call logic loop recursively
		}, loopWait);
	}
	timedLoop.startInterval = function () {
		timedLoop.loopIntervalId = setInterval(function () {

			//***LOGIC GOES HERE***//
			for (var iLoop = 0; iLoop < logicFunctions.length; iLoop++) {
				logicFunctions[iLoop].pointer(logicFunctions[iLoop].data);
			}
			//***END LOGIC***//

			//*****NO LOGIC AFTER HERE******//
			// Get total elapsed time in between calls and get average
			previousTime = nowTime;
			nowTime = performance.now();
			var timeDiff = nowTime - previousTime;
			// Apply first order filter to smooth out average
			loopAverage = loopAverage * .9 + .1 * (timeDiff);
			console.log("d:" + timeDiff);
		}, loopTIME);
	}

	timedLoop.stop = function () {
		clearTimeout(timedLoop.loopId);
		clearTimeout(timedLoop.loopIntervalId);
	}

	timedLoop.getLoopTime = function () {
		return loopAverage; // in ms
	}
	timedLoop.getWaitTime = function () {
		return loopWait; // in ms
	}

	return timedLoop;
})(timedLoop || {});