// any: poly and ponyfills
(function () {
	/*
	if (window.MSInputMethodContext && document.documentMode) {
		document.write('<script src="externals/ie11CustomProperties.js"><\/script>');
	}
	*/

	const cssVarsSupported = ((window || {}).CSS || {}).supports
		&& window.CSS.supports('(--a: 0)');

	console.log('cssVarsSupported', cssVarsSupported);

	// @see https://stackoverflow.com/questions/30498318/#49108759
	if (typeof Object.assign != 'function') {
		// Must be writable: true, enumerable: false, configurable: true
		Object.defineProperty(Object, 'assign', {
			value: function assign(target, varArgs) { // .length of function is 2
				'use strict';
				if (target == null) { // TypeError if undefined or null
					throw new TypeError('Cannot convert undefined or null to object');
				}

				var to = Object(target);

				for (var index = 1; index < arguments.length; index++) {
					var nextSource = arguments[index];

					if (nextSource != null) { // Skip over if undefined or null
						for (var nextKey in nextSource) {
							// Avoid bugs when hasOwnProperty is shadowed
							if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
								to[nextKey] = nextSource[nextKey];
							}
						}
					}
				}
				return to;
			},
			writable: true,
			configurable: true
		});
	}

	// @see https://cdn.jsdelivr.net/npm/@ungap/global-this@0.4.4/index.js
	(function (Object) {
		typeof globalThis !== 'object' && (
			this ?
				get() :
				(Object.defineProperty(Object.prototype, '_T_', {
					configurable: true,
					get: get
				}), _T_)
		);
		function get() {
			var global = this || self;
			global.globalThis = global;
			delete Object.prototype._T_;
		}
	}(Object));

	Number.isInteger = Number.isInteger || function (value) {
		return typeof value === "number" &&
			isFinite(value) &&
			Math.floor(value) === value;
	};
})();
