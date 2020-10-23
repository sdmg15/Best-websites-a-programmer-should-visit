'use strict';

const {inspect} = require('util');

const arrayToSentence = require('array-to-sentence');
const isPlainObj = require('is-plain-obj');
const indexedFilter = require('indexed-filter');
const inspectWithKind = require('inspect-with-kind');

const ERROR_MESSAGE = 'Expected node-glob options to be an object';
const INVALID_CACHE_MESSAGE = 'Expected every value in the `cache` option to be ' +
                              'true, false, \'FILE\', \'DIR\' or an array';
const INVALID_STAT_CACHE_MESSAGE = 'Expected every value in the `statCache` option to be a ' +
                                   'fs.Stats instance';

const pathOptions = new Set(['cwd', 'root']);
const booleanOptions = new Set([
	'dot',
	'nomount',
	'mark',
	'nosort',
	'stat',
	'silent',
	'strict',
	'nounique',
	'nonull',
	'debug',
	'nobrace',
	'noglobstar',
	'noext',
	'nocase',
	'matchBase',
	'nodir',
	'follow',
	'realpath',
	'absolute'
]);
const typos = new Map([
	['noMount', 'nomount'],
	['nouniq', 'nounique'],
	['noUnique', 'nounique'],
	['noNull', 'nonull'],
	['noBrace', 'nobrace'],
	['noGlobStar', 'noglobstar'],
	['noExt', 'noext'],
	['noCase', 'nocase'],
	['matchbase', 'matchBase'],
	['noDir', 'nodir'],
	['realPath', 'realpath'],
	['realPathCache', 'realpathCache'],
	['realpathCaches', 'realpathCache'],
	['realPathCaches', 'realpathCache'],
	['caches', 'cache'],
	['statcache', 'statCache'],
	['statCaches', 'statCache'],
	['symlink', 'symlinks']
]);

const isNonFn = val => typeof val !== 'function';
const stringifyFilterResult = obj => `${inspect(obj.value)} (at ${obj.index})`;

