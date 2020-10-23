/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module no-blockquote-without-marker
 * @fileoverview
 *   Warn when blank lines without `>` (greater than) markers are found in a
 *   block quote.
 *
 *   ## Fix
 *
 *   [`remark-stringify`](https://github.com/remarkjs/remark/tree/HEAD/packages/remark-stringify)
 *   adds markers to every line in a block quote.
 *
 *   See [Using remark to fix your Markdown](https://github.com/remarkjs/remark-lint#using-remark-to-fix-your-markdown)
 *   on how to automatically fix warnings for this rule.
 *
 * @example {"name": "ok.md"}
 *
 *   > Foo…
 *   > …bar…
 *   > …baz.
 *
 * @example {"name": "not-ok.md", "label": "input"}
 *
 *   > Foo…
 *   …bar…
 *   > …baz.
 *
 * @example {"name": "not-ok.md", "label": "output"}
 *
 *   2:1: Missing marker in block quote
 */

'use strict'

var rule = require('unified-lint-rule')
var vfileLocation = require('vfile-location')
var visit = require('unist-util-visit')
var position = require('unist-util-position')
var generated = require('unist-util-generated')

module.exports = rule(
  'remark-lint:no-blockquote-without-marker',
  noBlockquoteWithoutMarker
)

var reason = 'Missing marker in block quote'

function noBlockquoteWithoutMarker(tree, file) {
  var contents = String(file)
  var location = vfileLocation(file)
  var last = contents.length

  visit(tree, 'blockquote', visitor)

  function visitor(node) {
    var indent = node.position && node.position.indent
    var start
    var length
    var index
    var line
    var offset
    var character
    var pos

    if (generated(node) || !indent || indent.length === 0) {
      return
    }

    start = position.start(node).line
    length = indent.length
    index = -1

    while (++index < length) {
      line = start + index + 1
      pos = {line: line, column: indent[index]}
      offset = location.toOffset(pos) - 1

      while (++offset < last) {
        character = contents.charAt(offset)

        if (character === '>') {
          break
        }

        /* istanbul ignore else - just for safety */
        if (character !== ' ' && character !== '\t') {
          file.message(reason, pos)
          break
        }
      }
    }
  }
}
