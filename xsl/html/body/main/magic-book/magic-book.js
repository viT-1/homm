(function (_ns) {
	_ns.components['magic-book'] = {
		template: '#magic-book',
		props: {
			spells: {
				type: Array,
				default: function () { return [] },
			},
		},
		data: function () {
			return {
				configFilters: {
					level: 3,
				},
			};
		},
		computed: {
			// returns keyed methods
			filters: function () {
				return {
					level: this.levelFilter
				};
			},
			allSpellsAfterFiltering: function () {
				return _ns.f.applyFiltersByConfig(
					this.spells, this.filters, this.configFilters
				);
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
			getPageSpells: function (arrSpells, ids) {
				return _ns.f.getSublistByIds(arrSpells, ids);
			},
		}
	};
})(globalThis.homm_ns);
