(function (_ns) {
	_ns.components['magic-spell'] = {
		template: '#magic-spell',
		props: ['spell'],
		computed: {
			isDisabled: function () {
				return this.spell.points > 20;
			},
			lvlSuffix: function () {
				// @see https://stackoverflow.com/questions/13627308/#answer-39466341
				return ['st', 'nd', 'rd'][((this.spell.level + 90)%100 - 10)%10 - 1] || 'th';
			}
		}
	};
})(globalThis.homm_ns);