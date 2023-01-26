(function() {
	const spells = [
		{ id: '1', title: 'one', level: 5 },
		{ id: '15', title: 'zone', level: 4 },
		{ id: '3-', title: 'two', level: 4 }
	];

	const spellsQ = spells.length;
	const component = homm_ns.components['magic-book'];

	// window.homm_ns.data.magicspells = spells;

	// without initApp, because testing only methods
	// TODO: id methods can be moved to renderless component or mix?
	describe('main/magic-book methods', function () {
		it('filteredByLevel is working', function () {
			const filtered = component.methods.filteredByLevel(spells, 5);
			expect(filtered.length).toBeLessThanOrEqual(spellsQ);
		});

		it('getIds should give us same length array as input array', function () {
			const ids = component.methods.getIds(spells);
			expect(ids.length).toEqual(spellsQ);
		});

		it('getIds should return us array with simple items in same order as input array', function () {
			const ids = component.methods.getIds(spells);
			expect(ids[0]).toEqual(spells[0].id);
			expect(ids[spellsQ - 1]).toEqual(spells[spellsQ - 1].id);
		});

		it('getSublistByIds should give us array with items exist ids', function () {
			const realIds = component.methods.getIds(spells);
			const filterIds = [spells[0].id, 2];
			const expectedIds = filterIds.filter(function(id) {
				return realIds.indexOf(id) > -1;
			});
			
			const filteredSpells = component.methods.getSublistByIds(spells, filterIds);
			expect(filteredSpells.length).toEqual(expectedIds.length);
		});
	});

})();
