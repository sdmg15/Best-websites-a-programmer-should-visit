/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module hard-break-spaces
 * @fileoverview
 *   Warn when too many spaces are used to create a hard break.
 *
 * @example {"name": "ok.md"}
 *
 *   Lorem ipsum··
 *   dolor sit amet
 *
 * @example {"name": "not-ok.md", "label": "input"}
 *
 *   Lorem ipsum···
 *   dolor sit amet.
 *
 * @example {"name": "not-ok.md", "label": "output"}
 *
 *   1:12-2:1: Use two spaces for hard line breaks
 */

'use strict'

var rule = require('unified-lint-rule')
var visit = require('unist-util-visit')
var position = require('unist-util-position')
var generated = require('unist-util-generated')

module.exports = rule('remark-lint:hard-break-spaces', hardBreakSpaces)

var reason = 'Use two spaces for hard line breaks'

function hardBreakSpaces(tree, file) {
  var contents = String(file)

  visit(tree, 'break', visitor)

  function visitor(node) {
    var value

    if (!generated(node)) {
      value = contents
        .slice(position.start(node).offset, position.end(node).offset)
        .split('\n', 1)[0]
        .replace(/\r$/, '')

      if (value.length > 2) {
        file.message(reason, node)
      }
    }
  }
}
