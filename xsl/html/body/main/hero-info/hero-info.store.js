/* 	Stores user settings which are used
**	for filtering (wisdom level)
**	and spell information (magic schools levels).
*/
(function (_ns) {
	_ns.storeModules['hero'] = {
		namespaced: true,
		state: {
			name: 'Halon', // homm2 & homm3 hero, genie!
			spellPoints: 20,
			skills: {
				wisdom: 3,
				air: 1,
				earth: 2,
				fire: 3,
				water: 0,
			},
		},
		getters: {
			spellPoints: function (state) {
				return state.spellPoints;
			},
			skills: function (state) {
				return state.skills;
			}
		},
		// TODO: remove copy-paste code
		mutations: {
			setAirSkill: function (state, skillLvl) {
				state.skills.air = skillLvl;
			},
			setEarthSkill: function (state, skillLvl) {
				state.skills.earth = skillLvl;
			},
			setFireSkill: function (state, skillLvl) {
				state.skills.fire = skillLvl;
			},
			setWaterSkill: function (state, skillLvl) {
				state.skills.water = skillLvl;
			},
			setWisdomSkill: function (state, skillLvl) {
				state.skills.wisdom = skillLvl;
			},
		}
	};
})(globalThis.homm_ns);
