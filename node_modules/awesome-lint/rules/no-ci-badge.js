'use strict';
const rule = require('unified-lint-rule');
const visit = require('unist-util-visit');

module.exports = rule('remark-lint:awesome-no-ci-badge', (ast, file) => {
	visit(ast, 'image', node => {
		if (/build status|travis|circleci/i.test(node.title)) {
			file.message('Readme must not contain CI badge', node);
		} else if (/travis|circleci/i.test(node.url)) {
			file.message('Readme must not contain CI badge', node);
		}
	});
});
