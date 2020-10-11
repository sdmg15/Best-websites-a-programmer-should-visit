/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module table-pipe-alignment
 * @fileoverview
 *   Warn when table pipes are not aligned.
 *
 *   ## Fix
 *
 *   [`remark-stringify`](https://github.com/remarkjs/remark/tree/HEAD/packages/remark-stringify)
 *   tries to align tables by default.
 *   Pass
 *   [`paddedTable: false`](https://github.com/remarkjs/remark/tree/HEAD/packages/remark-stringify#optionspaddedtable)
 *   to not align cells.
 *
 *   Aligning cells perfectly is impossible as some characters (such as emoji or
 *   Chinese characters) are rendered differently in different browsers,
 *   terminals, and editors.
 *   You can pass your own
 *   [`stringLength`](https://github.com/remarkjs/remark/tree/HEAD/packages/remark-stringify#optionsstringlength)
 *   function to customize how cells are aligned.
 *   In that case, this rule must be turned off.
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
 *   | A | B |
 *   | -- | -- |
 *   | Alpha | Bravo |
 *
 * @example {"name": "not-ok.md", "label": "output"}
 *
 *   3:9-3:10: Misaligned table fence
 *   3:17-3:18: Misaligned table fence
 */

'use strict'

var rule = require('unified-lint-rule')
var visit = require('unist-util-visit')
var position = require('unist-util-position')
var generated = require('unist-util-generated')

module.exports = rule('remark-lint:table-pipe-alignment', tablePipeAlignment)

var start = position.start
var end = position.end

var reason = 'Misaligned table fence'

function tablePipeAlignment(tree, file) {
  var contents = String(file)

  visit(tree, 'table', visitor)

  function visitor(node) {
    var rows = node.children
    var length = generated(node) ? 0 : rows.length
    var index = -1
    var indices = []
    var row
    var cells
    var begin
    var column
    var columns
    var cell
    var initial
    var final
    var next
    var nextIndex
    var fence
    var pos

    while (++index < length) {
      row = rows[index]
      begin = start(row)
      cells = row.children
      columns = cells.length
      column = -2 // Start without a first cell.
      next = null

      while (++column < columns) {
        cell = next
        nextIndex = column + 1
        next = cells[nextIndex]

        initial = cell ? end(cell).offset : start(row).offset
        final = next ? start(next).offset : end(row).offset
        fence = contents.slice(initial, final)
        pos = initial + fence.indexOf('|') - begin.offset + 1

        if (indices[nextIndex] === undefined || indices[nextIndex] === null) {
          indices[nextIndex] = pos
        } else if (pos !== indices[nextIndex]) {
          file.message(reason, {
            start: {line: begin.line, column: pos},
            end: {line: begin.line, column: pos + 1}
          })
        }
      }
    }
  }
}
