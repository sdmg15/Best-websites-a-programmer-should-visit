# inspect-with-kind

[![npm version](https://img.shields.io/npm/v/inspect-with-kind.svg)](https://www.npmjs.com/package/inspect-with-kind)
[![Build Status](https://travis-ci.org/shinnn/inspect-with-kind.svg?branch=master)](https://travis-ci.org/shinnn/inspect-with-kind)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/inspect-with-kind.svg)](https://coveralls.io/github/shinnn/inspect-with-kind?branch=master)

[`util.inspect`][util.inspect] with additional type information

```javascript
const {inspect} = require('util');
const inspectWithKind = require('inspect-with-kind');

inspect([1, 2, 3]); //=> '[ 1, 2, 3 ]'
inspectWithKind([1, 2, 3]); //=> '[ 1, 2, 3 ] (array)'
```

## Installation

[Use npm.](https://docs.npmjs.com/cli/install)

```
npm install inspect-with-kind
```

## API

```javascript
const inspectWithKind = require('inspect-with-kind');
```

### inspectWithKind(*value* [, *options*])

*value*: any type  
*options*: `Object` ([`util.inspect`][util.inspect] options)  
Return: `string`

Almost the same as `util.inspect`, but:

* It appends a type information to the string if the first argument is one of `boolean`, `string`, `number`, `bigint`, `Array`, `RegExp`, `Date`, `arguments` or a plain `Object`.
* Error stack trace is omitted.
* `breakLength` option defaults to `Infinity`.
* `maxArrayLength` option defaults to `10`.

```javascript
const util = require('util');
const inspectWithKind = require('inspect-with-kind');

// appends type info
util.inspect(1); //=> '1'
inspectWithKind(1); //=> '1 (number)'
util.inspect('1'); //=> '\'1\''
inspectWithKind('1'); //=> '\'1\' (string)'

// doesn't appends type info, because <Buffer ...> clearly expresses what it is
util.inspect(Buffer.from('1')); //=> '<Buffer 31>'
inspectWithKind(Buffer.from('1')); //=> '<Buffer 31>'

// omits stack trace
util.inspect(new Error('error!')); //=> 'Error: error!\n    at repl:1:14\n    at ContextifyScript ...'
inspectWithKind(new Error('error!')); //=> 'Error: error!'
```

## Example

This module is useful for making `TypeError` error messages in your Node.js library.

```javascript
const inspectWithKind = require('inspect-with-kind');

module.exports = function reverse(v) {
  if (typeof v !== 'boolean') {
    throw new TypeError(`Expected a Boolean value, but got ${inspectWithKind(v)}.`);
  }

  return !v;
};
```

```javascript
const reverse = require('./reverse.js');

reverse(/true/); // TypeError: Expected a Boolean value, but got /true/ (regexp).
```

## License

[ISC License](./LICENSE) © 2017 Shinnosuke Watanabe

[util.inspect]: https://nodejs.org/api/util.html#util_util_inspect_object_options
