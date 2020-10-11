'use strict';

var appendType = require('append-type');

/*!
 * indexed-filter | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/indexed-filter
*/

function indexedFilter(arr, fn, thisObj) {
	if (!Array.isArray(arr)) {
		throw new TypeError('Expected an array to be filtered, but got a non-array value ' + appendType(arr) + '.');
	}

	if (typeof fn !== 'function') {
		throw new TypeError('Expected a filter function, but got a non-function value ' + appendType(fn) + '.');
	}

	var results = [];

	arr.forEach(function(v, i, arrayItself) {
		if (fn.call(this, v, i, arrayItself)) {
			results.push({
				index: i,
				value: v
			});
		}
	}, thisObj);

	return results;
}

module.exports = indexedFilter;
