/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module list-item-content-indent
 * @fileoverview
 *   Warn when the content of a list item has mixed indentation.
 *
 * @example {"name": "ok.md"}
 *
 *   1.·[x] Alpha
 *   ···1. Bravo
 *
 * @example {"name": "not-ok.md", "label": "input"}
 *
 *   1.·[x] Charlie
 *   ····1. Delta
 *
 * @example {"name": "not-ok.md", "label": "output"}
 *
 *   2:5: Don’t use mixed indentation for children, remove 1 space
 */

'use strict'

var rule = require('unified-lint-rule')
var plural = require('pluralize')
var visit = require('unist-util-visit')
var position = require('unist-util-position')
var generated = require('unist-util-generated')

module.exports = rule(
  'remark-lint:list-item-content-indent',
  listItemContentIndent
)

var start = position.start

function listItemContentIndent(tree, file) {
  var contents = String(file)

  visit(tree, 'listItem', visitor)

  function visitor(node) {
    var style

    node.children.forEach(visitItem)

    function visitItem(item, index) {
      var begin
      var column
      var char
      var diff
      var reason
      var abs

      if (generated(item)) {
        return
      }

      begin = start(item)
      column = begin.column

      // Get indentation for the first child.  Only the first item can have a
      // checkbox, so here we remove that from the column.
      if (index === 0) {
        // If there’s a checkbox before the content, look backwards to find the
        // start of that checkbox.
        if (typeof node.checked === 'boolean') {
          char = begin.offset - 1

          while (contents.charAt(char) !== '[') {
            char--
          }

          column -= begin.offset - char
        }

        style = column

        return
      }

      // Warn for violating children.
      if (column !== style) {
        diff = style - column
        abs = Math.abs(diff)

        reason =
          'Don’t use mixed indentation for children, ' +
          /* istanbul ignore next - hard to test, I couldn’t find it at least. */
          (diff > 0 ? 'add' : 'remove') +
          ' ' +
          abs +
          ' ' +
          plural('space', abs)

        file.message(reason, {
          line: start(item).line,
          column: column
        })
      }
    }
  }
}
