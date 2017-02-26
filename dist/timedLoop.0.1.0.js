var timedLoop = (function (timedLoop, undefined) {

	'use strict';

	// private variables
	var loopFunctions = [];
	var loopTIME = 50; // Desired loop time in milliseconds

	var loopFunction = function (newFunction, name, newData, loopTime, priority) {
		var NewFunction = {};

		NewFunction.pointer = newFunction;
		NewFunction.data = newData || {};
		NewFunction.priority = priority || 1;
		NewFunction.useCustomLoopTime = (loopTime == undefined) ? false : true;
		NewFunction.loopTime = loopTime || loopTIME;
		NewFunction.id = 0;
		NewFunction.nowTime = performance.now();
		NewFunction.previousTime = NewFunction.nowTime;
		NewFunction.loopAverage = NewFunction.loopTime;

		return NewFunction;
	}
	// exposed variables
	timedLoop.loopId = 0;

	timedLoop.setLoopTime = function (desiredLoopTime) {
		// Browsers cannot guarantee less than 15ms delay
		if (desiredLoopTime < 15) { 
			console.log("timedLoop: Cannot set lower than 15ms");
		}
		loopTIME = (desiredLoopTime < 15) ? 15 :desiredLoopTime;
	}

	timedLoop.registerFunction = function (newFunction, name, newData, loopTime, priority) {
		var index = loopFunctions.push(new loopFunction(newFunction, name, newData, loopTime, priority));
		loopFunctions[index - 1].name = name || ('timeLoop-' + (index - 1));
	}

	var loopFunctionSync = function (iLoop) {
		var thisFunction = loopFunctions[iLoop];
		
		thisFunction.id = setInterval(function () {
			thisFunction.previousTime = thisFunction.nowTime;
			thisFunction.nowTime = performance.now();

			thisFunction.pointer(thisFunction.data);
			thisFunction.loopAverage = thisFunction.loopAverage * .9 + .1 * (thisFunction.nowTime - thisFunction.previousTime);
		}, (thisFunction.useCustomLoopTime) ? thisFunction.loopTime : loopTIME);

		iLoop++;
		if (iLoop < loopFunctions.length) {
			loopFunctionSync(iLoop);
		}
	}

	timedLoop.start = function () {
		loopFunctionSync(0);
	}

	timedLoop.stop = function () {
		clearTimeout(timedLoop.loopId);
	}

	timedLoop.getLoopTime = function () {
		var loopAverage = 0;
		loopFunctions.forEach(function(element) {
			loopAverage += element.loopAverage;
		});
		loopAverage = loopAverage / (loopFunction.length - 1);
		return loopAverage; // in ms
	}

	return timedLoop;
})(timedLoop || {});