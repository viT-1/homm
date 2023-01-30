// loaded by loadjs after vue loaded
(function() {
	const mainConfig = {
		f: {}, // common functions fo vueMain and vueSpec
		vues: [],
	}

	// adds mainConfig to properties defined in index.js: imports & spells and store.js: store
	Object.assign(window.homm_ns, mainConfig);

	// recursive function to get plain list of components in cssquery (unique) element
	window.homm_ns.f.getComponentNames = function(cssQuery, reduceArray) {
		var elem = document.querySelector(cssQuery);
		const attType = elem.getAttribute('type');

		// template convert for querying children dom-nodes
		if (attType && attType.indexOf('template') > -1) {
			elem = new DOMParser().parseFromString(elem.innerHTML, "text/html");
		}

		if (elem) {
			Array.prototype.forEach.call(elem.querySelectorAll('*'), function(elem){
				const elemName = elem.tagName.toLowerCase();
				if (reduceArray.indexOf(elemName) == -1 && elemName.indexOf('-') > -1) {
					reduceArray.push(elemName);
					
					// check for templates nesting
					window.homm_ns.f.getComponentNames('#' + elemName, reduceArray);
				}
			});
		}
	}

	window.homm_ns.f.appendVueConfig = function (vueConfig) {
		const isAlready = window.homm_ns.vues.filter(function(config) {
			return config.el == vueConfig.el;
		}).length;

		if (isAlready) {
			console.warn(vueConfig.el, 'We already have that vueConfig!');
		} else {
			window.homm_ns.vues.push(vueConfig);
		}
	}

	window.homm_ns.f.injectToVueConfig = function (injectConfig) {
		const lastVueConfig = window.homm_ns.vues[window.homm_ns.vues.length - 1];
		Object.assign(lastVueConfig, injectConfig);
	}

	// mount once last vueConfig
	window.homm_ns.f.mount = function () {
		if (!window.homm_ns.vues || !window.homm_ns.vues.length) {
			throw Error('window.homm_ns.vues shoud be initiated!');
		}

		var vueConfig = window.homm_ns.vues[window.homm_ns.vues.length - 1];
		// this vue isn't initiated
		if (!vueConfig.vue) {
			Object.keys(window.homm_ns.components).forEach(function(key) {
				Vue.component(key, window.homm_ns.components[key]);
			});

			// DOM manipulation only before Vue reserved this element to render function

			// Vue.config.silent = true;
			vueConfig.vue = new Vue(vueConfig);
		}
	}
})();
