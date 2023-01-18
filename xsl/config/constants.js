window.homm_ns = (function (){
	// importmap specification @see https://github.com/WICG/import-maps
	const imap = {
		"imports": {
			"any-fills": "xsl/config/any-fills.js",
			"main": "xsl/html/body/main/main.js",
			"vue": "externals/vue.min.js"
		}
	};

	const queryVueAppDOMElement = '[iam-main ~= "vueApp"]';

	return {
		get importmap() {
			return imap;
		},
		get queryAppEl() {
			return queryVueAppDOMElement;
		},
		components: {}
	};
})();
