(function() {
	const _ns = globalThis.homm_ns;

	const vueSpecConfig = _ns.vues[_ns.vues.length - 1];

	describe('main functions', function () {
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

		it('creates [iam-spec = "value"] div in DOM', function () {
			const iamSpecValue = 'create mountwrapper test';
			const query = _ns.f.createMountDiv(iamSpecValue);
			const element = document.querySelector(query);

			expect(element).toBeDefined();
			expect(element instanceof Element).toBeTruthy();
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

		// by cssQuery in wrapper element and component templates
		it('calculates all components and subcomponents names in DOM', function () {
			var calculatedNames = [];
			_ns.f.getComponentNames(vueSpecConfig.el, calculatedNames);

			expect(calculatedNames.length).toBeGreaterThan(0);

			var allExpectedAreCalculated = false;

			// every expected (global mainSpecXmlNames) component should be in DOM
			globalThis.mainSpecXmlNames.every(function (expectedEl) {
				allExpectedAreCalculated = calculatedNames.indexOf(expectedEl) > - 1;
				return allExpectedAreCalculated;
			});

			expect(allExpectedAreCalculated).toBeTruthy();
			expect(calculatedNames.length).toBeGreaterThanOrEqual(globalThis.mainSpecXmlNames.length);
		});
	});
})();
