<!--This file is generated-->

# remark-lint-no-auto-link-without-protocol

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

Warn for autolinks without protocol.
Autolinks are URLs enclosed in `<` (less than) and `>` (greater than)
characters.

## Fix

[`remark-stringify`](https://github.com/remarkjs/remark/tree/HEAD/packages/remark-stringify)
adds a protocol where needed.

See [Using remark to fix your Markdown](https://github.com/remarkjs/remark-lint#using-remark-to-fix-your-markdown)
on how to automatically fix warnings for this rule.

## Presets

This rule is included in the following presets:

| Preset | Setting |
| - | - |
| [`remark-preset-lint-markdown-style-guide`](https://github.com/remarkjs/remark-lint/tree/main/packages/remark-preset-lint-markdown-style-guide) | |
| [`remark-preset-lint-recommended`](https://github.com/remarkjs/remark-lint/tree/main/packages/remark-preset-lint-recommended) | |

## Example

##### `ok.md`

###### In

```markdown
<http://www.example.com>
<mailto:foo@bar.com>

Most Markdown vendors don’t recognize the following as a link:
<www.example.com>
```

###### Out

No messages.

##### `not-ok.md`

###### In

```markdown
<foo@bar.com>
```

###### Out

```text
1:1-1:14: All automatic links must start with a protocol
```

## Install

[npm][]:

```sh
npm install remark-lint-no-auto-link-without-protocol
```

## Use

You probably want to use it on the CLI through a config file:

```diff
 …
 "remarkConfig": {
   "plugins": [
     …
     "lint",
+    "lint-no-auto-link-without-protocol",
     …
   ]
 }
 …
```

Or use it on the CLI directly

```sh
remark -u lint -u lint-no-auto-link-without-protocol readme.md
```

Or use this on the API:

```diff
 var remark = require('remark')
 var report = require('vfile-reporter')

 remark()
   .use(require('remark-lint'))
+  .use(require('remark-lint-no-auto-link-without-protocol'))
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

[downloads-badge]: https://img.shields.io/npm/dm/remark-lint-no-auto-link-without-protocol.svg

[downloads]: https://www.npmjs.com/package/remark-lint-no-auto-link-without-protocol

[size-badge]: https://img.shields.io/bundlephobia/minzip/remark-lint-no-auto-link-without-protocol.svg

[size]: https://bundlephobia.com/result?p=remark-lint-no-auto-link-without-protocol

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
