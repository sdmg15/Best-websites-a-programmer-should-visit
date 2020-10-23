// LICENSE : MIT
'use strict'

var assign = require('object-assign')

module.exports = map

function map(tree, iteratee) {
  return preorder(tree, null, null)

  function preorder(node, index, parent) {
    var children = node.children
    var newNode = assign({}, iteratee(node, index, parent))

    if (children) {
      newNode.children = children.map(bound)
    }

    return newNode

    function bound(child, index) {
      return preorder(child, index, node)
    }
  }
}
