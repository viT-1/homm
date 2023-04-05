(function (_ns) {
	const mustacheRender = _ns.f.mustTransform;

	_ns.components['panel-info'] = {
		template: '#panel-info',
		props: {
			info: Object,
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
				var mData = merge({}, this.info);

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
			i18nDescription: function () {
				if (typeof this.info == undefined) {
					return '';
				}

				const mData = this.mData;
				const descr = (typeof mustacheRender == undefined) ?
					mData['descr'] :
					mustacheRender(mData['descr'], mData);

				var descrExt;
				if ((typeof mustacheRender != undefined) && mData['descr-ext']) {
					descrExt = mustacheRender(mData['descr-ext'], mData);
				}

				if (mData.mass) {
					// TODO: i18n!!!
					var massEffectText = 'Применяется ко всем отрядам.';
					descrExt = descrExt ? descrExt + ' ' + massEffectText : massEffectText;
				}

				return descrExt ? descr + ' ' + descrExt : descr;
			},
			iamTitle: function () {
				return this.info['title-ext'] ?
					this.info['title-ext'].toLowerCase() :
					this.info['title'].toLowerCase();
			}
		}
	};
})(globalThis.homm_ns);
