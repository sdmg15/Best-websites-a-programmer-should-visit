/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module no-inline-padding
 * @fileoverview
 *   Warn when phrasing content is padded with spaces between their markers and
 *   content.
 *
 *   Warns for emphasis, strong, delete, image, and link.
 *
 * @example {"name": "ok.md"}
 *
 *   Alpha, *bravo*, _charlie_, [delta](http://echo.fox/trot)
 *
 * @example {"name": "not-ok.md", "label": "input"}
 *
 *   Alpha, * bravo *, _ charlie _, [ delta ](http://echo.fox/trot)
 *
 * @example {"name": "not-ok.md", "label": "output"}
 *
 *   1:8-1:17: Don’t pad `emphasis` with inner spaces
 *   1:19-1:30: Don’t pad `emphasis` with inner spaces
 *   1:32-1:63: Don’t pad `link` with inner spaces
 */

'use strict'

var rule = require('unified-lint-rule')
var visit = require('unist-util-visit')
var generated = require('unist-util-generated')
var toString = require('mdast-util-to-string')

module.exports = rule('remark-lint:no-inline-padding', noInlinePadding)

function noInlinePadding(tree, file) {
  visit(tree, ['emphasis', 'strong', 'delete', 'image', 'link'], visitor)

  function visitor(node) {
    var contents

    if (!generated(node)) {
      contents = toString(node)

      if (
        contents.charAt(0) === ' ' ||
        contents.charAt(contents.length - 1) === ' '
      ) {
        file.message('Don’t pad `' + node.type + '` with inner spaces', node)
      }
    }
  }
}
