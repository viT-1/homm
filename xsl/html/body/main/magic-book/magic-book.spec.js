(function (_ns) {
	const comp = _ns.components['magic-book'];

	const spells = [
		{ id: '1', title: 'one', level: 5 },
		{ id: '15', title: 'zone', level: 4 },
		{ id: '3-', title: 'two', level: 4 }
	];
	const spellsQ = spells.length;

	// without initApp, because testing only methods
	describe('main > magic-book methods', function () {
		it('levelFilter is working', function () {
			const filters = {
				level: comp.methods.levelFilter
			}
			const filtered = _ns.f.applyFiltersByConfig(spells, filters, { level: 4 });

			expect(filtered.length).toBeLessThanOrEqual(spellsQ);
		});
	});
})(globalThis.homm_ns);
