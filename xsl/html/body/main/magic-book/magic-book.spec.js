(function() {
	const spells = [{ title: 'one', level: 5 }, { title: 'two', level: 4 }];
	const component = homm_ns.components['magic-book'];

	window.homm_ns.data.magicspells = spells;

	// without initApp, because testing only methods
	describe('main/magic-book methods', function () {
		it('filteredByLevel is working', function () {
			const filtered = component.methods.filteredByLevel(spells, 5);
			expect(spells.length).toBeGreaterThan(filtered.length);
		});
	});

})();
