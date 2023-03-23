(function (_ns) {
	_ns.components['magic-book'] = {
		template: '#magic-book',
		props: {
			spells: {
				type: Array,
				default: function () { return [] },
			},
			spellsType: {
				type: String,
				default: function () { return 'all' },
			}
		},
		computed: {
			// if filtered by school magic, than -2 spells for caption place
			perPage: function () {
				return this.spellsType === 'all' || this.spellsType === 'move' ? 12 : 10;
			},
			ids: function () {
				return _ns.f.getIds(this.spells);
			},
		},
		methods: {
			getSpellsOnActivePage: function (ids) {
				return _ns.f.getSublistByIds(this.spells, ids);
			}
		},
	};
})(globalThis.homm_ns);
