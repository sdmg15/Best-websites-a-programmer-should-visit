/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module emphasis-marker
 * @fileoverview
 *   Warn for violating emphasis markers.
 *
 *   Options: `'consistent'`, `'*'`, or `'_'`, default: `'consistent'`.
 *
 *   `'consistent'` detects the first used emphasis style and warns when
 *   subsequent emphasis use different styles.
 *
 *   ## Fix
 *
 *   [`remark-stringify`](https://github.com/remarkjs/remark/tree/HEAD/packages/remark-stringify)
 *   formats emphasis using `_` (underscore) by default.
 *   Pass
 *   [`emphasis: '*'`](https://github.com/remarkjs/remark/tree/HEAD/packages/remark-stringify#optionsemphasis)
 *   to use `*` (asterisk) instead.
 *
 *   See [Using remark to fix your Markdown](https://github.com/remarkjs/remark-lint#using-remark-to-fix-your-markdown)
 *   on how to automatically fix warnings for this rule.
 *
 * @example {"setting": "*", "name": "ok.md"}
 *
 *   *foo*
 *
 * @example {"setting": "*", "name": "not-ok.md", "label": "input"}
 *
 *   _foo_
 *
 * @example {"setting": "*", "name": "not-ok.md", "label": "output"}
 *
 *   1:1-1:6: Emphasis should use `*` as a marker
 *
 * @example {"setting": "_", "name": "ok.md"}
 *
 *   _foo_
 *
 * @example {"setting": "_", "name": "not-ok.md", "label": "input"}
 *
 *   *foo*
 *
 * @example {"setting": "_", "name": "not-ok.md", "label": "output"}
 *
 *   1:1-1:6: Emphasis should use `_` as a marker
 *
 * @example {"name": "not-ok.md", "label": "input"}
 *
 *   *foo*
 *   _bar_
 *
 * @example {"name": "not-ok.md", "label": "output"}
 *
 *   2:1-2:6: Emphasis should use `*` as a marker
 *
 * @example {"setting": "💩", "name": "not-ok.md", "label": "output", "config": {"positionless": true}}
 *
 *   1:1: Incorrect emphasis marker `💩`: use either `'consistent'`, `'*'`, or `'_'`
 */

'use strict'

var rule = require('unified-lint-rule')
var visit = require('unist-util-visit')
var position = require('unist-util-position')
var generated = require('unist-util-generated')

module.exports = rule('remark-lint:emphasis-marker', emphasisMarker)

var markers = {null: true, '*': true, _: true}

function emphasisMarker(tree, file, option) {
  var contents = String(file)
  var preferred =
    typeof option === 'string' && option !== 'consistent' ? option : null

  if (markers[preferred] !== true) {
    file.fail(
      'Incorrect emphasis marker `' +
        preferred +
        "`: use either `'consistent'`, `'*'`, or `'_'`"
    )
  }

  visit(tree, 'emphasis', visitor)

  function visitor(node) {
    var marker

    if (!generated(node)) {
      marker = contents.charAt(position.start(node).offset)

      if (preferred) {
        if (marker !== preferred) {
          file.message(
            'Emphasis should use `' + preferred + '` as a marker',
            node
          )
        }
      } else {
        preferred = marker
      }
    }
  }
}
