'use strict'

var streak = require('longest-streak')
var repeat = require('repeat-string')
var pad = require('../util/pad')

module.exports = code

var lineFeed = '\n'
var space = ' '
var tilde = '~'
var graveAccent = '`'

// Stringify code.
// Creates indented code when:
//
// - No language tag exists
// - Not in `fences: true` mode
// - A non-empty value exists
//
// Otherwise, GFM fenced code is created:
//
// ````markdown
// ```js
// foo();
// ```
// ````
//
// When in ``fence: `~` `` mode, uses tildes as fences:
//
// ```markdown
// ~~~js
// foo();
// ~~~
// ```
//
// Knows about internal fences:
//
// `````markdown
// ````markdown
// ```javascript
// foo();
// ```
// ````
// `````
function code(node, parent) {
  var self = this
  var value = node.value
  var options = self.options
  var marker = options.fence
  var info = node.lang || ''
  var fence

  if (info && node.meta) {
    info += space + node.meta
  }

  info = self.encode(self.escape(info, node))

  // Without (needed) fences.
  if (
    !info &&
    !options.fences &&
    value &&
    value.charAt(0) !== lineFeed &&
    value.charAt(value.length - 1) !== lineFeed
  ) {
    // Throw when pedantic, in a list item which isn’t compiled using a tab.
    if (
      parent &&
      parent.type === 'listItem' &&
      options.listItemIndent !== 'tab' &&
      options.pedantic
    ) {
      self.file.fail(
        'Cannot indent code properly. See https://git.io/fxKR8',
        node.position
      )
    }

    return pad(value, 1)
  }

  // Backticks in the info string don’t work with backtick fenced code.
  // Backticks (and tildes) are fine in tilde fenced code.
  if (marker === graveAccent && info.indexOf(graveAccent) !== -1) {
    marker = tilde
  }

  fence = repeat(marker, Math.max(streak(value, marker) + 1, 3))

  return fence + info + lineFeed + value + lineFeed + fence
}
