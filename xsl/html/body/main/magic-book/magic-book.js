(function (_ns) {
	_ns.components['magic-book'] = {
		template: '#magic-book',
		props: {
			spells: {
				type: Array,
				default: function () { return [] },
			},
		},
		computed: {
			// if filtered by school magic, than -2 spells for caption place
			perPage: function () {
				return this.spellsType === 'all' || this.spellsType === 'move' ? 12 : 10;
			},
			spellsType: function () {
				return this.$route.query.type;
			},
			ids: function () {
				return _ns.f.getIds(this.spells);
			},
		},
		methods: {
			getRouteTo: function (filterConfig) {
				const query = merge({}, this.$route.query);
				if ((query.type == 'move')) {
					query.type = 'all';
				}
				return { query: merge(query, filterConfig) };
			},
			getSpellsOnActivePage: function (ids) {
				return _ns.f.getSublistByIds(this.spells, ids);
			}
		},
	};
})(globalThis.homm_ns);
