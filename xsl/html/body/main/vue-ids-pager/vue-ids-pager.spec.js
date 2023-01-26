(function() {
	window.homm_ns.f.mount();
	const elVue = document.querySelector(homm_ns.vues[0].el);

	describe('main/vue-ids-pager template', function () {
		it('renders some text', function () {
			expect(elVue.innerText).toContain('Any thing');
		});
	});
})();
