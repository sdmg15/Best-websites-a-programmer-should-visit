<!--This file is generated-->

# remark-lint-no-heading-punctuation

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

Warn when a heading ends with a group of characters.

Options: `string`, default: `'.,;:!?'`.

Note: these are added to a regex, in a group (`'[' + char + ']'`), be
careful to escape the string correctly.

## Presets

This rule is included in the following presets:

| Preset | Setting |
| - | - |
| [`remark-preset-lint-markdown-style-guide`](https://github.com/remarkjs/remark-lint/tree/main/packages/remark-preset-lint-markdown-style-guide) | `':.'` |

## Example

##### `ok.md`

###### In

```markdown
# Hello
```

###### Out

No messages.

##### `not-ok.md`

###### In

```markdown
# Hello:

# Hello?

# Hello!

# Hello,

# Hello;
```

###### Out

```text
1:1-1:9: Don’t add a trailing `:` to headings
3:1-3:9: Don’t add a trailing `?` to headings
5:1-5:9: Don’t add a trailing `!` to headings
7:1-7:9: Don’t add a trailing `,` to headings
9:1-9:9: Don’t add a trailing `;` to headings
```

##### `ok.md`

When configured with `',;:!?'`.

###### In

```markdown
# Hello…
```

###### Out

No messages.

## Install

[npm][]:

```sh
npm install remark-lint-no-heading-punctuation
```

## Use

You probably want to use it on the CLI through a config file:

```diff
 …
 "remarkConfig": {
   "plugins": [
     …
     "lint",
+    "lint-no-heading-punctuation",
     …
   ]
 }
 …
```

Or use it on the CLI directly

```sh
remark -u lint -u lint-no-heading-punctuation readme.md
```

Or use this on the API:

```diff
 var remark = require('remark')
 var report = require('vfile-reporter')

 remark()
   .use(require('remark-lint'))
+  .use(require('remark-lint-no-heading-punctuation'))
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

[downloads-badge]: https://img.shields.io/npm/dm/remark-lint-no-heading-punctuation.svg

[downloads]: https://www.npmjs.com/package/remark-lint-no-heading-punctuation

[size-badge]: https://img.shields.io/bundlephobia/minzip/remark-lint-no-heading-punctuation.svg

[size]: https://bundlephobia.com/result?p=remark-lint-no-heading-punctuation

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
