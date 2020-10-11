<!--This file is generated-->

# remark-lint-fenced-code-marker

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

Warn for violating fenced code markers.

Options: ``'`'``, `'~'`, or `'consistent'`, default: `'consistent'`.

`'consistent'` detects the first used fenced code marker style and warns
when subsequent fenced code blocks use different styles.

## Fix

[`remark-stringify`](https://github.com/remarkjs/remark/tree/HEAD/packages/remark-stringify)
formats fences using ``'`'`` (grave accent) by default.
Pass
[`fence: '~'`](https://github.com/remarkjs/remark/tree/HEAD/packages/remark-stringify#optionsfence)
to use `~` (tilde) instead.

See [Using remark to fix your Markdown](https://github.com/remarkjs/remark-lint#using-remark-to-fix-your-markdown)
on how to automatically fix warnings for this rule.

## Presets

This rule is included in the following presets:

| Preset | Setting |
| - | - |
| [`remark-preset-lint-consistent`](https://github.com/remarkjs/remark-lint/tree/main/packages/remark-preset-lint-consistent) | `'consistent'` |
| [`remark-preset-lint-markdown-style-guide`](https://github.com/remarkjs/remark-lint/tree/main/packages/remark-preset-lint-markdown-style-guide) | ``'`'`` |

## Example

##### `ok.md`

###### In

```markdown
Indented code blocks are not affected by this rule:

    bravo();
```

###### Out

No messages.

##### `not-ok-consistent-tick.md`

###### In

````markdown
```alpha
bravo();
```

~~~
charlie();
~~~
````

###### Out

```text
5:1-7:4: Fenced code should use `` ` `` as a marker
```

##### `not-ok-consistent-tilde.md`

###### In

````markdown
~~~alpha
bravo();
~~~

```
charlie();
```
````

###### Out

```text
5:1-7:4: Fenced code should use `~` as a marker
```

##### `ok.md`

When configured with ``'`'``.

###### In

````markdown
```alpha
bravo();
```

```
charlie();
```
````

###### Out

No messages.

##### `ok.md`

When configured with `'~'`.

###### In

```markdown
~~~alpha
bravo();
~~~

~~~
charlie();
~~~
```

###### Out

No messages.

##### `not-ok-incorrect.md`

When configured with `'💩'`.

###### Out

```text
1:1: Incorrect fenced code marker `💩`: use either `'consistent'`, `` '`' ``, or `'~'`
```

## Install

[npm][]:

```sh
npm install remark-lint-fenced-code-marker
```

## Use

You probably want to use it on the CLI through a config file:

```diff
 …
 "remarkConfig": {
   "plugins": [
     …
     "lint",
+    "lint-fenced-code-marker",
     …
   ]
 }
 …
```

Or use it on the CLI directly

```sh
remark -u lint -u lint-fenced-code-marker readme.md
```

Or use this on the API:

```diff
 var remark = require('remark')
 var report = require('vfile-reporter')

 remark()
   .use(require('remark-lint'))
+  .use(require('remark-lint-fenced-code-marker'))
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

[downloads-badge]: https://img.shields.io/npm/dm/remark-lint-fenced-code-marker.svg

[downloads]: https://www.npmjs.com/package/remark-lint-fenced-code-marker

[size-badge]: https://img.shields.io/bundlephobia/minzip/remark-lint-fenced-code-marker.svg

[size]: https://bundlephobia.com/result?p=remark-lint-fenced-code-marker

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
