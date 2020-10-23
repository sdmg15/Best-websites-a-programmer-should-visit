# parse-github-url [![NPM version](https://img.shields.io/npm/v/parse-github-url.svg?style=flat)](https://www.npmjs.com/package/parse-github-url) [![NPM monthly downloads](https://img.shields.io/npm/dm/parse-github-url.svg?style=flat)](https://npmjs.org/package/parse-github-url) [![NPM total downloads](https://img.shields.io/npm/dt/parse-github-url.svg?style=flat)](https://npmjs.org/package/parse-github-url) [![Linux Build Status](https://img.shields.io/travis/jonschlinkert/parse-github-url.svg?style=flat&label=Travis)](https://travis-ci.org/jonschlinkert/parse-github-url)

> Parse a github URL into an object.

Please consider following this project's author, [Jon Schlinkert](https://github.com/jonschlinkert), and consider starring the project to show your :heart: and support.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save parse-github-url
```

**HEADS UP! Breaking changes in 0.3.0!!!**

See the [release history](#history) for details.

**Why another GitHub URL parser library?**

Seems like every lib I've found does too much, like both stringifying and parsing, or converts the URL from one format to another, only returns certain segments of the URL except for what I need, yields inconsistent results or has poor coverage.

## Usage

```js
var gh = require('parse-github-url');
gh('https://github.com/jonschlinkert/micromatch');
```

Results in:

```js
{
  "owner": "jonschlinkert",
  "name": "micromatch",
  "repo": "jonschlinkert/micromatch",
  "branch": "master"
}
```

## Example results

Generated results from test fixtures:

```js
// assemble/verb#1.2.3
Url {
  protocol: null,
  slashes: null,
  auth: null,
  host: 'github.com',
  port: null,
  hostname: null,
  hash: '#1.2.3',
  search: null,
  query: null,
  pathname: 'assemble/verb',
  path: 'assemble/verb',
  href: 'assemble/verb#1.2.3',
  filepath: null,
  owner: 'assemble',
  name: 'verb',
  repo: 'assemble/verb',
  branch: '1.2.3',
  repository: 'assemble/verb' }

// assemble/verb#branch
Url {
  protocol: null,
  slashes: null,
  auth: null,
  host: 'github.com',
  port: null,
  hostname: null,
  hash: '#branch',
  search: null,
  query: null,
  pathname: 'assemble/verb',
  path: 'assemble/verb',
  href: 'assemble/verb#branch',
  filepath: null,
  owner: 'assemble',
  name: 'verb',
  repo: 'assemble/verb',
  branch: 'branch',
  repository: 'assemble/verb' }

// assemble/verb
Url {
  protocol: null,
  slashes: null,
  auth: null,
  host: 'github.com',
  port: null,
  hostname: null,
  hash: null,
  search: null,
  query: null,
  pathname: 'assemble/verb',
  path: 'assemble/verb',
  href: 'assemble/verb',
  filepath: null,
  owner: 'assemble',
  name: 'verb',
  repo: 'assemble/verb',
  branch: 'master',
  repository: 'assemble/verb' }

// git+https://github.com/assemble/verb.git
Url {
  protocol: 'git+https:',
  slashes: true,
  auth: null,
  host: 'github.com',
  port: null,
  hostname: 'github.com',
  hash: null,
  search: null,
  query: null,
  pathname: 'assemble/verb.git',
  path: 'assemble/verb.git',
  href: 'git+https://github.com/assemble/verb.git',
  filepath: null,
  owner: 'assemble',
  name: 'verb',
  repo: 'assemble/verb',
  branch: 'master',
  repository: 'assemble/verb' }

// git+ssh://github.com/assemble/verb.git
Url {
  protocol: 'git+ssh:',
  slashes: true,
  auth: null,
  host: 'github.com',
  port: null,
  hostname: 'github.com',
  hash: null,
  search: null,
  query: null,
  pathname: 'assemble/verb.git',
  path: 'assemble/verb.git',
  href: 'git+ssh://github.com/assemble/verb.git',
  filepath: null,
  owner: 'assemble',
  name: 'verb',
  repo: 'assemble/verb',
  branch: 'master',
  repository: 'assemble/verb' }

