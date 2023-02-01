/*
**	@see https://gist.github.com/ahtcx/0cd94e62691f539160b32ecda18af3d6?permalink_comment_id=2930530#gistcomment-2930530
*/
function merge (target, source) {
	function isObject(obj) {
		return !!obj && obj.constructor === Object;
	}

	if (!isObject(target) || !isObject(source)) {
		return source;
	}

	Object.keys(source).forEach(function(key) {
		const targetValue = target[key];
		const sourceValue = source[key];

		if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
			target[key] = targetValue.concat(sourceValue);
		} else if (isObject(targetValue) && isObject(sourceValue)) {
			target[key] = merge(Object.assign({}, targetValue), sourceValue);
		} else {
			target[key] = sourceValue;
		}
	});

	return target;
}
