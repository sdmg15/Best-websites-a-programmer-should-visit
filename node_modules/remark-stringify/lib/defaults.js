'use strict'

module.exports = {
  gfm: true,
  commonmark: false,
  pedantic: false,
  entities: 'false',
  setext: false,
  closeAtx: false,
  tableCellPadding: true,
  tablePipeAlign: true,
  stringLength: stringLength,
  incrementListMarker: true,
  tightDefinitions: false,
  fences: false,
  fence: '`',
  bullet: '-',
  listItemIndent: 'tab',
  rule: '*',
  ruleSpaces: true,
  ruleRepetition: 3,
  strong: '*',
  emphasis: '_'
}

function stringLength(value) {
  return value.length
}