// git://gh.pages.com/assemble/verb.git
Url {
  protocol: 'git:',
  slashes: true,
  auth: null,
  host: 'gh.pages.com',
  port: null,
  hostname: 'gh.pages.com',
  hash: null,
  search: null,
  query: null,
  pathname: 'assemble/verb.git',
  path: 'assemble/verb.git',
  href: 'git://gh.pages.com/assemble/verb.git',
  filepath: null,
  owner: 'assemble',
  name: 'verb',
  repo: 'assemble/verb',
  branch: 'master',
  repository: 'assemble/verb' }

// git://github.assemble.com/assemble/verb.git
Url {
  protocol: 'git:',
  slashes: true,
  auth: null,
  host: 'github.assemble.com',
  port: null,
  hostname: 'github.assemble.com',
  hash: null,
  search: null,
  query: null,
  pathname: 'assemble/verb.git',
  path: 'assemble/verb.git',
  href: 'git://github.assemble.com/assemble/verb.git',
  filepath: null,
  owner: 'assemble',
  name: 'verb',
  repo: 'assemble/verb',
  branch: 'master',
  repository: 'assemble/verb' }

// git://github.assemble.two.com/assemble/verb.git
Url {
  protocol: 'git:',
  slashes: true,
  auth: null,
  host: 'github.assemble.two.com',
  port: null,
  hostname: 'github.assemble.two.com',
  hash: null,
  search: null,
  query: null,
  pathname: 'assemble/verb.git',
  path: 'assemble/verb.git',
  href: 'git://github.assemble.two.com/assemble/verb.git',
  filepath: null,
  owner: 'assemble',
  name: 'verb',
  repo: 'assemble/verb',
  branch: 'master',
  repository: 'assemble/verb' }

// git://github.com/assemble/verb
Url {
  protocol: 'git:',
  slashes: true,
  auth: null,
  host: 'github.com',
  port: null,
  hostname: 'github.com',
  hash: null,
  search: null,
  query: null,
  pathname: 'assemble/verb',
  path: 'assemble/verb',
  href: 'git://github.com/assemble/verb',
  filepath: null,
  owner: 'assemble',
  name: 'verb',
  repo: 'assemble/verb',
  branch: 'master',
  repository: 'assemble/verb' }

// git://github.com/assemble/verb.git
Url {
  protocol: 'git:',
  slashes: true,
  auth: null,
  host: 'github.com',
  port: null,
  hostname: 'github.com',
  hash: null,
  search: null,
  query: null,
  pathname: 'assemble/verb.git',
  path: 'assemble/verb.git',
  href: 'git://github.com/assemble/verb.git',
  filepath: null,
  owner: 'assemble',
  name: 'verb',
  repo: 'assemble/verb',
  branch: 'master',
  repository: 'assemble/verb' }

// git@gh.pages.com:assemble/verb.git
Url {
  protocol: null,
  slashes: null,
  auth: null,
  host: 'gh.pages.com',
  port: null,
  hostname: null,
  hash: null,
  search: null,
  query: null,
  pathname: 'git@gh.pages.com:assemble/verb.git',
  path: 'git@gh.pages.com:assemble/verb.git',
  href: 'git@gh.pages.com:assemble/verb.git',
  filepath: null,
  owner: 'assemble',
  name: 'verb',
  repo: 'assemble/verb',
  branch: 'master',
  repository: 'assemble/verb' }

// git@github.com:assemble/verb.git#1.2.3
Url {
  protocol: null,
  slashes: null,
  auth: null,
  host: 'github.com',
  port: null,
  hostname: null,
  hash: '#1.2.3',
  search: null,
  query: null,
  pathname: 'git@github.com:assemble/verb.git',
  path: 'git@github.com:assemble/verb.git',
  href: 'git@github.com:assemble/verb.git#1.2.3',
  filepath: null,
  owner: 'assemble',
  name: 'verb',
  repo: 'assemble/verb',
  branch: '1.2.3',
  repository: 'assemble/verb' }

