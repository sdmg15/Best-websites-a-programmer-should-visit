# glob-option-error

[![NPM version](https://img.shields.io/npm/v/glob-option-error.svg)](https://www.npmjs.com/package/glob-option-error)
[![Build Status](https://travis-ci.org/shinnn/glob-option-error.svg?branch=master)](https://travis-ci.org/shinnn/glob-option-error)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/glob-option-error.svg)](https://coveralls.io/r/shinnn/glob-option-error)

Create an error from the result of [validate-glob-opts](https://github.com/shinnn/validate-glob-opts)

```javascript
const GlobOptionError = require('glob-option-error');
const validateGlobOpts = require('validate-glob-opts');

new GlobOptionError(validateGlobOpts({
  sync: true,
  mark: '/',
  caches: {}
}));
/* => Error: 3 errors found in the glob options:
  1. `sync` option is deprecated and there’s no need to pass any values to that option, but true was provided.
  2. node-glob expected `mark` option to be a Boolean value, but got '/'.
  3. node-glob doesn't have `caches` option. Probably you meant `cache`.
    at new GlobOptionError (/Users/me/exmaple/node_modules/glob-option-error/index.js:33:17)
    at Object.<anonymous> (/Users/me/exmaple/app.js:2:13)
    at Module._compile (module.js:571:32)
    at Object.Module._extensions..js (module.js:580:10)
    ...
*/
```

## Installation

[Use npm.](https://docs.npmjs.com/cli/install)

```
npm install glob-option-error
```

## API

```javascript
const GlobOptionError = require('glob-option-error');
```

### GlobOptionError(*array*)

*array*: `Array<error>` (return value of [validate-glob-opts](https://github.com/shinnn/validate-glob-opts#api))  
Return: `Error` with an [iterator](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Iteration_protocols) that returns the individual errors one by one

```javascript
const GlobOptionError = require('glob-option-error');
const validateGlobOpts = require('validate-glob-opts');

const results = validateGlobOpts({
  root: Buffer.from('Hi'),
  nodir: NaN,
  ignore: ['path1', 1]
});
/*=> [
  TypeError: node-glob expected `root` option to be a directory path (string), but got <Buffer 48 69>.,
  TypeError: node-glob expected `nodir` option to be a Boolean value, but got NaN.,
  TypeError: Expected every value in the `ignore` option to be a string, but the array includes a non-string value 1.
] */

const error = new GlobOptionError(results); //=> TypeError: 3 errors found in the glob options: ...

for (const {message} of error) {
  console.log(message);
  // node-glob expected `root` option to be a directory path (string), but got <Buffer 48 69>.
  // node-glob expected `nodir` option to be a Boolean value, but got NaN.
  // Expected every value in the `ignore` option to be a string, but the array includes a non-string value 1.
}
```

The argument must include at least one element.

```javascript
new GlobOptionError([]);
// throws a RangeError: Expected an array with at least one error, but got [] (empty array).
```

## License

Copyright (c) 2017 [Shinnosuke Watanabe](https://github.com/shinnn)

Licensed under [the MIT License](./LICENSE).
