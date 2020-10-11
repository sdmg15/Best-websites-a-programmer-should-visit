'use strict';
const find = require('unist-util-find');
const findAllAfter = require('unist-util-find-all-after');
const rule = require('unified-lint-rule');
const toString = require('mdast-util-to-string');
const visit = require('unist-util-visit');

module.exports = rule('remark-lint:awesome-license', (ast, file) => {
	const license = find(ast, node => (
		node.type === 'heading' &&
		(toString(node) === 'Licence' || toString(node) === 'License')
	));

	if (!license) {
		file.message('Missing License section', ast);
		return;
	}

	if (license.depth !== 2) {
		file.message('License section must be at heading depth 2', license);
		return;
	}

	const headingsPost = findAllAfter(ast, license, {
		type: 'heading'
	});

	if (headingsPost.length > 0) {
		file.message('License must be the last section', headingsPost[0]);
		return;
	}

	const children = findAllAfter(ast, license, () => true);
	const content = {type: 'root', children};
	const value = toString(content);

	if (!value) {
		file.message('License must not be empty', license);
	}

	visit(content, 'image', node => {
		if (/\.png/i.test(node.url)) {
			file.message('License image must be SVG', node);
			return false;
		}
	});
});
