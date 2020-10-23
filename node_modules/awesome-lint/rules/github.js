'use strict';
const execa = require('execa');
const got = require('got');
const gh = require('github-url-to-object');
const rule = require('unified-lint-rule');

module.exports = rule('remark-lint:awesome-github', async (ast, file) => {
	const {dirname} = file;

	try {
		const remoteUrl = await execa.stdout('git', [
			'remote',
			'get-url',
			'--push',
			'origin'
		], {
			cwd: dirname
		});
		const githubUrls = gh(remoteUrl);
		if (!githubUrls) {
			file.message('Repository should be on GitHub');
			return;
		}

		const headers = {
			Accept: 'application/vnd.github.mercy-preview+json',
			'User-Agent': 'awesome-lint'
		};
		if (process.env.github_token) {
			headers.Authorization = `token ${process.env.github_token}`;
		}

		let response;
		try {
			response = await got.get(githubUrls.api_url, {
				headers,
				json: true
			});
		} catch (error) {
			if (error.statusCode === 401) {
				file.message('Unauthorized access or token is invalid');
			} else if (error.statusCode === 403) {
				let errorMessage = `API rate limit of ${error.headers['x-ratelimit-limit']} requests per hour exceeded`;
				if (!headers.Authorization) {
					errorMessage += '. Use a personal token to increase the number of requests';
				}

				file.message(errorMessage);
			} else {
				file.message(`There was a problem trying to connect to GitHub: ${error.message}`);
			}

			return;
		}

		const data = response.body;
		if (!data.description) {
			file.message('The repository should have a description');
		}

		if (!data.topics.includes('awesome')) {
			file.message('The repository should have "awesome" as a GitHub topic');
		}

		if (!data.topics.includes('awesome-list')) {
			file.message('The repository should have "awesome-list" as a GitHub topic');
		}

		if (!data.license) {
			file.message('License was not detected by GitHub');
		}
	} catch (_) {
		// Most likely not a Git repository
		file.message('Awesome list must reside in a valid git repository');
	}
});

// For stubbing
module.exports.execa = execa;
module.exports.got = got;
