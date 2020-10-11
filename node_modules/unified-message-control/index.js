'use strict'

var location = require('vfile-location')
var visit = require('unist-util-visit')

module.exports = messageControl

function messageControl(options) {
  var settings = options || {}
  var name = settings.name
  var marker = settings.marker
  var test = settings.test
  var sources = settings.source
  var known = settings.known
  var reset = settings.reset
  var enable = settings.enable || []
  var disable = settings.disable || []

  if (!name) {
    throw new Error('Expected `name` in `options`, got `' + name + '`')
  }

  if (!marker) {
    throw new Error('Expected `marker` in `options`, got `' + marker + '`')
  }

  if (!sources) {
    sources = [name]
  } else if (typeof sources === 'string') {
    sources = [sources]
  }

  return transformer

  function transformer(tree, file) {
    var toOffset = location(file).toOffset
    var initial = !reset
    var gaps = detectGaps(tree, file)
    var scope = {}
    var globals = []

    visit(tree, test, visitor)

    file.messages = file.messages.filter(filter)

    function visitor(node, position, parent) {
      var mark = marker(node)
      var ruleIds
      var ruleId
      var verb
      var index
      var length
      var next
      var pos
      var tail

      if (!mark || mark.name !== name) {
        return
      }

      ruleIds = mark.attributes.split(/\s/g)
      verb = ruleIds.shift()
      next = parent.children[position + 1]
      pos = mark.node.position && mark.node.position.start
      tail = next && next.position && next.position.end

      if (verb !== 'enable' && verb !== 'disable' && verb !== 'ignore') {
        file.fail(
          'Unknown keyword `' +
            verb +
            '`: expected ' +
            "`'enable'`, `'disable'`, or `'ignore'`",
          mark.node
        )
      }

      length = ruleIds.length
      index = -1

      // Apply to all rules.
      if (length === 0) {
        if (verb === 'ignore') {
          toggle(pos, false)
          toggle(tail, true)
        } else {
          toggle(pos, verb === 'enable')
          reset = verb !== 'enable'
        }
      } else {
        while (++index < length) {
          ruleId = ruleIds[index]

          if (isKnown(ruleId, verb, mark.node)) {
            toggle(pos, verb === 'enable', ruleId)

            if (verb === 'ignore') {
              toggle(tail, true, ruleId)
            }
          }
        }
      }
    }

    function filter(message) {
      var gapIndex = gaps.length
      var ruleId = message.ruleId
      var ranges = scope[ruleId]
      var pos

      // Keep messages from a different source.
      if (!message.source || sources.indexOf(message.source) === -1) {
        return true
      }

      // We only ignore messages if they‘re disabled, *not* when they’re not in
      // the document.
      if (!message.line) {
        message.line = 1
      }

      if (!message.column) {
        message.column = 1
      }

      // Check whether the warning is inside a gap.
      pos = toOffset(message)

      while (gapIndex--) {
        if (gaps[gapIndex].start <= pos && gaps[gapIndex].end > pos) {
          return false
        }
      }

      // Check whether allowed by specific and global states.
      return check(message, ranges, ruleId) && check(message, globals)
    }

    // Helper to check (and possibly warn) if a `ruleId` is unknown.
    function isKnown(ruleId, verb, pos) {
      var result = known ? known.indexOf(ruleId) !== -1 : true

      if (!result) {
        file.message(
          'Unknown rule: cannot ' + verb + " `'" + ruleId + "'`",
          pos
        )
      }

      return result
    }

    // Get the latest state of a rule.
    // When without `ruleId`, gets global state.
    function getState(ruleId) {
      var ranges = ruleId ? scope[ruleId] : globals

      if (ranges && ranges.length !== 0) {
        return ranges[ranges.length - 1].state
      }

      if (!ruleId) {
        return !reset
      }

      if (reset) {
        return enable.indexOf(ruleId) !== -1
      }

      return disable.indexOf(ruleId) === -1
    }

    // Handle a rule.
    function toggle(pos, state, ruleId) {
      var markers = ruleId ? scope[ruleId] : globals
      var previousState

      if (!markers) {
        markers = []
        scope[ruleId] = markers
      }

      previousState = getState(ruleId)

      if (state !== previousState) {
        markers.push({state: state, position: pos})
      }

      // Toggle all known rules.
      if (!ruleId) {
        for (ruleId in scope) {
          toggle(pos, state, ruleId)
        }
      }
    }

    // Check all `ranges` for `message`.
    function check(message, ranges, id) {
      // Check the state at the message’s position.
      var index = ranges && ranges.length
      var length = -1
      var range

      while (--index > length) {
        range = ranges[index]

        /* istanbul ignore if - Generated marker. */
        if (!range.position || !range.position.line || !range.position.column) {
          continue
        }

        if (
          range.position.line < message.line ||
          (range.position.line === message.line &&
            range.position.column <= message.column)
        ) {
          return range.state === true
        }
      }

      // The first marker ocurred after the first message, so we check the
      // initial state.
      if (!id) {
        return initial || reset
      }

      return reset ? enable.indexOf(id) !== -1 : disable.indexOf(id) === -1
    }
  }
}

// Detect gaps in `tree`.
function detectGaps(tree, file) {
  var lastNode = tree.children[tree.children.length - 1]
  var offset = 0
  var isGap = false
  var gaps = []

  // Find all gaps.
  visit(tree, one)

  // Get the end of the document.
  // This detects if the last node was the last node.
  // If not, there’s an extra gap between the last node and the end of the
  // document.
  if (
    lastNode &&
    lastNode.position &&
    lastNode.position.end &&
    offset === lastNode.position.end.offset &&
    trim(file.toString().slice(offset)) !== ''
  ) {
    update()

    update(
      tree && tree.position && tree.position.end && tree.position.end.offset - 1
    )
  }

  return gaps

  function one(node) {
    var pos = node.position

    update(pos && pos.start && pos.start.offset)

    if (!node.children) {
      update(pos && pos.end && pos.end.offset)
    }
  }

  // Detect a new position.
  function update(latest) {
    if (latest === null || latest === undefined) {
      isGap = true
      return
    }

    if (offset >= latest) {
      return
    }

    if (isGap) {
      gaps.push({start: offset, end: latest})
      isGap = false
    }

    offset = latest
  }
}

function trim(value) {
  return value.replace(/^\s*|\s*$/g, '')
}
