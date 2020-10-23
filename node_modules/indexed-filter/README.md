# indexed-filter

[![npm version](https://img.shields.io/npm/v/indexed-filter.svg)](https://www.npmjs.com/package/indexed-filter)
[![Build Status](https://travis-ci.org/shinnn/indexed-filter.svg?branch=master)](https://travis-ci.org/shinnn/indexed-filter)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/indexed-filter.svg)](https://coveralls.io/github/shinnn/indexed-filter)

[`Array#filter()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) with also appending indexes of filtered values to the result

```javascript
const arr = [1, 'foo', 2, 'bar'];

arr.filter(v => typeof v === 'string');
//=> ['foo', 'bar']

indexedFilter(arr, v => typeof v === 'string');
//=> [{index: 1, value: 'foo'}, {index: 3, value: 'bar'}]
```

## Installation

[Use](https://docs.npmjs.com/cli/install) [npm](https://docs.npmjs.com/getting-started/what-is-npm).

```
npm install indexed-filter
```

## API

```javascript
import indexedFilter from 'indexed-filter';
```

### indexedFilter(*array*, *filterFn* [, *thisObject*])

*array*: `Array`  
*filterFn*: `Function`  
*thisObject*: (any value)  
Return: `Array`

The API is very similar to [`Array.prototype.filter()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/filter). There are only two differences:

* You pass in the array as the first argument instead of calling the `.filter()` method on the array instance.
* Each filtered result is an object with tow properties, `index` (array index integer) and `value` (array element).

```javascript
indexedFilter([0, [1], [2], '3', [5]], function(val, index, arr) {
  return this.isArray(val) && index % 2 === 0 && index < arr.length * 0.5;
}, Array);
//=> [{index: 2, value: [2]}]
```

## License

[ISC License](./LICENSE) © 2018 Shinnosuke Watanabe
