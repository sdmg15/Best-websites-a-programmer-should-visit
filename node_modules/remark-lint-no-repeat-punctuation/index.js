const rule = require('unified-lint-rule');
const map = require('unist-util-map');
const toList = require('unist-util-to-list-of-char');

const punctuations = '！!~～.。,，·?？';

class Traveler {
  constructor(file, config) {
    this.file = file;
    this.prev = null;
    this.config = config;
  }

  process(node) {
    const { value } = node;
    if (this.config.indexOf(value) >= 0 && value === this.prev) {
      this.file.message(`Should not repeat "${value}"`, node);
    }
    this.prev = value;
  }

  end() { } // eslint-disable-line class-methods-use-this
}

function processor(tree, file, config = punctuations) {
  function callback(list) {
    const traveler = new Traveler(file, config);
    list.forEach((node) => {
      traveler.process(node);
    });
    traveler.end();
  }
  const inlineCodeReplaced = map(tree, (node) => {
    if (node.type !== 'inlineCode') return node;
    /**
     * Change the value of code, so that lint rule won't throw error for anything inside.
     * However, don't change the position info, so that warning still shows the correct position.
     */
    return Object.assign({}, node, { value: '\u200b' });
  });
  toList(inlineCodeReplaced, 'paragraph', callback);
  toList(inlineCodeReplaced, 'heading', callback);
}

module.exports = rule(
  'remark-lint:no-repeat-punctuation',
  processor,
);
