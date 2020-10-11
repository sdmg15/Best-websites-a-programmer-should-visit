'use strict';
const irregularPlurals = require('irregular-plurals');

module.exports = (word, plural, count) => {
	if (typeof plural === 'number') {
		count = plural;
	}

	if (irregularPlurals.has(word.toLowerCase())) {
		plural = irregularPlurals.get(word.toLowerCase());

		const firstLetter = word.charAt(0);
		const isFirstLetterUpperCase = firstLetter === firstLetter.toUpperCase();
		if (isFirstLetterUpperCase) {
			plural = firstLetter.toUpperCase() + plural.slice(1);
		}

		const isWholeWordUpperCase = word === word.toUpperCase();
		if (isWholeWordUpperCase) {
			plural = plural.toUpperCase();
		}
	} else if (typeof plural !== 'string') {
		plural = (word.replace(/(?:s|x|z|ch|sh)$/i, '$&e').replace(/([^aeiou])y$/i, '$1ie') + 's')
			.replace(/i?e?s$/i, match => {
				const isTailLowerCase = word.slice(-1) === word.slice(-1).toLowerCase();
				return isTailLowerCase ? match.toLowerCase() : match.toUpperCase();
			});
	}

	return Math.abs(count) === 1 ? word : plural;
};
