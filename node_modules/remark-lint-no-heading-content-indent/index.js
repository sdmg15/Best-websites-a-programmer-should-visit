/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module no-heading-content-indent
 * @fileoverview
 *   Warn when content of headings is indented.
 *
 *   ## Fix
 *
 *   [`remark-stringify`](https://github.com/remarkjs/remark/tree/HEAD/packages/remark-stringify)
 *   removes all unneeded padding around content in headings.
 *
 *   See [Using remark to fix your Markdown](https://github.com/remarkjs/remark-lint#using-remark-to-fix-your-markdown)
 *   on how to automatically fix warnings for this rule.
 *
 * @example {"name": "ok.md"}
 *
 *   #·Foo
 *
 *   ## Bar·##
 *
 *     ##·Baz
 *
 *   Setext headings are not affected.
 *
 *   Baz
 *   ===
 *
 * @example {"name": "not-ok.md", "label": "input"}
 *
 *   #··Foo
 *
 *   ## Bar··##
 *
 *     ##··Baz
 *
 * @example {"name": "not-ok.md", "label": "output"}
 *
 *   1:4: Remove 1 space before this heading’s content
 *   3:7: Remove 1 space after this heading’s content
 *   5:7: Remove 1 space before this heading’s content
 *
 * @example {"name": "empty-heading.md"}
 *
 *   #··
 *
 * @example {"name": "tight.md", "config":{"pedantic":true}, "label": "input"}
 *
 *   In pedantic mode, headings without spacing can also be detected:
 *
 *   ##No spacing left, too much right··##
 *
 * @example {"name": "tight.md", "label": "output"}
 *
 *   3:3: Add 1 space before this heading’s content
 *   3:34: Remove 1 space after this heading’s content
 */

'use strict'

var rule = require('unified-lint-rule')
var visit = require('unist-util-visit')
var style = require('mdast-util-heading-style')
var plural = require('pluralize')
var position = require('unist-util-position')
var generated = require('unist-util-generated')

module.exports = rule(
  'remark-lint:no-heading-content-indent',
  noHeadingContentIndent
)

var start = position.start
var end = position.end

function noHeadingContentIndent(tree, file) {
  var contents = String(file)

  visit(tree, 'heading', visitor)

  function visitor(node) {
    var depth
    var children
    var type
    var head
    var initial
    var final
    var diff
    var index
    var char
    var reason
    var abs

    if (generated(node)) {
      return
    }

    depth = node.depth
    children = node.children
    type = style(node, 'atx')

    if (type === 'atx' || type === 'atx-closed') {
      initial = start(node)
      index = initial.offset
      char = contents.charAt(index)

      while (char && char !== '#') {
        char = contents.charAt(++index)
      }

      /* istanbul ignore if - CR/LF bug: remarkjs/remark#195. */
      if (!char) {
        return
      }

      index = depth + (index - initial.offset)
      head = start(children[0]).column

      // Ignore empty headings.
      if (!head) {
        return
      }

      diff = head - initial.column - 1 - index

      if (diff) {
        abs = Math.abs(diff)

        reason =
          (diff > 0 ? 'Remove' : 'Add') +
          ' ' +
          abs +
          ' ' +
          plural('space', abs) +
          ' before this heading’s content'

        file.message(reason, start(children[0]))
      }
    }

    // Closed ATX headings always must have a space between their content and
    // the final hashes, thus, there is no `add x spaces`.
    if (type === 'atx-closed') {
      final = end(children[children.length - 1])
      diff = end(node).column - final.column - 1 - depth

      if (diff) {
        reason =
          'Remove ' +
          diff +
          ' ' +
          plural('space', diff) +
          ' after this heading’s content'

        file.message(reason, final)
      }
    }
  }
}
