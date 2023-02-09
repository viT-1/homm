(function (_ns) {
	_ns.components['magic-book'] = {
		template: '#magic-book',
		props: ['spells'],
		computed: {
			spellsIds: function () {
				return _ns.f.getIds(this.spells);
			},
		},

		// filters deprecated
		// @see https://v3-migration.vuejs.org/breaking-changes/filters.html
		methods: {
			filteredByLevel: function (arrSpells, level) {
				return arrSpells.filter(function (spell){ return spell.level == level; });
			},
		}
	};
})(globalThis.homm_ns);
