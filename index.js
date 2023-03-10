(function (_ns) {
	// @see https://gist.github.com/jakub-g/5286483ff5f29e8fdd9f#domcontentloaded-vs-load
	// document.addEventListener('DOMContentLoaded', setup);
	window.addEventListener('load', setup);
	// TODO: ??? move component list into vues array, needs redefine every component js
	
	function setup() {
		setAttrsIsOnOff();
		parseJsons();
		if (globalThis.depp && _ns.imports) {
			const paths = _ns.imports;

			deppLoadScripts({
				// app
				main:	['#vue', paths.main],
				store:	['#vue', '#vuex', '#main', paths.store],

				// externals
				'vue':			[paths['vue']],
				'vuex':			[paths['vuex']],
				'vue-router': 	[paths['vue-router']],
			}, function () {
				_ns.f.setGlobalStore();
				// storeModules are independed from creating new Vuex.Store, they are configs only!
				deppLoadScripts({
					'store/spells': ['xsl/html/body/main/store/spells.store.js'],
					'store/magic-book': ['xsl/html/body/main/magic-book/magic-book.store.js']
				}, function() {
					_ns.f.registerDeclaredStoreModules(_ns.store);
					deppRequireApp({ el: '[iam-app ~= "vueMain"]' });
				});
			});
		} else {
			console.warn("Externals aren't loaded. Application is failed!");
		}
	}

	// Set attributes html[is-on] & html[is-off] for css UX-rules
	function setAttrsIsOnOff() {
		const htmlTag = document.querySelector('html[is-off]');
	
		if (htmlTag) {
			const attIsOnName = 'is-on';
			const attIsOffName = 'is-off';
	
			const useTouch = isTouchSupported();
	
			// html[is-off] attribute values
			const strInitialIsOff = htmlTag.getAttribute(attIsOffName);
			const arrInitialIsOff = strInitialIsOff.length
				? htmlTag.getAttribute(attIsOffName).split(' ') : [];
			const arrIsOff = arrInitialIsOff.filter(function (item) {
				switch(item) {
					case 'js': return false;
					case 'touch': return !useTouch;
				}
			});
			htmlTag.setAttribute(attIsOffName, arrIsOff.length ? arrIsOff.join(' ') : '');
	
			// html[is-on] attribute values
			const strInitialIsOn = htmlTag.getAttribute(attIsOnName);
			var arrIsOn = strInitialIsOn.length
				? htmlTag.getAttribute(attIsOnName).split(' ') : [];
			if(arrIsOn.indexOf('js') < 0) {
				arrIsOn.push('js');
			}
			if (useTouch && !arrIsOn.indexOf('touch') < 0) {
				arrIsOn.push('touch');
			}
	
			htmlTag.setAttribute(attIsOnName, arrIsOn.join(' '));
		}
	}
	
	function isTouchSupported() {
		return Boolean(
			( 'ontouchstart' in window)
			|| (navigator.msMaxTouchPoints > 0)
			|| (window.DocumentTouch && document instanceof DocumentTouch)
		);
	}

	function parseJsons() {
		const scriptImportmap = document.querySelector('#importmap');
		if (scriptImportmap && scriptImportmap.textContent && scriptImportmap.textContent != '&importmap;') {
			_ns.imports = JSON.parse(scriptImportmap.textContent).imports;
		} else {
			console.warn("importmap.json isn't loaded!");
		}
	}

	function deppLoadScripts(deps, afterLoading) {
		const depKeys = Object.keys(deps);
		if (!depp.isDefined(depKeys[0])) {
			depp.define(deps);
		}

		depp.require(depKeys, afterLoading);
	}

	// Can be called only after 'main' script is loaded
	function deppRequireApp(vueConfig) {
		const computed = merge({
			some: function () {
				return this.computedSpells.length;
			}
		}, Vuex.mapGetters({
			computedSpells: 'spells/all'
		}));

		// special configuration for appMain
		Object.assign(vueConfig, {
			store: _ns.store,
			computed: computed,
		});

		// defined in html/body/main/main.js
		_ns.f.appendVueConfig(vueConfig);

		var compNames = [];
		// defined in html/body/main/main.js
		_ns.f.getComponentNames(globalThis.document, vueConfig.el, compNames);
		if (compNames.indexOf('router-view') > -1) {
			compNames = compNames.concat(_ns.routerViews);
			_ns.routerViews.forEach(function (viewComponent) {
				// searching in router view templates
				_ns.f.getComponentNames(globalThis.document, '#' + viewComponent, compNames);
			});
		}

		compNames = compNames.filter(function (name) {
			return _ns.nativeComponents.indexOf(name) == -1;
		});

		deppDefineComponentsFiles(compNames);

		// can register all components & subcomponents only after requiring src scripts!
		// TODO: require components & storeModules at once!
		depp.require(compNames, function() {
			// depp.done('components are ready');
			deppLoadScripts({
				router: ['#vue-router', '#main', _ns.imports.router],
			}, _ns.f.mount);
		});
	}

	function deppDefineComponentsFiles(componentsNames) {
		const pathSep = '/';
		var arrMainPath = _ns.imports.main.split(pathSep);
		arrMainPath.pop();
		const componentsBasePathToMain = arrMainPath.join(pathSep) + pathSep;
	
		const useStyles = !Boolean(document.querySelector('html[is-on ~= "css-naked-day"]'));

		const componentsBundles = {};
		componentsNames.forEach(function (name) {
			const path = componentsBasePathToMain + name + '/' + name;
			componentsBundles[name] = [path + '.js'];

			if (useStyles && _ns.f.shouldHaveTemplate(name)) {
				componentsBundles[name].push(path + '.css');
			}
		});

		depp.define(componentsBundles);
	}
})(globalThis.homm_ns);
