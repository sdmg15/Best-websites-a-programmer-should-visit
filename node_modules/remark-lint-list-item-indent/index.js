/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module list-item-indent
 * @fileoverview
 *   Warn when the spacing between a list item’s bullet and its content violates
 *   a given style.
 *
 *   Options: `'tab-size'`, `'mixed'`, or `'space'`, default: `'tab-size'`.
 *
 *   ## Fix
 *
 *   [`remark-stringify`](https://github.com/remarkjs/remark/tree/HEAD/packages/remark-stringify)
 *   uses `'tab-size'` (named `'tab'` there) by default to ensure Markdown is
 *   seen the same way across vendors.
 *   This can be configured with the
 *   [`listItemIndent`](https://github.com/remarkjs/remark/tree/HEAD/packages/remark-stringify#optionslistitemindent)
 *   option.
 *   This rule’s `'space'` option is named `'1'` there.
 *
 *   See [Using remark to fix your Markdown](https://github.com/remarkjs/remark-lint#using-remark-to-fix-your-markdown)
 *   on how to automatically fix warnings for this rule.
 *
 * @example {"name": "ok.md"}
 *
 *   *···List
 *   ····item.
 *
 *   Paragraph.
 *
 *   11.·List
 *   ····item.
 *
 *   Paragraph.
 *
 *   *···List
 *   ····item.
 *
 *   *···List
 *   ····item.
 *
 * @example {"name": "ok.md", "setting": "mixed"}
 *
 *   *·List item.
 *
 *   Paragraph.
 *
 *   11.·List item
 *
 *   Paragraph.
 *
 *   *···List
 *   ····item.
 *
 *   *···List
 *   ····item.
 *
 * @example {"name": "ok.md", "setting": "space"}
 *
 *   *·List item.
 *
 *   Paragraph.
 *
 *   11.·List item
 *
 *   Paragraph.
 *
 *   *·List
 *   ··item.
 *
 *   *·List
 *   ··item.
 *
 * @example {"name": "not-ok.md", "setting": "space", "label": "input"}
 *
 *   *···List
 *   ····item.
 *
 * @example {"name": "not-ok.md", "setting": "space", "label": "output"}
 *
 *    1:5: Incorrect list-item indent: remove 2 spaces
 *
 * @example {"name": "not-ok.md", "setting": "tab-size", "label": "input"}
 *
 *   *·List
 *   ··item.
 *
 * @example {"name": "not-ok.md", "setting": "tab-size", "label": "output"}
 *
 *    1:3: Incorrect list-item indent: add 2 spaces
 *
 * @example {"name": "not-ok.md", "setting": "mixed", "label": "input"}
 *
 *   *···List item.
 *
 * @example {"name": "not-ok.md", "setting": "mixed", "label": "output"}
 *
 *    1:5: Incorrect list-item indent: remove 2 spaces
 *
 * @example {"name": "not-ok.md", "setting": "💩", "label": "output", "config": {"positionless": true}}
 *
 *    1:1: Incorrect list-item indent style `💩`: use either `'tab-size'`, `'space'`, or `'mixed'`
 */

'use strict'

var rule = require('unified-lint-rule')
var plural = require('pluralize')
var visit = require('unist-util-visit')
var position = require('unist-util-position')
var generated = require('unist-util-generated')

module.exports = rule('remark-lint:list-item-indent', listItemIndent)

var start = position.start

var styles = {'tab-size': true, mixed: true, space: true}

function listItemIndent(tree, file, option) {
  var contents = String(file)
  var preferred = typeof option === 'string' ? option : 'tab-size'

  if (styles[preferred] !== true) {
    file.fail(
      'Incorrect list-item indent style `' +
        preferred +
        "`: use either `'tab-size'`, `'space'`, or `'mixed'`"
    )
  }

  visit(tree, 'list', visitor)

  function visitor(node) {
    var spread = node.spread || node.loose

    if (!generated(node)) {
      node.children.forEach(visitItem)
    }

    function visitItem(item) {
      var head = item.children[0]
      var final = start(head)
      var marker
      var bulletSize
      var style
      var diff
      var reason
      var abs

      marker = contents
        .slice(start(item).offset, final.offset)
        .replace(/\[[x ]?]\s*$/i, '')

      bulletSize = marker.replace(/\s+$/, '').length

      style =
        preferred === 'tab-size' || (preferred === 'mixed' && spread)
          ? Math.ceil(bulletSize / 4) * 4
          : bulletSize + 1

      if (marker.length !== style) {
        diff = style - marker.length
        abs = Math.abs(diff)

        reason =
          'Incorrect list-item indent: ' +
          (diff > 0 ? 'add' : 'remove') +
          ' ' +
          abs +
          ' ' +
          plural('space', abs)

        file.message(reason, final)
      }
    }
  }
}
