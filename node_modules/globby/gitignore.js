'use strict';
const fs = require('fs');
const path = require('path');
const fastGlob = require('fast-glob');
const gitIgnore = require('ignore');
const pify = require('pify');
const slash = require('slash');

const DEFAULT_IGNORE = [
	'**/node_modules/**',
	'**/bower_components/**',
	'**/flow-typed/**',
	'**/coverage/**',
	'**/.git'
];

const readFileP = pify(fs.readFile);

const mapGitIgnorePatternTo = base => ignore => {
	if (ignore.startsWith('!')) {
		return '!' + path.posix.join(base, ignore.slice(1));
	}

	return path.posix.join(base, ignore);
};

const parseGitIgnore = (content, options) => {
	const base = slash(path.relative(options.cwd, path.dirname(options.fileName)));

	return content
		.split(/\r?\n/)
		.filter(Boolean)
		.filter(line => line.charAt(0) !== '#')
		.map(mapGitIgnorePatternTo(base));
};

const reduceIgnore = files => {
	return files.reduce((ignores, file) => {
		ignores.add(parseGitIgnore(file.content, {
			cwd: file.cwd,
			fileName: file.filePath
		}));
		return ignores;
	}, gitIgnore());
};

const getIsIgnoredPredecate = (ignores, cwd) => {
	return p => ignores.ignores(slash(path.relative(cwd, p)));
};

const getFile = (file, cwd) => {
	const filePath = path.join(cwd, file);
	return readFileP(filePath, 'utf8')
		.then(content => ({
			content,
			cwd,
			filePath
		}));
};

const getFileSync = (file, cwd) => {
	const filePath = path.join(cwd, file);
	const content = fs.readFileSync(filePath, 'utf8');

	return {
		content,
		cwd,
		filePath
	};
};

const normalizeOptions = (options = {}) => {
	const ignore = options.ignore || [];
	const cwd = options.cwd || process.cwd();
	return {ignore, cwd};
};

module.exports = options => {
	options = normalizeOptions(options);

	return fastGlob('**/.gitignore', {
		ignore: DEFAULT_IGNORE.concat(options.ignore),
		cwd: options.cwd
	})
		.then(paths => Promise.all(paths.map(file => getFile(file, options.cwd))))
		.then(files => reduceIgnore(files))
		.then(ignores => getIsIgnoredPredecate(ignores, options.cwd));
};

module.exports.sync = options => {
	options = normalizeOptions(options);

	const paths = fastGlob.sync('**/.gitignore', {
		ignore: DEFAULT_IGNORE.concat(options.ignore),
		cwd: options.cwd
	});
	const files = paths.map(file => getFileSync(file, options.cwd));
	const ignores = reduceIgnore(files);

	return getIsIgnoredPredecate(ignores, options.cwd);
};
