/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module no-multiple-toplevel-headings
 * @fileoverview
 *   Warn when multiple top level headings are used.
 *
 *   Options: `number`, default: `1`.
 *
 * @example {"name": "ok.md", "setting": 1}
 *
 *   # Foo
 *
 *   ## Bar
 *
 * @example {"name": "not-ok.md", "setting": 1, "label": "input"}
 *
 *   # Foo
 *
 *   # Bar
 *
 * @example {"name": "not-ok.md", "setting": 1, "label": "output"}
 *
 *   3:1-3:6: Don’t use multiple top level headings (1:1)
 */

'use strict'

var rule = require('unified-lint-rule')
var visit = require('unist-util-visit')
var start = require('unist-util-position').start
var generated = require('unist-util-generated')
var stringify = require('unist-util-stringify-position')

module.exports = rule(
  'remark-lint:no-multiple-toplevel-headings',
  noMultipleToplevelHeadings
)

function noMultipleToplevelHeadings(tree, file, option) {
  var preferred = option || 1
  var duplicate

  visit(tree, 'heading', visitor)

  function visitor(node) {
    if (!generated(node) && node.depth === preferred) {
      if (duplicate) {
        file.message(
          'Don’t use multiple top level headings (' + duplicate + ')',
          node
        )
      } else {
        duplicate = stringify(start(node))
      }
    }
  }
}
