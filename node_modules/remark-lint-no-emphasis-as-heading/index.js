/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module no-emphasis-as-heading
 * @fileoverview
 *   Warn when emphasis (including strong), instead of a heading, introduces
 *   a paragraph.
 *
 * @example {"name": "ok.md"}
 *
 *   # Foo
 *
 *   Bar.
 *
 * @example {"name": "not-ok.md", "label": "input"}
 *
 *   *Foo*
 *
 *   Bar.
 *
 *   __Qux__
 *
 *   Quux.
 *
 * @example {"name": "not-ok.md", "label": "output"}
 *
 *   1:1-1:6: Don’t use emphasis to introduce a section, use a heading
 *   5:1-5:8: Don’t use emphasis to introduce a section, use a heading
 */

'use strict'

var rule = require('unified-lint-rule')
var visit = require('unist-util-visit')
var generated = require('unist-util-generated')

module.exports = rule('remark-lint:no-emphasis-as-heading', noEmphasisAsHeading)

var reason = 'Don’t use emphasis to introduce a section, use a heading'

function noEmphasisAsHeading(tree, file) {
  visit(tree, 'paragraph', visitor)

  function visitor(node, index, parent) {
    var head = node.children[0]
    var previous = parent.children[index - 1]
    var next = parent.children[index + 1]

    if (
      !generated(node) &&
      (!previous || previous.type !== 'heading') &&
      next &&
      next.type === 'paragraph' &&
      node.children.length === 1 &&
      (head.type === 'emphasis' || head.type === 'strong')
    ) {
      file.message(reason, node)
    }
  }
}
