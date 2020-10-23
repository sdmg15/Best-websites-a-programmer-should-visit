'use strict'

var assert = require('assert')
var test = require('tape')
var remark = require('remark')
var findAllBefore = require('.')

var tree = remark().parse('Some _emphasis_, **importance**, and `code`.')
var paragraph = tree.children[0]
var children = paragraph.children

test('unist-util-find-all-before', function(t) {
  t.throws(
    function() {
      findAllBefore()
    },
    /Expected parent node/,
    'should fail without parent'
  )

  t.throws(
    function() {
      findAllBefore({type: 'foo'})
    },
    /Expected parent node/,
    'should fail without parent node'
  )

  t.doesNotThrow(function() {
    assert.throws(function() {
      findAllBefore({type: 'foo', children: []})
    }, /Expected positive finite index or child node/)

    assert.throws(function() {
      findAllBefore({type: 'foo', children: []}, -1)
    }, /Expected positive finite index or child node/)

    assert.throws(function() {
      findAllBefore({type: 'foo', children: []}, {type: 'bar'})
    }, /Expected positive finite index or child node/)
  }, 'should fail without index')

  t.doesNotThrow(function() {
    assert.throws(function() {
      findAllBefore({type: 'foo', children: [{type: 'bar'}]}, 1, false)
    }, /Expected function, string, or object as test/)

    assert.throws(function() {
      findAllBefore(
        {
          type: 'foo',
          children: [{type: 'bar'}]
        },
        1,
        true
      )
    }, /Expected function, string, or object as test/)
  }, 'should fail for invalid `test`')

  t.doesNotThrow(function() {
    var res = [children[0]]

    assert.deepStrictEqual(findAllBefore(paragraph, children[1]), res)
    assert.deepStrictEqual(findAllBefore(paragraph, 1), res)
    assert.deepStrictEqual(findAllBefore(paragraph, 0), [])
  }, 'should return the preceding nodes when without `test`')

  t.doesNotThrow(function() {
    var res = [children[0]]

    assert.deepStrictEqual(findAllBefore(paragraph, 100, children[0]), res)
    assert.deepStrictEqual(
      findAllBefore(paragraph, children[1], children[0]),
      res
    )
    assert.deepStrictEqual(findAllBefore(paragraph, 1, children[0]), res)
    assert.deepStrictEqual(
      findAllBefore(paragraph, children[0], children[0]),
      []
    )
    assert.deepStrictEqual(findAllBefore(paragraph, 0, children[0]), [])
    assert.deepStrictEqual(findAllBefore(paragraph, 1, children[1]), [])
  }, 'should return `[node]` when given a `node` and existing')

  t.doesNotThrow(function() {
    var result = [children[3]]

    assert.deepStrictEqual(findAllBefore(paragraph, 100, 'strong'), result)
    assert.deepStrictEqual(findAllBefore(paragraph, 3, 'strong'), [])
    assert.deepStrictEqual(
      findAllBefore(paragraph, children[4], 'strong'),
      result
    )
    assert.deepStrictEqual(findAllBefore(paragraph, children[3], 'strong'), [])
  }, 'should return children when given a `type` and existing')

  t.doesNotThrow(function() {
    var res = children.slice(4).reverse()

    assert.deepStrictEqual(findAllBefore(paragraph, 100, test), res)
    assert.deepStrictEqual(findAllBefore(paragraph, 3, test), [])
    assert.deepStrictEqual(findAllBefore(paragraph, children[4], test), [])
    assert.deepStrictEqual(findAllBefore(paragraph, children[3], test), [])

    function test(node, n) {
      return n > 3
    }
  }, 'should return children when given a `test` and existing')

  t.end()
})
