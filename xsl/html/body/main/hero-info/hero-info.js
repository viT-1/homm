// component example with its vuex store tight coupling
(function (_ns) {
	// TODO: remove copy-paste code for all skills
	var computed = {
		airSkill: {
			get: function () {
				return _ns.store.getters['hero/skills'].air;
			},
			set: function (val) {
				_ns.store.commit('hero/setAirSkill', val);
			}
		},
		earthSkill: {
			get: function () {
				return _ns.store.getters['hero/skills'].earth;
			},
			set: function (val) {
				_ns.store.commit('hero/setEarthSkill', val);
			}
		},
		fireSkill: {
			get: function () {
				return _ns.store.getters['hero/skills'].fire;
			},
			set: function (val) {
				_ns.store.commit('hero/setFireSkill', val);
			}
		},
		waterSkill: {
			get: function () {
				return _ns.store.getters['hero/skills'].water;
			},
			set: function (val) {
				_ns.store.commit('hero/setWaterSkill', val);
			}
		},
		wisdomSkill: {
			get: function () {
				return _ns.store.getters['hero/skills'].wisdom;
			},
			set: function (val) {
				_ns.store.commit('hero/setWisdomSkill', val);
				this.$emit('wisdom-skill-changed', val);
			}
		},
		labels: function () {
			return ['none', 'basic', 'advanced', 'expert'];
		}
	};

	_ns.components['hero-info'] = {
		template: '#hero-info',
		emits: ['wisdom-skill-changed'],
		computed: computed,
	};
})(globalThis.homm_ns);
