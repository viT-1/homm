(function() {
	const elVue = document.querySelector(homm_ns.vues[0].el);

	window.homm_ns.f.injectToVueConfig({
		data: function() {
			return {
				inputIndex: 0,
				ids:  ['A', 'Aff', 'C', 'Errs', 'oom', 'trl', 'just', 'some'],
				perPage: 3,
			}
		},
		methods: {
			onPgChg: function(pageIndex) {
				this.inputIndex = pageIndex;
			}
		}
	});
	window.homm_ns.f.mount();

	describe('main/vue-ids-pager template', function () {
		it('renders some text', function () {
			expect(elVue.innerText).toContain('Any thing');
		});
	});
})();