module.exports = function validateGlobOpts(...args) {
	const argLen = args.length;

	if (argLen > 2) {
		throw new TypeError(`Expected 0, 1 or 2 arguments ([<object>, <array>]), but got ${argLen}.`);
	}

	const [obj, additionalValidations] = args;

	if (argLen === 2) {
		if (!Array.isArray(additionalValidations)) {
			throw new TypeError(`Expected an array of functions, but got a non-array value ${
				inspectWithKind(additionalValidations)
			}.`);
		}

		const nonFunctions = indexedFilter(additionalValidations, isNonFn);
		const nonFunctionCount = nonFunctions.length;

		if (nonFunctionCount !== 0) {
			throw new TypeError(`Expected every element in the array to be a function, but found ${
				nonFunctionCount === 1 ? 'a non-function value' : 'non-function values'
			} in the array: ${arrayToSentence(nonFunctions.map(stringifyFilterResult))}.`);
		}
	}

	if (obj === '') {
		return [new TypeError(`${ERROR_MESSAGE}, but got '' (empty string).`)];
	}

	if (!obj) {
		return [];
	}

	if (typeof obj !== 'object' || Array.isArray(obj)) {
		return [new TypeError(`${ERROR_MESSAGE}, but got ${inspectWithKind(obj)}.`)];
	}

	const results = [];

	if (obj.sync !== undefined) {
		results.push(new Error(`\`sync\` option is deprecated and there’s no need to pass any values to that option, but ${
			inspect(obj.sync)
		} was provided.`));
	}

	for (const prop of pathOptions) {
		const val = obj[prop];

		if (val !== undefined && typeof obj[prop] !== 'string') {
			results.push(new TypeError(`node-glob expected \`${prop}\` option to be a directory path (string), but got ${inspectWithKind(val)}.`));
		}
	}

	for (const prop of booleanOptions) {
		const val = obj[prop];

		if (val !== undefined && typeof obj[prop] !== 'boolean') {
			results.push(new TypeError(`node-glob expected \`${prop}\` option to be a Boolean value, but got ${inspectWithKind(val)}.`));
		}
	}

	if (obj.nodir === true) {
		if (obj.mark === true) {
			results.push(new TypeError('Expected `mark` option not to be `true` when `nodir` option is `true`, because there is no need to differentiate directory paths from file paths when `nodir` option is enabled, but got `true`.'));
		}
	}

	if (obj.cache !== undefined) {
		if (!isPlainObj(obj.cache)) {
			results.push(new TypeError(`node-glob expected \`cache\` option to be an object, but got ${
				inspectWithKind(obj.cache)
			}.`));
		} else {
			for (const field of Object.keys(obj.cache)) {
				const val = obj.cache[field];

				if (typeof val !== 'string') {
					if (typeof val !== 'boolean' && !Array.isArray(val)) {
						results.push(new TypeError(`${
							INVALID_CACHE_MESSAGE
						}, but found an invalid value ${inspectWithKind(val)} in \`${field}\` property.`));
					}
				} else if (val !== 'FILE' && val !== 'DIR') {
					results.push(new Error(`${
						INVALID_CACHE_MESSAGE
					}, but found an invalid string ${inspect(val)} in \`${field}\` property.`));
				}
			}
		}
	}

	if (obj.realpathCache !== undefined) {
		if (!isPlainObj(obj.realpathCache)) {
			results.push(new TypeError(`node-glob expected \`realpathCache\` option to be an object, but got ${
				inspectWithKind(obj.realpathCache)
			}.`));
		} else {
			for (const field of Object.keys(obj.realpathCache)) {
				const val = obj.realpathCache[field];

				if (typeof val !== 'string') {
					results.push(new TypeError(`Expected every value in the \`realpathCache\` option to be a string, but found a non-string value ${
						inspectWithKind(val)
					} in \`${field}\` property.`));
				}
			}
		}
	}

	if (obj.statCache !== undefined) {
		if (!isPlainObj(obj.statCache)) {
			results.push(new TypeError(`node-glob expected \`statCache\` option to be an object, but got ${
				inspectWithKind(obj.statCache)
			}.`));
		} else {
			for (const field of Object.keys(obj.statCache)) {
				const val = obj.statCache[field];

				if (val === null || typeof val !== 'object' || Array.isArray(val)) {
					results.push(new TypeError(`${INVALID_STAT_CACHE_MESSAGE}, but found an invalid value ${
						inspect(val)
					} in \`${field}\` property.`));
				} else if (typeof val.mode !== 'number') {
					results.push(new Error(`${INVALID_STAT_CACHE_MESSAGE}, but found an invalid object ${
						inspect(val)
					} in \`${field}\` property, which doesn't have a valid file mode.`));
				}
			}
		}
	}

	if (obj.symlinks !== undefined) {
		if (!isPlainObj(obj.symlinks)) {
			results.push(new TypeError(`node-glob expected \`symlinks\` option to be an object, but got ${
				inspectWithKind(obj.symlinks)
			}.`));
		} else {
			for (const field of Object.keys(obj.symlinks)) {
				const val = obj.symlinks[field];

				if (typeof val !== 'boolean') {
					results.push(new TypeError(`Expected every value in the \`symlink\` option to be Boolean, but found an invalid value ${
						inspectWithKind(val)
					} in \`${field}\` property.`));
				}
			}
		}
	}

	if (obj.ignore !== undefined) {
		if (!Array.isArray(obj.ignore)) {
			if (typeof obj.ignore !== 'string') {
				results.push(new TypeError(`node-glob expected \`ignore\` option to be an array or string, but got ${
					inspectWithKind(obj.ignore)
				}.`));
			}
		} else {
			for (const val of obj.ignore) {
				if (typeof val !== 'string') {
					results.push(new TypeError('Expected every value in the `ignore` option to be a string, ' +
            `but the array includes a non-string value ${inspectWithKind(val)}.`));
				}
			}
		}
	}

	for (const key of Object.keys(obj)) {
		const correctName = typos.get(key);

		if (correctName !== undefined) {
			results.push(new Error(`node-glob doesn't have \`${key}\` option. Probably you meant \`${
				correctName
			}\`.`));
		}
	}

	for (const fn of additionalValidations || []) {
		const additionalResult = fn(obj);

		if (additionalResult) {
			if (!(additionalResult instanceof Error)) {
				throw new TypeError(`Expected an additional validation function to return an error, but returned ${
					inspectWithKind(additionalResult)
				}.`);
			}

			results.push(additionalResult);
		}
	}

	return results;
};
