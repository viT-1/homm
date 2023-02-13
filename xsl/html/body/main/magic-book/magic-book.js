(function (_ns) {
	_ns.components['magic-book'] = {
		template: '#magic-book',
		props: {
			config: {
				type: Object,
				default: function () {
					return {
						filters: {} // ATTENTION! filterS
					};
				}
			},
			spells: {
				type: Array,
				default: function () { return [] },
			},
		},
		computed: {
			// returns keyed methods
			filters: function () {
				return {
					level: this.levelFilter,
					wisdom: this.wisdomFilter,
				};
			},
			allSpellsAfterFiltering: function () {
				const retSpells = _ns.f.applyFiltersByConfig(
					this.spells, this.filters, this.config.filters
				);
				console.warn('allSpellsAfterFiltering', this.config.filters, retSpells)

				return retSpells;
			},
			allIdsAfterFiltering: function () {
				return _ns.f.getIds(this.allSpellsAfterFiltering);
			},
		},

		// filters API deprecated, methods should be used
		// @see https://v3-migration.vuejs.org/breaking-changes/filters.html
		methods: {
			levelFilter: function (level) {
				// closure, additional param for standard Array.filter callback
				return function(spell) {
					return spell.level == level;
				}
			},
			// wisdomLevel: 0 - none, 1 - basic, 2 - advanced, 3 - expert
			wisdomFilter: function (wisdomLevel) {
				return function(spell) {
					const maxLevel = 2 + wisdomLevel;
					return spell.level <= maxLevel;
				}
			},
			getPageSpells: function (arrSpells, ids) {
				return _ns.f.getSublistByIds(arrSpells, ids);
			},
		},
	};
})(globalThis.homm_ns);
