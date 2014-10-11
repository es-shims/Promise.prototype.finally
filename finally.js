/**
 * Promise.prototype.finally
 *
 * Pulled from https://github.com/domenic/promises-unwrapping/issues/18#issuecomment-57801572
 * @author @stefanpenner
 */

// Get a handle on the global object
var local;
if (typeof global !== 'undefined') local = global;
else if (typeof window !== 'undefined' && window.document) local = window;
else local = self;

// Polyfill (verb)
var finallySupport = "finally" in local.Promise.prototype;
if (!finallySupport) local.Promise.prototype['finally'] = finallyPolyfill;

// Polyfill (noun)
function finallyPolyfill(callback) {
	var constructor = this.constructor;

	return this.then(function(value) {
			return constructor.resolve(callback()).then(function() {
				return value;
			});
		}, function(reason) {
			return constructor.resolve(callback()).then(function() {
				throw reason;
			});
		});
}
