'use strict'

var convert = require('unist-util-is/convert')

module.exports = findAllBefore

function findAllBefore(parent, index, test) {
  var is = convert(test)
  var results = []
  var children
  var child

  if (!parent || !parent.type || !parent.children) {
    throw new Error('Expected parent node')
  }

  children = parent.children

  if (index && index.type) {
    index = children.indexOf(index)
  }

  if (isNaN(index) || index < 0 || index === Infinity) {
    throw new Error('Expected positive finite index or child node')
  }

  // Performance.
  if (index > children.length) {
    index = children.length
  }

  while (index--) {
    child = children[index]

    if (is(child, index, parent)) {
      results.push(child)
    }
  }

  return results
}
