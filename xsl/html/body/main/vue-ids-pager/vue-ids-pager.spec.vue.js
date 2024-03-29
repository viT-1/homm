(function (_ns) {
	const methods = _ns.components['vue-ids-pager'].methods;

	// TODO: potential error! Should find [iam-app = "vueSpec"] config?
	const vueConfig = _ns.vues[_ns.vues.length - 1];
	// copy html template of main[iam-app = "vueSpec"] for initiating Vue in every single test
	// BEFORE mount!!!
	const rawTemplate = document.querySelector(vueConfig.el + ' > vue-ids-pager');

	const defaultData = {
		inputIndex: 1,
		ids:  ['A', 'Aff', 'C', 'Errs', 'oom', 'trl', 'just', 'some'],
		perPage: 3,
	};
	// initiating base UX playground
	_ns.f.injectToVueConfig({ data: function () { return defaultData; } });
	_ns.f.mount();

	// all tests should be independed (runs in random order)!
	describe('main > vue-ids-pager Vue template', function () {
		var config, vm;

		// base App for every "it"
		const App = Vue.extend({
			template: rawTemplate.outerHTML,
			data: function () {
				const retData = {};
				merge(retData, defaultData);
				// each App should have own state!!!
				return retData;
			},
			components: {
				'vue-ids-pager': _ns.components['vue-ids-pager'] // only one!
			}
		});

		beforeEach(function () {
			vm = new App().$mount(
				// real DOM mounting is not necessary because of using refs
				// _ns.f.createMountDiv(jasmine.currentTest.description)
			);
			config = {
				limit: vm.perPage,
				ids: vm.ids,
			};
		});

		it('show us expected ids', function () {
			const expectedIds = methods.getIdsOnPage(config, vm.inputIndex);

			const elIds = vm.$refs.ids;
			const renderedIdsStr = elIds.innerText.trim();

			if (expectedIds.length = 0) {
				fail('expectedIds is not set!');
			}

			const arrFound = [];
			expectedIds.forEach(function (id) {
				if(renderedIdsStr.indexOf(id) > -1) {
					arrFound.push(id);
				}				
			});
			
			expect(arrFound.length).toEqual(expectedIds.length);
		});

		it('changes page index if click button Next', function (done) {
			const initialIndex = vm.inputIndex;
			const elNext = vm.$refs.next;

			if(!methods.isLastPageIndex(config, initialIndex)) {
				// register callback before "actions"
				vm.$nextTick(function () {
					const afterClickNextIndex = vm.inputIndex;
					expect(afterClickNextIndex).toEqual(initialIndex + 1);
					done();
				});
				
				elNext.click();
			}
		});

		it('changes page index if config (ids and limit) has any changes', function (done) {
			// set pageIndex state to max
			const oldLastIndex = methods.getLastPageIndex(config);
			const newLimit = vm.ids.length;
			const newLastIndex = methods.getLastPageIndex({
				limit: newLimit, // change limit per page to be greater than previous value
				ids: vm.ids,
			});
			expect(oldLastIndex).toBeGreaterThan(newLastIndex);

			// register callback before "actions"
			vm.$nextTick(function () {
				// next tick by triggering @input event
				vm.$nextTick(function () {
					expect(vm.inputIndex).toEqual(0);
					done();
				});
			});

			vm.perPage = newLimit;
		});
	});
})(globalThis.homm_ns);
