# vfile-reporter-pretty

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

Create a pretty report for a **[vfile][]**.

![][screenshot]

## Install

[npm][]:

```sh
npm install vfile-reporter-pretty
```

## Use

```js
const vfile = require('vfile')
const vfileReporterPretty = require('vfile-reporter-pretty')

const file = vfile({path: '~/example.md'})

file.message('`braavo` is misspelt; did you mean `bravo`?', {line: 1, column: 8})
file.info('This is perfect', {line: 2, column: 1})

try {
  file.fail('This is horrible', {line: 3, column: 5})
} catch (error) {}

console.log(vfileReporterPretty([file]))
```

### `vfileReporterPretty(files)`

Create a report (`string`) for the given files.

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

[build-badge]: https://img.shields.io/travis/vfile/vfile-reporter-pretty.svg

[build]: https://travis-ci.org/vfile/vfile-reporter-pretty

[coverage-badge]: https://img.shields.io/codecov/c/github/vfile/vfile-reporter-pretty.svg

[coverage]: https://codecov.io/github/vfile/vfile-reporter-pretty

[downloads-badge]: https://img.shields.io/npm/dm/vfile-reporter-pretty.svg

[downloads]: https://www.npmjs.com/package/vfile-reporter-pretty

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

[vfile]: https://github.com/vfile/vfile
