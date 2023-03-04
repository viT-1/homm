Vue.use(Vuex);

(function (_ns) {
	_ns.storeModules = {};

	if (!_ns.f) {
		_ns.f = {};
	}

	_ns.f.setGlobalStore = function (options) {
		// ie11 can't
		const config = merge({
			getters: {},
			mutations: {},
			state: {},
			// don't use actions!
			// @see https://javascript.plainenglish.io/stop-using-actions-in-vuex-a14e23a7b0e6
			actions: {},
		}, options);

		// TODO: should be array as _ns.vues?
		_ns.store = new Vuex.Store(config);
		return _ns.store;
	}

	_ns.f.registerDeclaredStoreModules = function (store) {
		Object.keys(_ns.storeModules).forEach(function (key) {
			_ns.store.registerModule(key, _ns.storeModules[key]);
		});
	}
})(globalThis.homm_ns);