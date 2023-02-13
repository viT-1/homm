(function (_ns) {
	const spellTitle = 'something';
	const spellTitleAttName = 'iam-magic-spell-title';
	const predefinedSpell = { level: 3, title: spellTitle };

	const vueConfig = _ns.vues[_ns.vues.length - 1];
	const rawTemplate = document.querySelector(vueConfig.el + ' > magic-spell');

	describe('main > magic-spell Vue template', function () {
		function setupIt () {
			const setup = {
				template: rawTemplate.outerHTML,
				data: function () {
					return {
						specSpell: predefinedSpell,
					};
				}
			};

			const App = Vue.extend(setup);
			const vm = new App().$mount(
				_ns.f.createMountDiv(jasmine.currentTest.description)
			);

			return vm;
		}

		it('title is rendered with ' + spellTitleAttName + ' attribute and title property', function () {
			const vm = setupIt();

			const elTitles = vm.$el.querySelectorAll('['+spellTitleAttName+']');
			expect(elTitles.length).toEqual(1);

			const elTitle = elTitles[elTitles.length - 1];
			expect(elTitle.innerText).toContain(spellTitle);
		});
	});
})(globalThis.homm_ns);
