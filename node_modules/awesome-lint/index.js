'use strict';
const path = require('path');
const isUrl = require('is-url-superb');
const isGithubUrl = require('is-github-url');
const ora = require('ora');
const remark = require('remark');
const gitClone = require('git-clone');
const globby = require('globby');
const pify = require('pify');
const rmfr = require('rmfr');
const tempy = require('tempy');
const toVfile = require('to-vfile');
const vfileReporterPretty = require('vfile-reporter-pretty');
const config = require('./config');
const findReadmeFile = require('./lib/find-readme-file');
const codeOfConductRule = require('./rules/code-of-conduct');

const lint = options => {
	options = {
		config,
		filename: 'readme.md',
		...options
	};

	const readmeFile = globby.sync(options.filename, {nocase: true})[0];

	if (!readmeFile) {
		return Promise.reject(new Error(`Couldn't find the file ${options.filename}`));
	}

	const readmeVFile = toVfile.readSync(path.resolve(readmeFile));
	const {dirname} = readmeVFile;
	const processTasks = [{
		vfile: readmeVFile,
		plugins: options.config
	}];

	const codeOfConductFile = globby.sync(['{code-of-conduct,code_of_conduct}.md', '.github/{code-of-conduct,code_of_conduct}.md'], {nocase: true, cwd: dirname})[0];
	if (codeOfConductFile) {
		const codeOfConductVFile = toVfile.readSync(path.resolve(dirname, codeOfConductFile));
		codeOfConductVFile.repoURL = options.repoURL;
		processTasks.push({
			vfile: codeOfConductVFile,
			plugins: [codeOfConductRule]
		});
	}

	return Promise.all(processTasks.map(({vfile, plugins}) => pify(remark().use(plugins).process)(vfile)));
};

lint.report = async options => {
	const spinner = ora('Linting').start();

	try {
		await lint._report(options, spinner);
	} catch (error) {
		spinner.fail(error.message);
		process.exitCode = 1;
	}
};

lint._report = async (options, spinner) => {
	let temporary = null;

	if (isUrl(options.filename)) {
		if (!isGithubUrl(options.filename, {repository: true})) {
			throw new Error(`Invalid GitHub repo URL: ${options.filename}`);
		}

		temporary = tempy.directory();
		await pify(gitClone)(options.filename, temporary);

		const readme = findReadmeFile(temporary);
		if (!readme) {
			await rmfr(temporary);
			throw new Error(`Unable to find valid readme for "${options.filename}"`);
		}

		options.repoURL = options.filename;
		options.filename = readme;
	}

	const vfiles = await lint(options);
	const messages = [];
	for (const vfile of vfiles) {
		vfile.path = path.basename(vfile.path);
		messages.push(...vfile.messages);
	}

	if (temporary) {
		await rmfr(temporary);
	}

	if (messages.length === 0) {
		spinner.succeed();

		if (options.reporter) {
			console.log(options.reporter([]));
		}

		return;
	}

	for (const message of messages) {
		message.fatal = true; // TODO: because of https://github.com/wooorm/remark-lint/issues/65
	}

	spinner.fail();
	process.exitCode = 1;

	const reporter = options.reporter || vfileReporterPretty;
	console.log(reporter(vfiles));
};

module.exports = lint;
