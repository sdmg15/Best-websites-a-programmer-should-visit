'use strict';

var isPlainGhUrl = function(string) {
  var re = new RegExp('(?:https?\\:\\/\\/)github.com\\/?$');
  return re.test(string);
};

// Switch to strict mode automatically if the following pattern matches passed
// string
var isStrictRequired = function(string) {
  return /git(@|:)|\.git(?:\/?|\\#[\d\w\.\-_]+)$/.test(string);
};

/**
 * isGithubUrl
 * Check if a passed string is a valid GitHub URL
 *
 * @name isGithubUrl
 * @function
 *
 * @param {String} url A string to be validated
 * @param {Object} options An object containing the following fields:
 *  - `strict` (Boolean): Match only URLs ending with .git
 *  - `repository` (Boolean): Match only valid GitHub repo URLs
 * @return {Boolean} Result of validation
 */
module.exports = function isGithubUrl(url, options) {
  options = options || {};
  var isStrict = options.strict || isStrictRequired(url);
  var repoRequired = options.repository || isStrict;
  var strictPattern = '\\/[\\w\\.-]+?\\.git(?:\\/?|\\#[\\w\\.\\-_]+)?$';
  var loosePattern = repoRequired
    ? '\\/[\\w\\.-]+\\/?(?!=.git)(?:\\.git(?:\\/?|\\#[\\w\\.\\-_]+)?)?$'
    : '(?:\\/[\\w\\.\\/-]+)?\\/?(?:#\\w+?|\\?.*)?$';
  var endOfPattern = isStrict ? strictPattern : loosePattern;
  var pattern = '(?:git|https?|git@)(?:\\:\\/\\/)?github.com[/|:][A-Za-z0-9-]+?' + endOfPattern;

  if (isPlainGhUrl(url) && !repoRequired) {
    return true;
  }

  var re = new RegExp(pattern);
  return re.test(url);
};
