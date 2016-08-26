'use strict';

module.exports = function requirePromise() {
	if (typeof (Promise || global.Promise || window.Promise) !== 'function') {
		throw new TypeError('`Promise.prototype.finally` requires a global `Promise` be available.');
	}
};
