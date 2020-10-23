/*!
 * glob-option-error | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/glob-option-error
*/
'use strict';

const {inspect} = require('util');

const isTypeError = err => err.name === 'TypeError';
const createMessageLine = (msg, err, index) => `${msg}\n  ${(index + 1)}. ${err.message}`;

module.exports = function GlobOptionError(...args) {
  const argLen = args.length;

  if (argLen !== 1) {
    throw new TypeError(`Expected 1 argument (Array<errors>), but got ${argLen || 'no'} arguments.`);
  }

  const [arr] = args;

  if (!Array.isArray(arr)) {
    throw new TypeError(`Expected an array of errors, but got a non-array value ${inspect(arr)}.`);
  }

  const count = arr.length;

  if (count === 0) {
    throw new RangeError('Expected an array with at least one error, but got [] (empty array).');
  }

  if (count === 1) {
    arr[0][Symbol.iterator] = function *() {
      yield arr[0];
    };

    return arr[0];
  }

  const error = new (arr.every(isTypeError) ? TypeError : Error)(arr.reduce(
    createMessageLine,
    `${count} errors found in the glob options:`
  ));

  error[Symbol.iterator] = function *() {
    for (const result of arr) {
      yield result;
    }
  };

  return error;
};

