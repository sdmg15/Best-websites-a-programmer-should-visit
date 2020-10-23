'use strict';

const inspect = require('util').inspect;

const kindOf = require('kind-of');

const appendedKinds = new Set([
	'arguments',
	'array',
	'bigint',
	'boolean',
	'date',
	'number',
	'object',
	'regexp',
	'string'
]);

module.exports = function inspectWithKind(val, options) {
	const kind = kindOf(val);
	const stringifiedVal = inspect(val, Object.assign({ // eslint-disable-line prefer-object-spread
		breakLength: Infinity,
		maxArrayLength: 10
	}, options));

	if (kind === 'error') {
		return val.toString();
	}

	if (!appendedKinds.has(kind)) {
		return stringifiedVal;
	}

	if (stringifiedVal.startsWith('Observable {')) {
		return stringifiedVal;
	}

	return `${stringifiedVal} (${kind})`;
};
