'use strict'

const statistics = require('vfile-statistics')

module.exports = vfiles =>
  vfiles.map(vfile => {
    const stats = statistics(vfile)

    return {
      filePath: vfile.path,
      messages: vfile.messages.map(x => {
        return {
          fatal: x.fatal === true,
          severity: x.fatal ? 2 : 1,
          ruleId: [x.source, x.ruleId].filter(Boolean).join(':') || null,
          line: x.line,
          column: x.column,
          endLine: x.location.end.line,
          endColumn: x.location.end.column,
          message: x.reason
        }
      }),
      errorCount: stats.fatal,
      warningCount: stats.nonfatal
    }
  })
