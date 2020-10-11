# assert-valid-glob-opts

[![NPM version](https://img.shields.io/npm/v/assert-valid-glob-opts.svg)](https://www.npmjs.com/package/assert-valid-glob-opts)
[![Build Status](https://travis-ci.org/shinnn/assert-valid-glob-opts.svg?branch=master)](https://travis-ci.org/shinnn/assert-valid-glob-opts)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/assert-valid-glob-opts.svg)](https://coveralls.io/r/shinnn/assert-valid-glob-opts)

Assert a given object is a valid [node-glob](https://github.com/isaacs/node-glob) option

```javascript
assertValidGlobOpts({
  sync: true,
  ignore: /node_modules/
});
```

```
TypeError: 2 errors found in the glob options:
  1. `sync` option is deprecated and there’s no need to pass any values to that option, but true was provided.
  2. node-glob expected `ignore` option to be an array or string, but got /node_modules/.
    at assertValidGlobOpts (/Users/shinnn/example/index.js:29:9)
    at Object.<anonymous> (/Users/shinnn/example/app.js:2:1)
    at Module._compile (module.js:571:32)
    at Object.Module._extensions..js (module.js:580:10)
    at Module.load (module.js:488:32)
    at tryModuleLoad (module.js:447:12)
    at Function.Module._load (module.js:439:3)
    at Module.runMain (module.js:605:10)
    at run (bootstrap_node.js:420:7)
    at startup (bootstrap_node.js:139:9)
```

## Installation

[Use npm.](https://docs.npmjs.com/cli/install)

```
npm install assert-valid-glob-opts
```

## API

```javascript
const assertValidGlobOpts = require('assert-valid-glob-opts');
```

### assertValidGlobOpts(*obj* [, *customValidations*])

*obj*: `Object` ([`glob` options](https://github.com/isaacs/node-glob#options))  
*customValidations*: `Array<Function>` (passed to [`validate-glob-opts`](https://github.com/shinnn/validate-glob-opts#validategloboptsobj--customvalidations))

It validates a given object with [validate-glob-opts](https://github.com/shinnn/validate-glob-opts) and throws an error if the value is not valid.

```javascript
const assertValidGlobOpts = require('assert-valid-glob-opts');

const ok = {
  mark: true,
  matchBase: false
};

assertValidGlobOpts(ok); // doesn't throw

const notOk = {
  mark: 'true',
  matchbase: false
};

assertValidGlobOpts(notOk); // throws an error
```

## License

[Creative Commons Zero v1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/deed)