// git@github.com:assemble/verb.git#v1.2.3
Url {
  protocol: null,
  slashes: null,
  auth: null,
  host: 'github.com',
  port: null,
  hostname: null,
  hash: '#v1.2.3',
  search: null,
  query: null,
  pathname: 'git@github.com:assemble/verb.git',
  path: 'git@github.com:assemble/verb.git',
  href: 'git@github.com:assemble/verb.git#v1.2.3',
  filepath: null,
  owner: 'assemble',
  name: 'verb',
  repo: 'assemble/verb',
  branch: 'v1.2.3',
  repository: 'assemble/verb' }

// git@github.com:assemble/verb.git
Url {
  protocol: null,
  slashes: null,
  auth: null,
  host: 'github.com',
  port: null,
  hostname: null,
  hash: null,
  search: null,
  query: null,
  pathname: 'git@github.com:assemble/verb.git',
  path: 'git@github.com:assemble/verb.git',
  href: 'git@github.com:assemble/verb.git',
  filepath: null,
  owner: 'assemble',
  name: 'verb',
  repo: 'assemble/verb',
  branch: 'master',
  repository: 'assemble/verb' }

// github:assemble/verb
Url {
  protocol: 'github:',
  slashes: null,
  auth: null,
  host: 'assemble',
  port: null,
  hostname: 'assemble',
  hash: null,
  search: null,
  query: null,
  pathname: 'verb',
  path: 'verb',
  href: 'github:assemble/verb',
  filepath: null,
  owner: 'assemble',
  name: 'verb',
  repo: 'assemble/verb',
  branch: 'master',
  repository: 'assemble/verb' }

// http://github.com/assemble
Url {
  protocol: 'http:',
  slashes: true,
  auth: null,
  host: 'github.com',
  port: null,
  hostname: 'github.com',
  hash: null,
  search: null,
  query: null,
  pathname: 'assemble',
  path: 'assemble',
  href: 'http://github.com/assemble',
  filepath: null,
  owner: 'assemble',
  name: null,
  repo: null,
  branch: 'master',
  repository: null }

// http://github.com/assemble/verb
Url {
  protocol: 'http:',
  slashes: true,
  auth: null,
  host: 'github.com',
  port: null,
  hostname: 'github.com',
  hash: null,
  search: null,
  query: null,
  pathname: 'assemble/verb',
  path: 'assemble/verb',
  href: 'http://github.com/assemble/verb',
  filepath: null,
  owner: 'assemble',
  name: 'verb',
  repo: 'assemble/verb',
  branch: 'master',
  repository: 'assemble/verb' }

// http://github.com/assemble/verb.git
Url {
  protocol: 'http:',
  slashes: true,
  auth: null,
  host: 'github.com',
  port: null,
  hostname: 'github.com',
  hash: null,
  search: null,
  query: null,
  pathname: 'assemble/verb.git',
  path: 'assemble/verb.git',
  href: 'http://github.com/assemble/verb.git',
  filepath: null,
  owner: 'assemble',
  name: 'verb',
  repo: 'assemble/verb',
  branch: 'master',
  repository: 'assemble/verb' }

// http://github.com/assemble/verb/tree
Url {
  protocol: 'http:',
  slashes: true,
  auth: null,
  host: 'github.com',
  port: null,
  hostname: 'github.com',
  hash: null,
  search: null,
  query: null,
  pathname: 'assemble/verb/tree',
  path: 'assemble/verb/tree',
  href: 'http://github.com/assemble/verb/tree',
  filepath: null,
  branch: 'tree',
  owner: 'assemble',
  name: 'verb',
  repo: 'assemble/verb',
  repository: 'assemble/verb' }

