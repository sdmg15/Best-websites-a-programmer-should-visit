/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module checkbox-content-indent
 * @fileoverview
 *   Warn when list item checkboxes are followed by too much whitespace.
 *
 * @example {"name": "ok.md"}
 *
 *   - [ ] List item
 *   +  [x] List Item
 *   *   [X] List item
 *   -    [ ] List item
 *
 * @example {"name": "not-ok.md", "label": "input"}
 *
 *   - [ ] List item
 *   + [x]  List item
 *   * [X]   List item
 *   - [ ]    List item
 *
 * @example {"name": "not-ok.md", "label": "output"}
 *
 *   2:7-2:8: Checkboxes should be followed by a single character
 *   3:7-3:9: Checkboxes should be followed by a single character
 *   4:7-4:10: Checkboxes should be followed by a single character
 */

'use strict'

var rule = require('unified-lint-rule')
var vfileLocation = require('vfile-location')
var visit = require('unist-util-visit')
var position = require('unist-util-position')
var generated = require('unist-util-generated')

module.exports = rule(
  'remark-lint:checkbox-content-indent',
  checkboxContentIndent
)

var start = position.start
var end = position.end

var reason = 'Checkboxes should be followed by a single character'

function checkboxContentIndent(tree, file) {
  var contents = String(file)
  var location = vfileLocation(file)

  visit(tree, 'listItem', visitor)

  function visitor(node) {
    var initial
    var final
    var value

    // Exit early for items without checkbox.
    if (typeof node.checked !== 'boolean' || generated(node)) {
      return
    }

    initial = start(node).offset
    /* istanbul ignore next - hard to test, couldn’t find a case. */
    final = (node.children.length === 0 ? end(node) : start(node.children[0]))
      .offset

    while (/[^\S\n]/.test(contents.charAt(final))) {
      final++
    }

    // For a checkbox to be parsed, it must be followed by a whitespace.
    value = contents.slice(initial, final)
    value = value.slice(value.indexOf(']') + 1)

    if (value.length !== 1) {
      file.message(reason, {
        start: location.toPosition(final - value.length + 1),
        end: location.toPosition(final)
      })
    }
  }
}
