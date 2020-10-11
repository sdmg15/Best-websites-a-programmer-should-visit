# rmfr

[![npm version](https://img.shields.io/npm/v/rmfr.svg)](https://www.npmjs.com/package/rmfr)
[![Build Status](https://travis-ci.org/shinnn/rmfr.svg?branch=master)](https://travis-ci.org/shinnn/rmfr)
[![Build status](https://ci.appveyor.com/api/projects/status/afcmk50xuig9jfs7/branch/master?svg=true)](https://ci.appveyor.com/project/ShinnosukeWatanabe/rmfr/branch/master)
[![Coverage Status](https://coveralls.io/repos/github/shinnn/rmfr/badge.svg?branch=master)](https://coveralls.io/github/shinnn/rmfr?branch=master)

[Node.js](https://nodejs.org/) implementation of `rm -fr` – recursive removal of files and directories

```javascript
const rmfr = require('rmfr');

(async () => await rmfr('path/to/target'))();
```

## Installation

[Use](https://docs.npmjs.com/cli/install) [npm](https://docs.npmjs.com/getting-started/what-is-npm).

```
npm install rmfr
```

## API

```javascript
const rmfr = require('rmfr');
```

### rmfr(*path* [, *options*])

*path*: `string` (a file/directory path)  
*options*: `Object`  
Return: `Promise`

When it finish removing a target, it will be [*fulfilled*](https://promisesaplus.com/#point-26) with no arguments.

When it fails to remove a target, it will be [*rejected*](https://promisesaplus.com/#point-30) with an error as its first argument.

#### Options

All [`rimraf`](https://github.com/isaacs/rimraf) [options](https://github.com/isaacs/rimraf#options) except for `disableGlob` are available, with some differences:

* `glob` option defaults to `false`.
  * If you want to specify targets using glob pattern, set `glob` option `true` or provide a [`node-glob` options object](https://github.com/isaacs/node-glob#options).
* `unlink`, `chmod`, `rmdir` and `readdir` options default to the corresponding [`graceful-fs`](https://github.com/isaacs/node-graceful-fs) methods.

```javascript
const rmfr = require('rmfr');

rmfr('inde*.js'); // doesn't remove `./index.js`
rmfr('inde*.js', {glob: true}); // removes `./index.js`
```

## License

[ISC License](./LICENSE) © 2017 - 2018 Shinnosuke Watanabe
