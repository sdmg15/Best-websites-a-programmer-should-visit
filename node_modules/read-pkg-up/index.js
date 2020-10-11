'use strict';
const path = require('path');
const findUp = require('find-up');
const readPkg = require('read-pkg');

module.exports = async options => {
	const filePath = await findUp('package.json', options);

	if (!filePath) {
		return;
	}

	return {
		packageJson: await readPkg({...options, cwd: path.dirname(filePath)}),
		path: filePath
	};
};

module.exports.sync = options => {
	const filePath = findUp.sync('package.json', options);

	if (!filePath) {
		return;
	}

	return {
		packageJson: readPkg.sync({...options, cwd: path.dirname(filePath)}),
		path: filePath
	};
};
