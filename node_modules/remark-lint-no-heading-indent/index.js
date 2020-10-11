/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module no-heading-indent
 * @fileoverview
 *   Warn when a heading is indented.
 *
 *   ## Fix
 *
 *   [`remark-stringify`](https://github.com/remarkjs/remark/tree/HEAD/packages/remark-stringify)
 *   removes all unneeded indentation before headings.
 *
 *   See [Using remark to fix your Markdown](https://github.com/remarkjs/remark-lint#using-remark-to-fix-your-markdown)
 *   on how to automatically fix warnings for this rule.
 *
 * @example {"name": "ok.md"}
 *
 *   #·Hello world
 *
 *   Foo
 *   -----
 *
 *   #·Hello world·#
 *
 *   Bar
 *   =====
 *
 * @example {"name": "not-ok.md", "label": "input"}
 *
 *   ···# Hello world
 *
 *   ·Foo
 *   -----
 *
 *   ·# Hello world #
 *
 *   ···Bar
 *   =====
 *
 * @example {"name": "not-ok.md", "label": "output"}
 *
 *   1:4: Remove 3 spaces before this heading
 *   3:2: Remove 1 space before this heading
 *   6:2: Remove 1 space before this heading
 *   8:4: Remove 3 spaces before this heading
 */

'use strict'

var rule = require('unified-lint-rule')
var plural = require('pluralize')
var visit = require('unist-util-visit')
var position = require('unist-util-position')
var generated = require('unist-util-generated')

module.exports = rule('remark-lint:no-heading-indent', noHeadingIndent)

var start = position.start

function noHeadingIndent(tree, file) {
  var contents = String(file)
  var length = contents.length

  visit(tree, 'heading', visitor)

  function visitor(node) {
    var initial
    var begin
    var index
    var character
    var diff

    if (generated(node)) {
      return
    }

    initial = start(node)
    begin = initial.offset
    index = begin - 1

    while (++index < length) {
      character = contents.charAt(index)

      if (character !== ' ' && character !== '\t') {
        break
      }
    }

    diff = index - begin

    if (diff) {
      file.message(
        'Remove ' + diff + ' ' + plural('space', diff) + ' before this heading',
        {
          line: initial.line,
          column: initial.column + diff
        }
      )
    }
  }
}
