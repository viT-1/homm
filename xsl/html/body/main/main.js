// loaded by loadjs after vue loaded
(function() {
	const mainConfig = {
		queryElVueApp: '[iam-main]',
		components: {},
		initApp: function() {
			const componentsNames = ['magic-book', 'magic-spell'];		
			initComponents(componentsNames);
			initVueApp(componentsNames);
			// clear beforeMount
		}
	}
	Object.assign(window.homm_ns, mainConfig);

	window.homm_ns.initApp();

	// TODO remove homm_ns.imports (path to components) dependency to use in spec
	function initComponents(componentsNames) {
		const pathSep = '/';
		var arrMainPath = homm_ns.imports.main.split(pathSep);
		arrMainPath.pop();
		const componentsBasePathToMain = arrMainPath.join(pathSep) + pathSep;
	
		const useStyles = Boolean(document.querySelector('html[is-on ~= "css-naked-day"]'));

		const componentsBundles = {};
		componentsNames.forEach(function(name) {
			const path = componentsBasePathToMain + name + '/' + name;
			componentsBundles[name] = [path + '.js'];
			if (useStyles) {
				componentsBundles[name].push(path + '.css');
			}
		});

		depp.define(componentsBundles);
	}

	function initVueApp(componentsNames) {
		depp.require(componentsNames, function(){
			// can register all components & subcomponents only after requiring src scripts!
			Object.keys(window.homm_ns.components).forEach(function(key) {
				Vue.component(key, window.homm_ns.components[key]);
			});

			// clear beforeMount state value before Vue reserved this element to render function
			document.querySelector(window.homm_ns.queryElVueApp).setAttribute('iam-main', '');

			// Vue.config.silent = true;
			window.homm_ns.vueApp = new Vue({
				el: window.homm_ns.queryElVueApp,
				store: window.homm_ns.store,
				// fail on Opera 12 when DevTools is already open
				// components: {'magic-book': {template: '<b>test</b>'}},
				data:  window.homm_ns.data ? window.homm_ns.data : function() {
					return {
						some: this.$store.state.spells.length,
					}
				},
				computed: {
					spells: function() {
						return this.$store.state.spells;
					}
				}
			});
		});
	}
})();
