<!--This file is generated-->

# remark-lint-blockquote-indentation

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

Warn when block quotes are indented too much or too little.

Options: `number` or `'consistent'`, default: `'consistent'`.

`'consistent'` detects the first used indentation and will warn when
other block quotes use a different indentation.

## Presets

This rule is included in the following presets:

| Preset | Setting |
| - | - |
| [`remark-preset-lint-consistent`](https://github.com/remarkjs/remark-lint/tree/main/packages/remark-preset-lint-consistent) | `'consistent'` |
| [`remark-preset-lint-markdown-style-guide`](https://github.com/remarkjs/remark-lint/tree/main/packages/remark-preset-lint-markdown-style-guide) | `2` |

## Example

##### `ok.md`

When configured with `2`.

###### In

```markdown
> Hello

Paragraph.

> World
```

###### Out

No messages.

##### `ok.md`

When configured with `4`.

###### In

```markdown
>   Hello

Paragraph.

>   World
```

###### Out

No messages.

##### `not-ok.md`

###### In

```markdown
>  Hello

Paragraph.

>   World

Paragraph.

> World
```

###### Out

```text
5:3: Remove 1 space between block quote and content
9:3: Add 1 space between block quote and content
```

## Install

[npm][]:

```sh
npm install remark-lint-blockquote-indentation
```

## Use

You probably want to use it on the CLI through a config file:

```diff
 …
 "remarkConfig": {
   "plugins": [
     …
     "lint",
+    "lint-blockquote-indentation",
     …
   ]
 }
 …
```

Or use it on the CLI directly

```sh
remark -u lint -u lint-blockquote-indentation readme.md
```

Or use this on the API:

```diff
 var remark = require('remark')
 var report = require('vfile-reporter')

 remark()
   .use(require('remark-lint'))
+  .use(require('remark-lint-blockquote-indentation'))
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

[downloads-badge]: https://img.shields.io/npm/dm/remark-lint-blockquote-indentation.svg

[downloads]: https://www.npmjs.com/package/remark-lint-blockquote-indentation

[size-badge]: https://img.shields.io/bundlephobia/minzip/remark-lint-blockquote-indentation.svg

[size]: https://bundlephobia.com/result?p=remark-lint-blockquote-indentation

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
