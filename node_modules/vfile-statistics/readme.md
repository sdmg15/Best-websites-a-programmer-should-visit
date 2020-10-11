# vfile-statistics

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

Count [vfile][] messages per category (fatal, warn, info, nonfatal and total).

## Install

[npm][]:

```sh
npm install vfile-statistics
```

## Use

```js
var vfile = require('vfile')
var statistics = require('vfile-statistics')

var file = vfile({path: '~/example.md'})

file.message('This could be better')
file.message('That could be better')

try {
  file.fail('This is terribly wrong')
} catch (err) {}

file.info('This is perfect')

console.log(statistics(file))
```

Yields:

```js
{fatal: 1, nonfatal: 3, warn: 2, info: 1, total: 4}
```

## API

### `statistics(file)`

Pass a [vfile][], list of vfiles, or a list of messages (`file.messages`), get
counts per category.

###### Returns

`Object`:

*   `fatal`: fatal errors (`fatal: true`)
*   `warn`: warning messages (`fatal: false`)
*   `info`: informational messages (`fatal: null` or `fatal: undefined`)
*   `nonfatal`: warning or info messages
*   `total`: all messages

## Contribute

See [`contributing.md`][contributing] in [`vfile/.github`][health] for ways to
get started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/vfile/vfile-statistics.svg

[build]: https://travis-ci.org/vfile/vfile-statistics

[coverage-badge]: https://img.shields.io/codecov/c/github/vfile/vfile-statistics.svg

[coverage]: https://codecov.io/github/vfile/vfile-statistics

[downloads-badge]: https://img.shields.io/npm/dm/vfile-statistics.svg

[downloads]: https://www.npmjs.com/package/vfile-statistics

[size-badge]: https://img.shields.io/bundlephobia/minzip/vfile-statistics.svg

[size]: https://bundlephobia.com/result?p=vfile-statistics

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

[author]: https://wooorm.com

[vfile]: https://github.com/vfile/vfile
