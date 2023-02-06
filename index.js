// @see https://gist.github.com/jakub-g/5286483ff5f29e8fdd9f#domcontentloaded-vs-load
(function () {
	// document.addEventListener('DOMContentLoaded', setup);
	window.addEventListener('load', setup);
	// TODO: ??? move component list into vues array, needs redefine every component js
	globalThis.homm_ns = { components: {} };
	var _ns = globalThis.homm_ns;

	function setup() {
		setAttrsIsOnOff();
		parseJsons();
		if (globalThis.depp && _ns.imports) {
			deppLoadLibs(_ns.imports);
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

		const scriptSpells = document.querySelector('#spells');
		if (scriptSpells && scriptSpells.textContent && scriptSpells.textContent.indexOf('&spells') < 0) {
			_ns.spells = JSON.parse(scriptSpells.textContent).spells;
		} else {
			console.warn("spells.json isn't loaded!");
		}
	}

	// map of externals dependencies
	function deppLoadLibs(paths) {
		const libIds = Object.keys(paths);
		if (!depp.isDefined(libIds[0])) {
			depp.define({
				'main':			['#merge', '#store', '#vue', paths.main],
				'merge':		[paths.merge],
				'store':		['#vue', '#vuex', paths.store],
				'vue':			[paths.vue],
				'vuex':			[paths.vuex],
			});
		}

		depp.require(libIds, function () {
			deppRequireApp({ el: '[iam-app ~= "vueMain"]' });
		});
	}

	// Can be called only after 'main' script is loaded
	function deppRequireApp(vueConfig) {
		// special configuration for appMain
		if (_ns.store) {
			Object.assign(vueConfig, {
				store: _ns.store,
				// data as a function to prevent mutating data properties in components
				data: function () {
					return {
						some: this.$store.state.storeSpells.length,
					}
				},
				computed: {
					computedSpells: function () {
						return this.$store.state.storeSpells;
					}
				}
			});
		}

		// defined in html/body/main/main.js
		_ns.f.appendVueConfig(vueConfig);

		const compNames = [];
		// defined in html/body/main/main.js
		_ns.f.getComponentNames(vueConfig.el, compNames);

		deppDefineComponentsFiles(compNames);
		// can register all components & subcomponents only after requiring src scripts!
		depp.require(compNames, _ns.f.mount);
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
			if (useStyles) {
				// TODO: renderless haven't such file, but trying to load
				componentsBundles[name].push(path + '.css');
			}
		});

		depp.define(componentsBundles);
	}
})();
