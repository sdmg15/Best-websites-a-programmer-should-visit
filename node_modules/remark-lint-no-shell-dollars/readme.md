<!--This file is generated-->

# remark-lint-no-shell-dollars

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

Warn when shell code is prefixed by `$` (dollar sign) characters.

Ignores indented code blocks and fenced code blocks without language flag.

## Presets

This rule is included in the following presets:

| Preset | Setting |
| - | - |
| [`remark-preset-lint-markdown-style-guide`](https://github.com/remarkjs/remark-lint/tree/main/packages/remark-preset-lint-markdown-style-guide) | |

## Example

##### `ok.md`

###### In

````markdown
```bash
echo a
```

```sh
echo a
echo a > file
```

```zsh
$ echo a
a
$ echo a > file
```

Some empty code:

```command
```

It’s fine to use dollars in non-shell code.

```js
$('div').remove();
```
````

###### Out

No messages.

##### `not-ok.md`

###### In

````markdown
```sh
$ echo a
```

```bash
$ echo a
$ echo a > file
```
````

###### Out

```text
1:1-3:4: Do not use dollar signs before shell commands
5:1-8:4: Do not use dollar signs before shell commands
```

## Install

[npm][]:

```sh
npm install remark-lint-no-shell-dollars
```

## Use

You probably want to use it on the CLI through a config file:

```diff
 …
 "remarkConfig": {
   "plugins": [
     …
     "lint",
+    "lint-no-shell-dollars",
     …
   ]
 }
 …
```

Or use it on the CLI directly

```sh
remark -u lint -u lint-no-shell-dollars readme.md
```

Or use this on the API:

```diff
 var remark = require('remark')
 var report = require('vfile-reporter')

 remark()
   .use(require('remark-lint'))
+  .use(require('remark-lint-no-shell-dollars'))
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

[downloads-badge]: https://img.shields.io/npm/dm/remark-lint-no-shell-dollars.svg

[downloads]: https://www.npmjs.com/package/remark-lint-no-shell-dollars

[size-badge]: https://img.shields.io/bundlephobia/minzip/remark-lint-no-shell-dollars.svg

[size]: https://bundlephobia.com/result?p=remark-lint-no-shell-dollars

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
