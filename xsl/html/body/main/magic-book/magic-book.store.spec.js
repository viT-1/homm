(function (_ns) {
	const mockSpells = [
		{ id: '1', title: 'Shield', level: 1, type: ['earth', 'buff'], combat: true },
		{ id: '15', title: 'Slow', level: 1, type: ['earth', 'debuff'], combat: true },
		{ id: '3-', title: 'Blind', level: 2, type: ['fire', 'debuff'], combat: true },
		{ id: 3, title: 'Haste', level: 1, type: ['air', 'buff', 'move', 'self'], combat: true },
		{ id: 34, title: 'Dimension Door', level: 5, type: ['air', 'move', 'hero'], combat: false },
	];

	const specStore = _ns.f.setGlobalStore();
	_ns.f.registerDeclaredStoreModules(specStore);

	const filters = specStore.getters['magic-book/filtersFuncs'];

	describe('Vuex store > magic-book module', function () {
		beforeEach(function () {
			// TODO: make config constants for getters/mutations names
			specStore.commit('spells/reSet', mockSpells);
			specStore.commit('magic-book/setDefaultFilter');
		});

		it('Initiated store with setDefaultFilter should have not empty activeFilters', function () {
			const defaultFilter = specStore.getters['magic-book/activeFilters'];
			expect(Object.keys(defaultFilter).length).toBeGreaterThan(0);
		});

		it('Initiated store with setDefaultFilter should have less (but not 0) mocked spells', function () {
			// console.log(specStore.getters['magic-book/activeFilters'], specStore.getters['magic-book/spells'])
			const spellsQ = specStore.getters['magic-book/spells'].length;
			expect(spellsQ).toBeLessThan(mockSpells.length);
			expect(spellsQ).toBeGreaterThan(0);

			specStore.commit('magic-book/setFilters', {});
			expect(specStore.getters['magic-book/spells'].length).toEqual(mockSpells.length);
		});

		const checkFilterWorkingByMainJs = function (filtersConfig) {
			const filtered = _ns.f.applyFiltersByConfig(mockSpells, filters, filtersConfig);

			specStore.commit('magic-book/setFilters', filtersConfig);
			const spellsQ = specStore.getters['magic-book/spells'].length;

			console.log(Object.keys(filtersConfig), spellsQ);
			expect(spellsQ).toEqual(filtered.length);
			expect(spellsQ).toBeGreaterThan(0);
		};

		it('Filter "level" is working correctly', function () {
			checkFilterWorkingByMainJs({ level: 1 });
		});

		it('Filter "type" is working correctly', function () {
			checkFilterWorkingByMainJs({ type: 'earth' });
			checkFilterWorkingByMainJs({ type: 'buff' });
		});

		it('Filter "type" with "combat" is working correctly', function () {
			checkFilterWorkingByMainJs({ type: 'air', combat: true });
		});

		it('Filter "wisdom" is working correctly', function () {
			checkFilterWorkingByMainJs({ wisdom: 1 });
			checkFilterWorkingByMainJs({ wisdom: 3 });
		});

		it('Filter "combat" is working correctly', function () {
			checkFilterWorkingByMainJs({ combat: false });
			checkFilterWorkingByMainJs({ combat: true });
		});
	});
})(globalThis.homm_ns);