// http://github.com/assemble/verb/tree/master
Url {
  protocol: 'http:',
  slashes: true,
  auth: null,
  host: 'github.com',
  port: null,
  hostname: 'github.com',
  hash: null,
  search: null,
  query: null,
  pathname: 'assemble/verb/tree/master',
  path: 'assemble/verb/tree/master',
  href: 'http://github.com/assemble/verb/tree/master',
  filepath: null,
  branch: 'master',
  owner: 'assemble',
  name: 'verb',
  repo: 'assemble/verb',
  repository: 'assemble/verb' }

// http://github.com/assemble/verb/tree/master/foo/bar
Url {
  protocol: 'http:',
  slashes: true,
  auth: null,
  host: 'github.com',
  port: null,
  hostname: 'github.com',
  hash: null,
  search: null,
  query: null,
  pathname: 'assemble/verb/tree/master/foo/bar',
  path: 'assemble/verb/tree/master/foo/bar',
  href: 'http://github.com/assemble/verb/tree/master/foo/bar',
  filepath: null,
  branch: 'master',
  owner: 'assemble',
  name: 'verb',
  repo: 'assemble/verb',
  repository: 'assemble/verb' }

// https://assemble.github.com/assemble/verb/somefile.tar.gz
Url {
  protocol: 'https:',
  slashes: true,
  auth: null,
  host: 'assemble.github.com',
  port: null,
  hostname: 'assemble.github.com',
  hash: null,
  search: null,
  query: null,
  pathname: 'assemble/verb/somefile.tar.gz',
  path: 'assemble/verb/somefile.tar.gz',
  href: 'https://assemble.github.com/assemble/verb/somefile.tar.gz',
  filepath: null,
  owner: 'assemble',
  name: 'verb',
  repo: 'assemble/verb',
  branch: 'somefile.tar.gz',
  repository: 'assemble/verb' }

// https://assemble.github.com/assemble/verb/somefile.zip
Url {
  protocol: 'https:',
  slashes: true,
  auth: null,
  host: 'assemble.github.com',
  port: null,
  hostname: 'assemble.github.com',
  hash: null,
  search: null,
  query: null,
  pathname: 'assemble/verb/somefile.zip',
  path: 'assemble/verb/somefile.zip',
  href: 'https://assemble.github.com/assemble/verb/somefile.zip',
  filepath: null,
  owner: 'assemble',
  name: 'verb',
  repo: 'assemble/verb',
  branch: 'somefile.zip',
  repository: 'assemble/verb' }

// https://assemble@github.com/assemble/verb.git
Url {
  protocol: 'https:',
  slashes: true,
  auth: 'assemble',
  host: 'github.com',
  port: null,
  hostname: 'github.com',
  hash: null,
  search: null,
  query: null,
  pathname: 'assemble/verb.git',
  path: 'assemble/verb.git',
  href: 'https://assemble@github.com/assemble/verb.git',
  filepath: null,
  owner: 'assemble',
  name: 'verb',
  repo: 'assemble/verb',
  branch: 'master',
  repository: 'assemble/verb' }

// https://gh.pages.com/assemble/verb.git
Url {
  protocol: 'https:',
  slashes: true,
  auth: null,
  host: 'gh.pages.com',
  port: null,
  hostname: 'gh.pages.com',
  hash: null,
  search: null,
  query: null,
  pathname: 'assemble/verb.git',
  path: 'assemble/verb.git',
  href: 'https://gh.pages.com/assemble/verb.git',
  filepath: null,
  owner: 'assemble',
  name: 'verb',
  repo: 'assemble/verb',
  branch: 'master',
  repository: 'assemble/verb' }

// https://github.com/assemble/verb
Url {
  protocol: 'https:',
  slashes: true,
  auth: null,
  host: 'github.com',
  port: null,
  hostname: 'github.com',
  hash: null,
  search: null,
  query: null,
  pathname: 'assemble/verb',
  path: 'assemble/verb',
  href: 'https://github.com/assemble/verb',
  filepath: null,
  owner: 'assemble',
  name: 'verb',
  repo: 'assemble/verb',
  branch: 'master',
  repository: 'assemble/verb' }

