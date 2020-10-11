'use strict';

module.exports = [
	{
		test: /\bnode\.?js\b/gi,
		value: 'Node.js'
	},
	{
		test: /\bstack\s?overflow\b/gi,
		value: 'Stack Overflow'
	},
	{
		test: /\bjavascript\b/gi,
		value: 'JavaScript'
	},
	{
		test: [/\bmac\s?os(?!\s?x)\b/gi, /(mac\s?)?os\s?x/gi],
		value: 'macOS'
	},
	{
		test: /\byou\s?tube\b/gi,
		value: 'YouTube'
	},
	{
		test: /\bgit\s?hub\b/gi,
		value: 'GitHub'
	}
];
