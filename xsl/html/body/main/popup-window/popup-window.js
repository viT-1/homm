(function (_ns) {
	_ns.components['popup-window'] = {
		template: '#popup-window',
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
			titleExt: function () {
				return this.info['title-ext'] ?	this.info['title-ext'] : this.info['title'];
			},
			i18nTitleExt: function () {
				return this.mData['title-ext'] ?	this.mData['title-ext'] : this.mData['title'];
			},
			iamTitle: function () {
				return this.titleExt.toLowerCase();
			}
		},
		methods: {
			mustacheRender: function (tmpl, keysObj) {
				if (typeof tmpl == 'undefined') {
					return '';
				}

				if (typeof _ns.f.mustTransform == 'undefined') {
					return tmpl;
				}

				return _ns.f.mustTransform(tmpl, keysObj);
			},
			onCloseClick: function () {
				this.$emit('close-click');
			}
		}
	};
})(globalThis.homm_ns);
