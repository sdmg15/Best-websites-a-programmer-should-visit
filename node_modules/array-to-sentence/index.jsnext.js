/*!
 * array-to-sentence | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/array-to-sentence
*/
export default function arrayToSentence(arr, options) {
  if (!Array.isArray(arr)) {
    throw new TypeError(String(arr) + ' is not an array. Expected an array.');
  }

  options = options || {};

  function validateOption(optionName) {
    if (typeof options[optionName] !== 'string') {
      throw new TypeError(
        String(options[optionName]) +
        ' is not a string. ' +
        '`' + optionName + '` option must be a string.'
      );
    }
  }

  if (options.separator === undefined) {
    options.separator = ', ';
  } else {
    validateOption('separator');
  }

  if (options.lastSeparator === undefined) {
    options.lastSeparator = ' and ';
  } else {
    validateOption('lastSeparator');
  }

  if (arr.length === 0) {
    return '';
  }

  if (arr.length === 1) {
    return arr[0];
  }

  return arr.slice(0, -1).join(options.separator) + options.lastSeparator + arr[arr.length - 1];
}
