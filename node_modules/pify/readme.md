# pify [![Build Status](https://travis-ci.org/sindresorhus/pify.svg?branch=master)](https://travis-ci.org/sindresorhus/pify)

> Promisify a callback-style function

## Install

```
$ npm install pify
```

## Usage

```js
const fs = require('fs');
const pify = require('pify');

(async () => {
	// Promisify a single function.
	const data = await pify(fs.readFile)('package.json', 'utf8');
	console.log(JSON.parse(data).name);
	//=> 'pify'

	// Promisify all methods in a module.
	const data2 = await pify(fs).readFile('package.json', 'utf8');
	console.log(JSON.parse(data2).name);
	//=> 'pify'
})();
```

## API

### pify(input, options?)

Returns a `Promise` wrapped version of the supplied function or module.

#### input

Type: `Function | object`

Callback-style function or module whose methods you want to promisify.

#### options

Type: `object`

##### multiArgs

Type: `boolean`\
Default: `false`

By default, the promisified function will only return the second argument from the callback, which works fine for most APIs. This option can be useful for modules like `request` that return multiple arguments. Turning this on will make it return an array of all arguments from the callback, excluding the error argument, instead of just the second argument. This also applies to rejections, where it returns an array of all the callback arguments, including the error.

```js
const request = require('request');
const pify = require('pify');

const pRequest = pify(request, {multiArgs: true});

(async () => {
	const [httpResponse, body] = await pRequest('https://sindresorhus.com');
})();
```

##### include

Type: `Array<string | RegExp>`

Methods in a module to promisify. Remaining methods will be left untouched.

##### exclude

Type: `Array<string | RegExp>`\
Default: `[/.+(?:Sync|Stream)$/]`

Methods in a module **not** to promisify. Methods with names ending with `'Sync'` are excluded by default.

##### excludeMain

Type: `boolean`\
Default: `false`

If the given module is a function itself, it will be promisified. Enable this option if you want to promisify only methods of the module.

```js
const pify = require('pify');

function fn() {
	return true;
}

fn.method = (data, callback) => {
	setImmediate(() => {
		callback(null, data);
	});
};

(async () => {
	// Promisify methods but not `fn()`.
	const promiseFn = pify(fn, {excludeMain: true});

	if (promiseFn()) {
		console.log(await promiseFn.method('hi'));
	}
})();
```

##### errorFirst

Type: `boolean`\
Default: `true`

Whether the callback has an error as the first argument. You'll want to set this to `false` if you're dealing with an API that doesn't have an error as the first argument, like `fs.exists()`, some browser APIs, Chrome Extension APIs, etc.

##### promiseModule

Type: `Function`

Custom promise module to use instead of the native one.

## FAQ

#### How is this different from Node.js's [`util.promisify`](https://nodejs.org/api/util.html#util_util_promisify_original)?

- Pify existed long before `util.promisify`.
- Pify is [faster](https://github.com/sindresorhus/pify/issues/41#issuecomment-429988506).
- Pify supports wrapping a whole module/object, not just a specific method.
- Pify has useful options like the ability to handle multiple arguments (`multiArgs`).
- Pify does not have [magic behavior](https://nodejs.org/api/util.html#util_custom_promisified_functions) for certain Node.js methods and instead focuses on predictability.

## Related

- [p-event](https://github.com/sindresorhus/p-event) - Promisify an event by waiting for it to be emitted
- [p-map](https://github.com/sindresorhus/p-map) - Map over promises concurrently
- [More…](https://github.com/sindresorhus/promise-fun)

---

<div align="center">
	<b>
		<a href="https://tidelift.com/subscription/pkg/npm-pify?utm_source=npm-pify&utm_medium=referral&utm_campaign=readme">Get professional support for 'pify' with a Tidelift subscription</a>
	</b>
	<br>
	<sub>
		Tidelift helps make open source sustainable for maintainers while giving companies<br>assurances about security, maintenance, and licensing for their dependencies.
	</sub>
</div>
