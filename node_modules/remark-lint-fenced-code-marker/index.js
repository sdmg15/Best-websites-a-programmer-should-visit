/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module fenced-code-marker
 * @fileoverview
 *   Warn for violating fenced code markers.
 *
 *   Options: `` '`' ``, `'~'`, or `'consistent'`, default: `'consistent'`.
 *
 *   `'consistent'` detects the first used fenced code marker style and warns
 *   when subsequent fenced code blocks use different styles.
 *
 *   ## Fix
 *
 *   [`remark-stringify`](https://github.com/remarkjs/remark/tree/HEAD/packages/remark-stringify)
 *   formats fences using ``'`'`` (grave accent) by default.
 *   Pass
 *   [`fence: '~'`](https://github.com/remarkjs/remark/tree/HEAD/packages/remark-stringify#optionsfence)
 *   to use `~` (tilde) instead.
 *
 *   See [Using remark to fix your Markdown](https://github.com/remarkjs/remark-lint#using-remark-to-fix-your-markdown)
 *   on how to automatically fix warnings for this rule.
 *
 * @example {"name": "ok.md"}
 *
 *   Indented code blocks are not affected by this rule:
 *
 *       bravo();
 *
 * @example {"name": "ok.md", "setting": "`"}
 *
 *   ```alpha
 *   bravo();
 *   ```
 *
 *   ```
 *   charlie();
 *   ```
 *
 * @example {"name": "ok.md", "setting": "~"}
 *
 *   ~~~alpha
 *   bravo();
 *   ~~~
 *
 *   ~~~
 *   charlie();
 *   ~~~
 *
 * @example {"name": "not-ok-consistent-tick.md", "label": "input"}
 *
 *   ```alpha
 *   bravo();
 *   ```
 *
 *   ~~~
 *   charlie();
 *   ~~~
 *
 * @example {"name": "not-ok-consistent-tick.md", "label": "output"}
 *
 *   5:1-7:4: Fenced code should use `` ` `` as a marker
 *
 * @example {"name": "not-ok-consistent-tilde.md", "label": "input"}
 *
 *   ~~~alpha
 *   bravo();
 *   ~~~
 *
 *   ```
 *   charlie();
 *   ```
 *
 * @example {"name": "not-ok-consistent-tilde.md", "label": "output"}
 *
 *   5:1-7:4: Fenced code should use `~` as a marker
 *
 * @example {"name": "not-ok-incorrect.md", "setting": "💩", "label": "output", "config": {"positionless": true}}
 *
 *   1:1: Incorrect fenced code marker `💩`: use either `'consistent'`, `` '`' ``, or `'~'`
 */

'use strict'

var rule = require('unified-lint-rule')
var visit = require('unist-util-visit')
var position = require('unist-util-position')
var generated = require('unist-util-generated')

module.exports = rule('remark-lint:fenced-code-marker', fencedCodeMarker)

var markers = {
  '`': true,
  '~': true,
  null: true
}

function fencedCodeMarker(tree, file, option) {
  var contents = String(file)
  var preferred =
    typeof option === 'string' && option !== 'consistent' ? option : null

  if (markers[preferred] !== true) {
    file.fail(
      'Incorrect fenced code marker `' +
        preferred +
        "`: use either `'consistent'`, `` '`' ``, or `'~'`"
    )
  }

  visit(tree, 'code', visitor)

  function visitor(node) {
    var start
    var marker
    var label

    if (!generated(node)) {
      start = position.start(node).offset
      marker = contents
        .slice(start, start + 4)
        .replace(/^\s+/, '')
        .charAt(0)

      // Ignore unfenced code blocks.
      if (markers[marker] === true) {
        if (preferred) {
          if (marker !== preferred) {
            label = preferred === '~' ? preferred : '` ` `'
            file.message(
              'Fenced code should use `' + label + '` as a marker',
              node
            )
          }
        } else {
          preferred = marker
        }
      }
    }
  }
}
