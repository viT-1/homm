(function (_ns) {
	const methods = _ns.components['vue-ids-pager'].methods;
	const numIds = [1, 2, 4, 8, 9, 12, 42];

	describe('main > vue-ids-pager methods', function () {
		it('tell us that pageIndex is (in)valid', function () {
			const conf = { ids: numIds, limit: 2 };
			var result = methods.isValidPageIndex(conf, 4);
			expect(result).toBeDefined();
			expect(result).toBeFalsy();

			result = methods.isValidPageIndex(conf, 3);
			expect(result).toBeDefined();
			expect(result).toBeTruthy();

			result = methods.isValidPageIndex({ ids: [], limit: 4 }, 0);
			expect(result).toBeDefined();
			expect(result).toBeTruthy();
		});

		it('warns us invalid page index while trying to set it', function () {
			const conf = { ids: numIds, limit: 2 };
			expect(function () { methods.setPageIndex(conf, 4); }).toThrow();
		});

		it('warns us if any param for getting ids is undefined', function () {
			const conf = { ids: numIds, limit: 2 };
			var uConf;
			expect(function () { methods.getIdsOnPage(conf); }).toThrow();
			expect(function () { methods.getIdsOnPage(uConf, 0); }).toThrow();
		});

		it('get us right ids on given page number', function () {
			var conf = { ids: numIds, limit: 3 };
			expect(methods.getIdsOnPage(conf, 2)).toEqual([42]);

			conf = { ids: numIds, limit: 2 };
			expect(methods.getIdsOnPage(conf, 1)).toEqual([4, 8]);

			conf = { ids: ['A', 'B', 'C', 'D', 'E'], limit: 2 };
			expect(methods.getIdsOnPage(conf, 1)).toEqual(['C', 'D']);
		});

		it('get us index of last page correctly', function () {
			var conf = { ids: numIds, limit: 2 };
			expect(methods.getLastPageIndex(conf, 1)).toEqual(3);
			
			conf = { ids: numIds, limit: 4 };
			expect(methods.getLastPageIndex(conf, 1)).toEqual(1);
		});

		it('get us last page index even if ids is empty array', function () {
			expect(methods.getLastPageIndex({ ids: [], limit: 3 })).toEqual(0);
		});

		it('checks that current index same as last index', function () {
			var conf = { ids: numIds, limit: 4 };
			expect(methods.isLastPageIndex(conf, 1)).toBeTruthy();

			conf = { ids: numIds, limit: 3 };
			expect(methods.isLastPageIndex(conf, 2)).toBeTruthy();

			conf = { ids: numIds, limit: 6 };
			expect(methods.isLastPageIndex(conf, 0)).toBeFalsy();
		});
	});
})(globalThis.homm_ns);
