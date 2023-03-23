Vue.use(VueRouter);

// default url state same as magic-book.store default activeFilters
if (!window.location.search) {
	globalThis.history.replaceState(
		globalThis.history.state,
		'',
		'?type=all&combat=true'
	);
}

(function (_ns) {
	const routerConfig = {
		mode: 'history',
		routes: [{
			path: '*',
			component: _ns.components['magic-book'],
			props: function () {
				return {
					spells: _ns.store.getters['magic-book/spells'],
					spellsType: _ns.store.getters['magic-book/activeFilters'].type,
				};
			},
		}],
	};

	const router = new VueRouter(routerConfig);
	router.beforeEach(function (to, from, next) {
		var configFilter = {
			combat: to.query.combat === 'true',
		};

		if (to.query.type !== 'all') {
			configFilter.type = to.query.type;
		}

		_ns.store.commit('magic-book/setFilters', configFilter);
		next();
	});

	_ns.f.injectToVueConfig({
		router: router,
	});
})(globalThis.homm_ns);
