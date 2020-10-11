'use strict'

module.exports = factory

function factory(file) {
  var contents = indices(String(file))
  var toPoint = offsetToPointFactory(contents)

  return {
    toPoint: toPoint,
    toPosition: toPoint,
    toOffset: pointToOffsetFactory(contents)
  }
}

// Factory to get the line and column-based `point` for `offset` in the bound
// indices.
function offsetToPointFactory(indices) {
  return offsetToPoint

  // Get the line and column-based `point` for `offset` in the bound indices.
  function offsetToPoint(offset) {
    var index = -1
    var length = indices.length

    if (offset < 0) {
      return {}
    }

    while (++index < length) {
      if (indices[index] > offset) {
        return {
          line: index + 1,
          column: offset - (indices[index - 1] || 0) + 1,
          offset: offset
        }
      }
    }

    return {}
  }
}

// Factory to get the `offset` for a line and column-based `point` in the
// bound indices.
function pointToOffsetFactory(indices) {
  return pointToOffset

  // Get the `offset` for a line and column-based `point` in the bound
  // indices.
  function pointToOffset(point) {
    var line = point && point.line
    var column = point && point.column

    if (!isNaN(line) && !isNaN(column) && line - 1 in indices) {
      return (indices[line - 2] || 0) + column - 1 || 0
    }

    return -1
  }
}

// Get indices of line-breaks in `value`.
function indices(value) {
  var result = []
  var index = value.indexOf('\n')

  while (index !== -1) {
    result.push(index + 1)
    index = value.indexOf('\n', index + 1)
  }

  result.push(value.length + 1)

  return result
}
