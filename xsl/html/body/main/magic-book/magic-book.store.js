// Stores the spell filtering state. Paging works without vuex
(function (_ns) {
	// @see also ../router/index.router.js _ns.store.commit
	const defaultFilterConfig = {
		combat: true,
	};

	// filters API deprecated, methods should be used
	// @see https://v3-migration.vuejs.org/breaking-changes/filters.html
	const filters = {
		combat: function (shouldBeCombat) {
			return function(spell) {
				return spell.combat == shouldBeCombat;
			}
		},
		level: function (level) {
			// closure, additional param for standard Array.filter callback
			return function(spell) {
				return spell.level == level;
			}
		},
		// wisdomLevel: 0 - none, 1 - basic, 2 - advanced, 3 - expert
		wisdom: function (wisdomLevel) {
			return function(spell) {
				const maxLevel = 2 + wisdomLevel;
				return spell.level <= maxLevel;
			}
		},
		// only one type in "type" array can be displayed
		type: function (spellType) {
			return function(spell) {
				return spell.type.indexOf(spellType) > -1;
			}
		},
	};

	// TODO: make config constants for getters names
	const getters = {
		activeFilters: function (state) {
			return state.activeFilters;
		},
		activeSpell: function (state) {
			return state.activeSpell;
		},
		filtersFuncs: function() {
			return filters;
		},
		spells: function(state) {
			const allSpells = _ns.store.getters['spells/all'];
			const retSpells = _ns.f.applyFiltersByConfig(
				allSpells, filters, state.activeFilters
			);

			return retSpells;
		},
		ids: function (state, moduleGetters) {
			return _ns.f.getIds(moduleGetters.spells);
		},
	};

	// TODO: make config constants for mutations names
	const mutations = {
		setActiveSpellById: function (state, spellId) {
			//* Warning: access to getter from mutation here!
			// It can be set by payload - whole spell (not by id), but unsecure data object
			state.activeSpell = getters.spells(state).filter(function (spell) {
				return spell.id == spellId;
			})[0];
		},
		// @see https://github.com/vuejs/vuex/issues/1118
		setDefaultFilter: function (state) {
			state.activeFilters = defaultFilterConfig;
		},
		setFilters: function (state, filtersConfig) {
			state.activeFilters = filtersConfig;
		},
	};

	_ns.storeModules['magic-book'] = {
		namespaced: true,
		state: {
			activeFilters: defaultFilterConfig,
			activeSpell: undefined,
		},
		getters: getters,
		// mapGetters needs context of vue instance to access $store
		// getters:  Vuex.mapGetters({ spells: 'spells/all' }),
		// getters:  Vuex.mapGetters.apply({ $store: _ns.store }, [{ spells: 'spells/all' }]),
		mutations: mutations,
	};


})(globalThis.homm_ns);
