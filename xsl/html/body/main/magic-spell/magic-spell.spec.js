(function (_ns) {
	const spellTitle = 'something';
	const spellTitleAttName = 'iam-magic-spell-title';

	_ns.f.injectToVueConfig({
		computed: {
			// test magic-spell separate in magic-spell.spec.xml
			specSpell: function () {
				return { level: 3, title: spellTitle };
			},
			// test magic-spell with magic-book context defined in spec.xml
			computedSpells: function () {
				return [this.specSpell];
			}
		},
	});
	_ns.f.mount();
	
	const elVue = document.querySelector(_ns.vues[_ns.vues.length - 1].el);

	describe('main > magic-spell template', function () {
		it('title is rendered with ' + spellTitleAttName + ' attribute and title property', function () {
			const elTitles = elVue.querySelectorAll('['+spellTitleAttName+']');
			expect(elTitles.length).toBeGreaterThanOrEqual(1);

			const elTitle = elTitles[elTitles.length - 1];
			expect(elTitle.innerText).toContain(spellTitle);
		});
	});
})(globalThis.homm_ns);
