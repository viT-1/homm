(function() {
	if (!homm_ns.spells) {
		console.warn("spells.json isn't loaded!");
		return;
	}

	// Should be defined before VueApp is initiated
	// See dependencies in index.js/loadLibs(paths)
	Vue.use(Vuex);

	homm_ns.store = new Vuex.Store({
		state: {
			// spells: homm_ns.spells.filter(function(spell){ return spell.level == level; }),
			spells: homm_ns.spells,
		}
	});
})();
