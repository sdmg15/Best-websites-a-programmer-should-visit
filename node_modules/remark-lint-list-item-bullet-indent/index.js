/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module list-item-bullet-indent
 * @fileoverview
 *   Warn when list item bullets are indented.
 *
 *   ## Fix
 *
 *   [`remark-stringify`](https://github.com/remarkjs/remark/tree/HEAD/packages/remark-stringify)
 *   removes all indentation before bullets.
 *
 *   See [Using remark to fix your Markdown](https://github.com/remarkjs/remark-lint#using-remark-to-fix-your-markdown)
 *   on how to automatically fix warnings for this rule.
 *
 * @example {"name": "ok.md"}
 *
 *   Paragraph.
 *
 *   * List item
 *   * List item
 *
 * @example {"name": "not-ok.md", "label": "input"}
 *
 *   Paragraph.
 *
 *   ·* List item
 *   ·* List item
 *
 * @example {"name": "not-ok.md", "label": "output"}
 *
 *   3:3: Incorrect indentation before bullet: remove 1 space
 *   4:3: Incorrect indentation before bullet: remove 1 space
 */

'use strict'

var rule = require('unified-lint-rule')
var plural = require('pluralize')
var visit = require('unist-util-visit')
var position = require('unist-util-position')
var generated = require('unist-util-generated')

module.exports = rule(
  'remark-lint:list-item-bullet-indent',
  listItemBulletIndent
)

var start = position.start

function listItemBulletIndent(tree, file) {
  var contents = String(file)

  visit(tree, 'list', visitor)

  function visitor(node) {
    node.children.forEach(visitItems)
  }

  function visitItems(item) {
    var final
    var indent
    var reason

    if (!generated(item)) {
      final = start(item.children[0])
      indent = contents.slice(start(item).offset, final.offset).match(/^\s*/)[0]
        .length

      if (indent !== 0) {
        reason =
          'Incorrect indentation before bullet: remove ' +
          indent +
          ' ' +
          plural('space', indent)

        file.message(reason, {
          line: final.line,
          column: final.column - indent
        })
      }
    }
  }
}
