(function (_ns) {
	const mockSpells = [{ "id": 1, "title": "one" }];

	const specStore = _ns.f.setGlobalStore();
	_ns.f.registerDeclaredStoreModules(specStore);

	describe('Vuex store > spells module', function () {
		beforeEach(function () {
			// TODO: make config constants for getters/mutations names
			specStore.commit('spells/reSet', mockSpells);
		});

		it('Initiated store should have mocked spells', function () {
			expect(mockSpells.length).toEqual(specStore.getters['spells/all'].length);
		});
	});
})(globalThis.homm_ns);
