// loaded by loadjs after vue loaded
(function() {
	const componentsNames = ['magic-book'];

	initComponents();
	initVueApp();

	function initComponents() {
		const componentsBasePathToMain = 'xsl/html/body/main/';
	
		const componentsBundles = {};
		componentsNames.forEach(function(name) {
			const path = componentsBasePathToMain + name + '/' + name;
			componentsBundles[name] = [path + '.js', path + '.css'];
		});

		depp.define(componentsBundles);
	}

	function initVueApp() {
		depp.require(componentsNames, function(){
			// Vue.config.silent = true;
			new Vue({
				el: window.homm_ns.queryAppEl,
				components: window.homm_ns.components,
				// fail on Opera 12 when DevTools is already open
				// components: {'magic-book': {template: '<b>test</b>'}},
				data: function() {
					return {
						some: 'thing',
					}
				}
			});
		});
	}
})();
