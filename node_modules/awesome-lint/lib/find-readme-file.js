'use strict';

const fs = require('fs');
const path = require('path');

module.exports = dir => {
	const readmeFile = fs.readdirSync(dir).find(filename => (
		/readme|readme\.md|readme\.markdown|readme.txt/i.test(filename)
	));

	if (readmeFile) {
		return path.join(fs.realpathSync(dir), readmeFile);
	}
};
