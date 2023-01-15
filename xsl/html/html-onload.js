// IIFE isn't needed, because of using callback function context only
document.addEventListener("DOMContentLoaded", function() {

setAttrsIsOnOff();

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

});
