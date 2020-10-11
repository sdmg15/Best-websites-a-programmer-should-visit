<div align="center">
	<br>
	<br>
	<img width="360" src="media/logo.svg" alt="Got">
	<br>
	<br>
	<br>
	<p align="center">Huge thanks to <a href="https://moxy.studio"><img src="https://sindresorhus.com/assets/thanks/moxy-logo.svg" width="150"></a> for sponsoring me!
	</p>
	<br>
	<br>
</div>

> Simplified HTTP requests

[![Build Status: Linux](https://travis-ci.org/sindresorhus/got.svg?branch=master)](https://travis-ci.org/sindresorhus/got) [![Coverage Status](https://coveralls.io/repos/github/sindresorhus/got/badge.svg?branch=master)](https://coveralls.io/github/sindresorhus/got?branch=master) [![Downloads](https://img.shields.io/npm/dm/got.svg)](https://npmjs.com/got) [![Install size](https://packagephobia.now.sh/badge?p=got)](https://packagephobia.now.sh/result?p=got)

Got is a human-friendly and powerful HTTP request library.

It was created because the popular [`request`](https://github.com/request/request) package is bloated: [![Install size](https://packagephobia.now.sh/badge?p=request)](https://packagephobia.now.sh/result?p=request)

Got is for Node.js. For browsers, we recommend [Ky](https://github.com/sindresorhus/ky).


## Highlights

- [Promise & stream API](#api)
- [Request cancelation](#aborting-the-request)
- [RFC compliant caching](#cache-adapters)
- [Follows redirects](#followredirect)
- [Retries on failure](#retry)
- [Progress events](#onuploadprogress-progress)
- [Handles gzip/deflate](#decompress)
- [Timeout handling](#timeout)
- [Errors with metadata](#errors)
- [JSON mode](#json)
- [WHATWG URL support](#url)
- [Hooks](#hooks)
- [Instances with custom defaults](#instances)
- [Composable](advanced-creation.md#merging-instances)
- [Electron support](#useelectronnet)
- [Used by ~2000 packages and ~500K repos](https://github.com/sindresorhus/got/network/dependents)
- Actively maintained

[Moving from Request?](migration-guides.md)

[See how Got compares to other HTTP libraries](#comparison)

## Install

```
$ npm install got
```

<a href="https://www.patreon.com/sindresorhus">
	<img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" width="160">
</a>


## Usage

```js
const got = require('got');

(async () => {
	try {
		const response = await got('sindresorhus.com');
		console.log(response.body);
		//=> '<!doctype html> ...'
	} catch (error) {
		console.log(error.response.body);
		//=> 'Internal server error ...'
	}
})();
```

###### Streams

```js
const fs = require('fs');
const got = require('got');

got.stream('sindresorhus.com').pipe(fs.createWriteStream('index.html'));

// For POST, PUT, and PATCH methods `got.stream` returns a `stream.Writable`
fs.createReadStream('index.html').pipe(got.stream.post('sindresorhus.com'));
```


### API

It's a `GET` request by default, but can be changed by using different methods or in the `options`.

#### got(url, [options])

Returns a Promise for a [`response` object](#response) or a [stream](#streams-1) if `options.stream` is set to true.

##### url

Type: `string` `Object`

The URL to request, as a string, a [`https.request` options object](https://nodejs.org/api/https.html#https_https_request_options_callback), or a [WHATWG `URL`](https://nodejs.org/api/url.html#url_class_url).

Properties from `options` will override properties in the parsed `url`.

If no protocol is specified, it will default to `https`.

##### options

Type: `Object`

Any of the [`https.request`](https://nodejs.org/api/https.html#https_https_request_options_callback) options.

###### baseUrl

Type: `string` `Object`

When specified, `url` will be prepended by `baseUrl`.<br>
If you specify an absolute URL, it will skip the `baseUrl`.

Very useful when used with `got.extend()` to create niche-specific Got instances.

Can be a string or a [WHATWG `URL`](https://nodejs.org/api/url.html#url_class_url).

Slash at the end of `baseUrl` and at the beginning of the `url` argument is optional:

```js
await got('hello', {baseUrl: 'https://example.com/v1'});
//=> 'https://example.com/v1/hello'

await got('/hello', {baseUrl: 'https://example.com/v1/'});
//=> 'https://example.com/v1/hello'

await got('/hello', {baseUrl: 'https://example.com/v1'});
//=> 'https://example.com/v1/hello'
```

###### headers

Type: `Object`<br>
Default: `{}`

Request headers.

Existing headers will be overwritten. Headers set to `null` will be omitted.

###### stream

Type: `boolean`<br>
Default: `false`

Returns a `Stream` instead of a `Promise`. This is equivalent to calling `got.stream(url, [options])`.

###### body

Type: `string` `Buffer` `stream.Readable` [`form-data` instance](https://github.com/form-data/form-data)

**Note:** If you provide this option, `got.stream()` will be read-only.

The body that will be sent with a `POST` request.

If present in `options` and `options.method` is not set, `options.method` will be set to `POST`.

The `content-length` header will be automatically set if `body` is a `string` / `Buffer` / `fs.createReadStream` instance / [`form-data` instance](https://github.com/form-data/form-data), and `content-length` and `transfer-encoding` are not manually set in `options.headers`.

###### cookieJar

Type: [`tough.CookieJar` instance](https://github.com/salesforce/tough-cookie#cookiejar)

**Note:** If you provide this option, `options.headers.cookie` will be overridden.

Cookie support. You don't have to care about parsing or how to store them. [Example.](#cookies)

###### encoding

Type: `string` `null`<br>
Default: `'utf8'`

[Encoding](https://nodejs.org/api/buffer.html#buffer_buffers_and_character_encodings) to be used on `setEncoding` of the response data. If `null`, the body is returned as a [`Buffer`](https://nodejs.org/api/buffer.html) (binary data).

###### form

Type: `boolean`<br>
Default: `false`

**Note:** If you provide this option, `got.stream()` will be read-only.
**Note:** `body` must be a plain object. It will be converted to a query string using [`(new URLSearchParams(object)).toString()`](https://nodejs.org/api/url.html#url_constructor_new_urlsearchparams_obj).

If set to `true` and `Content-Type` header is not set, it will be set to `application/x-www-form-urlencoded`.

###### json

Type: `boolean`<br>
Default: `false`

**Note:** If you use `got.stream()`, this option will be ignored.
**Note:** `body` must be a plain object or array and will be stringified.

If set to `true` and `Content-Type` header is not set, it will be set to `application/json`.

Parse response body with `JSON.parse` and set `accept` header to `application/json`. If used in conjunction with the `form` option, the `body` will the stringified as querystring and the response parsed as JSON.

###### query

Type: `string` `Object<string, string|number>` [`URLSearchParams`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)

Query string that will be added to the request URL. This will override the query string in `url`.

If you need to pass in an array, you can do it using a `URLSearchParams` instance:

```js
const got = require('got');

const query = new URLSearchParams([['key', 'a'], ['key', 'b']]);

got('https://example.com', {query});

console.log(query.toString());
//=> 'key=a&key=b'
```

And if you need a different array format, you could use the [`query-string`](https://github.com/sindresorhus/query-string) package:

```js
const got = require('got');
const queryString = require('query-string');

const query = queryString.stringify({key: ['a', 'b']}, {arrayFormat: 'bracket'});

got('https://example.com', {query});

console.log(query);
//=> 'key[]=a&key[]=b'
```

###### timeout

Type: `number` `Object`

Milliseconds to wait for the server to end the response before aborting the request with [`got.TimeoutError`](#gottimeouterror) error (a.k.a. `request` property). By default, there's no timeout.

This also accepts an `object` with the following fields to constrain the duration of each phase of the request lifecycle:

- `lookup` starts when a socket is assigned and ends when the hostname has been resolved. Does not apply when using a Unix domain socket.
- `connect` starts when `lookup` completes (or when the socket is assigned if lookup does not apply to the request) and ends when the socket is connected.
- `secureConnect` starts when `connect` completes and ends when the handshaking process completes (HTTPS only).
- `socket` starts when the socket is connected. See [request.setTimeout](https://nodejs.org/api/http.html#http_request_settimeout_timeout_callback).
- `response` starts when the request has been written to the socket and ends when the response headers are received.
- `send` starts when the socket is connected and ends with the request has been written to the socket.
- `request` starts when the request is initiated and ends when the response's end event fires.

###### retry

Type: `number` `Object`<br>
Default:
- retries: `2`
- methods: `GET` `PUT` `HEAD` `DELETE` `OPTIONS` `TRACE`
- statusCodes: [`408`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/408) [`413`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/413) [`429`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429) [`500`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500) [`502`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/502) [`503`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/503) [`504`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/504)
- maxRetryAfter: `undefined`
- errorCodes: `ETIMEDOUT` `ECONNRESET` `EADDRINUSE` `ECONNREFUSED` `EPIPE` `ENOTFOUND` `ENETUNREACH` `EAI_AGAIN`

An object representing `retries`, `methods`, `statusCodes`, `maxRetryAfter` and `errorCodes` fields for the time until retry, allowed methods, allowed status codes, maximum [`Retry-After`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Retry-After) time and allowed error codes.

If `maxRetryAfter` is set to `undefined`, it will use `options.timeout`.<br>
If [`Retry-After`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Retry-After) header is greater than `maxRetryAfter`, it will cancel the request.

Delays between retries counts with function `1000 * Math.pow(2, retry) + Math.random() * 100`, where `retry` is attempt number (starts from 1).

The `retries` property can be a `number` or a `function` with `retry` and `error` arguments. The function must return a delay in milliseconds (`0` return value cancels retry).

By default, it retries *only* on the specified methods, status codes, and on these network errors:
- `ETIMEDOUT`: One of the [timeout](#timeout) limits were reached.
- `ECONNRESET`: Connection was forcibly closed by a peer.
- `EADDRINUSE`: Could not bind to any free port.
- `ECONNREFUSED`: Connection was refused by the server.
- `EPIPE`: The remote side of the stream being written has been closed.
- `ENOTFOUND`: Couldn't resolve the hostname to an IP address.
- `ENETUNREACH`: No internet connection.
- `EAI_AGAIN`: DNS lookup timed out.

###### followRedirect

Type: `boolean`<br>
Default: `true`

Defines if redirect responses should be followed automatically.

Note that if a `303` is sent by the server in response to any request type (`POST`, `DELETE`, etc.), Got will automatically request the resource pointed to in the location header via `GET`. This is in accordance with [the spec](https://tools.ietf.org/html/rfc7231#section-6.4.4).

###### decompress

Type: `boolean`<br>
Default: `true`

Decompress the response automatically. This will set the `accept-encoding` header to `gzip, deflate` unless you set it yourself.

If this is disabled, a compressed response is returned as a `Buffer`. This may be useful if you want to handle decompression yourself or stream the raw compressed data.

###### cache

Type: `Object`<br>
Default: `false`

[Cache adapter instance](#cache-adapters) for storing cached data.

###### request

Type: `Function`<br>
Default: `http.request` `https.request` *(depending on the protocol)*

Custom request function. The main purpose of this is to [support HTTP2 using a wrapper](#experimental-http2-support).

###### useElectronNet

Type: `boolean`<br>
Default: `false`

When used in Electron, Got will use [`electron.net`](https://electronjs.org/docs/api/net/) instead of the Node.js `http` module. According to the Electron docs, it should be fully compatible, but it's not entirely. See [#443](https://github.com/sindresorhus/got/issues/443) and [#461](https://github.com/sindresorhus/got/issues/461).

###### throwHttpErrors

Type: `boolean`<br>
Default: `true`

Determines if a `got.HTTPError` is thrown for error responses (non-2xx status codes).

If this is disabled, requests that encounter an error status code will be resolved with the `response` instead of throwing. This may be useful if you are checking for resource availability and are expecting error responses.

###### agent

Same as the [`agent` option](https://nodejs.org/api/http.html#http_http_request_url_options_callback) for `http.request`, but with an extra feature:

If you require different agents for different protocols, you can pass a map of agents to the `agent` option. This is necessary because a request to one protocol might redirect to another. In such a scenario, Got will switch over to the right protocol agent for you.

```js
const got = require('got');
const HttpAgent = require('agentkeepalive');
const {HttpsAgent} = HttpAgent;

got('sindresorhus.com', {
	agent: {
		http: new HttpAgent(),
		https: new HttpsAgent()
	}
});
```

###### hooks

Type: `Object<string, Function[]>`

Hooks allow modifications during the request lifecycle. Hook functions may be async and are run serially.

###### hooks.init

Type: `Function[]`<br>
Default: `[]`

Called with plain [request options](#options), right before their normalization. This is especially useful in conjunction with [`got.extend()`](#instances) and [`got.create()`](advanced-creation.md) when the input needs custom handling.

See the [Request migration guide](migration-guides.md#breaking-changes) for an example.

**Note**: This hook must be synchronous!

###### hooks.beforeRequest

Type: `Function[]`<br>
Default: `[]`

Called with [normalized](source/normalize-arguments.js) [request options](#options). Got will make no further changes to the request before it is sent. This is especially useful in conjunction with [`got.extend()`](#instances) and [`got.create()`](advanced-creation.md) when you want to create an API client that, for example, uses HMAC-signing.

See the [AWS section](#aws) for an example.

**Note:** If you modify the `body` you will need to modify the `content-length` header too, because it has already been computed and assigned.

###### hooks.beforeRedirect

Type: `Function[]`<br>
Default: `[]`

Called with [normalized](source/normalize-arguments.js) [request options](#options). Got will make no further changes to the request. This is especially useful when you want to avoid dead sites. Example:

```js
const got = require('got');

got('example.com', {
	hooks: {
		beforeRedirect: [
			options => {
				if (options.hostname === 'deadSite') {
					options.hostname = 'fallbackSite';
				}
			}
		]
	}
});
```

###### hooks.beforeRetry

Type: `Function[]`<br>
Default: `[]`

Called with [normalized](source/normalize-arguments.js) [request options](#options), the error and the retry count. Got will make no further changes to the request. This is especially useful when some extra work is required before the next try. Example:

```js
const got = require('got');

got('example.com', {
	hooks: {
		beforeRetry: [
			(options, error, retryCount) => {
				if (error.statusCode === 413) { // Payload too large
					options.body = getNewBody();
				}
			}
		]
	}
});
```

###### hooks.afterResponse

Type: `Function[]`<br>
Default: `[]`

Called with [response object](#response) and a retry function.

Each function should return the response. This is especially useful when you want to refresh an access token. Example:

```js
const got = require('got');

const instance = got.extend({
	hooks: {
		afterResponse: [
			(response, retryWithMergedOptions) => {
				if (response.statusCode === 401) { // Unauthorized
					const updatedOptions = {
						headers: {
							token: getNewToken() // Refresh the access token
						}
					};

					// Save for further requests
					instance.defaults.options = got.mergeOptions(instance.defaults.options, updatedOptions);

					// Make a new retry
					return retryWithMergedOptions(updatedOptions);
				}

				// No changes otherwise
				return response;
			}
		]
	},
	mutableDefaults: true
});
```

###### hooks.beforeError

Type: `Function[]`<br>
Default: `[]`

Called with an `Error` instance. The error is passed to the hook right before it's thrown. This is especially useful when you want to have more detailed errors.

**Note**: Errors thrown while normalizing input options are thrown directly and not part of this hook.

```js	
const got = require('got');	

got('api.github.com/some-endpoint', {	
	hooks: {	
		onError: [	
			error => {	
				const {response} = error;	
 				if (response && response.body) {	
					error.name = 'GitHubError';	
					error.message = `${response.body.message} (${error.statusCode})`;	
				}

 				return error;	
			}	
		]	
	}	
});	
```

#### Response

The response object will typically be a [Node.js HTTP response stream](https://nodejs.org/api/http.html#http_class_http_incomingmessage), however, if returned from the cache it will be a [response-like object](https://github.com/lukechilds/responselike) which behaves in the same way.

##### request

Type: `Object`

**Note:** This is not a [http.ClientRequest](https://nodejs.org/api/http.html#http_class_http_clientrequest).

- `gotOptions` - The options that were set on this request.

##### body

Type: `string` `Object` *(depending on `options.json`)*

The result of the request.

##### url

Type: `string`

The request URL or the final URL after redirects.

##### requestUrl

Type: `string`

The original request URL.

##### timings

Type: `Object`

The object contains the following properties:

- `start` - Time when the request started.
- `socket` - Time when a socket was assigned to the request.
- `lookup` - Time when the DNS lookup finished.
- `connect` - Time when the socket successfully connected.
- `upload` - Time when the request finished uploading.
- `response` - Time when the request fired the `response` event.
- `end` - Time when the response fired the `end` event.
- `error` - Time when the request fired the `error` event.
- `phases`
	- `wait` - `timings.socket - timings.start`
	- `dns` - `timings.lookup - timings.socket`
	- `tcp` - `timings.connect - timings.lookup`
	- `request` - `timings.upload - timings.connect`
	- `firstByte` - `timings.response - timings.upload`
	- `download` - `timings.end - timings.response`
	- `total` - `timings.end - timings.start` or `timings.error - timings.start`

**Note:** The time is a `number` representing the milliseconds elapsed since the UNIX epoch.

##### fromCache

Type: `boolean`

Whether the response was retrieved from the cache.

##### redirectUrls

Type: `Array`

The redirect URLs.

##### retryCount

Type: `number`

The number of times the request was retried.

#### Streams

**Note:** Progress events, redirect events and request/response events can also be used with promises.

#### got.stream(url, [options])

Sets `options.stream` to `true`.

Returns a [duplex stream](https://nodejs.org/api/stream.html#stream_class_stream_duplex) with additional events:

##### .on('request', request)

`request` event to get the request object of the request.

**Tip:** You can use `request` event to abort request:

```js
got.stream('github.com')
	.on('request', request => setTimeout(() => request.abort(), 50));
```

##### .on('response', response)

The `response` event to get the response object of the final request.

##### .on('redirect', response, nextOptions)

The `redirect` event to get the response object of a redirect. The second argument is options for the next request to the redirect location.

##### .on('uploadProgress', progress)
##### .on('downloadProgress', progress)

Progress events for uploading (sending a request) and downloading (receiving a response). The `progress` argument is an object like:

```js
{
	percent: 0.1,
	transferred: 1024,
	total: 10240
}
```

If it's not possible to retrieve the body size (can happen when streaming), `total` will be `null`.

```js
(async () => {
	const response = await got('sindresorhus.com')
		.on('downloadProgress', progress => {
			// Report download progress
		})
		.on('uploadProgress', progress => {
			// Report upload progress
		});

	console.log(response);
})();
```

##### .on('error', error, body, response)

The `error` event emitted in case of a protocol error (like `ENOTFOUND` etc.) or status error (4xx or 5xx). The second argument is the body of the server response in case of status error. The third argument is a response object.

#### got.get(url, [options])
#### got.post(url, [options])
#### got.put(url, [options])
#### got.patch(url, [options])
#### got.head(url, [options])
#### got.delete(url, [options])

Sets `options.method` to the method name and makes a request.

### Instances

#### got.extend([options])

Configure a new `got` instance with default `options`. The `options` are merged with the parent instance's `defaults.options` using [`got.mergeOptions`](#gotmergeoptionsparentoptions-newoptions). You can access the resolved options with the `.defaults` property on the instance.

```js
const client = got.extend({
	baseUrl: 'https://example.com',
	headers: {
		'x-unicorn': 'rainbow'
	}
});

client.get('/demo');

/* HTTP Request =>
 * GET /demo HTTP/1.1
 * Host: example.com
 * x-unicorn: rainbow
 */
```

```js
(async () => {
	const client = got.extend({
		baseUrl: 'httpbin.org',
		headers: {
			'x-foo': 'bar'
		}
	});
	const {headers} = (await client.get('/headers', {json: true})).body;
	//=> headers['x-foo'] === 'bar'

	const jsonClient = client.extend({
		json: true,
		headers: {
			'x-baz': 'qux'
		}
	});
	const {headers: headers2} = (await jsonClient.get('/headers')).body;
	//=> headers2['x-foo'] === 'bar'
	//=> headers2['x-baz'] === 'qux'
})();
```

**Tip:** Need more control over the behavior of Got? Check out the [`got.create()`](advanced-creation.md).

#### got.mergeOptions(parentOptions, newOptions)

Extends parent options. Avoid using [object spread](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#Spread_in_object_literals) as it doesn't work recursively:

```js
const a = {headers: {cat: 'meow', wolf: ['bark', 'wrrr']}};
const b = {headers: {cow: 'moo', wolf: ['auuu']}};

{...a, ...b}            // => {headers: {cow: 'moo', wolf: ['auuu']}}
got.mergeOptions(a, b)  // => {headers: {cat: 'meow', cow: 'moo', wolf: ['auuu']}}
```

Options are deeply merged to a new object. The value of each key is determined as follows:

- If the new property is set to `undefined`, it keeps the old one.
- If the parent property is an instance of `URL` and the new value is a `string` or `URL`, a new URL instance is created: [`new URL(new, parent)`](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL#Syntax).
- If the new property is a plain `Object`:
	- If the parent property is a plain `Object` too, both values are merged recursively into a new `Object`.
	- Otherwise, only the new value is deeply cloned.
- If the new property is an `Array`, it overwrites the old one with a deep clone of the new property.
- Otherwise, the new value is assigned to the key.

#### got.defaults

Type: `Object`

The default Got options.

## Errors

Each error contains `host`, `hostname`, `method`, `path`, `protocol`, `url` and `gotOptions` properties to make debugging easier.

In Promise mode, the `response` is attached to the error.

#### got.CacheError

When a cache method fails, for example, if the database goes down or there's a filesystem error.

#### got.RequestError

When a request fails. Contains a `code` property with error class code, like `ECONNREFUSED`.

#### got.ReadError

When reading from response stream fails.

#### got.ParseError

When `json` option is enabled, server response code is 2xx, and `JSON.parse` fails. Includes `statusCode` and `statusMessage` properties.

#### got.HTTPError

When the server response code is not 2xx. Includes `body`, `statusCode`, `statusMessage`, and `redirectUrls` properties.

#### got.MaxRedirectsError

When the server redirects you more than ten times. Includes a `statusCode`, `statusMessage`, and `redirectUrls` property which is an array of the URLs Got was redirected to before giving up.

#### got.UnsupportedProtocolError

When given an unsupported protocol.

#### got.CancelError

When the request is aborted with `.cancel()`.

#### got.TimeoutError

When the request is aborted due to a [timeout](#timeout). Includes an `event` property.

## Aborting the request

The promise returned by Got has a [`.cancel()`](https://github.com/sindresorhus/p-cancelable) method which when called, aborts the request.

```js
(async () => {
	const request = got(url, options);

	// …

	// In another part of the code
	if (something) {
		request.cancel();
	}

	// …

	try {
		await request;
	} catch (error) {
		if (request.isCanceled) { // Or `error instanceof got.CancelError`
			// Handle cancelation
		}

		// Handle other errors
	}
})();
```

<a name="cache-adapters"></a>
## Cache

Got implements [RFC 7234](http://httpwg.org/specs/rfc7234.html) compliant HTTP caching which works out of the box in-memory and is easily pluggable with a wide range of storage adapters. Fresh cache entries are served directly from the cache, and stale cache entries are revalidated with `If-None-Match`/`If-Modified-Since` headers. You can read more about the underlying cache behavior in the [`cacheable-request` documentation](https://github.com/lukechilds/cacheable-request).

You can use the JavaScript `Map` type as an in-memory cache:

```js
const got = require('got');
const map = new Map();

(async () => {
		let response = await got('sindresorhus.com', {cache: map});
		console.log(response.fromCache);
		//=> false

		response = await got('sindresorhus.com', {cache: map});
		console.log(response.fromCache);
		//=> true
})();
```

Got uses [Keyv](https://github.com/lukechilds/keyv) internally to support a wide range of storage adapters. For something more scalable you could use an [official Keyv storage adapter](https://github.com/lukechilds/keyv#official-storage-adapters):

```
$ npm install @keyv/redis
```

```js
const got = require('got');
const KeyvRedis = require('@keyv/redis');

const redis = new KeyvRedis('redis://user:pass@localhost:6379');

got('sindresorhus.com', {cache: redis});
```

Got supports anything that follows the Map API, so it's easy to write your own storage adapter or use a third-party solution.

For example, the following are all valid storage adapters:

```js
const storageAdapter = new Map();
// Or
const storageAdapter = require('./my-storage-adapter');
// Or
const QuickLRU = require('quick-lru');
const storageAdapter = new QuickLRU({maxSize: 1000});

got('sindresorhus.com', {cache: storageAdapter});
```

View the [Keyv docs](https://github.com/lukechilds/keyv) for more information on how to use storage adapters.


## Proxies

You can use the [`tunnel`](https://github.com/koichik/node-tunnel) package with the `agent` option to work with proxies:

```js
const got = require('got');
const tunnel = require('tunnel');

got('sindresorhus.com', {
	agent: tunnel.httpOverHttp({
		proxy: {
			host: 'localhost'
		}
	})
});
```

Check out [`global-tunnel`](https://github.com/np-maintain/global-tunnel) if you want to configure proxy support for all HTTP/HTTPS traffic in your app.


## Cookies

You can use the [`tough-cookie`](https://github.com/salesforce/tough-cookie) package:

```js
const got = require('got');
const {CookieJar} = require('tough-cookie');

const cookieJar = new CookieJar();
cookieJar.setCookie('foo=bar', 'https://www.google.com');

got('google.com', {cookieJar});
```


## Form data

You can use the [`form-data`](https://github.com/form-data/form-data) package to create POST request with form data:

```js
const fs = require('fs');
const got = require('got');
const FormData = require('form-data');
const form = new FormData();

form.append('my_file', fs.createReadStream('/foo/bar.jpg'));

got.post('google.com', {
	body: form
});
```


## OAuth

You can use the [`oauth-1.0a`](https://github.com/ddo/oauth-1.0a) package to create a signed OAuth request:

```js
const got = require('got');
const crypto  = require('crypto');
const OAuth = require('oauth-1.0a');

const oauth = OAuth({
	consumer: {
		key: process.env.CONSUMER_KEY,
		secret: process.env.CONSUMER_SECRET
	},
	signature_method: 'HMAC-SHA1',
	hash_function: (baseString, key) => crypto.createHmac('sha1', key).update(baseString).digest('base64')
});

const token = {
	key: process.env.ACCESS_TOKEN,
	secret: process.env.ACCESS_TOKEN_SECRET
};

const url = 'https://api.twitter.com/1.1/statuses/home_timeline.json';

got(url, {
	headers: oauth.toHeader(oauth.authorize({url, method: 'GET'}, token)),
	json: true
});
```


## Unix Domain Sockets

Requests can also be sent via [unix domain sockets](http://serverfault.com/questions/124517/whats-the-difference-between-unix-socket-and-tcp-ip-socket). Use the following URL scheme: `PROTOCOL://unix:SOCKET:PATH`.

- `PROTOCOL` - `http` or `https` *(optional)*
- `SOCKET` - Absolute path to a unix domain socket, for example: `/var/run/docker.sock`
- `PATH` - Request path, for example: `/v2/keys`

```js
got('http://unix:/var/run/docker.sock:/containers/json');

// Or without protocol (HTTP by default)
got('unix:/var/run/docker.sock:/containers/json');
```


## AWS

Requests to AWS services need to have their headers signed. This can be accomplished by using the [`aws4`](https://www.npmjs.com/package/aws4) package. This is an example for querying an ["API Gateway"](https://docs.aws.amazon.com/apigateway/api-reference/signing-requests/) with a signed request.

```js
const AWS = require('aws-sdk');
const aws4 = require('aws4');
const got = require('got');

const chain = new AWS.CredentialProviderChain();

// Create a Got instance to use relative paths and signed requests
const awsClient = got.extend({
	baseUrl: 'https://<api-id>.execute-api.<api-region>.amazonaws.com/<stage>/',
	hooks: {
		beforeRequest: [
			async options => {
				const credentials = await chain.resolvePromise();
				aws4.sign(options, credentials);
			}
		]
	}
});

const response = await awsClient('endpoint/path', {
	// Request-specific options
});
```


## Testing

You can test your requests by using the [`nock`](https://github.com/node-nock/nock) package to mock an endpoint:

```js
const got = require('got');
const nock = require('nock');

nock('https://sindresorhus.com')
	.get('/')
	.reply(200, 'Hello world!');

(async () => {
	const response = await got('sindresorhus.com');
	console.log(response.body);
	//=> 'Hello world!'
})();
```

If you need real integration tests you can use [`create-test-server`](https://github.com/lukechilds/create-test-server):

```js
const got = require('got');
const createTestServer = require('create-test-server');

(async () => {
	const server = await createTestServer();
	server.get('/', 'Hello world!');

	const response = await got(server.url);
	console.log(response.body);
	//=> 'Hello world!'

	await server.close();
})();
```


## Tips

### User Agent

It's a good idea to set the `'user-agent'` header so the provider can more easily see how their resource is used. By default, it's the URL to this repo. You can omit this header by setting it to `null`.

```js
const got = require('got');
const pkg = require('./package.json');

got('sindresorhus.com', {
	headers: {
		'user-agent': `my-package/${pkg.version} (https://github.com/username/my-package)`
	}
});

got('sindresorhus.com', {
	headers: {
		'user-agent': null
	}
});
```

### 304 Responses

Bear in mind; if you send an `if-modified-since` header and receive a `304 Not Modified` response, the body will be empty. It's your responsibility to cache and retrieve the body contents.

### Custom endpoints

Use `got.extend()` to make it nicer to work with REST APIs. Especially if you use the `baseUrl` option.

**Note:** Not to be confused with [`got.create()`](advanced-creation.md), which has no defaults.

```js
const got = require('got');
const pkg = require('./package.json');

const custom = got.extend({
	baseUrl: 'example.com',
	json: true,
	headers: {
		'user-agent': `my-package/${pkg.version} (https://github.com/username/my-package)`
	}
});

// Use `custom` exactly how you use `got`
(async () => {
	const list = await custom('/v1/users/list');
})();
```

**Tip:** Need to merge some instances into a single one? Check out [`got.mergeInstances()`](advanced-creation.md#merging-instances).

### Experimental HTTP2 support

Got provides an experimental support for HTTP2 using the [`http2-wrapper`](https://github.com/szmarczak/http2-wrapper) package:

```js
const got = require('got');
const {request} = require('http2-wrapper');

const h2got = got.extend({request});

(async () => {
	const {body} = await h2got('https://nghttp2.org/httpbin/headers');
	console.log(body);
})();
```

## Comparison

|                       |      `got`     | [`request`][r0] | [`node-fetch`][n0] |  [`axios`][a0]  |  [`superagent`][s0]  |
|-----------------------|:--------------:|:---------------:|:------------------:|:---------------:|:--------------------:|
| HTTP/2 support        |        ❔       |        ✖       |          ✖         |        ✖       |          ✔\*\*      |
| Browser support       |        ✖       |        ✖       |          ✔\*       |        ✔       |          ✔          |
| Electron support      |        ✔       |        ✖       |          ✖         |        ✖       |          ✖          |
| Promise API           |        ✔       |        ✔       |          ✔         |        ✔       |          ✔          |
| Stream API            |        ✔       |        ✔       |    Node.js only    |        ✖       |          ✔          |
| Request cancelation   |        ✔       |        ✖       |          ✔         |        ✔       |          ✔          |
| RFC compliant caching |        ✔       |        ✖       |          ✖         |        ✖       |          ✖          |
| Cookies (out-of-box)  |        ✔       |        ✔       |          ✖         |        ✖       |          ✖          |
| Follows redirects     |        ✔       |        ✔       |          ✔         |        ✔       |          ✔          |
| Retries on failure    |        ✔       |        ✖       |          ✖         |        ✖       |          ✔          |
| Progress events       |        ✔       |        ✖       |          ✖         |  Browser only  |          ✔          |
| Handles gzip/deflate  |        ✔       |        ✔       |          ✔         |        ✔       |          ✔          |
| Advanced timeouts     |        ✔       |        ✖       |          ✖         |        ✖       |          ✖          |
| Timings               |        ✔       |        ✔       |          ✖         |        ✖       |          ✖          |
| Errors with metadata  |        ✔       |        ✖       |          ✖         |        ✔       |          ✖          |
| JSON mode             |        ✔       |        ✔       |          ✖         |        ✔       |          ✔          |
| Custom defaults       |        ✔       |        ✔       |          ✖         |        ✔       |          ✖          |
| Composable            |        ✔       |        ✖       |          ✖         |        ✖       |          ✔          |
| Hooks                 |        ✔       |        ✖       |          ✖         |        ✔       |          ✖          |
| Issues open           | [![][gio]][g1] | [![][rio]][r1]  |   [![][nio]][n1]   |  [![][aio]][a1] |   [![][sio]][s1]    |
| Issues closed         | [![][gic]][g2] | [![][ric]][r2]  |   [![][nic]][n2]   |  [![][aic]][a2] |   [![][sic]][s2]    |
| Downloads             | [![][gd]][g3]  |  [![][rd]][r3]  |   [![][nd]][n3]    |  [![][ad]][a3]  |   [![][sd]][s3]     |
| Coverage              | [![][gc]][g4]  |  [![][rc]][r4]  |   [![][nc]][n4]    |  [![][ac]][a4]  |       unknown       |
| Build                 | [![][gb]][g5]  |  [![][rb]][r5]  |   [![][nb]][n5]    |  [![][ab]][a5]  |   [![][sb]][s5]     |
| Bugs                  | [![][gbg]][g6] | [![][rbg]][r6]  |   [![][nbg]][n6]   |  [![][abg]][a6] |   [![][sbg]][s6]    |
| Dependents            | [![][gdp]][g7] | [![][rdp]][r7]  |   [![][ndp]][n7]   |  [![][adp]][a7] |   [![][sdp]][s7]    |
| Install size          | [![][gis]][g8] | [![][ris]][r8]  |   [![][nis]][n8]   |  [![][ais]][a8] |   [![][sis]][s8]    |

\* It's almost API compatible with the browser `fetch` API.<br>
\*\* Need to switch the protocol manually.<br>
❔ Experimental support.

<!-- GITHUB -->
[r0]: https://github.com/request/request
[n0]: https://github.com/bitinn/node-fetch
[a0]: https://github.com/axios/axios
[s0]: https://github.com/visionmedia/superagent

<!-- ISSUES OPEN -->
[gio]: https://badgen.net/github/open-issues/sindresorhus/got?label
[rio]: https://badgen.net/github/open-issues/request/request?label
[nio]: https://badgen.net/github/open-issues/bitinn/node-fetch?label
[aio]: https://badgen.net/github/open-issues/axios/axios?label
[sio]: https://badgen.net/github/open-issues/visionmedia/superagent?label

[g1]: https://github.com/sindresorhus/got/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc
[r1]: https://github.com/request/request/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc
[n1]: https://github.com/bitinn/node-fetch/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc
[a1]: https://github.com/axios/axios/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc
[s1]: https://github.com/visionmedia/superagent/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc

<!-- ISSUES CLOSED -->
[gic]: https://badgen.net/github/closed-issues/sindresorhus/got?label
[ric]: https://badgen.net/github/closed-issues/request/request?label
[nic]: https://badgen.net/github/closed-issues/bitinn/node-fetch?label
[aic]: https://badgen.net/github/closed-issues/axios/axios?label
[sic]: https://badgen.net/github/closed-issues/visionmedia/superagent?label

[g2]: https://github.com/sindresorhus/got/issues?q=is%3Aissue+is%3Aclosed+sort%3Aupdated-desc
[r2]: https://github.com/request/request/issues?q=is%3Aissue+is%3Aclosed+sort%3Aupdated-desc
[n2]: https://github.com/bitinn/node-fetch/issues?q=is%3Aissue+is%3Aclosed+sort%3Aupdated-desc
[a2]: https://github.com/axios/axios/issues?q=is%3Aissue+is%3Aclosed+sort%3Aupdated-desc
[s2]: https://github.com/visionmedia/superagent/issues?q=is%3Aissue+is%3Aclosed+sort%3Aupdated-desc

<!-- DOWNLOADS -->
[gd]: https://badgen.net/npm/dm/got?label
[rd]: https://badgen.net/npm/dm/request?label
[nd]: https://badgen.net/npm/dm/node-fetch?label
[ad]: https://badgen.net/npm/dm/axios?label
[sd]: https://badgen.net/npm/dm/superagent?label

[g3]: https://www.npmjs.com/package/got
[r3]: https://www.npmjs.com/package/request
[n3]: https://www.npmjs.com/package/node-fetch
[a3]: https://www.npmjs.com/package/axios
[s3]: https://www.npmjs.com/package/superagent

<!-- COVERAGE -->
[gc]: https://badgen.net/coveralls/c/github/sindresorhus/got?label
[rc]: https://badgen.net/coveralls/c/github/request/request?label
[nc]: https://badgen.net/coveralls/c/github/bitinn/node-fetch?label
[ac]: https://badgen.net/coveralls/c/github/mzabriskie/axios?label

[g4]: https://coveralls.io/github/sindresorhus/got
[r4]: https://coveralls.io/github/request/request
[n4]: https://coveralls.io/github/bitinn/node-fetch
[a4]: https://coveralls.io/github/mzabriskie/axios

<!-- BUILD -->
[gb]: https://badgen.net/travis/sindresorhus/got?label
[rb]: https://badgen.net/travis/request/request?label
[nb]: https://badgen.net/travis/bitinn/node-fetch?label
[ab]: https://badgen.net/travis/axios/axios?label
[sb]: https://badgen.net/travis/visionmedia/superagent?label

[g5]: https://travis-ci.org/sindresorhus/got
[r5]: https://travis-ci.org/request/request
[n5]: https://travis-ci.org/bitinn/node-fetch
[a5]: https://travis-ci.org/axios/axios
[s5]: https://travis-ci.org/visionmedia/superagent

<!-- BUGS -->
[gbg]: https://badgen.net/github/label-issues/sindresorhus/got/bug/open?label
[rbg]: https://badgen.net/github/label-issues/request/request/Needs%20investigation/open?label
[nbg]: https://badgen.net/github/label-issues/bitinn/node-fetch/bug/open?label
[abg]: https://badgen.net/github/label-issues/axios/axios/bug/open?label
[sbg]: https://badgen.net/github/label-issues/visionmedia/superagent/Bug/open?label

[g6]: https://github.com/sindresorhus/got/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc+label%3Abug
[r6]: https://github.com/request/request/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc+label%3A"Needs+investigation"
[n6]: https://github.com/bitinn/node-fetch/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc+label%3Abug
[a6]: https://github.com/axios/axios/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc+label%3Abug
[s6]: https://github.com/visionmedia/superagent/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc+label%3ABug

<!-- DEPENDENTS -->
[gdp]: https://badgen.net/npm/dependents/got?label
[rdp]: https://badgen.net/npm/dependents/request?label
[ndp]: https://badgen.net/npm/dependents/node-fetch?label
[adp]: https://badgen.net/npm/dependents/axios?label
[sdp]: https://badgen.net/npm/dependents/superagent?label

[g7]: https://www.npmjs.com/package/got?activeTab=dependents
[r7]: https://www.npmjs.com/package/request?activeTab=dependents
[n7]: https://www.npmjs.com/package/node-fetch?activeTab=dependents
[a7]: https://www.npmjs.com/package/axios?activeTab=dependents
[s7]: https://www.npmjs.com/package/visionmedia?activeTab=dependents

<!-- INSTALL SIZE -->
[gis]: https://badgen.net/packagephobia/install/got?label
[ris]: https://badgen.net/packagephobia/install/request?label
[nis]: https://badgen.net/packagephobia/install/node-fetch?label
[ais]: https://badgen.net/packagephobia/install/axios?label
[sis]: https://badgen.net/packagephobia/install/superagent?label

[g8]: https://packagephobia.now.sh/result?p=got
[r8]: https://packagephobia.now.sh/result?p=request
[n8]: https://packagephobia.now.sh/result?p=node-fetch
[a8]: https://packagephobia.now.sh/result?p=axios
[s8]: https://packagephobia.now.sh/result?p=superagent


## Related

- [gh-got](https://github.com/sindresorhus/gh-got) - Got convenience wrapper to interact with the GitHub API
- [gl-got](https://github.com/singapore/gl-got) - Got convenience wrapper to interact with the GitLab API
- [travis-got](https://github.com/samverschueren/travis-got) - Got convenience wrapper to interact with the Travis API
- [graphql-got](https://github.com/kevva/graphql-got) - Got convenience wrapper to interact with GraphQL
- [GotQL](https://github.com/khaosdoctor/gotql) - Got convenience wrapper to interact with GraphQL using JSON-parsed queries instead of strings


## Maintainers

[![Sindre Sorhus](https://github.com/sindresorhus.png?size=100)](https://sindresorhus.com) | [![Vsevolod Strukchinsky](https://github.com/floatdrop.png?size=100)](https://github.com/floatdrop) | [![Alexander Tesfamichael](https://github.com/AlexTes.png?size=100)](https://github.com/AlexTes) | [![Luke Childs](https://github.com/lukechilds.png?size=100)](https://github.com/lukechilds) | [![Szymon Marczak](https://github.com/szmarczak.png?size=100)](https://github.com/szmarczak) | [![Brandon Smith](https://github.com/brandon93s.png?size=100)](https://github.com/brandon93s)
---|---|---|---|---|---
[Sindre Sorhus](https://sindresorhus.com) | [Vsevolod Strukchinsky](https://github.com/floatdrop) | [Alexander Tesfamichael](https://alextes.me) | [Luke Childs](https://github.com/lukechilds) | [Szymon Marczak](https://github.com/szmarczak) | [Brandon Smith](https://github.com/brandon93s)


## License

MIT
