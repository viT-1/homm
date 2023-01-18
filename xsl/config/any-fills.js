// any: poly and ponyfills
(function() {
	/*
	if (window.MSInputMethodContext && document.documentMode) {
		document.write('<script src="externals/ie11CustomProperties.js"><\/script>');
	}
	*/

	const cssVarsSupported = ((window || {}).CSS || {}).supports
		&& window.CSS.supports('(--a: 0)');

	console.log('cssVarsSupported', cssVarsSupported);
	
	/*
	if (!cssVarsSupported && cssVars) {
		cssVars();
	}
	*/
})();
