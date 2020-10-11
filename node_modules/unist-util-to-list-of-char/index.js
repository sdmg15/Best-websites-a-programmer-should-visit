const visit = require('unist-util-visit');

function valueOf(node) {
  if (!node) return null;
  if (node.value) return node.value;
  return null;
}

function toList(root, _test, _callback) {
  let callback = _callback;
  let test = _test;
  if (typeof test === 'function') {
    callback = test;
    test = 'root';
  }
  function getTree(tree) {
    const list = [];
    function visitor(node) {
      const value = valueOf(node);
      if (typeof value !== 'string') return;
      const { line, column, offset } = node.position.start;
      let c = 0;
      let l = 0;
      for (let i = 0; i < value.length; i += 1) {
        const char = value[i];
        list.push({
          value: char,
          line: line + l,
          column: column + c,
          offset: offset + i,
        });
        if (char === '\n') {
          c = 0;
          l += 1;
        } else {
          c += 1;
        }
      }
    }
    visit(tree, visitor);
    callback(list);
  }

  if (typeof _test === 'function') {
    getTree(root);
  } else {
    visit(root, test, getTree);
  }
}

module.exports = toList;
