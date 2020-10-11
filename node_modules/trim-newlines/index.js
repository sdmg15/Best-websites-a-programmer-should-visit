'use strict';
module.exports = string => string.replace(/^[\r\n]+/, '').replace(/[\r\n]+$/, '');
module.exports.start = string => string.replace(/^[\r\n]+/, '');
module.exports.end = string => string.replace(/[\r\n]+$/, '');
