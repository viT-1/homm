// loaded by loadjs after vue loaded
(function () {
	const mainConfig = {
		f: {}, // common functions fo vueMain and vueSpec
		vues: [],
	}

	const _ns = globalThis.homm_ns;

	// adds mainConfig to properties defined in index.js: imports & spells and store.js: store
	merge(_ns, mainConfig);

	// recursive function to get plain list of components in cssquery (unique) element
	_ns.f.getComponentNames = function (cssQuery, reduceArray) {
		var elem = document.querySelector(cssQuery);
		var attType;

		if (elem) {
			attType = elem.getAttribute('type');
		} else {
			console.warn('Element ' + cssQuery + ' is not found!');
			return;
		}

		// template convert for querying children dom-nodes
		if (attType && attType.indexOf('template') > -1) {
			elem = new DOMParser().parseFromString(elem.innerHTML, "text/html");
		}

		if (elem) {
			Array.prototype.forEach.call(elem.querySelectorAll('*'), function (elem){
				const elemName = elem.tagName.toLowerCase();
				if (reduceArray.indexOf(elemName) == -1 && elemName.indexOf('-') > -1) {
					reduceArray.push(elemName);
					
					// check for templates nesting
					_ns.f.getComponentNames('#' + elemName, reduceArray);
				}
			});
		}
	}

	_ns.f.appendVueConfig = function (vueConfig) {
		const isAlready = _ns.vues.filter(function (config) {
			return config.el == vueConfig.el;
		}).length;

		if (isAlready) {
			console.warn(vueConfig.el, 'We already have that vueConfig!');
		} else {
			_ns.vues.push(vueConfig);
		}
	}

	_ns.f.injectToVueConfig = function (injectConfig) {
		const lastVueConfig = _ns.vues[_ns.vues.length - 1];
		merge(lastVueConfig, injectConfig);
	}

	// mount once last vueConfig
	_ns.f.mount = function () {
		if (!_ns.vues || !_ns.vues.length) {
			throw Error('_ns.vues shoud be initiated!');
		}

		var vueConfig = _ns.vues[_ns.vues.length - 1];
		// this vue isn't initiated
		if (!vueConfig.vue) {
			Object.keys(_ns.components).forEach(function (key) {
				// TODO: if not registered yet
				Vue.component(key, _ns.components[key]);
			});

			// DOM manipulation with querySelector(vueConfig.el) can be here
			// only before Vue reserved this element as text for render function

			// Vue.config.silent = true;
			vueConfig.vue = new Vue(vueConfig);
		}
	}

	_ns.f.createMountDiv = function (specId) {
		const specAttName = 'iam-spec';
		const elDiv = document.createElement('div');
		// Should use child, else have problem with div attributes on mounting app
		elDiv.appendChild(document.createElement('div'));
		elDiv.setAttribute(specAttName, specId);
		document.body.insertAdjacentElement('beforeend', elDiv);

		const queryString = '['+ specAttName +' = "' + specId + '"] > div';

		return queryString;
	}
})();
