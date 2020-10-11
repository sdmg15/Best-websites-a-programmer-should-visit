/*!
 * parse-github-url <https://github.com/jonschlinkert/parse-github-url>
 *
 * Copyright (c) 2015-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

var url = require('url');
var cache = {};

module.exports = function parseGithubUrl(str) {
  return cache[str] || (cache[str] = parse(str));
};

function parse(str) {
  if (typeof str !== 'string' || !str.length) {
    return null;
  }

  if (str.indexOf('git@gist') !== -1 || str.indexOf('//gist') !== -1) {
    return null;
  }

  // parse the URL
  var obj = url.parse(str);
  if (typeof obj.path !== 'string' || !obj.path.length || typeof obj.pathname !== 'string' || !obj.pathname.length) {
    return null;
  }

  if (!obj.host && /^git@/.test(str) === true) {
    // return the correct host for git@ URLs
    obj.host = url.parse('http://' + str).host;
  }

  obj.path = trimSlash(obj.path);
  obj.pathname = trimSlash(obj.pathname);
  obj.filepath = null;

  if (obj.path.indexOf('repos') === 0) {
    obj.path = obj.path.slice(6);
  }

  var seg = obj.path.split('/').filter(Boolean);
  var hasBlob = seg[2] === 'blob';
  if (hasBlob && !isChecksum(seg[3])) {
    obj.branch = seg[3];
    if (seg.length > 4) {
      obj.filepath = seg.slice(4).join('/');
    }
  }

  var blob = str.indexOf('blob');
  if (blob !== -1) {
    obj.blob = str.slice(blob + 5);
  }

  var tree = str.indexOf('tree');
  if (tree !== -1) {
    var idx = tree + 5;
    var branch = str.slice(idx);
    var slash = branch.indexOf('/');
    if (slash !== -1) {
      branch = branch.slice(0, slash);
    }
    obj.branch = branch;
  }

  obj.owner = owner(seg[0]);
  obj.name = name(seg[1]);

  if (seg.length > 1 && obj.owner && obj.name) {
    obj.repo = obj.owner + '/' + obj.name;
  } else {
    var href = obj.href.split(':');
    if (href.length === 2 && obj.href.indexOf('//') === -1) {
      obj.repo = obj.repo || href[href.length - 1];
      var repoSegments = obj.repo.split('/');
      obj.owner = repoSegments[0];
      obj.name = repoSegments[1];

    } else {
      var match = obj.href.match(/\/([^\/]*)$/);
      obj.owner = match ? match[1] : null;
      obj.repo = null;
    }

    if (obj.repo && (!obj.owner || !obj.name)) {
      var segs = obj.repo.split('/');
      if (segs.length === 2) {
        obj.owner = segs[0];
        obj.name = segs[1];
      }
    }
  }

  if (!obj.branch) {
    obj.branch = seg[2] || getBranch(obj.path, obj);
    if (seg.length > 3) {
      obj.filepath = seg.slice(3).join('/');
    }
  }

  obj.host = obj.host || 'github.com';
  obj.owner = obj.owner || null;
  obj.name = obj.name || null;
  obj.repository = obj.repo;
  return obj;
}

function isChecksum(str) {
  return /^[a-f0-9]{40}$/i.test(str);
}

function getBranch(str, obj) {
  var segs = str.split('#');
  var branch;
  if (segs.length > 1) {
    branch = segs[segs.length - 1];
  }
  if (!branch && obj.hash && obj.hash.charAt(0) === '#') {
    branch = obj.hash.slice(1);
  }
  return branch || 'master';
}

function trimSlash(path) {
  return path.charAt(0) === '/' ? path.slice(1) : path;
}

function name(str) {
  return str ? str.replace(/^\W+|\.git$/g, '') : null;
}

function owner(str) {
  if (!str) return null;
  var idx = str.indexOf(':');
  if (idx > -1) {
    return str.slice(idx + 1);
  }
  return str;
}
