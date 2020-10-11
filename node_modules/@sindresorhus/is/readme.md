# is [![Build Status](https://travis-ci.org/sindresorhus/is.svg?branch=master)](https://travis-ci.org/sindresorhus/is)

> Type check values: `is.string('🦄') //=> true`

<img src="header.gif" width="182" align="right">


## Install

```
$ npm install @sindresorhus/is
```


## Usage

```js
const is = require('@sindresorhus/is');

is('🦄');
//=> 'string'

is(new Map());
//=> 'Map'

is.number(6);
//=> true
```

When using `is` together with TypeScript, [type guards](http://www.typescriptlang.org/docs/handbook/advanced-types.html#type-guards-and-differentiating-types) are being used to infer the correct type inside if-else statements.

```ts
import is from '@sindresorhus/is';

const padLeft = (value: string, padding: string | number) => {
	if (is.number(padding)) {
		// `padding` is typed as `number`
		return Array(padding + 1).join(' ') + value;
	}

	if (is.string(padding)) {
		// `padding` is typed as `string`
		return padding + value;
	}

	throw new TypeError(`Expected 'padding' to be of type 'string' or 'number', got '${is(padding)}'.`);
}

padLeft('🦄', 3);
//=> '   🦄'

padLeft('🦄', '🌈');
//=> '🌈🦄'
```


## API

### is(value)

Returns the type of `value`.

Primitives are lowercase and object types are camelcase.

Example:

- `'undefined'`
- `'null'`
- `'string'`
- `'symbol'`
- `'Array'`
- `'Function'`
- `'Object'`

Note: It will throw an error if you try to feed it object-wrapped primitives, as that's a bad practice. For example `new String('foo')`.

### is.{method}

All the below methods accept a value and returns a boolean for whether the value is of the desired type.

#### Primitives

##### .undefined(value)
##### .null(value)
##### .string(value)
##### .number(value)
##### .boolean(value)
##### .symbol(value)

#### Built-in types

##### .array(value)
##### .function(value)
##### .buffer(value)
##### .object(value)

Keep in mind that [functions are objects too](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions).

##### .numericString(value)

Returns `true` for a string that represents a number. For example, `'42'` and `'-8'`.

Note: `'NaN'` returns `false`, but `'Infinity'` and `'-Infinity'` return `true`.

##### .regExp(value)
##### .date(value)
##### .error(value)
##### .nativePromise(value)
##### .promise(value)

Returns `true` for any object with a `.then()` and `.catch()` method. Prefer this one over `.nativePromise()` as you usually want to allow userland promise implementations too.

##### .generator(value)

Returns `true` for any object that implements its own `.next()` and `.throw()` methods and has a function definition for `Symbol.iterator`.

##### .generatorFunction(value)

##### .asyncFunction(value)

Returns `true` for any `async` function that can be called with the `await` operator.

```js
is.asyncFunction(async () => {});
// => true

is.asyncFunction(() => {});
// => false
```

##### .boundFunction(value)

Returns `true` for any `bound` function.

```js
is.boundFunction(() => {});
// => true

is.boundFunction(function () {}.bind(null));
// => true

is.boundFunction(function () {});
// => false
```

##### .map(value)
##### .set(value)
##### .weakMap(value)
##### .weakSet(value)

#### Typed arrays

##### .int8Array(value)
##### .uint8Array(value)
##### .uint8ClampedArray(value)
##### .int16Array(value)
##### .uint16Array(value)
##### .int32Array(value)
##### .uint32Array(value)
##### .float32Array(value)
##### .float64Array(value)

#### Structured data

##### .arrayBuffer(value)
##### .sharedArrayBuffer(value)
##### .dataView(value)

#### Emptiness

##### .emptyString(value)

Returns `true` if the value is a `string` and the `.length` is 0.

##### .nonEmptyString(value)

Returns `true` if the value is a `string` and the `.length` is more than 0.

##### .emptyStringOrWhitespace(value)

Returns `true` if `is.emptyString(value)` or if it's a `string` that is all whitespace.

##### .emptyArray(value)

Returns `true` if the value is an `Array` and the `.length` is 0.

##### .nonEmptyArray(value)

Returns `true` if the value is an `Array` and the `.length` is more than 0.

##### .emptyObject(value)

Returns `true` if the value is an `Object` and `Object.keys(value).length` is 0.

Please note that `Object.keys` returns only own enumerable properties. Hence something like this can happen:

```js
const object1 = {};

Object.defineProperty(object1, 'property1', {
	value: 42,
	writable: true,
	enumerable: false,
	configurable: true
});

is.emptyObject(object1);
// => true
```

##### .nonEmptyObject(value)

Returns `true` if the value is an `Object` and `Object.keys(value).length` is more than 0.

##### .emptySet(value)

Returns `true` if the value is a `Set` and the `.size` is 0.

##### .nonEmptySet(Value)

Returns `true` if the value is a `Set` and the `.size` is more than 0.

##### .emptyMap(value)

Returns `true` if the value is a `Map` and the `.size` is 0.

##### .nonEmptyMap(value)

Returns `true` if the value is a `Map` and the `.size` is more than 0.

#### Miscellaneous

##### .directInstanceOf(value, class)

Returns `true` if `value` is a direct instance of `class`.

```js
is.directInstanceOf(new Error(), Error);
//=> true

class UnicornError extends Error {}

is.directInstanceOf(new UnicornError(), Error);
//=> false
```

##### .urlInstance(value)

Returns `true` if `value` is an instance of the [`URL` class](https://developer.mozilla.org/en-US/docs/Web/API/URL).

```js
const url = new URL('https://example.com');

is.urlInstance(url);
//=> true
```

### .url(value)

Returns `true` if `value` is a URL string.

Note: this only does basic checking using the [`URL` class](https://developer.mozilla.org/en-US/docs/Web/API/URL) constructor.

```js
const url = 'https://example.com';

is.url(url);
//=> true

is.url(new URL(url));
//=> false
```

##### .truthy(value)

Returns `true` for all values that evaluate to true in a boolean context:

```js
is.truthy('🦄');
//=> true

is.truthy(undefined);
//=> false
```

##### .falsy(value)

Returns `true` if `value` is one of: `false`, `0`, `''`, `null`, `undefined`, `NaN`.

##### .nan(value)
##### .nullOrUndefined(value)
##### .primitive(value)

JavaScript primitives are as follows: `null`, `undefined`, `string`, `number`, `boolean`, `symbol`.

##### .integer(value)

##### .safeInteger(value)

Returns `true` if `value` is a [safe integer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger).

##### .plainObject(value)

An object is plain if it's created by either `{}`, `new Object()`, or `Object.create(null)`.

##### .iterable(value)
##### .asyncIterable(value)
##### .class(value)

Returns `true` for instances created by a class.

##### .typedArray(value)

##### .arrayLike(value)

A `value` is array-like if it is not a function and has a `value.length` that is a safe integer greater than or equal to 0.

```js
is.arrayLike(document.forms);
//=> true

function foo() {
	is.arrayLike(arguments);
	//=> true
}
foo();
```

##### .inRange(value, range)

Check if `value` (number) is in the given `range`. The range is an array of two values, lower bound and upper bound, in no specific order.

```js
is.inRange(3, [0, 5]);
is.inRange(3, [5, 0]);
is.inRange(0, [-2, 2]);
```

##### .inRange(value, upperBound)

Check if `value` (number) is in the range of `0` to `upperBound`.

```js
is.inRange(3, 10);
```

##### .domElement(value)

Returns `true` if `value` is a DOM Element.

##### .nodeStream(value)

Returns `true` if `value` is a Node.js [stream](https://nodejs.org/api/stream.html).

```js
const fs = require('fs');

is.nodeStream(fs.createReadStream('unicorn.png'));
//=> true
```

##### .observable(value)

Returns `true` if `value` is an `Observable`.

```js
const {Observable} = require('rxjs');

is.observable(new Observable());
//=> true
```

##### .infinite(value)

Check if `value` is `Infinity` or `-Infinity`.

##### .even(value)

Returns `true` if `value` is an even integer.

##### .odd(value)

Returns `true` if `value` is an odd integer.

##### .any(predicate, ...values)

Returns `true` if **any** of the input `values` returns true in the `predicate`:

```js
is.any(is.string, {}, true, '🦄');
//=> true

is.any(is.boolean, 'unicorns', [], new Map());
//=> false
```

##### .all(predicate, ...values)

Returns `true` if **all** of the input `values` returns true in the `predicate`:

```js
is.all(is.object, {}, new Map(), new Set());
//=> true

is.all(is.string, '🦄', [], 'unicorns');
//=> false
```


## FAQ

### Why yet another type checking module?

There are hundreds of type checking modules on npm, unfortunately, I couldn't find any that fit my needs:

- Includes both type methods and ability to get the type
- Types of primitives returned as lowercase and object types as camelcase
- Covers all built-ins
- Unsurprising behavior
- Well-maintained
- Comprehensive test suite

For the ones I found, pick 3 of these.

The most common mistakes I noticed in these modules was using `instanceof` for type checking, forgetting that functions are objects, and omitting `symbol` as a primitive.


## Related

- [ow](https://github.com/sindresorhus/ow) - Function argument validation for humans
- [is-stream](https://github.com/sindresorhus/is-stream) - Check if something is a Node.js stream
- [is-observable](https://github.com/sindresorhus/is-observable) - Check if a value is an Observable
- [file-type](https://github.com/sindresorhus/file-type) - Detect the file type of a Buffer/Uint8Array
- [is-ip](https://github.com/sindresorhus/is-ip) - Check if a string is an IP address
- [is-array-sorted](https://github.com/sindresorhus/is-array-sorted) - Check if an Array is sorted
- [is-error-constructor](https://github.com/sindresorhus/is-error-constructor) - Check if a value is an error constructor
- [is-empty-iterable](https://github.com/sindresorhus/is-empty-iterable) - Check if an Iterable is empty
- [is-blob](https://github.com/sindresorhus/is-blob) - Check if a value is a Blob - File-like object of immutable, raw data
- [has-emoji](https://github.com/sindresorhus/has-emoji) - Check whether a string has any emoji


## Created by

- [Sindre Sorhus](https://github.com/sindresorhus)
- [Giora Guttsait](https://github.com/gioragutt)
- [Brandon Smith](https://github.com/brandon93s)


## License

MIT
