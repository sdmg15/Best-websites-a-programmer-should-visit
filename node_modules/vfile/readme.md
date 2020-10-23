# [![vfile][]][unified]

[![GitHub CI][github-ci-badge]][github-ci]
[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

**vfile** is a virtual file format part of the [unified][] [collective][].

## Intro

**vfile** is a virtual file format used by [**unified**][unified], a text
processing umbrella (it powers [**retext**][retext] for natural language,
[**remark**][remark] for markdown, and [**rehype**][rehype] for HTML).
Each processors that parse, transform, and compile text, and need a virtual
representation of files and a place to store [messages][] about them.
Plus, they work in the browser.
**vfile** provides these requirements at a small size.

*   Visit [`unifiedjs.com`][website] and see its [learn][] section for an
    overview
*   Read [unified][]’s readme for a technical intro
*   Follow us on [Medium][] and [Twitter][] to see what we’re up to
*   Check out [Contribute][] below to find out how to help out

> **vfile** is different from the excellent [`vinyl`][vinyl] in that it has
> a smaller API, a smaller size, and focuses on [messages][].

vfile can be used anywhere where files need a lightweight representation.
For example, it’s used in:

*   [`documentation`](https://github.com/documentationjs/documentation)
    — The documentation system for modern JavaScript
*   [`awoo`](https://github.com/awoojs/awoo)
    — Declarative small site generator
*   [`geojsonhint`](https://github.com/mapbox/geojsonhint)
    — Complete, fast, standards-based validation for geojson

## Sponsors

<!--lint ignore no-html-->

<table>
  <tr valign="top">
    <td width="33.33%" align="center" colspan="2">
      <a href="https://www.gatsbyjs.org">Gatsby</a><br>🥇<br><br>
      <a href="https://www.gatsbyjs.org"><img src="https://avatars1.githubusercontent.com/u/12551863?s=900&v=4"></a>
    </td>
    <td width="33.33%" align="center" colspan="2">
      <a href="https://vercel.com">Vercel</a><br>🥇<br><br>
      <!--OC has a sharper image-->
      <a href="https://vercel.com"><img src="https://images.opencollective.com/vercel/d8a5bee/logo/512.png"></a>
    </td>
    <td width="33.33%" align="center" colspan="2">
      <a href="https://www.netlify.com">Netlify</a><br><br><br>
      <!--OC has a sharper image-->
      <a href="https://www.netlify.com"><img src="https://images.opencollective.com/netlify/4087de2/logo/512.png"></a>
    </td>
  </tr>
  <tr valign="top">
    <td width="16.67%" align="center">
      <a href="https://www.holloway.com">Holloway</a><br><br><br>
      <a href="https://www.holloway.com"><img src="https://avatars1.githubusercontent.com/u/35904294?s=300&v=4"></a>
    </td>
    <td width="16.67%" align="center">
      <a href="https://themeisle.com">ThemeIsle</a><br>🥉<br><br>
      <a href="https://themeisle.com"><img src="https://twitter-avatar.now.sh/themeisle"></a>
    </td>
    <td width="16.67%" align="center">
      <a href="https://boostio.co">BoostIO</a><br>🥉<br><br>
      <a href="https://boostio.co"><img src="https://avatars1.githubusercontent.com/u/13612118?s=300&v=4"></a>
    </td>
    <td width="16.67%" align="center">
      <a href="https://expo.io">Expo</a><br>🥉<br><br>
      <a href="https://expo.io"><img src="https://avatars1.githubusercontent.com/u/12504344?s=300&v=4"></a>
    </td>
    <td width="50%" align="center" colspan="2">
      <br><br><br><br>
      <a href="https://opencollective.com/unified"><strong>You?</strong></a>
    </td>
  </tr>
</table>

## Install

[npm][]:

```sh
npm install vfile
```

## Contents

*   [Use](#use)
*   [API](#api)
    *   [`VFile([options])`](#vfileoptions)
    *   [`vfile.contents`](#vfilecontents)
    *   [`vfile.cwd`](#vfilecwd)
    *   [`vfile.path`](#vfilepath)
    *   [`vfile.basename`](#vfilebasename)
    *   [`vfile.stem`](#vfilestem)
    *   [`vfile.extname`](#vfileextname)
    *   [`vfile.dirname`](#vfiledirname)
    *   [`vfile.history`](#vfilehistory)
    *   [`vfile.messages`](#vfilemessages)
    *   [`vfile.data`](#vfiledata)
    *   [`VFile#toString([encoding])`](#vfiletostringencoding)
    *   [`VFile#message(reason[, position][, origin])`](#vfilemessagereason-position-origin)
    *   [`VFile#info(reason[, position][, origin])`](#vfileinforeason-position-origin)
    *   [`VFile#fail(reason[, position][, origin])`](#vfilefailreason-position-origin)
*   [Utilities](#utilities)
*   [Reporters](#reporters)
*   [Contribute](#contribute)
*   [Acknowledgments](#acknowledgments)
*   [License](#license)

## Use

```js
var vfile = require('vfile')

var file = vfile({path: '~/example.txt', contents: 'Alpha *braavo* charlie.'})

file.path // => '~/example.txt'
file.dirname // => '~'

file.extname = '.md'

file.basename // => 'example.md'

file.basename = 'index.text'

file.history // => ['~/example.txt', '~/example.md', '~/index.text']

file.message('`braavo` is misspelt; did you mean `bravo`?', {
  line: 1,
  column: 8
})

console.log(file.messages)
```

Yields:

```js
[ { [~/index.text:1:8: `braavo` is misspelt; did you mean `bravo`?]
    message: '`braavo` is misspelt; did you mean `bravo`?',
    name: '~/index.text:1:8',
    file: '~/index.text',
    reason: '`braavo` is misspelt; did you mean `bravo`?',
    line: 1,
    column: 8,
    location: { start: [Object], end: [Object] },
    ruleId: null,
    source: null,
    fatal: false } ]
```

## API

### `VFile([options])`

Create a new virtual file.
If `options` is `string` or `Buffer`, treats it as `{contents: options}`.
If `options` is a `VFile`, returns it.
All other options are set on the newly created `vfile`.

Path related properties are set in the following order (least specific to most
specific): `history`, `path`, `basename`, `stem`, `extname`, `dirname`.

It’s not possible to set either `dirname` or `extname` without setting either
`history`, `path`, `basename`, or `stem` as well.

###### Example

```js
vfile()
vfile('console.log("alpha");')
vfile(Buffer.from('exit 1'))
vfile({path: path.join(__dirname, 'readme.md')})
vfile({stem: 'readme', extname: '.md', dirname: __dirname})
vfile({other: 'properties', are: 'copied', ov: {e: 'r'}})
```

### `vfile.contents`

`Buffer`, `string`, `null` — Raw value.

### `vfile.cwd`

`string` — Base of `path`.
Defaults to `process.cwd()`.

### `vfile.path`

`string?` — Path of `vfile`.
Cannot be nullified.

### `vfile.basename`

`string?` — Current name (including extension) of `vfile`.
Cannot contain path separators.
Cannot be nullified either (use `file.path = file.dirname` instead).

### `vfile.stem`

`string?` — Name (without extension) of `vfile`.
Cannot be nullified, and cannot contain path separators.

### `vfile.extname`

`string?` — Extension (with dot) of `vfile`.
Cannot be set if there’s no `path` yet and cannot contain path separators.

### `vfile.dirname`

`string?` — Path to parent directory of `vfile`.
Cannot be set if there’s no `path` yet.

### `vfile.history`

`Array.<string>` — List of file-paths the file moved between.

### `vfile.messages`

[`Array.<VMessage>`][message] — List of messages associated with the file.

### `vfile.data`

`Object` — Place to store custom information.
It’s OK to store custom data directly on the `vfile`, moving it to `data` gives
a *little* more privacy.

### `VFile#toString([encoding])`

Convert contents of `vfile` to string.
If `contents` is a buffer, `encoding` is used to stringify buffers (default:
`'utf8'`).

### `VFile#message(reason[, position][, origin])`

Associates a message with the file, where `fatal` is set to `false`.
Constructs a new [`VMessage`][vmessage] and adds it to
[`vfile.messages`][messages].

##### Returns

[`VMessage`][vmessage].

### `VFile#info(reason[, position][, origin])`

Associates an informational message with the file, where `fatal` is set to
`null`.
Calls [`#message()`][message] internally.

##### Returns

[`VMessage`][vmessage].

### `VFile#fail(reason[, position][, origin])`

Associates a fatal message with the file, then immediately throws it.
Note: fatal errors mean a file is no longer processable.
Calls [`#message()`][message] internally.

##### Throws

[`VMessage`][vmessage].

## Utilities

The following list of projects includes tools for working with virtual files.
See **[unist][]** for projects working with nodes.

*   [`convert-vinyl-to-vfile`](https://github.com/dustinspecker/convert-vinyl-to-vfile)
    — transform from [Vinyl][] to vfile
*   [`to-vfile`](https://github.com/vfile/to-vfile)
    — create a vfile from a filepath
*   [`vfile-find-down`](https://github.com/vfile/vfile-find-down)
    — find files by searching the file system downwards
*   [`vfile-find-up`](https://github.com/vfile/vfile-find-up)
    — find files by searching the file system upwards
*   [`vfile-glob`](https://github.com/shinnn/vfile-glob)
    — find files by glob patterns
*   [`vfile-is`](https://github.com/vfile/vfile-is)
    — check if a vfile passes a test
*   [`vfile-location`](https://github.com/vfile/vfile-location)
    — convert between positional and offset locations
*   [`vfile-matter`](https://github.com/vfile/vfile-matter)
    — parse the YAML front matter
*   [`vfile-message`](https://github.com/vfile/vfile-message)
    — create a vfile message
*   [`vfile-messages-to-vscode-diagnostics`](https://github.com/shinnn/vfile-messages-to-vscode-diagnostics)
    — transform vfile messages to VS Code diagnostics
*   [`vfile-mkdirp`](https://github.com/vfile/vfile-mkdirp)
    — make sure the directory of a vfile exists on the file system
*   [`vfile-rename`](https://github.com/vfile/vfile-rename)
    — rename the path parts of a vfile
*   [`vfile-sort`](https://github.com/vfile/vfile-sort)
    — sort messages by line/column
*   [`vfile-statistics`](https://github.com/vfile/vfile-statistics)
    — count messages per category: failures, warnings, etc
*   [`vfile-to-eslint`](https://github.com/vfile/vfile-to-eslint)
    — convert to ESLint formatter compatible output

## Reporters

The following list of projects show linting results for given virtual files.
Reporters *must* accept `Array.<VFile>` as their first argument, and return
`string`.
Reporters *may* accept other values too, in which case it’s suggested to stick
to `vfile-reporter`s interface.

*   [`vfile-reporter`][reporter]
    — create a report
*   [`vfile-reporter-json`](https://github.com/vfile/vfile-reporter-json)
    — create a JSON report
*   [`vfile-reporter-folder-json`](https://github.com/vfile/vfile-reporter-folder-json)
    — create a JSON representation of vfiles
*   [`vfile-reporter-pretty`](https://github.com/vfile/vfile-reporter-pretty)
    — create a pretty report
*   [`vfile-reporter-junit`](https://github.com/kellyselden/vfile-reporter-junit)
    — create a jUnit report
*   [`vfile-reporter-position`](https://github.com/Hocdoc/vfile-reporter-position)
    — create a report with content excerpts

## Contribute

See [`contributing.md`][contributing] in [`vfile/.github`][health] for ways to
get started.
See [`support.md`][support] for ways to get help.
Ideas for new utilities and tools can be posted in [`vfile/ideas`][ideas].

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## Acknowledgments

The initial release of this project was authored by
[**@wooorm**](https://github.com/wooorm).

Thanks to [**@contra**](https://github.com/contra),
[**@phated**](https://github.com/phated), and others for their work on
[Vinyl][], which was a huge inspiration.

Thanks to
[**@brendo**](https://github.com/brendo),
[**@shinnn**](https://github.com/shinnn),
[**@KyleAMathews**](https://github.com/KyleAMathews),
[**@sindresorhus**](https://github.com/sindresorhus), and
[**@denysdovhan**](https://github.com/denysdovhan)
for contributing commits since!

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[github-ci-badge]: https://github.com/vfile/vfile/workflows/CI/badge.svg

[github-ci]: https://github.com/vfile/vfile/actions

[build-badge]: https://img.shields.io/travis/vfile/vfile.svg

[build]: https://travis-ci.org/vfile/vfile

[coverage-badge]: https://img.shields.io/codecov/c/github/vfile/vfile.svg

[coverage]: https://codecov.io/github/vfile/vfile

[downloads-badge]: https://img.shields.io/npm/dm/vfile.svg

[downloads]: https://www.npmjs.com/package/vfile

[size-badge]: https://img.shields.io/bundlephobia/minzip/vfile.svg

[size]: https://bundlephobia.com/result?p=vfile

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-spectrum-7b16ff.svg

[chat]: https://spectrum.chat/unified/vfile

[npm]: https://docs.npmjs.com/cli/install

[contributing]: https://github.com/vfile/.github/blob/HEAD/contributing.md

[support]: https://github.com/vfile/.github/blob/HEAD/support.md

[health]: https://github.com/vfile/.github

[coc]: https://github.com/vfile/.github/blob/HEAD/code-of-conduct.md

[license]: license

[author]: https://wooorm.com

[vfile]: https://raw.githubusercontent.com/vfile/vfile/7e1e6a6/logo.svg?sanitize=true

[unified]: https://github.com/unifiedjs/unified

[retext]: https://github.com/retextjs/retext

[remark]: https://github.com/remarkjs/remark

[rehype]: https://github.com/rehypejs/rehype

[vinyl]: https://github.com/gulpjs/vinyl

[unist]: https://github.com/syntax-tree/unist#list-of-utilities

[reporter]: https://github.com/vfile/vfile-reporter

[vmessage]: https://github.com/vfile/vfile-message

[messages]: #vfilemessages

[message]: #vfilemessagereason-position-origin

[website]: https://unifiedjs.com

[learn]: https://unifiedjs.com/learn/

[contribute]: #contribute

[ideas]: https://github.com/vfile/ideas

[medium]: https://medium.com/unifiedjs

[twitter]: https://twitter.com/unifiedjs
