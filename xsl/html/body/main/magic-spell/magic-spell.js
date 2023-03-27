(function (_ns) {
	_ns.components['magic-spell'] = {
		template: '#magic-spell',
		props: ['spell'],
		computed: {
			i18nTitle: function() {
				// i18n support
				const lang = _ns.i18n ? _ns.i18n.lang : 'en';
				const ctx = lang == 'en' ? this.spell : this.spell[lang];

				return ctx['title'];
			},
			iamTitle: function () {
				return this.spell['title-ext'] ?
					this.spell['title-ext'].toLowerCase() :
					this.spell['title'].toLowerCase();
			},
			isDisabled: function () {
				return this.spell.points > 20;
			},
			// TODO: move strings data to i18n.json like i18n.xsl
			lvlSuffix: function () {
				const lang = _ns.i18n ? _ns.i18n.lang : 'en';

				if (lang == 'en') {
					// @see https://stackoverflow.com/questions/13627308/#answer-39466341
					const suffix = ['st', 'nd', 'rd'][((this.spell.level + 90)%100 - 10)%10 - 1] || 'th';
					return suffix + ' lvl.';
				} else {
					if (lang == 'ru') {
						if (this.spell.level == 2 )
							return 'ой ур.';
						if (this.spell.level == 3 )
							return 'ий ур.';
						return 'ый ур.';
					}
				}
			}
		}
	};
})(globalThis.homm_ns);