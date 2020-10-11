'use strict'

var markdownTable = require('markdown-table')

module.exports = table

// Stringify table.
//
// Creates a fenced table.
// The table has aligned delimiters by default, but not in
// `tablePipeAlign: false`:
//
// ```markdown
// | Header 1 | Header 2 |
// | :-: | - |
// | Alpha | Bravo |
// ```
//
// The table is spaced by default, but not in `tableCellPadding: false`:
//
// ```markdown
// |Foo|Bar|
// |:-:|---|
// |Baz|Qux|
// ```
function table(node) {
  var self = this
  var options = self.options
  var padding = options.tableCellPadding
  var alignDelimiters = options.tablePipeAlign
  var stringLength = options.stringLength
  var rows = node.children
  var index = rows.length
  var exit = self.enterTable()
  var result = []

  while (index--) {
    result[index] = self.all(rows[index])
  }

  exit()

  return markdownTable(result, {
    align: node.align,
    alignDelimiters: alignDelimiters,
    padding: padding,
    stringLength: stringLength
  })
}
