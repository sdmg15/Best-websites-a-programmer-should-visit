# mdast-comment-marker

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[**mdast**][mdast] utility to parse comment markers.

## Install

[npm][]:

```sh
npm install mdast-comment-marker
```

## Use

```js
var marker = require('mdast-comment-marker');

console.log(marker({
  type: 'html',
  value: '<!--foo-->'
}));

console.log(marker({
  type: 'html',
  value: '<!--foo bar baz=12.4 qux="test test" quux=\'false\'-->'
}));

console.log(marker({
  type: 'html',
  value: '<!doctype html>'
}));

// Also supports MDX comment nodes.
console.log(marker({
  type: 'comment',
  value: 'bar'
}));
```

Yields:

```js
{ name: 'foo',
  attributes: '',
  parameters: {},
  node: { type: 'html', value: '<!--foo-->' } }
{ name: 'foo',
  attributes: 'bar baz=12.4 qux="test test" quux=\'false\'',
  parameters: { bar: true, baz: 12.4, qux: 'test test', quux: false },
  node:
   { type: 'html',
     value: '<!--foo bar baz=12.4 qux="test test" quux=\'false\'-->' } }
null
{ name: 'bar',
  attributes: '',
  parameters: {},
  node: { type: 'comment', value: 'bar' } }
```

## API

### `marker(node)`

Parse a comment marker.

###### Parameters

*   `node` ([`Node`][node]) — [Node][] to parse

###### Returns

[`Marker?`][marker] — Information, when applicable.

### `Marker`

A comment marker.

###### Properties

*   `name` (`string`) — Name of marker
*   `attributes` (`string`) — Value after name
*   `parameters` (`Object`) — Parsed attributes, tries to convert
    values to numbers and booleans when possible
*   `node` ([`Node`][node]) — Reference to given node

## Security

Use of `mdast-comment-marker` does not involve [**hast**][hast], user content,
or change the tree, so there are no openings for
[cross-site scripting (XSS)][xss] attacks.

## Contribute

See [`contributing.md` in `syntax-tree/.github`][contributing] for ways to get
started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/syntax-tree/mdast-comment-marker.svg

[build]: https://travis-ci.org/syntax-tree/mdast-comment-marker

[coverage-badge]: https://img.shields.io/codecov/c/github/syntax-tree/mdast-comment-marker.svg

[coverage]: https://codecov.io/github/syntax-tree/mdast-comment-marker

[downloads-badge]: https://img.shields.io/npm/dm/mdast-comment-marker.svg

[downloads]: https://www.npmjs.com/package/mdast-comment-marker

[size-badge]: https://img.shields.io/bundlephobia/minzip/mdast-comment-marker.svg

[size]: https://bundlephobia.com/result?p=mdast-comment-marker

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-spectrum-7b16ff.svg

[chat]: https://spectrum.chat/unified/syntax-tree

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[author]: https://wooorm.com

[contributing]: https://github.com/syntax-tree/.github/blob/master/contributing.md

[support]: https://github.com/syntax-tree/.github/blob/master/support.md

[coc]: https://github.com/syntax-tree/.github/blob/master/code-of-conduct.md

[mdast]: https://github.com/syntax-tree/mdast

[node]: https://github.com/syntax-tree/unist#node

[marker]: #marker

[xss]: https://en.wikipedia.org/wiki/Cross-site_scripting

[hast]: https://github.com/syntax-tree/hast
