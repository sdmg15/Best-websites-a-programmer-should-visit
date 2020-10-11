'use strict'

module.exports = block

var lineFeed = '\n'

var blank = lineFeed + lineFeed
var triple = blank + lineFeed
var comment = blank + '<!---->' + blank

// Stringify a block node with block children (e.g., `root` or `blockquote`).
// Knows about code following a list, or adjacent lists with similar bullets,
// and places an extra line feed between them.
function block(node) {
  var self = this
  var options = self.options
  var fences = options.fences
  var gap = options.commonmark ? comment : triple
  var definitionGap = options.tightDefinitions ? lineFeed : blank
  var values = []
  var children = node.children
  var length = children.length
  var index = -1
  var previous
  var child

  while (++index < length) {
    previous = child
    child = children[index]

    if (previous) {
      // A list preceding another list that are equally ordered, or a
      // list preceding an indented code block, need a gap between them,
      // so as not to see them as one list, or content of the list,
      // respectively.
      //
      // In commonmark, only something that breaks both up can do that,
      // so we opt for an empty, invisible comment.  In other flavours,
      // two blank lines are fine.
      if (
        previous.type === 'list' &&
        ((child.type === 'list' && previous.ordered === child.ordered) ||
          (child.type === 'code' && !child.lang && !fences))
      ) {
        values.push(gap)
      } else if (
        previous.type === 'definition' &&
        child.type === 'definition'
      ) {
        values.push(definitionGap)
      } else {
        values.push(blank)
      }
    }

    values.push(self.visit(child, node))
  }

  return values.join('')
}
