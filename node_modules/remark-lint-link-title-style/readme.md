<!--This file is generated-->

# remark-lint-link-title-style

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

Warn when link and definition titles occur with incorrect quotes.

Options: `'consistent'`, `'"'`, `'\''`, or `'()'`, default: `'consistent'`.

`'consistent'` detects the first used quote style and warns when subsequent
titles use different styles.

## Fix

[`remark-stringify`](https://github.com/remarkjs/remark/tree/HEAD/packages/remark-stringify)
uses `'` (single quote) for titles if they contain a double quote, and `"`
(double quotes) otherwise.

See [Using remark to fix your Markdown](https://github.com/remarkjs/remark-lint#using-remark-to-fix-your-markdown)
on how to automatically fix warnings for this rule.

## Presets

This rule is included in the following presets:

| Preset | Setting |
| - | - |
| [`remark-preset-lint-consistent`](https://github.com/remarkjs/remark-lint/tree/main/packages/remark-preset-lint-consistent) | `'consistent'` |
| [`remark-preset-lint-markdown-style-guide`](https://github.com/remarkjs/remark-lint/tree/main/packages/remark-preset-lint-markdown-style-guide) | `'"'` |

## Example

##### `ok.md`

When configured with `'"'`.

###### In

```markdown
[Example](http://example.com#without-title)
[Example](http://example.com "Example Domain")
![Example](http://example.com "Example Domain")

[Example]: http://example.com "Example Domain"

You can use parens in URLs if they’re not a title (see GH-166):

[Example](#Heading-(optional))
```

###### Out

No messages.

##### `not-ok.md`

When configured with `'"'`.

###### In

```markdown
[Example]: http://example.com 'Example Domain'
```

###### Out

```text
1:31-1:47: Titles should use `"` as a quote
```

##### `ok.md`

When configured with `"'"`.

###### In

```markdown
[Example](http://example.com#without-title)
[Example](http://example.com 'Example Domain')
![Example](http://example.com 'Example Domain')

[Example]: http://example.com 'Example Domain'
```

###### Out

No messages.

##### `not-ok.md`

When configured with `"'"`.

###### In

```markdown
[Example]: http://example.com "Example Domain"
```

###### Out

```text
1:31-1:47: Titles should use `'` as a quote
```

##### `ok.md`

When configured with `'()'`.

###### In

```markdown
[Example](http://example.com#without-title)
[Example](http://example.com (Example Domain))
![Example](http://example.com (Example Domain))

[Example]: http://example.com (Example Domain)
```

###### Out

No messages.

##### `not-ok.md`

When configured with `'()'`.

###### In

```markdown
[Example](http://example.com 'Example Domain')
```

###### Out

```text
1:30-1:46: Titles should use `()` as a quote
```

##### `not-ok.md`

###### In

```markdown
[Example](http://example.com "Example Domain")
[Example](http://example.com 'Example Domain')
```

###### Out

```text
2:30-2:46: Titles should use `"` as a quote
```

##### `not-ok.md`

When configured with `'💩'`.

###### Out

```text
1:1: Incorrect link title style marker `💩`: use either `'consistent'`, `'"'`, `'\''`, or `'()'`
```

## Install

[npm][]:

```sh
npm install remark-lint-link-title-style
```

## Use

You probably want to use it on the CLI through a config file:

```diff
 …
 "remarkConfig": {
   "plugins": [
     …
     "lint",
+    "lint-link-title-style",
     …
   ]
 }
 …
```

Or use it on the CLI directly

```sh
remark -u lint -u lint-link-title-style readme.md
```

Or use this on the API:

```diff
 var remark = require('remark')
 var report = require('vfile-reporter')

 remark()
   .use(require('remark-lint'))
+  .use(require('remark-lint-link-title-style'))
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

[downloads-badge]: https://img.shields.io/npm/dm/remark-lint-link-title-style.svg

[downloads]: https://www.npmjs.com/package/remark-lint-link-title-style

[size-badge]: https://img.shields.io/bundlephobia/minzip/remark-lint-link-title-style.svg

[size]: https://bundlephobia.com/result?p=remark-lint-link-title-style

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
