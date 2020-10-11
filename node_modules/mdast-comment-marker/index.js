'use strict'

module.exports = marker

var whiteSpaceExpression = /\s+/g

var parametersExpression = /\s+([-a-z0-9_]+)(?:=(?:"((?:\\[\s\S]|[^"])+)"|'((?:\\[\s\S]|[^'])+)'|((?:\\[\s\S]|[^"'\s])+)))?/gi

var commentExpression = /\s*([a-zA-Z0-9-]+)(\s+([\s\S]*))?\s*/

var markerExpression = new RegExp(
  '(\\s*<!--' + commentExpression.source + '-->\\s*)'
)

// Parse a comment marker.
function marker(node) {
  var type
  var value
  var match
  var params

  if (!node) {
    return null
  }

  type = node.type

  if (type !== 'html' && type !== 'comment') {
    return null
  }

  value = node.value
  match = value.match(type === 'comment' ? commentExpression : markerExpression)

  if (!match || match[0].length !== value.length) {
    return null
  }

  match = match.slice(node.type === 'comment' ? 1 : 2)

  params = parameters(match[1] || '')

  if (!params) {
    return null
  }

  return {
    name: match[0],
    attributes: match[2] || '',
    parameters: params,
    node: node
  }
}

// Parse `value` into an object.
function parameters(value) {
  var attributes = {}
  var rest = value.replace(parametersExpression, replacer)

  return rest.replace(whiteSpaceExpression, '') ? null : attributes

  // eslint-disable-next-line max-params
  function replacer($0, $1, $2, $3, $4) {
    var result = $2 || $3 || $4 || ''

    if (result === 'true' || result === '') {
      result = true
    } else if (result === 'false') {
      result = false
    } else if (!isNaN(result)) {
      result = Number(result)
    }

    attributes[$1] = result

    return ''
  }
}
