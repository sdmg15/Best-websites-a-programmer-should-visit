'use strict';
const caseOf = require('case').of;
const emojiRegex = require('emoji-regex');
const find = require('unist-util-find');
const findAllAfter = require('unist-util-find-all-after');
const isUrl = require('is-url-superb');
const rule = require('unified-lint-rule');
const toString = require('mdast-util-to-string');
const visit = require('unist-util-visit');
const identifierWhitelist = require('../lib/identifier-whitelist');

// Valid casings for first text word in list item descriptions
const listItemPrefixCaseWhitelist = new Set([
	'camel',
	'capital',
	'constant',
	'pascal',
	'upper'
]);

// Valid node types in list item link
const listItemLinkNodeWhitelist = new Set([
	'inlineCode',
	'text'
]);

// Valid node types in list item descriptions
const listItemDescriptionNodeWhitelist = new Set([
	'emphasis',
	'footnoteReference',
	'html',
	'image',
	'inlineCode',
	'link',
	'linkReference',
	'strong',
	'text'
]);

// Valid node types in list item description suffix
const listItemDescriptionSuffixNodeWhitelist = new Set([
	'emphasis',
	'html',
	'image',
	'link',
	'strong',
	'text'
]);

module.exports = rule('remark-lint:awesome-list-item', (ast, file) => {
	let lists = findAllLists(ast);

	const toc = find(ast, node => (
		node.type === 'heading' &&
		node.depth === 2 &&
		toString(node) === 'Contents'
	));

	if (toc) {
		const postContentsHeading = findAllAfter(ast, toc, {
			type: 'heading'
		})[0];

		if (!postContentsHeading) {
			return;
		}

		lists = extractSublists(findAllAfter(ast, postContentsHeading, {type: 'list'}));
	}

	for (const list of lists) {
		validateList(list, file);
	}
});

function findAllLists(ast) {
	const lists = [];
	visit(ast, 'list', list => {
		lists.push(list);
	});
	return lists;
}

function extractSublists(lists) {
	let allLists = [];

	for (const list of lists) {
		allLists = [...allLists, ...findAllLists(list)];
	}

	return allLists;
}

function validateList(list, file) {
	for (const listItem of list.children) {
		const [paragraph] = listItem.children;

		if (!paragraph || paragraph.type !== 'paragraph' || paragraph.children.length === 0) {
			file.message('Invalid list item', paragraph);
			continue;
		}

		const [link, ...description] = paragraph.children;

		if (link.type === 'text') {
			continue;
		}

		if (!validateListItemLink(link, file)) {
			continue;
		}

		validateListItemDescription(description, file);
	}
}

function validateListItemLink(link, file) {
	if (link.type !== 'link') {
		file.message('Invalid list item link', link);
		return false;
	}

	if (!isUrl(link.url)) {
		file.message('Invalid list item link URL', link);
		return false;
	}

	const linkText = toString(link);
	if (!linkText) {
		file.message('Invalid list item link text', link);
		return false;
	}

	for (const node of link.children) {
		if (!listItemLinkNodeWhitelist.has(node.type)) {
			file.message('Invalid list item link', node);
			return false;
		}
	}

	return true;
}

function validateListItemDescription(description, file) {
	if (description.length === 0) {
		// In certain, rare cases it's okay to leave off an item's description.
		return;
	}

	const prefix = description[0];
	const suffix = description[description.length - 1];

	const descriptionText = toString({type: 'root', children: description});
	const prefixText = toString(prefix);
	const suffixText = toString(suffix);

	// Check for special-cases with simple descriptions
	if (validateListItemSpecialCases(description, descriptionText)) {
		return true;
	}

	// Ensure description starts with a dash separator or an acceptable special-case
	if (prefix.type !== 'text' || !validateListItemPrefix(descriptionText, prefixText)) {
		if (/^[\s\u00A0]-[\s\u00A0]/.test(prefixText)) {
			file.message('List item link and description separated by invalid whitespace', prefix);
			return false;
		}

		if (/^\s*—/.test(prefixText)) {
			file.message('List item link and description separated by invalid en-dash', prefix);
			return false;
		}

		file.message('List item link and description must be separated with a dash', prefix);
		return false;
	}

	// Ensure description ends with an acceptable node type
	if (!listItemDescriptionSuffixNodeWhitelist.has(suffix.type)) {
		file.message('List item description must end with proper punctuation', suffix);
		return false;
	}

	// Ensure description ends with '.', '!', '?', '…' or an acceptable special-case
	if (suffix.type === 'text' && !validateListItemSuffix(descriptionText, suffixText)) {
		file.message('List item description must end with proper punctuation', suffix);
		return false;
	}

	if (prefix === suffix) {
		// Description contains pure text
		if (!validateListItemPrefixCasing(prefix, file)) {
			return false;
		}
	} else {
		// Description contains mixed node types
		for (const node of description) {
			if (!listItemDescriptionNodeWhitelist.has(node.type)) {
				file.message('List item description contains invalid markdown', node);
				return false;
			}
		}

		if (prefix.length > 3 && !validateListItemPrefixCasing(prefix, file)) {
			return false;
		}
	}

	return true;
}

