(function() {
	window.homm_ns.components['magic-book'] = {
		template: '#magic-book',
		props: ['spells'],
		// filters deprecated
		// @see https://v3-migration.vuejs.org/breaking-changes/filters.html
		methods: {
			filteredByLevel: function(arrSpells, level) {
				return arrSpells.filter(function(spell){ return spell.level == level; });
			}
		}
	};
})();