(function (_ns) {
	const scriptSpells = document.querySelector('#spells');
	var jsonSpells = [];

	if (!scriptSpells
		|| !scriptSpells.textContent
		|| scriptSpells.textContent.indexOf('&spells') > -1) {
		console.warn("spells.json isn't loaded!");
	} else {
		jsonSpells = JSON.parse(scriptSpells.textContent).spells;
	}

	_ns.storeModules['spells'] = {
		namespaced: true,
		state: {
			jsonSpells: jsonSpells,
		},
		getters: {
			all: function (state) {
				return state.jsonSpells.sort(function (a, b) {
					return a.level - b.level || a.title.localeCompare(b.title);
				});
			},
		},
		mutations: {
			reSet: function (state, jsonSpells) {
				state.jsonSpells = jsonSpells;
			}
		},
	};
})(globalThis.homm_ns);
