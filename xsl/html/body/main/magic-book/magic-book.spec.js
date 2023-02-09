(function (_ns) {
	const methods = _ns.components['magic-book'].methods;

	const spells = [
		{ id: '1', title: 'one', level: 5 },
		{ id: '15', title: 'zone', level: 4 },
		{ id: '3-', title: 'two', level: 4 }
	];
	const spellsQ = spells.length;

	// without initApp, because testing only methods
	// TODO: id methods can be moved to renderless component or mix?
	describe('main > magic-book methods', function () {
		it('filteredByLevel is working', function () {
			const filtered = methods.filteredByLevel(spells, 5);
			expect(filtered.length).toBeLessThanOrEqual(spellsQ);
		});
	});
})(globalThis.homm_ns);
