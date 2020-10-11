<!--This file is generated-->

# remark-lint-code-block-style

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

Warn when code blocks do not adhere to a given style.

Options: `'consistent'`, `'fenced'`, or `'indented'`, default: `'consistent'`.

`'consistent'` detects the first used code block style and warns when
subsequent code blocks uses different styles.

## Fix

[`remark-stringify`](https://github.com/remarkjs/remark/tree/HEAD/packages/remark-stringify)
formats code blocks using a fence if they have a language flag and
indentation if not.
Pass
[`fences: true`](https://github.com/remarkjs/remark/tree/HEAD/packages/remark-stringify#optionsfences)
to always use fences for code blocks.

See [Using remark to fix your Markdown](https://github.com/remarkjs/remark-lint#using-remark-to-fix-your-markdown)
on how to automatically fix warnings for this rule.

## Presets

This rule is included in the following presets:

| Preset | Setting |
| - | - |
| [`remark-preset-lint-consistent`](https://github.com/remarkjs/remark-lint/tree/main/packages/remark-preset-lint-consistent) | `'consistent'` |
| [`remark-preset-lint-markdown-style-guide`](https://github.com/remarkjs/remark-lint/tree/main/packages/remark-preset-lint-markdown-style-guide) | `'fenced'` |

## Example

##### `ok.md`

When configured with `'indented'`.

###### In

```markdown
    alpha();

Paragraph.

    bravo();
```

###### Out

No messages.

##### `not-ok.md`

When configured with `'indented'`.

###### In

````markdown
```
alpha();
```

Paragraph.

```
bravo();
```
````

###### Out

```text
1:1-3:4: Code blocks should be indented
7:1-9:4: Code blocks should be indented
```

##### `ok.md`

When configured with `'fenced'`.

###### In

````markdown
```
alpha();
```

Paragraph.

```
bravo();
```
````

###### Out

No messages.

##### `not-ok-fenced.md`

When configured with `'fenced'`.

###### In

```markdown
    alpha();

Paragraph.

    bravo();
```

###### Out

```text
1:1-1:13: Code blocks should be fenced
5:1-5:13: Code blocks should be fenced
```

##### `not-ok-consistent.md`

###### In

````markdown
    alpha();

Paragraph.

```
bravo();
```
````

###### Out

```text
5:1-7:4: Code blocks should be indented
```

##### `not-ok-incorrect.md`

When configured with `'💩'`.

###### Out

```text
1:1: Incorrect code block style `💩`: use either `'consistent'`, `'fenced'`, or `'indented'`
```

## Install

[npm][]:

```sh
npm install remark-lint-code-block-style
```

## Use

You probably want to use it on the CLI through a config file:

```diff
 …
 "remarkConfig": {
   "plugins": [
     …
     "lint",
+    "lint-code-block-style",
     …
   ]
 }
 …
```

Or use it on the CLI directly

```sh
remark -u lint -u lint-code-block-style readme.md
```

Or use this on the API:

```diff
 var remark = require('remark')
 var report = require('vfile-reporter')

 remark()
   .use(require('remark-lint'))
+  .use(require('remark-lint-code-block-style'))
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

[downloads-badge]: https://img.shields.io/npm/dm/remark-lint-code-block-style.svg

[downloads]: https://www.npmjs.com/package/remark-lint-code-block-style

[size-badge]: https://img.shields.io/bundlephobia/minzip/remark-lint-code-block-style.svg

[size]: https://bundlephobia.com/result?p=remark-lint-code-block-style

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
