const normalizeUrl = require('normalize-url');
const rule = require('unified-lint-rule');
var visit = require('unist-util-visit')

module.exports = rule(
  'remark-lint:double-link',
  processor,
);

function processor(tree, file) {
  const links = new Map();

  visit(tree, 'link', node => {
    const url = node.url.startsWith('#') ? node.url : normalizeUrl(node.url, {
      removeDirectoryIndex: true,
      stripHash: true,
      stripProtocol: true,
      // removeQueryParameters: [/\.*/i]
    });

    if (links.has(url)) {
      links.get(url).push(node)
    } else {
      links.set(url, [node])
    }
  })

  links.forEach(nodes => {
    if (nodes.length > 1) {
      nodes.forEach(node => {
        file.message(node.url, node)
      })
    }
  })
}