function validateListItemSpecialCases(description, descriptionText) {
	if (descriptionText.startsWith(' - ')) {
		return false;
	}

	const text = descriptionText
		.replace(emojiRegex(), '')
		.trim();

	if (!text) {
		// Description contains only emoji and spaces
		return true;
	}

	if (/^\s\([^)]+\)\s*$/.test(descriptionText)) {
		// Description contains only a parenthetical
		return true;
	}

	if (/^\([^)]+\)$/.test(text)) {
		// Description contains only a parenthetical and emojis
		return true;
	}

	return false;
}

function tokenizeWords(text) {
	return text.split(/[- ;./]/).filter(Boolean);
}

function validateListItemPrefixCasing(prefix, file) {
	const strippedPrefix = prefix.value.slice(3);
	const [firstWord] = tokenizeWords(strippedPrefix);

	if (!firstWord) {
		file.message('List item description must start with a non-empty string', prefix);
		return false;
	}

	if (!listItemPrefixCaseWhitelist.has(caseOf(firstWord))) {
		if (!/\d/.test(firstWord) && !/^["'(]/.test(firstWord)) {
			if (!identifierWhitelist.has(firstWord)) {
				file.message('List item description must start with valid casing', prefix);
				return false;
			}
		}
	}

	return true;
}

function validateListItemPrefix(descriptionText, prefixText) {
	if (prefixText.startsWith(' - ')) {
		// Description starts with a dash
		return true;
	}

	if (textEndsWithEmoji(prefixText) && descriptionText === prefixText) {
		// Description ends with an emojii
		return true;
	}

	return false;
}

function validateListItemSuffix(descriptionText, suffixText) {
	// Punctuation rules are available at: https://www.thepunctuationguide.com

	// Descriptions are not allowed to be fully backticked quotes, whatever the
	// ending punctuation and its position.
	if (/^`.*[.!?…]*`[.!?…]*$/.test(descriptionText)) {
		// Still allow multiple backticks if the whole description is not fully
		// quoted.
		if (/^`.+`.+`.+$/.test(descriptionText)) {
			return true;
		}

		return false;
	}

	// Any kind of quote followed by one of our punctuaction marker is perfect,
	// but only if not following a punctuation itself. Uses positive lookbehind
	// to search for punctuation following a quote.
	if (/.*(?<=["”])[.!?…]+$/.test(descriptionText)) {
		// If the quote follows a regular punctuation, this is wrong.
		if (/.*[.!?…]["”][.!?…]+$/.test(descriptionText)) {
			return false;
		}

		return true;
	}

	// Any of our punctuation marker eventually closed by any kind of quote is
	// good.
	if (/.*[.!?…]["”]?$/.test(descriptionText)) {
		return true;
	}

	if (!/[.!?…]/.test(descriptionText)) {
		// Description contains no punctuation
		const tokens = tokenizeWords(descriptionText);
		if (tokens.length > 2 || !textEndsWithEmoji(tokens[tokens.length - 1])) {
			return false;
		}
	}

	if (/\)\s*$/.test(suffixText)) {
		// Description contains punctuation and ends with a parenthesis
		return true;
	}

	if (textEndsWithEmoji(suffixText)) {
		// Description contains punctuation and ends with an emoji
		return true;
	}

	return false;
}

function textEndsWithEmoji(text) {
	const regex = emojiRegex();
	let match;
	let emoji;
	let emojiIndex;

	// Find last emoji in text (if any exist)
	while ((match = regex.exec(text))) {
		const {index} = match;
		emoji = match[0];
		emojiIndex = index;
	}

	if (emoji && emoji.length + emojiIndex >= text.length) {
		return true;
	}

	return false;
}
