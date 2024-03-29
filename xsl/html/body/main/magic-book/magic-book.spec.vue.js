(function (_ns) {
	const vueConfig = _ns.vues[_ns.vues.length - 1];
	const rawTemplate = document.querySelector(vueConfig.el + ' > magic-book');

	const predefinedSpells = [{
		"id": 4,
		"level": 1,
		"title": "Curse"
	},{
		"id": 33,
		"level": 3,
		"title": "Mass Curse"
	},{
		"id": 34,
		"level": 3,
		"title": "Mass Dispel"
	},{
		"id": 35,
		"level": 3,
		"title": "Mass Haste"
	},{
		"id": 41,
		"level": 4,
		"title": "Chain Lighting"
	},{
		"id": 42,
		"level": 4,
		"title": "Elemental Storm"
	},{
		"id": 56,
		"level": 5,
		"title": "Armageddon"
	}];

	describe('main > magic-book Vue template', function () {
		function setupIt (config) {
			// all subcomponents registered globally
			const setup = {
				template: rawTemplate.outerHTML,
				data: function () {
					// each App should have own state!!!
					if (config.data) {
						return config.data;
					}

					return { configBook: undefined };
				},
				computed: {
					computedSpells: function () {
						if (config.computed && config.computed.spells) {
							return config.computed.spells;
						}

						return predefinedSpells;
					}
				},		
			};

			const App = Vue.extend(setup);
			const cssQuery = _ns.f.createMountDiv(jasmine.currentTest.description);
			const vm = new App().$mount(cssQuery);

			return { vm: vm, query: cssQuery };
		}

		it('show us all spells from props', function () {
			const setup = setupIt({ computed: { spells: predefinedSpells } });
			const vm = setup.vm;
			const magicSpells = document.querySelectorAll(setup.query + ' li');

			expect(magicSpells.length).toEqual(predefinedSpells.length);
			expect(magicSpells.length).toEqual(vm.computedSpells.length);
		});
	});

})(globalThis.homm_ns);