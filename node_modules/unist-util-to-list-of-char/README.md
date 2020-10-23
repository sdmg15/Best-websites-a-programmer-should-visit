# unist-util-to-list-of-char

Provide API to provide list of each character inside [unist](https://github.com/syntax-tree/unist) node tree.

## Installation

```bash
npm install unist-util-to-list-of-char
```

## Usage

```javascript
var remark = require('remark');
var toList = require('unist-util-to-list-of-char');

var tree = remark().parse('Some _emphasis_, **importance**, and `code`.');

function callback(list) {
  console.log(list);
}

toList(tree, 'root', callback);
```

Yields

```javascript
[
  { value: 'S', line: 1, column: 1, offset: 0 },
  { value: 'o', line: 1, column: 2, offset: 1 },
  { value: 'm', line: 1, column: 3, offset: 2 },
  { value: 'e', line: 1, column: 4, offset: 3 },
  { value: ' ', line: 1, column: 5, offset: 4 },
  { value: 'e', line: 1, column: 7, offset: 6 },
  { value: 'm', line: 1, column: 8, offset: 7 },
  { value: 'p', line: 1, column: 9, offset: 8 },
  { value: 'h', line: 1, column: 10, offset: 9 },
  { value: 'a', line: 1, column: 11, offset: 10 },
  { value: 's', line: 1, column: 12, offset: 11 },
  { value: 'i', line: 1, column: 13, offset: 12 },
  { value: 's', line: 1, column: 14, offset: 13 },
  { value: ',', line: 1, column: 16, offset: 15 },
  { value: ' ', line: 1, column: 17, offset: 16 },
  { value: 'i', line: 1, column: 20, offset: 19 },
  { value: 'm', line: 1, column: 21, offset: 20 },
  { value: 'p', line: 1, column: 22, offset: 21 },
  { value: 'o', line: 1, column: 23, offset: 22 },
  { value: 'r', line: 1, column: 24, offset: 23 },
  { value: 't', line: 1, column: 25, offset: 24 },
  { value: 'a', line: 1, column: 26, offset: 25 },
  { value: 'n', line: 1, column: 27, offset: 26 },
  { value: 'c', line: 1, column: 28, offset: 27 },
  { value: 'e', line: 1, column: 29, offset: 28 },
  { value: ',', line: 1, column: 32, offset: 31 },
  { value: ' ', line: 1, column: 33, offset: 32 },
  { value: 'a', line: 1, column: 34, offset: 33 },
  { value: 'n', line: 1, column: 35, offset: 34 },
  { value: 'd', line: 1, column: 36, offset: 35 },
  { value: ' ', line: 1, column: 37, offset: 36 },
  { value: 'c', line: 1, column: 38, offset: 37 },
  { value: 'o', line: 1, column: 39, offset: 38 },
  { value: 'd', line: 1, column: 40, offset: 39 },
  { value: 'e', line: 1, column: 41, offset: 40 },
  { value: '.', line: 1, column: 44, offset: 43 },
]
```

## API

`toList(tree[, test], callback)`

This function will iterate through given tree to generate list of characters from text.

If `test` is provided, only subset of tree will be used. `callback` might be triggered multiple
times if there are multiple sub-trees.

`callback` function will be triggered by given a list of nodes with following structure:

```javascript
{
  value: 'c', // current character
  column: 1,  // column number of this character
  line: 1,    // line number of this character
  offset: 1,  // offset number of this character
}
```

## License

[MIT](https://github.com/laysent/remark-lint-plugins/blob/master/LICENSE) © [LaySent](https://github.com/laysent)