// https://github.com/assemble/verb.git
Url {
  protocol: 'https:',
  slashes: true,
  auth: null,
  host: 'github.com',
  port: null,
  hostname: 'github.com',
  hash: null,
  search: null,
  query: null,
  pathname: 'assemble/verb.git',
  path: 'assemble/verb.git',
  href: 'https://github.com/assemble/verb.git',
  filepath: null,
  owner: 'assemble',
  name: 'verb',
  repo: 'assemble/verb',
  branch: 'master',
  repository: 'assemble/verb' }

// https://github.com/assemble/verb/blob/1.2.3/README.md
Url {
  protocol: 'https:',
  slashes: true,
  auth: null,
  host: 'github.com',
  port: null,
  hostname: 'github.com',
  hash: null,
  search: null,
  query: null,
  pathname: 'assemble/verb/blob/1.2.3/README.md',
  path: 'assemble/verb/blob/1.2.3/README.md',
  href: 'https://github.com/assemble/verb/blob/1.2.3/README.md',
  filepath: 'README.md',
  branch: '1.2.3',
  blob: '1.2.3/README.md',
  owner: 'assemble',
  name: 'verb',
  repo: 'assemble/verb',
  repository: 'assemble/verb' }

// https://github.com/assemble/verb/blob/249b21a86400b38969cee3d5df6d2edf8813c137/README.md
Url {
  protocol: 'https:',
  slashes: true,
  auth: null,
  host: 'github.com',
  port: null,
  hostname: 'github.com',
  hash: null,
  search: null,
  query: null,
  pathname: 'assemble/verb/blob/249b21a86400b38969cee3d5df6d2edf8813c137/README.md',
  path: 'assemble/verb/blob/249b21a86400b38969cee3d5df6d2edf8813c137/README.md',
  href: 'https://github.com/assemble/verb/blob/249b21a86400b38969cee3d5df6d2edf8813c137/README.md',
  filepath: '249b21a86400b38969cee3d5df6d2edf8813c137/README.md',
  blob: '249b21a86400b38969cee3d5df6d2edf8813c137/README.md',
  owner: 'assemble',
  name: 'verb',
  repo: 'assemble/verb',
  branch: 'blob',
  repository: 'assemble/verb' }

// https://github.com/assemble/verb/blob/master/assemble/index.js
Url {
  protocol: 'https:',
  slashes: true,
  auth: null,
  host: 'github.com',
  port: null,
  hostname: 'github.com',
  hash: null,
  search: null,
  query: null,
  pathname: 'assemble/verb/blob/master/assemble/index.js',
  path: 'assemble/verb/blob/master/assemble/index.js',
  href: 'https://github.com/assemble/verb/blob/master/assemble/index.js',
  filepath: 'assemble/index.js',
  branch: 'master',
  blob: 'master/assemble/index.js',
  owner: 'assemble',
  name: 'verb',
  repo: 'assemble/verb',
  repository: 'assemble/verb' }

// https://github.com/assemble/verb/tree/1.2.3
Url {
  protocol: 'https:',
  slashes: true,
  auth: null,
  host: 'github.com',
  port: null,
  hostname: 'github.com',
  hash: null,
  search: null,
  query: null,
  pathname: 'assemble/verb/tree/1.2.3',
  path: 'assemble/verb/tree/1.2.3',
  href: 'https://github.com/assemble/verb/tree/1.2.3',
  filepath: null,
  branch: '1.2.3',
  owner: 'assemble',
  name: 'verb',
  repo: 'assemble/verb',
  repository: 'assemble/verb' }

// https://github.com/assemble/verb/tree/feature/1.2.3
Url {
  protocol: 'https:',
  slashes: true,
  auth: null,
  host: 'github.com',
  port: null,
  hostname: 'github.com',
  hash: null,
  search: null,
  query: null,
  pathname: 'assemble/verb/tree/feature/1.2.3',
  path: 'assemble/verb/tree/feature/1.2.3',
  href: 'https://github.com/assemble/verb/tree/feature/1.2.3',
  filepath: null,
  branch: 'feature',
  owner: 'assemble',
  name: 'verb',
  repo: 'assemble/verb',
  repository: 'assemble/verb' }

