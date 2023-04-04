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
					hero: {
						spellPoints: _ns.store.getters['hero/spellPoints'],
						skills: _ns.store.getters['hero/skills'],
					},
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

		const wisdomLvl = _ns.store.getters['hero/skills'].wisdom;
		configFilter.wisdom = wisdomLvl;

		// TODO: merge filters logic move to store?
		_ns.store.commit('magic-book/setFilters', configFilter);
		
		// set first spell as active to every spells filtering by commit above
		const firstFilteredSpell = _ns.store.getters['magic-book/spells'][0];
		_ns.store.commit('magic-book/setActiveSpellById', firstFilteredSpell.id);

		next();
	});

	_ns.f.injectToVueConfig({
		router: router,
	});
})(globalThis.homm_ns);
