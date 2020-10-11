# unist-util-map

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

[**unist**][unist] utility to create a new [tree][] by mapping all [node][]s
with the given function.

## Install

[npm][]:

```sh
npm install unist-util-map
```

## Usage

```js
var u = require('unist-builder')
var map = require('unist-util-map')

var tree = u('tree', [
  u('leaf', 'leaf 1'),
  u('node', [u('leaf', 'leaf 2')]),
  u('void'),
  u('leaf', 'leaf 3')
])

var next = map(tree, function(node) {
  return node.type === 'leaf'
    ? Object.assign({}, node, {value: 'CHANGED'})
    : node
})

console.dir(next, {depth: null})
```

Yields:

```js
{
  type: 'tree',
  children: [
    { type: 'leaf', value: 'CHANGED' },
    { type: 'node', children: [ { type: 'leaf', value: 'CHANGED' } ] },
    { type: 'void' },
    { type: 'leaf', value: 'CHANGED' }
  ]
}
```

…note that `tree` is not mutated.

## API

### `map(tree, mapFn)`

Create a new [tree][] by mapping all [node][]s with the given function.

###### Parameters

*   `tree` ([`Node`][node]) — [Tree][] to map
*   `callback` ([`Function`][callback]) — Function that returns a new node

###### Returns

[`Node`][node] — New mapped [tree][].

#### `function mapFn(node[, index, parent])`

Function called with a [node][] to produce a new node.

###### Parameters

*   `node` ([`Node`][node]) — Current [node][] being processed
*   `index` (`number?`) — [Index][] of `node`, or `null`
*   `parent` (`Node?`) — [Parent][] of `node`, or `null`

###### Returns

[`Node`][node] — Node to be used in the new [tree][].
Its children are not used: if the original node has children, those are mapped.

## Related

*   [`unist-util-filter`](https://github.com/syntax-tree/unist-util-filter)
    — Create a new tree with all nodes that pass the given function
*   [`unist-util-flatmap`](https://gitlab.com/staltz/unist-util-flatmap)
    — Create a new tree by expanding a node into many
*   [`unist-util-remove`](https://github.com/syntax-tree/unist-util-remove)
    — Remove nodes from trees
*   [`unist-util-select`](https://github.com/syntax-tree/unist-util-select)
    — Select nodes with CSS-like selectors
*   [`unist-util-visit`](https://github.com/syntax-tree/unist-util-visit)
    — Recursively walk over nodes
*   [`unist-builder`](https://github.com/syntax-tree/unist-builder)
    — Creating trees

## Contribute

See [`contributing.md` in `syntax-tree/.github`][contributing] for ways to get
started.
See [`support.md`][support] for ways to get help.

This project has a [Code of Conduct][coc].
By interacting with this repository, organisation, or community you agree to
abide by its terms.

## License

[MIT][license] © [azu][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/syntax-tree/unist-util-find-all-after.svg

[build]: https://travis-ci.org/syntax-tree/unist-util-find-all-after

[coverage-badge]: https://img.shields.io/codecov/c/github/syntax-tree/unist-util-find-all-after.svg

[coverage]: https://codecov.io/github/syntax-tree/unist-util-find-all-after

[downloads-badge]: https://img.shields.io/npm/dm/unist-util-find-all-after.svg

[downloads]: https://www.npmjs.com/package/unist-util-find-all-after

[size-badge]: https://img.shields.io/bundlephobia/minzip/unist-util-find-all-after.svg

[size]: https://bundlephobia.com/result?p=unist-util-find-all-after

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[author]: https://efcl.info

[unist]: https://github.com/syntax-tree/unist

[node]: https://github.com/syntax-tree/unist#node

[tree]: https://github.com/syntax-tree/unist#tree

[parent]: https://github.com/syntax-tree/unist#parent-1

[index]: https://github.com/syntax-tree/unist#index

[callback]: #function-mapfnnode-index-parent

[contributing]: https://github.com/syntax-tree/.github/blob/master/contributing.md

[support]: https://github.com/syntax-tree/.github/blob/master/support.md

[coc]: https://github.com/syntax-tree/.github/blob/master/code-of-conduct.md
