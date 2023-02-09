(function (_ns) {
	const vueSpecConfig = _ns.vues[_ns.vues.length - 1];

	describe('main functions > work with Vue', function () {
		it('appends new config to homm_ns.vues if it is not added yet', function () {
			const testConfig = { el: '#main-test1' };
			const vuesCountBefore = _ns.vues.length;
			_ns.f.appendVueConfig(testConfig);
			const vuesCountAfterFirstAppend = _ns.vues.length;

			expect(vuesCountBefore + 1).toEqual(vuesCountAfterFirstAppend);
			_ns.f.appendVueConfig(testConfig);
			// same length after same config append
			expect(vuesCountAfterFirstAppend).toEqual(_ns.vues.length);
		});

		it('mounts last Vue config', function () {
			const iamSpecValue = 'Vue mount test';
			const query = _ns.f.createMountDiv(iamSpecValue);
			const vueConfig = { el: query };
			_ns.f.appendVueConfig(vueConfig);

			_ns.f.mount();

			expect(vueConfig.vue).toBeDefined();
			expect(vueConfig.vue instanceof Vue).toBeTruthy();
		});
	});

	describe('main functions > work with XHTML', function () {
		it('creates [iam-spec = "value"] div in DOM', function () {
			const iamSpecValue = 'create mountwrapper test';
			const query = _ns.f.createMountDiv(iamSpecValue);
			const element = document.querySelector(query);

			expect(element).toBeDefined();
			expect(element instanceof Element).toBeTruthy();
		});

		it('give us right renderless flag by component name', function () {
			expect(_ns.f.shouldHaveTemplate('something-unknown')).toBeTruthy();
			expect(_ns.f.shouldHaveTemplate('sup-component')).toBeFalsy();
			expect(_ns.f.shouldHaveTemplate('vue-ids-pager')).toBeFalsy();
		});

		// by cssQuery in wrapper element and component templates
		it('calculates all components and subcomponents names in DOM', function () {
			var calculatedNames = [];
			const rootEl = vueSpecConfig.el;
			_ns.f.getComponentNames(globalThis.document, rootEl, calculatedNames);

			expect(calculatedNames.length).toBeGreaterThan(0);

			var allExpectedAreCalculated = false;

			// every expected (global mainSpecXmlNames) component should be in DOM
			globalThis.mainSpecXmlNames.every(function (expectedEl) {
				allExpectedAreCalculated = calculatedNames.indexOf(expectedEl) > - 1;
				if (!allExpectedAreCalculated) {
					fail('Expected component with name "' + expectedEl + '" is not calculated!'
					+ ' Calculated: ' + calculatedNames);
				}

				return allExpectedAreCalculated;
			});

			expect(allExpectedAreCalculated).toBeTruthy();
			expect(calculatedNames.length).toBeGreaterThanOrEqual(globalThis.mainSpecXmlNames.length);
		});
	});

	describe('main functions > helpers', function () {
		const someList = [
			{ id: '1', title: 'one', level: 5 },
			{ id: '15', title: 'zone', level: 4 },
			{ id: '3-', title: 'two', level: 4 }
		];
		const someListItemsQ = someList.length;

		it('getIds should give us same length array as input array', function () {
			const ids = _ns.f.getIds(someList);

			expect(ids.length).toEqual(someListItemsQ);
		});

		it('getIds should return us array with simple items in same order as input array', function () {
			const ids = _ns.f.getIds(someList);
			
			expect(ids[0]).toEqual(someList[0].id);
			expect(ids[someListItemsQ - 1]).toEqual(someList[someListItemsQ - 1].id);
		});

		it('getSublistByIds should give us array with items exist ids', function () {
			const realIds = _ns.f.getIds(someList);
			const filterIds = [someList[0].id, 2];
			const expectedIds = filterIds.filter(function (id) {
				return realIds.indexOf(id) > -1;
			});
			
			const sublist = _ns.f.getSublistByIds(someList, filterIds);

			expect(sublist.length).toEqual(expectedIds.length);
		});

		it('applies filters by filter config correctly', function () {
			const arr = [
				{ some: 'one', helps: 'us' },
				{ some: 'thing', wrong: 'here' },
				{ some: 'one', wrong: 'there' }
			];

			// filter functions for item can be complex (not so easy)
			const filters = {
				some: function (value) {
					return function (item) {
						return item.some == value;
					};
				},
				wrong: function (value) {
					return function (item) {
						return item.wrong == value;
					};
				}
			};

			var config = {
				some: 'one',
			}
			var filtered = _ns.f.applyFiltersByConfig(arr, filters, config);
			expect(filtered.length).toEqual(2);

			config = {
				wrong: 'here'
			};
			filtered = _ns.f.applyFiltersByConfig(arr, filters, config);

			expect(filtered.length).toEqual(1);

			expect(filtered.length).toBeLessThanOrEqual(arr.length);
			
			filtered = _ns.f.applyFiltersByConfig(arr, filters, {});
			expect(filtered.length).toEqual(arr.length);
		});
	});
})(globalThis.homm_ns);
