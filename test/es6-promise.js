var assert = require('assert');

require('es6-promise').polyfill();
require('../finally');

describe('finally', function() {
	it('is defined', function(done) {
		assert('finally' in Promise.prototype);
		done();
	});
	it('is called on resolve', function(done) {
		Promise.resolve(3)
			.finally(function(value) {
				assert(value === undefined);
				done();
			});
	});
	it('is called on reject', function(done) {
		Promise.reject(3)
			.finally(function(value) {
				assert(value === undefined);
				done();
			});
	});
});
