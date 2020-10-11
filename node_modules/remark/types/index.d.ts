// TypeScript Version: 3.0

import unified = require('unified')
import remarkParse = require('remark-parse')
import remarkStringify = require('remark-stringify')

declare namespace remark {
  type RemarkOptions = remarkParse.RemarkParseOptions &
    remarkStringify.RemarkStringifyOptions

  type PartialRemarkOptions = remarkParse.PartialRemarkParseOptions &
    remarkStringify.PartialRemarkStringifyOptions
}

declare function remark(): unified.Processor<remark.PartialRemarkOptions>

export = remark
