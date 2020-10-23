'use strict'

var isUrl = require('is-url')

var laxUrlRegex = /(?:(?:[^:]+:)?[/][/])?(?:.+@)?([^/]+)([/][^?#]+)/

module.exports = function (repoUrl, opts) {
  var obj = {}
  opts = opts || {}

  if (!repoUrl) { return null }

  // Allow an object with nested `url` string
  // (common practice in package.json files)
  if (repoUrl.url) { repoUrl = repoUrl.url }

  if (typeof repoUrl !== 'string') { return null }

  var shorthand = repoUrl.match(/^([\w-_]+)\/([\w-_\.]+)(?:#([\w-_\.]+))?$/)
  var mediumhand = repoUrl.match(/^github:([\w-_]+)\/([\w-_\.]+)(?:#([\w-_\.]+))?$/)
  var antiquated = repoUrl.match(/^git@[\w-_\.]+:([\w-_]+)\/([\w-_\.]+)$/)

  if (shorthand) {
    obj.user = shorthand[1]
    obj.repo = shorthand[2]
    obj.branch = shorthand[3] || 'master'
    obj.host = 'github.com'
  } else if (mediumhand) {
    obj.user = mediumhand[1]
    obj.repo = mediumhand[2]
    obj.branch = mediumhand[3] || 'master'
    obj.host = 'github.com'
  } else if (antiquated) {
    obj.user = antiquated[1]
    obj.repo = antiquated[2].replace(/\.git$/i, '')
    obj.branch = 'master'
    obj.host = 'github.com'
  } else {
    // Turn git+http URLs into http URLs
    repoUrl = repoUrl.replace(/^git\+/, '')

    if (!isUrl(repoUrl)) { return null }

    var ref = repoUrl.match(laxUrlRegex) || [];
    var hostname = ref[1];
    var pathname = ref[2];
    if (!hostname) { return null }
    if (hostname !== 'github.com' && hostname !== 'www.github.com' && !opts.enterprise) { return null }

    var parts = pathname.match(/^\/([\w-_]+)\/([\w-_\.]+)(\/tree\/[\w-_\.\/]+)?(\/blob\/[\w-_\.\/]+)?/)
    // ([\w-_\.]+)
    if (!parts) { return null }
    obj.user = parts[1]
    obj.repo = parts[2].replace(/\.git$/i, '')

    obj.host = hostname || 'github.com'

    if (parts[3] && /^\/tree\/master\//.test(parts[3])) {
      obj.branch = 'master'
      obj.path = parts[3].replace(/\/$/, '')
    } else if (parts[3]) {
      obj.branch = parts[3].replace(/^\/tree\//, '').match(/[\w-_.]+\/{0,1}[\w-_]+/)[0]
    } else if (parts[4]) {
      obj.branch = parts[4].replace(/^\/blob\//, '').match(/[\w-_.]+\/{0,1}[\w-_]+/)[0]
    } else {
      obj.branch = 'master'
    }
  }

  if (obj.host === 'github.com') {
    obj.apiHost = 'api.github.com'
  } else {
    obj.apiHost = (obj.host) + "/api/v3"
  }

  obj.tarball_url = "https://" + (obj.apiHost) + "/repos/" + (obj.user) + "/" + (obj.repo) + "/tarball/" + (obj.branch)
  obj.clone_url = "https://" + (obj.host) + "/" + (obj.user) + "/" + (obj.repo)

  if (obj.branch === 'master') {
    obj.https_url = "https://" + (obj.host) + "/" + (obj.user) + "/" + (obj.repo)
    obj.travis_url = "https://travis-ci.org/" + (obj.user) + "/" + (obj.repo)
    obj.zip_url = "https://" + (obj.host) + "/" + (obj.user) + "/" + (obj.repo) + "/archive/master.zip"
  } else {
    obj.https_url = "https://" + (obj.host) + "/" + (obj.user) + "/" + (obj.repo) + "/blob/" + (obj.branch)
    obj.travis_url = "https://travis-ci.org/" + (obj.user) + "/" + (obj.repo) + "?branch=" + (obj.branch)
    obj.zip_url = "https://" + (obj.host) + "/" + (obj.user) + "/" + (obj.repo) + "/archive/" + (obj.branch) + ".zip"
  }

  // Support deep paths (like lerna-style repos)
  if (obj.path) {
    obj.https_url += obj.path
  }

  obj.api_url = "https://" + (obj.apiHost) + "/repos/" + (obj.user) + "/" + (obj.repo)

  return obj
}

