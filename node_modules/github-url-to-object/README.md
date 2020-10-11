# github-url-to-object  [![Build Status](https://travis-ci.org/zeke/github-url-to-object.png?branch=master)](https://travis-ci.org/zeke/github-url-to-object)

A module for node.js and browsers that extracts useful properties like `user`,
`repo`, and `branch` from various flavors of GitHub URLs.

There's also a Bitbucket equivalent to this library: [bitbucket-url-to-object](https://github.com/zeke/bitbucket-url-to-object).

Check out the demo at [zeke.github.io/github-url-to-object](https://zeke.github.io/github-url-to-object).

## Installation

For Node.js or Browserify usage:

```sh
npm install github-url-to-object --save
```

For bower usage:

```sh
bower install github-url-to-object
```

## Usage

Use whatever flavor of GitHub URL you like:

```js
var gh = require('github-url-to-object')

gh('github:monkey/business')
gh('https://github.com/monkey/business')
gh('https://github.com/monkey/business/tree/master')
gh('https://github.com/monkey/business/tree/master/nested/file.js')
gh('https://github.com/monkey/business.git')
gh('http://github.com/monkey/business')
gh('git://github.com/monkey/business.git')
gh('git+https://github.com/monkey/business.git')
```

Here's what you'll get:

```js
{
  user: 'monkey',
  repo: 'business',
  branch: 'master',
  tarball_url: 'https://api.github.com/repos/monkey/business/tarball/master',
  clone_url: 'https://github.com/monkey/business',
  https_url: 'https://github.com/monkey/business',
  travis_url: 'https://travis-ci.org/monkey/business',
  api_url: 'https://api.github.com/repos/monkey/business'
  zip_url: 'https://github.com/monkey/business/archive/master.zip'
}
```

The shorthand form lets you specify a branch:

```js
  gh('github:monkey/business#nachos')
{
  user: 'monkey',
  repo: 'business',
  branch: 'nachos',
  https_url: 'https://github.com/monkey/business/blob/nachos',
  tarball_url: 'https://api.github.com/repos/monkey/business/tarball/nachos',
  clone_url: 'https://github.com/monkey/business',
  travis_url: 'https://travis-ci.org/monkey/business?branch=nachos',
  api_url: 'https://api.github.com/repos/monkey/business'
  zip_url: 'https://github.com/monkey/business/archive/nachos.zip'
}
```

If you provide a non-GitHub URL or a falsey value, you'll get `null`.

### GitHub Enterprise

If you're using GitHub Enterprise, pass the `enterprise` option to allow
your non-`github.com` URL to be parsed:

```js
gh('https://ghe.example.com:heroku/heroku-flags.git', {enterprise: true})
```

## Test

```sh
npm install
npm test
```

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

## License

MIT
