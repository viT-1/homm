(function (_ns) {
	_ns.components['magic-book'] = {
		template: '#magic-book',
		props: {
			hero: {
				type: Object,
				default: function () {
					return {
						spellPoints: 20,
						skills: {
							wisdom: 3,
							air: 1,
							earth: 0,
							fire: 2,
							water: 0,
						},
					};
				},
			},
			spells: {
				type: Array,
				default: function () { return []; },
			},
			spellsType: {
				type: String,
				default: function () { return 'all'; },
			}
		},
		emits: ['spell-click'],
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
			getOnSpellClickFunc: function (spell) {
				const func = function () {
					this.$emit('spell-click', spell.id);
				};

				return func.bind(this);
			},
			getSpellSkillLvl: function (spell, skills) {
				return _ns.f.getSpellSkillLvl (spell, skills);
			},
			getSpellsOnActivePage: function (ids) {
				return _ns.f.getSublistByIds(this.spells, ids);
			},
		},
	};
})(globalThis.homm_ns);
