'use strict';

var requirePromise = require('./requirePromise');

requirePromise();

var $TypeError = require('es-errors/type');

var PromiseResolve = require('es-abstract/2023/PromiseResolve');
var IsCallable = require('es-abstract/2023/IsCallable');
var SpeciesConstructor = require('es-abstract/2023/SpeciesConstructor');
var Type = require('es-abstract/2023/Type');

var setFunctionName = require('set-function-name');

var OriginalPromise = Promise;

var createThenFinally = function CreateThenFinally(C, onFinally) {
	return function (value) {
		var result = onFinally();
		var promise = PromiseResolve(C, result);
		var valueThunk = function () {
			return value;
		};
		return promise.then(valueThunk);
	};
};

var createCatchFinally = function CreateCatchFinally(C, onFinally) {
	return function (reason) {
		var result = onFinally();
		var promise = PromiseResolve(C, result);
		var thrower = function () {
			throw reason;
		};
		return promise.then(thrower);
	};
};

/* eslint no-invalid-this: 0 */

module.exports = setFunctionName(function finally_(onFinally) {
	var promise = this;

	if (Type(promise) !== 'Object') {
		throw new $TypeError('receiver is not an Object');
	}

	var C = SpeciesConstructor(promise, OriginalPromise); // may throw

	var thenFinally = onFinally;
	var catchFinally = onFinally;
	if (IsCallable(onFinally)) {
		thenFinally = createThenFinally(C, onFinally);
		catchFinally = createCatchFinally(C, onFinally);
	}

	return promise.then(thenFinally, catchFinally);
}, 'finally', true);
