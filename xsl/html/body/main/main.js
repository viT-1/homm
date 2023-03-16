// functions for work with XHTML
(function (_ns) {
	if (!_ns.f) {
		_ns.f = {};
	}

	// same dom element as head.xsl > $head.homm-version
	const styleUrls = document.head.querySelector('#css-urls');
	if (styleUrls) {
		_ns['homm-version'] = styleUrls.getAttribute('href').split('/')[0];
	}
	
	// recursive function to get plain list of components in cssquery (unique) element
	_ns.f.getComponentNames = function (queryContext, cssQuery, reduceArray) {
		const elem = queryContext.querySelector(cssQuery);

		if (!elem) {
			console.warn('Element ' + cssQuery + ' is not found!');
			return;
		}

		const tagName = elem.tagName.toLowerCase();
		var elems;

		if (tagName == 'script') {
			const attType = elem.getAttribute('type');
			if (attType && attType.indexOf('template') > -1) {
				const docFragment = new DOMParser().parseFromString(elem.innerHTML.trim(), 'text/html');
				elems = docFragment.querySelectorAll('body *');
			}
		} else {
			elems = elem.querySelectorAll('*');
		}

		// inner function with reduceArray closure
		const checkElems = function (elems) {
			Array.prototype.forEach.call(elems,	function (el) {
				const childTagName = el.tagName.toLowerCase();
				const isAlreadyPushed = reduceArray.indexOf(childTagName) > -1;
				const isWebComponentTag = childTagName.indexOf('-') > -1
	
				if (!isAlreadyPushed && isWebComponentTag) {
					reduceArray.push(childTagName);

					const queryForScriptTemplate = '#' + childTagName;
					const foundScriptTemplate = globalThis.document.querySelector(queryForScriptTemplate);

					if (foundScriptTemplate === null) {
						if (_ns.f.shouldHaveTemplate(childTagName)) {
							console.warn('Template ' + queryForScriptTemplate + ' is not found!');
						}
					} else {
						_ns.f.getComponentNames(globalThis.document, queryForScriptTemplate, reduceArray);
					}
				}

				if (!isWebComponentTag) {
					var innerTags;
					// TODO: refactor browser specific (ie11)
					if (childTagName == 'template') {
						if (el.children && el.children.length > 0) {
							innerTags = el.children;
						}
	
						if (el.content && el.content.children && el.content.children.length > 0) {
							innerTags = el.content.children;
						}
					} else {
						innerTags = el.querySelectorAll('*');
					}

					checkElems(innerTags);
				}
			});
		}

		if (elems) {
			checkElems(elems);
		}
	}

	_ns.f.shouldHaveTemplate = function (componentName) {
		var should = true;
		if (_ns.components) {
			const componentDeclaration = _ns.components[componentName];

			if (false
				// component is already registered (spec context)
				|| (componentDeclaration && !componentDeclaration.template)
				// but can be run before component registering!
				|| (_ns.nativeComponents.indexOf(componentName) > -1)
				|| (_ns.renderless.indexOf(componentName) > -1)) {
				should = false;
			}
		}

		return should;
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
})(globalThis.homm_ns);

// functions for work with Vue
(function (_ns) {
	_ns.vues = [];
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

	_ns.f.registerDeclaredComponents = (function() {
		var alreadyRegistered = false;

		return function () {
			if (!alreadyRegistered) {
				Object.keys(_ns.components).forEach(function (key) {
					// TODO: if not registered yet (in other scripts)
					Vue.component(key, _ns.components[key]);
				});
				
				if (Object.keys(_ns.components).length) {
					alreadyRegistered = true;
				}
			}
		};
	})();

	// mount once last vueConfig
	_ns.f.mount = function () {
		if (!_ns.vues || !_ns.vues.length) {
			throw Error('_ns.vues shoud be initiated!');
		}

		var vueConfig = _ns.vues[_ns.vues.length - 1];
		// this vue isn't initiated
		if (!vueConfig.vue) {
			_ns.f.registerDeclaredComponents();

			// DOM manipulation with querySelector(vueConfig.el) can be here
			// only before Vue reserved this element as text for render function

			// Vue.config.silent = true;
			vueConfig.vue = new Vue(vueConfig);
		}
	}
})(globalThis.homm_ns);

// helpers
(function (_ns) {
	_ns.f.getIds = function (arrObjWithId) {
		const arrIds = [];
		arrObjWithId.forEach(function (obj){ arrIds.push(obj.id); });
		return arrIds;
	}

	_ns.f.getSublistByIds = function (arrObjWithId, arrIds) {
		const sublist = [];
		arrObjWithId.forEach(function (obj){
			if (arrIds.indexOf(obj.id) > -1) {
				sublist.push(obj);
			}
		});
		return sublist;
	}

	// array.filter callbacks config/manager
	_ns.f.applyFiltersByConfig = function(list, filters, configFilters) {
		var filtered = list; // initial list
		// applying all filters, defined in configFilters
		Object.keys(configFilters).forEach(function (filterKey) {
			filtered = filtered.filter(
				filters[filterKey](configFilters[filterKey])
			);
		});

		return filtered;
	}
})(globalThis.homm_ns);
