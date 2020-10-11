<!--This file is generated-->

# remark-lint-list-item-bullet-indent

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

Warn when list item bullets are indented.

## Fix

[`remark-stringify`](https://github.com/remarkjs/remark/tree/HEAD/packages/remark-stringify)
removes all indentation before bullets.

See [Using remark to fix your Markdown](https://github.com/remarkjs/remark-lint#using-remark-to-fix-your-markdown)
on how to automatically fix warnings for this rule.

## Presets

This rule is included in the following presets:

| Preset | Setting |
| - | - |
| [`remark-preset-lint-recommended`](https://github.com/remarkjs/remark-lint/tree/main/packages/remark-preset-lint-recommended) | |

## Example

##### `ok.md`

###### In

```markdown
Paragraph.

* List item
* List item
```

###### Out

No messages.

##### `not-ok.md`

###### In

Note: `·` represents a space.

```markdown
Paragraph.

·* List item
·* List item
```

###### Out

```text
3:3: Incorrect indentation before bullet: remove 1 space
4:3: Incorrect indentation before bullet: remove 1 space
```

## Install

[npm][]:

```sh
npm install remark-lint-list-item-bullet-indent
```

## Use

You probably want to use it on the CLI through a config file:

```diff
 …
 "remarkConfig": {
   "plugins": [
     …
     "lint",
+    "lint-list-item-bullet-indent",
     …
   ]
 }
 …
```

Or use it on the CLI directly

```sh
remark -u lint -u lint-list-item-bullet-indent readme.md
```

Or use this on the API:

```diff
 var remark = require('remark')
 var report = require('vfile-reporter')

 remark()
   .use(require('remark-lint'))
+  .use(require('remark-lint-list-item-bullet-indent'))
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

[downloads-badge]: https://img.shields.io/npm/dm/remark-lint-list-item-bullet-indent.svg

[downloads]: https://www.npmjs.com/package/remark-lint-list-item-bullet-indent

[size-badge]: https://img.shields.io/bundlephobia/minzip/remark-lint-list-item-bullet-indent.svg

[size]: https://bundlephobia.com/result?p=remark-lint-list-item-bullet-indent

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
