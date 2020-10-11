/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module table-pipes
 * @fileoverview
 *   Warn when table rows are not fenced with pipes.
 *
 *   ## Fix
 *
 *   [`remark-stringify`](https://github.com/remarkjs/remark/tree/HEAD/packages/remark-stringify)
 *   creates fenced rows with initial and final pipes by default.
 *   Pass
 *   [`looseTable: true`](https://github.com/remarkjs/remark/tree/HEAD/packages/remark-stringify#optionsloosetable)
 *   to not use row fences.
 *
 *   See [Using remark to fix your Markdown](https://github.com/remarkjs/remark-lint#using-remark-to-fix-your-markdown)
 *   on how to automatically fix warnings for this rule.
 *
 * @example {"name": "ok.md"}
 *
 *   | A     | B     |
 *   | ----- | ----- |
 *   | Alpha | Bravo |
 *
 * @example {"name": "not-ok.md", "label": "input"}
 *
 *   A     | B
 *   ----- | -----
 *   Alpha | Bravo
 *
 * @example {"name": "not-ok.md", "label": "output"}
 *
 *   1:1: Missing initial pipe in table fence
 *   1:10: Missing final pipe in table fence
 *   3:1: Missing initial pipe in table fence
 *   3:14: Missing final pipe in table fence
 */

'use strict'

var rule = require('unified-lint-rule')
var visit = require('unist-util-visit')
var position = require('unist-util-position')
var generated = require('unist-util-generated')

module.exports = rule('remark-lint:table-pipes', tablePipes)

var start = position.start
var end = position.end

var reasonStart = 'Missing initial pipe in table fence'
var reasonEnd = 'Missing final pipe in table fence'

function tablePipes(tree, file) {
  var contents = String(file)

  visit(tree, 'table', visitor)

  function visitor(node) {
    var rows = node.children
    var length = rows.length
    var index = -1
    var row
    var cells
    var head
    var tail
    var initial
    var final

    while (++index < length) {
      row = rows[index]

      if (!generated(row)) {
        cells = row.children
        head = cells[0]
        tail = cells[cells.length - 1]
        initial = contents.slice(start(row).offset, start(head).offset)
        final = contents.slice(end(tail).offset, end(row).offset)

        if (initial.indexOf('|') === -1) {
          file.message(reasonStart, start(row))
        }

        if (final.indexOf('|') === -1) {
          file.message(reasonEnd, end(row))
        }
      }
    }
  }
}