// https://github.com/repos/assemble/verb/tarball
Url {
  protocol: 'https:',
  slashes: true,
  auth: null,
  host: 'github.com',
  port: null,
  hostname: 'github.com',
  hash: null,
  search: null,
  query: null,
  pathname: 'repos/assemble/verb/tarball',
  path: 'assemble/verb/tarball',
  href: 'https://github.com/repos/assemble/verb/tarball',
  filepath: null,
  owner: 'assemble',
  name: 'verb',
  repo: 'assemble/verb',
  branch: 'tarball',
  repository: 'assemble/verb' }

// https://github.com/repos/assemble/verb/zipball
Url {
  protocol: 'https:',
  slashes: true,
  auth: null,
  host: 'github.com',
  port: null,
  hostname: 'github.com',
  hash: null,
  search: null,
  query: null,
  pathname: 'repos/assemble/verb/zipball',
  path: 'assemble/verb/zipball',
  href: 'https://github.com/repos/assemble/verb/zipball',
  filepath: null,
  owner: 'assemble',
  name: 'verb',
  repo: 'assemble/verb',
  branch: 'zipball',
  repository: 'assemble/verb' }
```

## History

**v0.3.0**

To be more consistent with node.js/package.json conventions, the following properties were renamed in `v0.3.0`:

* `repo` is now `name` (project name)
* `repopath` is now `repository` (project repository)
* `user` is now `owner` (project owner or org)

## About

<details>
<summary><strong>Contributing</strong></summary>

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

</details>

<details>
<summary><strong>Running Tests</strong></summary>

Running and reviewing unit tests is a great way to get familiarized with a library and its API. You can install dependencies and run tests with the following command:

```sh
$ npm install && npm test
```

</details>
<details>
<summary><strong>Building docs</strong></summary>

_(This project's readme.md is generated by [verb](https://github.com/verbose/verb-generate-readme), please don't edit the readme directly. Any changes to the readme must be made in the [.verb.md](.verb.md) readme template.)_

To generate the readme, run the following command:

```sh
$ npm install -g verbose/verb#dev verb-generate-readme && verb
```

</details>

### Related projects

You might also be interested in these projects:

* [git-add-remote](https://www.npmjs.com/package/git-add-remote): API for adding git remotes. | [homepage](https://github.com/jonschlinkert/git-add-remote "API for adding git remotes.")
* [git-branch](https://www.npmjs.com/package/git-branch): Get the current branch for a local git repository. | [homepage](https://github.com/jonschlinkert/git-branch "Get the current branch for a local git repository.")
* [git-repo-name](https://www.npmjs.com/package/git-repo-name): Get the repository name from the git remote origin URL. | [homepage](https://github.com/jonschlinkert/git-repo-name "Get the repository name from the git remote origin URL.")
* [git-username](https://www.npmjs.com/package/git-username): Get the username from a git remote origin URL. | [homepage](https://github.com/jonschlinkert/git-username "Get the username from a git remote origin URL.")
* [is-git-url](https://www.npmjs.com/package/is-git-url): Regex to validate that a URL is a git url. | [homepage](https://github.com/jonschlinkert/is-git-url "Regex to validate that a URL is a git url.")

### Contributors

| **Commits** | **Contributor** | 
| --- | --- |
| 25 | [jonschlinkert](https://github.com/jonschlinkert) |
| 4 | [doowb](https://github.com/doowb) |
| 2 | [alferov](https://github.com/alferov) |
| 1 | [jmendiara](https://github.com/jmendiara) |
| 1 | [jeremyruppel](https://github.com/jeremyruppel) |
| 1 | [CookPete](https://github.com/CookPete) |
| 1 | [iamwillbar](https://github.com/iamwillbar) |
| 1 | [bmeiri](https://github.com/bmeiri) |

### Author

**Jon Schlinkert**

* [linkedin/in/jonschlinkert](https://linkedin.com/in/jonschlinkert)
* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](https://twitter.com/jonschlinkert)

### License

Copyright © 2017, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT License](LICENSE).

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.6.0, on December 08, 2017._