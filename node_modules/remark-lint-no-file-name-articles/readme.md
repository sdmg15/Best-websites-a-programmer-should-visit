<!--This file is generated-->

# remark-lint-no-file-name-articles

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

Warn when file names start with an article.

## Presets

This rule is included in the following presets:

| Preset | Setting |
| - | - |
| [`remark-preset-lint-markdown-style-guide`](https://github.com/remarkjs/remark-lint/tree/main/packages/remark-preset-lint-markdown-style-guide) | |

## Example

##### `title.md`

###### Out

No messages.

##### `a-title.md`

###### Out

```text
1:1: Do not start file names with `a`
```

##### `the-title.md`

###### Out

```text
1:1: Do not start file names with `the`
```

##### `teh-title.md`

###### Out

```text
1:1: Do not start file names with `teh`
```

##### `an-article.md`

###### Out

```text
1:1: Do not start file names with `an`
```

## Install

[npm][]:

```sh
npm install remark-lint-no-file-name-articles
```

## Use

You probably want to use it on the CLI through a config file:

```diff
 …
 "remarkConfig": {
   "plugins": [
     …
     "lint",
+    "lint-no-file-name-articles",
     …
   ]
 }
 …
```

Or use it on the CLI directly

```sh
remark -u lint -u lint-no-file-name-articles readme.md
```

Or use this on the API:

```diff
 var remark = require('remark')
 var report = require('vfile-reporter')

 remark()
   .use(require('remark-lint'))
+  .use(require('remark-lint-no-file-name-articles'))
   .process('_Emphasis_ and **importance**', function (err, file) {
     console.error(report(err || file))
   })
```

## Contribute

See [`contributing.md`][contributing] in [`remarkjs/.github`][health] for ways
to get started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

[build-badge]: https://img.shields.io/travis/remarkjs/remark-lint/main.svg

[build]: https://travis-ci.org/remarkjs/remark-lint

[coverage-badge]: https://img.shields.io/codecov/c/github/remarkjs/remark-lint.svg

[coverage]: https://codecov.io/github/remarkjs/remark-lint

[downloads-badge]: https://img.shields.io/npm/dm/remark-lint-no-file-name-articles.svg

[downloads]: https://www.npmjs.com/package/remark-lint-no-file-name-articles

[size-badge]: https://img.shields.io/bundlephobia/minzip/remark-lint-no-file-name-articles.svg

[size]: https://bundlephobia.com/result?p=remark-lint-no-file-name-articles

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-spectrum.svg

[chat]: https://spectrum.chat/unified/remark

[npm]: https://docs.npmjs.com/cli/install

[health]: https://github.com/remarkjs/.github

[contributing]: https://github.com/remarkjs/.github/blob/HEAD/contributing.md

[support]: https://github.com/remarkjs/.github/blob/HEAD/support.md

[coc]: https://github.com/remarkjs/.github/blob/HEAD/code-of-conduct.md

[license]: https://github.com/remarkjs/remark-lint/blob/main/license

[author]: https://wooorm.com
