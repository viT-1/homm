(function (_ns) {
	_ns.components['magic-spell'] = {
		template: '#magic-spell',
		props: {
			heroPoints: {
				type: Number,
				default: 20,
			},
			spell: Object,
			// Secondary skill: 0 - undefined, 1 - 'basic', 2 - 'advanced', 3 - 'expert'
			skill: {
				type: Number,
				default: 3,
			},
		},
		computed: {
			mData: function () {
				// i18n from html@lang support
				const lang = _ns.i18n ? _ns.i18n.lang : 'en';
				var mData = merge({}, this.spell);

				// first merge about schoolLevel (because it has lang data too)
				if (this.skill > 0) {
					merge(mData, mData['basic']);
					if (this.skill > 1) {
						merge(mData, mData['advanced']);
						if (this.skill > 2) {
							merge(mData, mData['expert']);
						}
					}
				}

				// i18n from spells.json support
				if (lang != 'en') {
					merge(mData, mData[lang]);
				}

				return mData;
			},
			iamTitle: function () {
				return this.spell['title-ext'] ?
					this.spell['title-ext'].toLowerCase() :
					this.spell['title'].toLowerCase();
			},
			isDisabled: function () {
				return this.mData.points > this.heroPoints;
			},
			// TODO: move strings data to i18n.json like i18n.xsl
			i18nLvlSuffix: function () {
				const lang = _ns.i18n ? _ns.i18n.lang : 'en';

				if (lang == 'en') {
					// @see https://stackoverflow.com/questions/13627308/#answer-39466341
					const suffix = ['st', 'nd', 'rd'][((this.spell.level + 90)%100 - 10)%10 - 1] || 'th';
					return suffix + ' lvl';
				} else {
					if (lang == 'ru') {
						if (this.spell.level == 2 )
							return '-ой ур.';
						if (this.spell.level == 3 )
							return '-ий ур.';
						return '-ый ур.';
					}
				}
			},
			// TODO: move strings data to i18n.json like i18n.xsl
			i18nSkill: function () {
				const lang = _ns.i18n ? _ns.i18n.lang : 'en';
				var skillStr = [, 'Bas', 'Adv', 'Exp'];
				if (lang == 'ru') {
					skillStr = [, 'Осн.', 'Пр.', 'Эксп.'];
				}

				return skillStr[this.skill];
			}
		}
	};
})(globalThis.homm_ns);