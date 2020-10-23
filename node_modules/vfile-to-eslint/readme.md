# vfile-to-eslint

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

Convert [VFiles][vfile] to [ESLint][] formatter compatible output.

For example, [remark-lint][] returns a `VFile`, which you could pass through
this module to display it using an ESLint formatter.

![][screenshot]

## Install

[npm][]:

```sh
npm install vfile-to-eslint
```

## Use

```js
const remark = require('remark')
const recommended = require('remark-preset-lint-recommended')
const eslintFormatterPretty = require('eslint-formatter-pretty')
const vfileToEslint = require('vfile-to-eslint')

const file = remark()
  .use(recommended)
  .processSync('## Hello world!')

console.log(eslintFormatterPretty(vfileToEslint([file])))
```

### `vfileToEslint(files)`

Returns an `Object` that can be passed directly to an
[ESLint formatter][eslint-formatter].

###### `files`

List of files ([`Array.<VFile>`][vfile]).

## Contribute

See [`contributing.md`][contributing] in [`vfile/.github`][health] for ways to
get started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [Sindre Sorhus][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/vfile/vfile-to-eslint.svg

[build]: https://travis-ci.org/vfile/vfile-to-eslint

[coverage-badge]: https://img.shields.io/codecov/c/github/vfile/vfile-to-eslint.svg

[coverage]: https://codecov.io/github/vfile/vfile-to-eslint

[downloads-badge]: https://img.shields.io/npm/dm/vfile-to-eslint.svg

[downloads]: https://www.npmjs.com/package/vfile-to-eslint

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-spectrum-7b16ff.svg

[chat]: https://spectrum.chat/unified/vfile

[npm]: https://docs.npmjs.com/cli/install

[contributing]: https://github.com/vfile/.github/blob/master/contributing.md

[support]: https://github.com/vfile/.github/blob/master/support.md

[health]: https://github.com/vfile/.github

[coc]: https://github.com/vfile/.github/blob/master/code-of-conduct.md

[license]: license

[author]: https://sindresorhus.com

[screenshot]: screenshot.png

[remark-lint]: https://github.com/remarkjs/remark-lint

[vfile]: https://github.com/vfile/vfile

[eslint]: https://eslint.org

[eslint-formatter]: https://npms.io/search?term=eslint-formatter
