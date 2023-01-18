// IIFE isn't needed, because of using callback function context only
// dom is loaded
// @see https://gist.github.com/jakub-g/5286483ff5f29e8fdd9f#domcontentloaded-vs-load
document.addEventListener('DOMContentLoaded', function() {
	setAttrsIsOnOff();

	if (window.depp) {
		if (!depp.isDefined('config paths')) {
			depp.define({'config paths': ['xsl/config/constants.js']});
		}
		depp.require(['config paths'], function() {
			loadLibs(window.homm_ns.importmap.imports);
		});
	}
	
	// Set attributes html[is-on] & html[is-off] for css UX-rules
	function setAttrsIsOnOff() {
		const htmlTag = document.querySelector('html[is-off]');
	
		if (htmlTag) {
			const attIsOnName = 'is-on';
			const attIsOffName = 'is-off';
	
			const useTouch = isTouchSupported();
	
			// html[is-off] attribute values
			const strInitialIsOff = htmlTag.getAttribute(attIsOffName);
			const arrInitialIsOff = strInitialIsOff.length
				? htmlTag.getAttribute(attIsOffName).split(' ') : [];
			const arrIsOff = arrInitialIsOff.filter(function(item) {
				switch(item) {
					case 'js': return false;
					case 'touch': return !useTouch;
				}
			});
			htmlTag.setAttribute(attIsOffName, arrIsOff.length ? arrIsOff.join(' ') : '');
	
			// html[is-on] attribute values
			const strInitialIsOn = htmlTag.getAttribute(attIsOnName);
			var arrIsOn = strInitialIsOn.length
				? htmlTag.getAttribute(attIsOnName).split(' ') : [];
			if(arrIsOn.indexOf('js') < 0) {
				arrIsOn.push('js');
			}
			if (useTouch && !arrIsOn.indexOf('touch') < 0) {
				arrIsOn.push('touch');
			}
	
			htmlTag.setAttribute(attIsOnName, arrIsOn.join(' '));
		}
	}
	
	function isTouchSupported() {
		return Boolean(
			( 'ontouchstart' in window)
			|| (navigator.msMaxTouchPoints > 0)
			|| (window.DocumentTouch && document instanceof DocumentTouch)
		);
	}

	function loadLibs(paths) {
		const libIds = Object.keys(paths);
		if (!depp.isDefined(libIds[0])) {
			depp.define({
				'any-fills': [paths['any-fills']],
				'main': ['#vue', paths.main],
				'vue': [paths.vue],
			});
		}

		depp.require(libIds);
	}
});
