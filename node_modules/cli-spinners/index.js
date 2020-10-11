'use strict';

const spinners = Object.assign({}, require('./spinners.json'));

const spinnersList = Object.keys(spinners);

Object.defineProperty(spinners, 'random', {
	get() {
		const randomIndex = Math.floor(Math.random() * spinnersList.length);
		const spinnerName = spinnersList[randomIndex];
		return spinners[spinnerName];
	}
});

module.exports = spinners;
// TODO: Remove this for the next major release
module.exports.default = spinners;
