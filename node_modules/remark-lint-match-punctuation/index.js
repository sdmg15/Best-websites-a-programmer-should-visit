const rule = require('unified-lint-rule');
const toList = require('unist-util-to-list-of-char');

const pairs = [
  '“”',
  '『』',
  '（）',
  '《》',
  '「」',
  '【】',
  '‘’',
];

class Validator {
  constructor(pair, file) {
    this.stack = [];
    [this.left, this.right] = pair;
    this.file = file;
  }

  process(node) {
    if (node.value === this.left) {
      this.stack.push(node);
    } else if (node.value === this.right) {
      if (this.stack.length === 0) {
        this.file.message(`"${node.value}" is used without matching "${this.left}"`, node);
      } else {
        this.stack.pop();
      }
    }
  }

  done() {
    this.stack.forEach((left) => {
      this.file.message(`"${left.value}" is used without matching "${this.right}"`, left);
    });
  }
}

function processor(tree, file, config = pairs) {
  const processors = config.map(pair => new Validator(pair, file));
  toList(tree, (list) => {
    list.forEach((node) => {
      processors.forEach((p) => {
        p.process(node);
      });
    });
  });
  processors.forEach(p => p.done());
}

module.exports = rule(
  'remark-lint:match-punctuation',
  processor,
);
