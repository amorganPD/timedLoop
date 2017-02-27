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
		NewFunction.nowLoopTime = performance.now();
		NewFunction.previousLoopTime = NewFunction.nowLoopTime;
		NewFunction.nowFuncCallTime = 0;
		NewFunction.previousFuncCallTime = 0;
		NewFunction.loopAverage = NewFunction.loopTime;
		NewFunction.functionCallTimeAvg = 0;

		return NewFunction;
	}
	// exposed variables
	timedLoop.loopId = 0;

	timedLoop.setLoopTime = function (desiredLoopTime) {
		// Browsers cannot guarantee less than 15ms delay
		if (desiredLoopTime < 15) { 
			console.log("timedLoop: Cannot set lower than 15ms");
		}
		loopTIME = (desiredLoopTime < 15) ? 15 : desiredLoopTime;
	}

	timedLoop.registerFunction = function (newFunction, name, newData, loopTime, priority) {
		var index = loopFunctions.push(new loopFunction(newFunction, name, newData, loopTime, priority));
		loopFunctions[index - 1].name = name || ('timedLoop-' + (index - 1));
	}

	var loopFunctionSync = function (iLoop) {
		var thisFunction = loopFunctions[iLoop];
		
		thisFunction.id = setInterval(function () {
			thisFunction.previousLoopTime = thisFunction.nowLoopTime;
			thisFunction.nowLoopTime = performance.now();
			thisFunction.previousFuncCallTime = thisFunction.nowLoopTime;

			thisFunction.pointer(thisFunction.data);
			
			thisFunction.nowFuncCallTime = performance.now();
			thisFunction.functionCallTimeAvg = thisFunction.functionCallTimeAvg * .9 + .1 * (thisFunction.nowFuncCallTime - thisFunction.previousFuncCallTime);
			thisFunction.loopAverage = thisFunction.loopAverage * .9 + .1 * (thisFunction.nowLoopTime - thisFunction.previousLoopTime);
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

	timedLoop.getFunctionByName = function (name) {
		var functionIndex = -1;
		loopFunctions.forEach(function(element, index) {
			if (element.name == name) {
				functionIndex = index;
			}
		});
		return functionIndex;
	}
	timedLoop.getFunctionLoopTime = function(name) {
		return loopFunctions[timedLoop.getFunctionByName(name)].functionCallTimeAvg;
	}
	timedLoop.getAllFunctionLoopTimes = function() {
		var Averages = [];
		loopFunctions.forEach(function (element) {
			Averages.push({name: elemnt.name, loopTimeAverage: element.functionCallTimeAvg});
		});
		return Averages;
	}
	timedLoop.getLoopTime = function () {
		var loopAverage = 0;
		loopFunctions.forEach(function(element) {
			loopAverage += element.loopAverage;
		});
		loopAverage = loopAverage / (loopFunctions.length - 1);
		return loopAverage; // in ms
	}

	return timedLoop;
})(timedLoop || {});