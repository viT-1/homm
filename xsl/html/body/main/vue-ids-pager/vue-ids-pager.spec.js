(function() {
	const ids = [1, 2, 4, 8, 9, 12, 42];
	const methods = homm_ns.components['vue-ids-pager'].methods;

	window.homm_ns.f.injectToVueConfig({
		data: function () {
			return {
				ids: ids,
				pageNum: 1, // not in computed because of changing with inputs
			}
		},
	});
	window.homm_ns.f.mount();
	const elVue = document.querySelector(homm_ns.vues[0].el);

	describe('main/vue-ids-pager methods', function () {
		it('warns us invalid prop setting (config.n)', function () {
			const conf = { ids: ids, limit: 2, n: 4 };
			expect(function() {	methods.validateConf(conf); }).toThrow();
		});

		it('get us right ids on given page number', function () {
			var conf = { ids: ids, limit: 3, n: 2 };
			expect(methods.getIdsOnPage(conf)).toEqual([42]);

			var conf = { ids: ids, limit: 2, n: 1 };
			expect(methods.getIdsOnPage(conf)).toEqual([4, 8]);
		});

		it('get us index of last page correctly', function () {
			var conf = { ids: ids, limit: 2, n: 1 };
			expect(methods.getLastPageIndex(conf)).toEqual(3);
			
			var conf = { ids: ids, limit: 4, n: 1 };
			expect(methods.getLastPageIndex(conf)).toEqual(1);
		});

		it('checks that current index same as last index', function () {
			var conf = { ids: ids, limit: 4, n: 1 };
			expect(methods.isLastPageIndex(conf)).toBeTruthy();

			var conf = { ids: ids, limit: 3, n: 2 };
			expect(methods.isLastPageIndex(conf)).toBeTruthy();

			var conf = { ids: ids, limit: 6, n: 0 };
			expect(methods.isLastPageIndex(conf)).toBeFalsy();
		});
	});

	describe('main/vue-ids-pager template', function () {
		it('renders some text', function () {
			expect(elVue.innerText).toContain('Any thing');
		});
	});
})();
