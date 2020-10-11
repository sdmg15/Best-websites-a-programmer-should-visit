'use strict';
const parse = require('parse-github-url');
const readPkg = require('read-pkg');

module.exports = ({repoURL, dirname}) => {
	if (repoURL) {
		return parse(repoURL).owner;
	}

	try {
		const json = readPkg.sync({cwd: dirname});
		return parse(json.repository.url).owner;
	} catch (_) {}
};
