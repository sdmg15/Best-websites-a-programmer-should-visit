'use strict';

module.exports = function appendType(val) {
	if (val === undefined) {
		return 'undefined';
	}

	if (val === null) {
		return 'null';
	}

	return String(val) + ' (' + typeof val + ')';
}
