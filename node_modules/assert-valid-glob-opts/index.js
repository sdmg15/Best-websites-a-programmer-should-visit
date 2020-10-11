/*!
 * assert-valid-glob-opts | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/assert-valid-glob-opts
*/
'use strict';

const GlobOptionError = require('glob-option-error');
const validateGlobOpts = require('validate-glob-opts');

module.exports = function assertValidGlobOpts(...args) {
  const results = validateGlobOpts(...args);

  if (results.length === 0) {
    return;
  }

  throw new GlobOptionError(results);
};
