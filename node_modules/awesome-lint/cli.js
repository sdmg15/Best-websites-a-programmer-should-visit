#!/usr/bin/env node
'use strict';
const meow = require('meow');
const findReadmeFile = require('./lib/find-readme-file');
const awesomeLint = require('.');

const getReporter = name => {
	// Check if reporter is an npm package
	try {
		return require(name).report;
	} catch (error) {
		if (error.code === 'MODULE_NOT_FOUND') {
			console.error(`No reporter found matching \`${name}\`. Using default reporter (vfile-reporter-pretty).`);
		} else {
			throw error;
		}
	}
};

const main = async () => {
	const cli = meow(`
		Usage
		  $ awesome-lint [url|filename]

		Options
		  --reporter, -r  Use a custom reporter
	`, {
		flags: {
			reporter: {
				type: 'string',
				alias: 'r'
			}
		}
	});

	const input = cli.input[0];

	const options = {};

	options.filename = input ? input : findReadmeFile(process.cwd());

	const reporterName = cli.flags.reporter;
	if (reporterName) {
		options.reporter = getReporter(reporterName);
	}

	await awesomeLint.report(options);
};

main();
