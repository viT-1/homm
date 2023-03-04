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
			ids: function () {
				return _ns.f.getIds(this.spells);
			},
		},
		methods: {
			getRouteTo: function (filterConfig) {
				const query = merge({}, this.$route.query);
				return { to: { query: merge(query, filterConfig) } }
			},
			getSpellsOnActivePage: function (ids) {
				return _ns.f.getSublistByIds(this.spells, ids);
			}
		},
	};
})(globalThis.homm_ns);
