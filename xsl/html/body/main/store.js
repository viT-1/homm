(function() {
	var _ns = globalThis.homm_ns;
	
	if (!_ns.spells) {
		console.warn("spells.json isn't loaded!");
		return;
	}

	// Should be defined before VueApp is initiated
	// See dependencies in index.js/loadLibs(paths)
	Vue.use(Vuex);

	_ns.store = new Vuex.Store({
		state: {
			// spells: _ns.spells.filter(function(spell){ return spell.level == level; }),
			storeSpells: _ns.spells,
		}
	});
})();
