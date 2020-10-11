(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.gh = f()}})(function(){var define,module,exports;return (function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a){ return a(o,!0); }if(i){ return i(o,!0); }var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++){ s(r[o]); }return s}return e})()({1:[function(require,module,exports){
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

},{"is-url":2}],2:[function(require,module,exports){

/**
 * Expose `isUrl`.
 */

module.exports = isUrl;

/**
 * Matcher.
 */

var matcher = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/;

/**
 * Loosely validate a URL `string`.
 *
 * @param {String} string
 * @return {Boolean}
 */

function isUrl(string){
  return matcher.test(string);
}

},{}]},{},[1])(1)
});
