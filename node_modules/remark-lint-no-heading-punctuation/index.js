/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module no-heading-punctuation
 * @fileoverview
 *   Warn when a heading ends with a group of characters.
 *
 *   Options: `string`, default: `'.,;:!?'`.
 *
 *   Note: these are added to a regex, in a group (`'[' + char + ']'`), be
 *   careful to escape the string correctly.
 *
 * @example {"name": "ok.md"}
 *
 *   # Hello
 *
 * @example {"name": "ok.md", "setting": ",;:!?"}
 *
 *   # Hello…
 *
 * @example {"name": "not-ok.md", "label": "input"}
 *
 *   # Hello:
 *
 *   # Hello?
 *
 *   # Hello!
 *
 *   # Hello,
 *
 *   # Hello;
 *
 * @example {"name": "not-ok.md", "label": "output"}
 *
 *   1:1-1:9: Don’t add a trailing `:` to headings
 *   3:1-3:9: Don’t add a trailing `?` to headings
 *   5:1-5:9: Don’t add a trailing `!` to headings
 *   7:1-7:9: Don’t add a trailing `,` to headings
 *   9:1-9:9: Don’t add a trailing `;` to headings
 */

'use strict'

var rule = require('unified-lint-rule')
var visit = require('unist-util-visit')
var generated = require('unist-util-generated')
var toString = require('mdast-util-to-string')

module.exports = rule(
  'remark-lint:no-heading-punctuation',
  noHeadingPunctuation
)

var defaults = '\\.,;:!?'

function noHeadingPunctuation(tree, file, option) {
  var expression = new RegExp(
    '[' + (typeof option === 'string' ? option : defaults) + ']'
  )

  visit(tree, 'heading', visitor)

  function visitor(node) {
    var value
    var tail

    if (!generated(node)) {
      value = toString(node)
      tail = value.charAt(value.length - 1)

      if (expression.test(tail)) {
        file.message('Don’t add a trailing `' + tail + '` to headings', node)
      }
    }
  }
}
