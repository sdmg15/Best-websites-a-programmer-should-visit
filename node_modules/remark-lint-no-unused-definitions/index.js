/**
 * @author Titus Wormer
 * @copyright 2016 Titus Wormer
 * @license MIT
 * @module no-unused-definitions
 * @fileoverview
 *   Warn when unused definitions are found.
 *
 * @example {"name": "ok.md"}
 *
 *   [foo][]
 *
 *   [foo]: https://example.com
 *
 * @example {"name": "not-ok.md", "label": "input"}
 *
 *   [bar]: https://example.com
 *
 * @example {"name": "not-ok.md", "label": "output"}
 *
 *   1:1-1:27: Found unused definition
 */

'use strict'

var rule = require('unified-lint-rule')
var generated = require('unist-util-generated')
var visit = require('unist-util-visit')

module.exports = rule('remark-lint:no-unused-definitions', noUnusedDefinitions)

var reason = 'Found unused definition'

function noUnusedDefinitions(tree, file) {
  var map = {}
  var identifier
  var entry

  visit(tree, ['definition', 'footnoteDefinition'], find)
  visit(tree, ['imageReference', 'linkReference', 'footnoteReference'], mark)

  for (identifier in map) {
    entry = map[identifier]

    if (!entry.used) {
      file.message(reason, entry.node)
    }
  }

  function find(node) {
    if (!generated(node)) {
      map[node.identifier.toUpperCase()] = {node: node, used: false}
    }
  }

  function mark(node) {
    var info = map[node.identifier.toUpperCase()]

    if (!generated(node) && info) {
      info.used = true
    }
  }
}
