/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module no-table-indentation
 * @fileoverview
 *   Warn when tables are indented.
 *
 *   ## Fix
 *
 *   [`remark-stringify`](https://github.com/remarkjs/remark/tree/HEAD/packages/remark-stringify)
 *   removes all unneeded indentation before tables.
 *
 *   See [Using remark to fix your Markdown](https://github.com/remarkjs/remark-lint#using-remark-to-fix-your-markdown)
 *   on how to automatically fix warnings for this rule.
 *
 * @example {"name": "ok.md"}
 *
 *   Paragraph.
 *
 *   | A     | B     |
 *   | ----- | ----- |
 *   | Alpha | Bravo |
 *
 * @example {"name": "not-ok.md", "label": "input"}
 *
 *   Paragraph.
 *
 *   ···| A     | B     |
 *   ···| ----- | ----- |
 *   ···| Alpha | Bravo |
 *
 * @example {"name": "not-ok.md", "label": "output"}
 *
 *   3:1-3:21: Do not indent table rows
 *   5:1-5:21: Do not indent table rows
 */

'use strict'

var rule = require('unified-lint-rule')
var visit = require('unist-util-visit')
var position = require('unist-util-position')
var generated = require('unist-util-generated')

module.exports = rule('remark-lint:no-table-indentation', noTableIndentation)

var reason = 'Do not indent table rows'

function noTableIndentation(tree, file) {
  var contents = String(file)

  visit(tree, 'table', visitor)

  function visitor(node) {
    if (!generated(node)) {
      node.children.forEach(each)
    }

    return visit.SKIP
  }

  function each(row) {
    var fence = contents.slice(
      position.start(row).offset,
      position.start(row.children[0]).offset
    )

    if (fence.indexOf('|') > 1) {
      file.message(reason, row)
    }
  }
}
