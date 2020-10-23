'use strict';
const find = require('unist-util-find');
const rule = require('unified-lint-rule');
const toString = require('mdast-util-to-string');

module.exports = rule('remark-lint:awesome-license', (ast, file) => {
	const license = find(ast, node => (
		node.type === 'heading' &&
		(toString(node).toLowerCase() === 'licence' || toString(node).toLowerCase() === 'license')
	));

	if (license) {
		file.message('Forbidden license section found', ast);
	}
});
