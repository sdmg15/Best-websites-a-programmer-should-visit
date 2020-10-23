# append-type

[![npm version](https://img.shields.io/npm/v/append-type.svg)](https://www.npmjs.com/package/append-type)
[![Build Status](https://travis-ci.com/shinnn/append-type.svg?branch=master)](https://travis-ci.com/shinnn/append-type)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/append-type.svg)](https://coveralls.io/r/shinnn/append-type)

Stringify the value with appending its [type](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/typeof): `10` → `'10 (number)'`

```javascript
import appendType from 'append-type';

appendType('123'); //=> '123 (string)'
appendType(123); //=> '123 (number)'
```

## Installation

[Use](https://docs.npmjs.com/cli/install) [npm](https://docs.npmjs.com/about-npm/).

```
npm install append-type
```

## API

```javascript
import appendType from 'append-type';
```

### appendType(*value*)

*value*: any type  
Return: `string`

Essentially, it returns `String(value) + ' (' + typeof value + ')'`.

```javascript
appendType(() => {}); //=> '() => {} (function)'
```

When it takes `null` / `undefined`, it returns `'null'` / `'undefined'`.

```javascript
appendType(null); //=> 'null'
appendType(undefined); //=> 'undefined'
```

## Example

This module is useful for making `TypeError` error messages.

```javascript
function reverse(v) {
  if (typeof v !== 'boolean') {
    throw new TypeError(`Expected a Boolean value, but got ${appendType(v)}.`);
  }

  return !v;
};

reverse(1); //=> TypeError: Expected a Boolean value, but got 1 (number).
```

## License

[MIT No Attribution](./LICENSE) © 2019 Shinnosuke Watanabe
