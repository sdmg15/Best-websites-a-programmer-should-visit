var test = require('tape')
var remark = require('remark')
var find = require('./index.js')

remark()
  .use(function () { return run })
  .process('Some _emphasis_, **strongness**, and `code`.')

function run (tree) {
  test('unist-find', function (t) {
    t.throws(function () {
      find()
    }, 'should fail without tree')

    t.throws(function () {
      find(tree)
    }, 'should fail without condition')

    t.test('should find with string condition', function (st) {
      var result = find(tree, 'value')

      st.equal(result, tree.children[0].children[0])

      st.end()
    })

    t.test('should find with object condition', function (st) {
      var result = find(tree, { type: 'emphasis' })

      st.equal(result, tree.children[0].children[1])

      st.end()
    })

    t.test('should find with function condition', function (st) {
      var result = find(tree, function (node) {
        return node.type === 'inlineCode'
      })

      st.equal(result, tree.children[0].children[5])

      st.end()
    })

    t.test('should return undefined if no matches', function (st) {
      var result = find(tree, 'nope, nope, nope')

      st.equal(result, undefined)

      st.end()
    })
  })
}
