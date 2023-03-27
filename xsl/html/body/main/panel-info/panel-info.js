(function (_ns) {
	_ns.components['panel-info'] = {
		template: '#panel-info',
		props: ['info'],
		computed: {
			i18nDescription: function () {
				if (typeof this.info == undefined) {
					return '';
				}

				// i18n support
				const lang = _ns.i18n ? _ns.i18n.lang : 'en';
				const ctx = lang == 'en' ? this.info : this.info[lang];

				return ctx['descr-ext'] ?
					ctx['descr'] + ' ' + ctx['descr-ext'] :
					ctx['descr'];
			},
			iamTitle: function () {
				return this.info['title-ext'] ?
					this.info['title-ext'].toLowerCase() :
					this.info['title'].toLowerCase();
			}
		}
	};
})(globalThis.homm_ns);
