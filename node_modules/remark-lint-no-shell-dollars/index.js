/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module no-shell-dollars
 * @fileoverview
 *   Warn when shell code is prefixed by `$` (dollar sign) characters.
 *
 *   Ignores indented code blocks and fenced code blocks without language flag.
 *
 * @example {"name": "ok.md"}
 *
 *   ```bash
 *   echo a
 *   ```
 *
 *   ```sh
 *   echo a
 *   echo a > file
 *   ```
 *
 *   ```zsh
 *   $ echo a
 *   a
 *   $ echo a > file
 *   ```
 *
 *   Some empty code:
 *
 *   ```command
 *   ```
 *
 *   It’s fine to use dollars in non-shell code.
 *
 *   ```js
 *   $('div').remove();
 *   ```
 *
 * @example {"name": "not-ok.md", "label": "input"}
 *
 *   ```sh
 *   $ echo a
 *   ```
 *
 *   ```bash
 *   $ echo a
 *   $ echo a > file
 *   ```
 *
 * @example {"name": "not-ok.md", "label": "output"}
 *
 *   1:1-3:4: Do not use dollar signs before shell commands
 *   5:1-8:4: Do not use dollar signs before shell commands
 */

'use strict'

var rule = require('unified-lint-rule')
var visit = require('unist-util-visit')
var generated = require('unist-util-generated')

module.exports = rule('remark-lint:no-shell-dollars', noShellDollars)

var reason = 'Do not use dollar signs before shell commands'

// List of shell script file extensions (also used as code flags for syntax
// highlighting on GitHub):
// See: <https://github.com/github/linguist/blob/40992ba/lib/linguist/languages.yml#L4984>
var flags = [
  'sh',
  'bash',
  'bats',
  'cgi',
  'command',
  'fcgi',
  'ksh',
  'tmux',
  'tool',
  'zsh'
]

function noShellDollars(tree, file) {
  visit(tree, 'code', visitor)

  function visitor(node) {
    var lines
    var line
    var length
    var index

    // Check both known shell code and unknown code.
    if (!generated(node) && node.lang && flags.indexOf(node.lang) !== -1) {
      lines = node.value.split('\n').filter(notEmpty)
      length = lines.length
      index = -1

      if (length === 0) {
        return
      }

      while (++index < length) {
        line = lines[index]

        if (line.trim() && !line.match(/^\s*\$\s*/)) {
          return
        }
      }

      file.message(reason, node)
    }
  }

  function notEmpty(line) {
    return line.trim().length !== 0
  }
}
