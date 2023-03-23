(function (_ns) {
	_ns.components['magic-book-marks'] = {
		template: '#magic-book-marks',
		computed: {
			spellsType: function () {
				return this.$route.query.type;
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
		},
	};
})(globalThis.homm_ns);