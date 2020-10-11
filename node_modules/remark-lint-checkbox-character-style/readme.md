<!--This file is generated-->

# remark-lint-checkbox-character-style

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

Warn when list item checkboxes violate a given style.

Options: `Object` or `'consistent'`, default: `'consistent'`.

`'consistent'` detects the first used checked and unchecked checkbox
styles and warns when subsequent checkboxes use different styles.

Styles can also be passed in like so:

```js
{checked: 'x', unchecked: ' '}
```

## Fix

[`remark-stringify`](https://github.com/remarkjs/remark/tree/HEAD/packages/remark-stringify)
formats checked checkboxes using `x` (lowercase X) and unchecked checkboxes
as `·` (a single space).

See [Using remark to fix your Markdown](https://github.com/remarkjs/remark-lint#using-remark-to-fix-your-markdown)
on how to automatically fix warnings for this rule.

## Presets

This rule is included in the following presets:

| Preset | Setting |
| - | - |
| [`remark-preset-lint-consistent`](https://github.com/remarkjs/remark-lint/tree/main/packages/remark-preset-lint-consistent) | `'consistent'` |

## Example

##### `ok.md`

When configured with `{ checked: 'x' }`.

###### In

```markdown
- [x] List item
- [x] List item
```

###### Out

No messages.

##### `ok.md`

When configured with `{ checked: 'X' }`.

###### In

```markdown
- [X] List item
- [X] List item
```

###### Out

No messages.

##### `ok.md`

When configured with `{ unchecked: ' ' }`.

###### In

Note: `·` represents a space.

```markdown
- [ ] List item
- [ ] List item
- [ ]··
- [ ]
```

###### Out

No messages.

##### `ok.md`

When configured with `{ unchecked: '\t' }`.

###### In

Note: `»` represents a tab.

```markdown
- [»] List item
- [»] List item
```

###### Out

No messages.

##### `not-ok.md`

###### In

Note: `»` represents a tab.

```markdown
- [x] List item
- [X] List item
- [ ] List item
- [»] List item
```

###### Out

```text
2:4-2:5: Checked checkboxes should use `x` as a marker
4:4-4:5: Unchecked checkboxes should use ` ` as a marker
```

##### `not-ok.md`

When configured with `{ unchecked: '💩' }`.

###### Out

```text
1:1: Incorrect unchecked checkbox marker `💩`: use either `'\t'`, or `' '`
```

##### `not-ok.md`

When configured with `{ checked: '💩' }`.

###### Out

```text
1:1: Incorrect checked checkbox marker `💩`: use either `'x'`, or `'X'`
```

## Install

[npm][]:

```sh
npm install remark-lint-checkbox-character-style
```

## Use

You probably want to use it on the CLI through a config file:

```diff
 …
 "remarkConfig": {
   "plugins": [
     …
     "lint",
+    "lint-checkbox-character-style",
     …
   ]
 }
 …
```

Or use it on the CLI directly

```sh
remark -u lint -u lint-checkbox-character-style readme.md
```

Or use this on the API:

```diff
 var remark = require('remark')
 var report = require('vfile-reporter')

 remark()
   .use(require('remark-lint'))
+  .use(require('remark-lint-checkbox-character-style'))
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

[downloads-badge]: https://img.shields.io/npm/dm/remark-lint-checkbox-character-style.svg

[downloads]: https://www.npmjs.com/package/remark-lint-checkbox-character-style

[size-badge]: https://img.shields.io/bundlephobia/minzip/remark-lint-checkbox-character-style.svg

[size]: https://bundlephobia.com/result?p=remark-lint-checkbox-character-style

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
