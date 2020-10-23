# normalize-url [![Build Status](https://travis-ci.org/sindresorhus/normalize-url.svg?branch=master)](https://travis-ci.org/sindresorhus/normalize-url) [![Coverage Status](https://coveralls.io/repos/github/sindresorhus/normalize-url/badge.svg?branch=master)](https://coveralls.io/github/sindresorhus/normalize-url?branch=master)

> [Normalize](https://en.wikipedia.org/wiki/URL_normalization) a URL

Useful when you need to display, store, deduplicate, sort, compare, etc, URLs.


## Install

```
$ npm install normalize-url
```


## Usage

```js
const normalizeUrl = require('normalize-url');

normalizeUrl('sindresorhus.com');
//=> 'http://sindresorhus.com'

normalizeUrl('HTTP://xn--xample-hva.com:80/?b=bar&a=foo');
//=> 'http://êxample.com/?a=foo&b=bar'
```


## API

### normalizeUrl(url, options?)

#### url

Type: `string`

URL to normalize, including [data URL](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs).

#### options

Type: `object`

##### defaultProtocol

Type: `string`<br>
Default: `http:`

##### normalizeProtocol

Type: `boolean`<br>
Default: `true`

Prepend `defaultProtocol` to the URL if it's protocol-relative.

```js
normalizeUrl('//sindresorhus.com:80/');
//=> 'http://sindresorhus.com'

normalizeUrl('//sindresorhus.com:80/', {normalizeProtocol: false});
//=> '//sindresorhus.com'
```

##### forceHttp

Type: `boolean`<br>
Default: `false`

Normalize `https:` to `http:`.

```js
normalizeUrl('https://sindresorhus.com:80/');
//=> 'https://sindresorhus.com'

normalizeUrl('https://sindresorhus.com:80/', {forceHttp: true});
//=> 'http://sindresorhus.com'
```

##### forceHttps

Type: `boolean`<br>
Default: `false`

Normalize `http:` to `https:`.

```js
normalizeUrl('https://sindresorhus.com:80/');
//=> 'https://sindresorhus.com'

normalizeUrl('http://sindresorhus.com:80/', {forceHttps: true});
//=> 'https://sindresorhus.com'
```

This option can't be used with the `forceHttp` option at the same time.

##### stripAuthentication

Type: `boolean`<br>
Default: `true`

Strip the [authentication](https://en.wikipedia.org/wiki/Basic_access_authentication) part of the URL.

```js
normalizeUrl('user:password@sindresorhus.com');
//=> 'https://sindresorhus.com'

normalizeUrl('user:password@sindresorhus.com', {stripAuthentication: false});
//=> 'https://user:password@sindresorhus.com'
```

##### stripHash

Type: `boolean`<br>
Default: `false`

Strip the hash part of the URL.

```js
normalizeUrl('sindresorhus.com/about.html#contact');
//=> 'http://sindresorhus.com/about.html#contact'

normalizeUrl('sindresorhus.com/about.html#contact', {stripHash: true});
//=> 'http://sindresorhus.com/about.html'
```

##### stripProtocol

Type: `boolean`<br>
Default: `false`

Remove HTTP(S) protocol from the URL: `http://sindresorhus.com` → `sindresorhus.com`.

```js
normalizeUrl('https://sindresorhus.com');
//=> 'https://sindresorhus.com'

normalizeUrl('sindresorhus.com', {stripProtocol: true});
//=> 'sindresorhus.com'
```

##### stripWWW

Type: `boolean`<br>
Default: `true`

Remove `www.` from the URL.

```js
normalizeUrl('http://www.sindresorhus.com');
//=> 'http://sindresorhus.com'

normalizeUrl('http://www.sindresorhus.com', {stripWWW: false});
//=> 'http://www.sindresorhus.com'
```

##### removeQueryParameters

Type: `Array<RegExp | string>`<br>
Default: `[/^utm_\w+/i]`

Remove query parameters that matches any of the provided strings or regexes.

```js
normalizeUrl('www.sindresorhus.com?foo=bar&ref=test_ref', {
	removeQueryParameters: ['ref']
});
//=> 'http://sindresorhus.com/?foo=bar'
```

##### removeTrailingSlash

Type: `boolean`<br>
Default: `true`

Remove trailing slash.

**Note:** Trailing slash is always removed if the URL doesn't have a pathname.

```js
normalizeUrl('http://sindresorhus.com/redirect/');
//=> 'http://sindresorhus.com/redirect'

normalizeUrl('http://sindresorhus.com/redirect/', {removeTrailingSlash: false});
//=> 'http://sindresorhus.com/redirect/'

normalizeUrl('http://sindresorhus.com/', {removeTrailingSlash: false});
//=> 'http://sindresorhus.com'
```

##### removeDirectoryIndex

Type: `boolean | Array<RegExp | string>`<br>
Default: `false`

Removes the default directory index file from path that matches any of the provided strings or regexes. When `true`, the regex `/^index\.[a-z]+$/` is used.

```js
normalizeUrl('www.sindresorhus.com/foo/default.php', {
	removeDirectoryIndex: [/^default\.[a-z]+$/]
});
//=> 'http://sindresorhus.com/foo'
```

##### sortQueryParameters

Type: `boolean`<br>
Default: `true`

Sorts the query parameters alphabetically by key.

```js
normalizeUrl('www.sindresorhus.com?b=two&a=one&c=three', {
	sortQueryParameters: false
});
//=> 'http://sindresorhus.com/?b=two&a=one&c=three'
```


## Related

- [compare-urls](https://github.com/sindresorhus/compare-urls) - Compare URLs by first normalizing them


---

<div align="center">
	<b>
		<a href="https://tidelift.com/subscription/pkg/npm-normalize-url?utm_source=npm-normalize-url&utm_medium=referral&utm_campaign=readme">Get professional support for this package with a Tidelift subscription</a>
	</b>
	<br>
	<sub>
		Tidelift helps make open source sustainable for maintainers while giving companies<br>assurances about security, maintenance, and licensing for their dependencies.
	</sub>
</div>
