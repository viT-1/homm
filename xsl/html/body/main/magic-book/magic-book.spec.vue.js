(function (_ns) {
	const vueConfig = _ns.vues[_ns.vues.length - 1];
	const rawTemplate = document.querySelector(vueConfig.el + ' > magic-book');

	const predefinedSpells = [{
		"id": 4,
		"level": 1,
		"title": "Curse",
		"ru": {
			"title": "Проклятие"
		}
	},{
		"id": 33,
		"level": 3,
		"title": "Mass Curse",
		"ru": {
			"title": "Общее проклятие"
		}
	},{
		"id": 34,
		"level": 3,
		"title": "Mass Dispel",
		"ru": {
			"title": "Общее снятие заклинаний"
		}
	},{
		"id": 35,
		"level": 3,
		"title": "Mass Haste",
		"ru": {
			"title": "Общее ускорение"
		}
	},{
		"id": 41,
		"level": 4,
		"title": "Chain Lighting",
		"ru": {
			"title": "Цепная молния"
		}
	},{
		"id": 56,
		"level": 5,
		"title": "Armageddon",
		"ru": {
			"title": "Армагедон"
		}
	}];

	describe('main > magic-book Vue template (filtering)', function () {
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
			const vm = new App().$mount(
				_ns.f.createMountDiv(jasmine.currentTest.description)
			);

			return vm;
		}

		it('show us all spells by default', function () {
			const vm = setupIt({ computed: { spells: predefinedSpells } });
			const magicSpells = vm.$el.querySelectorAll('li');

			expect(magicSpells.length).toEqual(predefinedSpells.length);
			expect(magicSpells.length).toEqual(vm.computedSpells.length);
		});

		it('show us less spells with filtering by spell level', function () {
			const config = { filters: { level: 1 } };
			// app
			const vm = setupIt({ data: { configBook: config } });
			const magicSpells = vm.$el.querySelectorAll('li');

			expect(magicSpells.length).toBeLessThan(predefinedSpells.length);
		});

		it('show us less spells with filtering by basic wisdom', function () {
			const config = { filters: { wisdom: 1 } };
			const vm = setupIt({ data: { configBook: config } });

			const magicSpells = vm.$el.querySelectorAll('li');
			expect(magicSpells.length).toEqual(4);
		});
	});

})(globalThis.homm_ns);