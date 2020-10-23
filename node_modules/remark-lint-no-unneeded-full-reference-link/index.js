/**
 * @author Titus Wormer
 * @copyright 2019 Titus Wormer
 * @license MIT
 * @module no-unneeded-full-reference-link
 * @fileoverview
 *   Warn when full reference links are used that could be collapsed.
 *
 *   Full references (such as `[Remark][remark]`) can also be written as a
 *   collapsed reference (`[Remark][]`) if normalising the reference text yields
 *   the label.
 *
 * @example {"name": "ok.md"}
 *
 *   [alpha][]
 *   [Bravo][]
 *   [Charlie][delta]
 *
 *   This only works if the link text is a `text` node:
 *   [`echo`][]
 *   [*foxtrot*][]
 *
 * @example {"name": "not-ok.md", "label": "input"}
 *
 *   [alpha][alpha]
 *   [Bravo][bravo]
 *   [charlie][Charlie]
 *
 * @example {"name": "not-ok.md", "label": "output"}
 *
 *   1:1-1:15: Remove the link label as it matches the reference text
 *   2:1-2:15: Remove the link label as it matches the reference text
 *   3:1-3:19: Remove the link label as it matches the reference text
 */

'use strict'

var rule = require('unified-lint-rule')
var visit = require('unist-util-visit')
var generated = require('unist-util-generated')
var collapseWhiteSpace = require('collapse-white-space')

module.exports = rule(
  'remark-lint:no-unneeded-full-reference-link',
  noUnneededFullReferenceLink
)

var reason = 'Remove the link label as it matches the reference text'

function noUnneededFullReferenceLink(tree, file) {
  visit(tree, 'linkReference', visitor)

  function visitor(node) {
    if (
      generated(node) ||
      node.referenceType !== 'full' ||
      node.children.length !== 1 ||
      node.children[0].type !== 'text' ||
      normalize(node.children[0].value) !== node.identifier
    ) {
      return
    }

    file.message(reason, node)
  }
}

// See: <https://github.com/remarkjs/remark/blob/cc7867b/packages/remark-parse/lib/util/normalize.js>
function normalize(value) {
  return collapseWhiteSpace(value).toLowerCase()
}
