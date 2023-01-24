(function() {
	const spellTitle = 'something';
	const spellTitleAttName = 'iam-magic-spell-title';

	window.homm_ns.data.magicspell = { level: 1, title: spellTitle };

	// fix for magic-spell as child for magic-book
	if (window.homm_ns.data.magicspells) {
		window.homm_ns.data.magicspells.push(window.homm_ns.data.magicspell);
	}

	describe('main/magic-spell template', function () {
		it('title is rendered with ' + spellTitleAttName + ' attribute and title property', function () {
			const elTitles = document.querySelectorAll('['+spellTitleAttName+']');
			const elTitle = elTitles[elTitles.length - 1];

			expect(elTitles).toBeTruthy();
			expect(elTitle.innerHTML).toContain(spellTitle);
		});
	});

})();
