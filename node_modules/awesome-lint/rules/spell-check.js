'use strict';
const rule = require('unified-lint-rule');
const visit = require('unist-util-visit');
const arrify = require('arrify');
const spellCheckRules = require('../lib/spell-check-rules');

const wordBreakCharacterWhitelist = new Set([
	'-'
]);

module.exports = rule('remark-lint:awesome-spell-check', (ast, file) => {
	visit(ast, 'text', node => {
		if (!node.value) {
			return;
		}

		for (const rule of spellCheckRules) {
			const {test, value} = rule;
			const regs = arrify(test).map(reg => new RegExp(reg));

			for (const re of regs) {
				for (;;) {
					const match = re.exec(node.value);
					if (!match) {
						break;
					}

					if (match[0] !== value) {
						const previousCharacter = node.value[match.index - 1];
						const nextCharacter = node.value[match.index + match[0].length];

						if (wordBreakCharacterWhitelist.has(previousCharacter)) {
							continue;
						}

						if (wordBreakCharacterWhitelist.has(nextCharacter)) {
							continue;
						}

						file.message(`Text "${match[0]}" should be written as "${value}"`, node);
						break;
					}
				}
			}
		}
	});
});
