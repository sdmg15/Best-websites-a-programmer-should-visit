/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module strong-marker
 * @fileoverview
 *   Warn for violating importance (strong) markers.
 *
 *   Options: `'consistent'`, `'*'`, or `'_'`, default: `'consistent'`.
 *
 *   `'consistent'` detects the first used importance style and warns when
 *   subsequent importance sequences use different styles.
 *
 *   ## Fix
 *
 *   [`remark-stringify`](https://github.com/remarkjs/remark/tree/HEAD/packages/remark-stringify)
 *   formats importance using an `*` (asterisk) by default.
 *   Pass
 *   [`strong: '_'`](https://github.com/remarkjs/remark/tree/HEAD/packages/remark-stringify#optionsstrong)
 *   to use `_` (underscore) instead.
 *
 *   See [Using remark to fix your Markdown](https://github.com/remarkjs/remark-lint#using-remark-to-fix-your-markdown)
 *   on how to automatically fix warnings for this rule.
 *
 * @example {"name": "ok.md"}
 *
 *   **foo** and **bar**.
 *
 * @example {"name": "also-ok.md"}
 *
 *   __foo__ and __bar__.
 *
 * @example {"name": "ok.md", "setting": "*"}
 *
 *   **foo**.
 *
 * @example {"name": "ok.md", "setting": "_"}
 *
 *   __foo__.
 *
 * @example {"name": "not-ok.md", "label": "input"}
 *
 *   **foo** and __bar__.
 *
 * @example {"name": "not-ok.md", "label": "output"}
 *
 *   1:13-1:20: Strong should use `*` as a marker
 *
 * @example {"name": "not-ok.md", "label": "output", "setting": "💩", "config": {"positionless": true}}
 *
 *   1:1: Incorrect strong marker `💩`: use either `'consistent'`, `'*'`, or `'_'`
 */

'use strict'

var rule = require('unified-lint-rule')
var visit = require('unist-util-visit')
var position = require('unist-util-position')
var generated = require('unist-util-generated')

module.exports = rule('remark-lint:strong-marker', strongMarker)

var markers = {'*': true, _: true, null: true}

function strongMarker(tree, file, option) {
  var contents = String(file)
  var preferred =
    typeof option === 'string' && option !== 'consistent' ? option : null

  if (markers[preferred] !== true) {
    file.fail(
      'Incorrect strong marker `' +
        preferred +
        "`: use either `'consistent'`, `'*'`, or `'_'`"
    )
  }

  visit(tree, 'strong', visitor)

  function visitor(node) {
    var marker = contents.charAt(position.start(node).offset)

    if (!generated(node)) {
      if (preferred) {
        if (marker !== preferred) {
          file.message(
            'Strong should use `' + preferred + '` as a marker',
            node
          )
        }
      } else {
        preferred = marker
      }
    }
  }
}
