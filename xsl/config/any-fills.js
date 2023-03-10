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


	// @see https://stackoverflow.com/questions/9500318/#9500734
	(function (DOMParser) {
		"use strict";
		var DOMParser_proto = DOMParser.prototype
			, real_parseFromString = DOMParser_proto.parseFromString;

		// Firefox/Opera/IE throw errors on unsupported types  
		try {
			// WebKit returns null on unsupported types  
			if ((new DOMParser).parseFromString("", "text/html")) {
				// text/html parsing is natively supported  
				return;
			}
		} catch (ex) { }

		DOMParser_proto.parseFromString = function (markup, type) {
			if (/^\s*text\/html\s*(?:;|$)/i.test(type)) {
				var doc = document.implementation.createHTMLDocument("")
					, doc_elt = doc.documentElement
					, first_elt;

				doc_elt.innerHTML = markup;
				first_elt = doc_elt.firstElementChild;

				if (doc_elt.childElementCount === 1
					&& first_elt.localName.toLowerCase() === "html") {
					doc.replaceChild(first_elt, doc_elt);
				}

				return doc;
			} else {
				return real_parseFromString.apply(this, arguments);
			}
		};
	}(DOMParser));

	/*
	**	@see https://gist.github.com/ahtcx/0cd94e62691f539160b32ecda18af3d6?permalink_comment_id=2930530#gistcomment-2930530
	*/
	globalThis.merge = function (target, source) {
		function isObject(obj) {
			return !!obj && obj.constructor === Object;
		}

		if (!isObject(target) || !isObject(source)) {
			return source;
		}

		Object.keys(source).forEach(function(key) {
			const targetValue = target[key];
			const sourceValue = source[key];

			if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
				target[key] = targetValue.concat(sourceValue);
			} else if (isObject(targetValue) && isObject(sourceValue)) {
				target[key] = merge(Object.assign({}, targetValue), sourceValue);
			} else {
				target[key] = sourceValue;
			}
		});

		return target;
	}
})();
