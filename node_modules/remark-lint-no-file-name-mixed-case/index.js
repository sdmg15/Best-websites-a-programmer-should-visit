/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module no-file-name-mixed-case
 * @fileoverview
 *   Warn when file names use mixed case: both upper- and lowercase characters.
 *
 * @example {"name": "README.md"}
 *
 * @example {"name": "readme.md"}
 *
 * @example {"name": "Readme.md", "label": "output", "config": {"positionless": true}}
 *
 *   1:1: Do not mix casing in file names
 */

'use strict'

var rule = require('unified-lint-rule')

module.exports = rule(
  'remark-lint:no-file-name-mixed-case',
  noFileNameMixedCase
)

var reason = 'Do not mix casing in file names'

function noFileNameMixedCase(tree, file) {
  var name = file.stem

  if (name && !(name === name.toLowerCase() || name === name.toUpperCase())) {
    file.message(reason)
  }
}
