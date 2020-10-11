const rule = require('unified-lint-rule');
const visit = require('unist-util-visit');
const toString = require('mdast-util-to-string');

function noEmptySection(ast, file) {
  visit(ast, 'heading', (node, index, parent) => {
    const next = parent && parent.children[index + 1];
    const label = toString(node);

    if (next && next.type === 'heading' && next.depth === node.depth) {
      file.message(`Remove empty section: "${label}"`, {
        start: node.position.end,
        end: next.position.start
      });
    }
    if (parent.children.length - 1 === index) {
      file.message(`Remove empty section: "${label}"`, {
        start: node.position.start,
        end: node.position.end
      });
    }
  });
}

module.exports = rule('remark-lint:no-empty-sections', noEmptySection);
