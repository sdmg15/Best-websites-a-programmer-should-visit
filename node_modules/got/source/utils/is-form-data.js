'use strict';
const is = require('@sindresorhus/is');

module.exports = body => is.nodeStream(body) && is.function(body.getBoundary);
