'use strict'

const vfileToEslint = require('vfile-to-eslint')
const eslintFormatterPretty = require('eslint-formatter-pretty')

module.exports = vfiles => eslintFormatterPretty(vfileToEslint(vfiles))
