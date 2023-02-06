(function () {
	const _ns = globalThis.homm_ns;

	_ns.components['magic-book'] = {
		template: '#magic-book',
		props: ['spells'],
		// filters deprecated
		// @see https://v3-migration.vuejs.org/breaking-changes/filters.html
		methods: {
			filteredByLevel: function (arrSpells, level) {
				return arrSpells.filter(function (spell){ return spell.level == level; });
			},
			getIds: function (arrObjWithId) {
				const arrIds = [];
				arrObjWithId.forEach(function (obj){ arrIds.push(obj.id); });
				return arrIds;
			},
			getSublistByIds: function (arrObjWithId, arrIds) {
				const sublist = [];
				arrObjWithId.forEach(function (obj){
					if (arrIds.indexOf(obj.id) > -1) {
						sublist.push(obj);
					}
				});
				return sublist;

			}
		}
	};
})();