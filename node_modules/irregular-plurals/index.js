'use strict';
const irregularPlurals = require('./irregular-plurals.json');

const map = new Map();
// TODO: Use Object.entries when targeting Node.js 8
for (const key of Object.keys(irregularPlurals)) {
	map.set(key, irregularPlurals[key]);
}

// Ensure nobody can modify each others Map
Object.defineProperty(module, 'exports', {
	get() {
		return map;
	}
});
