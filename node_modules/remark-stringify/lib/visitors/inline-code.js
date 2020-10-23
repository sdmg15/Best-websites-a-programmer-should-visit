'use strict'

var streak = require('longest-streak')
var repeat = require('repeat-string')

module.exports = inlineCode

var graveAccentChar = '`'
var lineFeed = 10 //  '\n'
var space = 32 // ' '
var graveAccent = 96 //  '`'

// Stringify inline code.
//
// Knows about internal ticks (`\``), and ensures one more tick is used to
// enclose the inline code:
//
// ````markdown
// ```foo ``bar`` baz```
// ````
//
// Even knows about inital and final ticks:
//
// ``markdown
// `` `foo ``
// `` foo` ``
// ```
function inlineCode(node) {
  var value = node.value
  var ticks = repeat(graveAccentChar, streak(value, graveAccentChar) + 1)
  var start = ticks
  var end = ticks
  var head = value.charCodeAt(0)
  var tail = value.charCodeAt(value.length - 1)
  var wrap = false
  var index
  var length

  if (head === graveAccent || tail === graveAccent) {
    wrap = true
  } else if (value.length > 2 && ws(head) && ws(tail)) {
    index = 1
    length = value.length - 1

    while (++index < length) {
      if (!ws(value.charCodeAt(index))) {
        wrap = true
        break
      }
    }
  }

  if (wrap) {
    start += ' '
    end = ' ' + end
  }

  return start + value + end
}

function ws(code) {
  return code === lineFeed || code === space
}
