/* globals before, describe, it */

var assert = require('assert')
var gh = require('..')

describe('github-url-to-object', function () {
  describe('shorthand', function () {
    it('supports user/repo style', function () {
      var obj = gh('user/repo#branch')
      assert.equal(obj.user, 'user')
      assert.equal(obj.repo, 'repo')
    })

    it('supports user/repo#branch style', function () {
      var obj = gh('user/repo#branch')
      assert.equal(obj.user, 'user')
      assert.equal(obj.repo, 'repo')
      assert.equal(obj.branch, 'branch')
    })

    it('defaults to master branch', function () {
      var obj = gh('user/repo')
      assert.equal(obj.user, 'user')
      assert.equal(obj.repo, 'repo')
      assert.equal(obj.branch, 'master')
    })

    it('is not vulnerable to REDOS', function () {
      var prefix = 'a/a'
      var pump = 'a'
      var suffix = 'a/'

      var attackString = prefix
      for (var i = 0; i < 25000; i++) {
        attackString += pump
      }
      attackString += suffix

      console.log('matching')
      var before = process.hrtime()
      var obj = gh(attackString)
      var elapsed = process.hrtime(before)

      // Invalid input so should be rejected...
      assert.equal(obj, null)
      // ...but how quickly?
      assert.equal(elapsed[0], 0)
    })
  })

  describe('mediumhand', function () {
    it('supports github:user/repo style', function () {
      var obj = gh('github:user/repo#branch')
      assert.equal(obj.user, 'user')
      assert.equal(obj.repo, 'repo')
    })

    it('supports github:user/repo#branch style', function () {
      var obj = gh('github:user/repo#branch')
      assert.equal(obj.user, 'user')
      assert.equal(obj.repo, 'repo')
      assert.equal(obj.branch, 'branch')
    })

    it('defaults to master branch', function () {
      var obj = gh('github:user/repo')
      assert.equal(obj.user, 'user')
      assert.equal(obj.repo, 'repo')
      assert.equal(obj.branch, 'master')
    })

    it('rejects bitbucket', function () {
      var obj = gh('bitbucket:user/repo')
      assert.equal(obj, null)
    })

    it('is not vulnerable to REDOS', function () {
      var prefix = 'github:a/a'
      var pump = 'a'
      var suffix = 'ub.:'

      var attackString = prefix
      for (var i = 0; i < 25000; i++) {
        attackString += pump
      }
      attackString += suffix

      var before = process.hrtime()
      var obj = gh(attackString)
      var elapsed = process.hrtime(before)

      // Invalid input so should be rejected...
      assert.equal(obj, null)
      // ...but how quickly?
      assert.equal(elapsed[0], 0)
    })
  })

  describe('oldschool', function () {
    it('supports git@ URLs', function () {
      var obj = gh('git@github.com:heroku/heroku-flags.git')
      assert.equal(obj.user, 'heroku')
      assert.equal(obj.repo, 'heroku-flags')
    })

    it('defaults to master branch for git@ URLs', function () {
      var obj = gh('git@github.com:heroku/heroku-flags.git')
      assert.equal(obj.branch, 'master')
    })

    it('supports git+ssh:// URLs', function () {
      var obj = gh('git+ssh://git@github.com/foo/bar.git')
      assert.equal(obj.user, 'foo')
      assert.equal(obj.repo, 'bar')
    })

    it('supports git+https:// URLs', function () {
      var obj = gh('git+https://github.com/foo/bar.git')
      assert.equal(obj.user, 'foo')
      assert.equal(obj.repo, 'bar')
    })

    it('supports git:// URLs', function () {
      var obj = gh('git://github.com/foo/bar.git')
      assert.equal(obj.user, 'foo')
      assert.equal(obj.repo, 'bar')
    })

    it('defaults to master branch for git:// URLs', function () {
      var obj = gh('git://github.com/foo/bar.git')
      assert.equal(obj.branch, 'master')
    })

    describe('github enterprise', function () {
      it('supports git@ URLs', function () {
        var obj = gh('git@ghe.example.com:heroku/heroku-flags.git', {enterprise: true})
        assert.equal(obj.user, 'heroku')
        assert.equal(obj.repo, 'heroku-flags')
      })

      it('supports git:// URLs', function () {
        var obj = gh('git://ghe.example.com/foo/bar.git', {enterprise: true})
        assert.equal(obj.user, 'foo')
        assert.equal(obj.repo, 'bar')
      })
    })
  })

  describe('repository.url object', function () {
    it('accepts an object with a `url` property; common in package.json files', function () {
      var obj = gh({url: 'http://github.com/zeke/outlet.git', type: 'git'})
      assert.equal(obj.user, 'zeke')
      assert.equal(obj.repo, 'outlet')
    })
  })

  describe('http', function () {
    it('supports http URLs', function () {
      var obj = gh('http://github.com/zeke/outlet.git')
      assert.equal(obj.user, 'zeke')
      assert.equal(obj.repo, 'outlet')
    })

    it('supports https URLs', function () {
      var obj = gh('https://github.com/zeke/outlet.git')
      assert.equal(obj.user, 'zeke')
      assert.equal(obj.repo, 'outlet')
    })

    it('supports URLs with www', function () {
      var obj = gh('https://www.github.com/zeke/outlet')
      assert.equal(obj.user, 'zeke')
      assert.equal(obj.repo, 'outlet')
    })

    it('supports deep URLs', function () {
      var obj = gh('https://github.com/zeke/ruby-rails-sample/blob/b1e1000fedb6ca448dd78702de4fc78dedfee48c/app.json')
      assert.equal(obj.user, 'zeke')
      assert.equal(obj.repo, 'ruby-rails-sample')
    })

    it("doesn't require .git extension", function () {
      var obj = gh('https://github.com/zeke/outlet')
      assert.equal(obj.user, 'zeke')
      assert.equal(obj.repo, 'outlet')
    })

    it('defaults to master branch', function () {
      var obj = gh('https://github.com/zeke/outlet')
      assert.equal(obj.branch, 'master')
    })

    it('resolves tree-style URLS for branches other than master', function () {
      var obj = gh('https://github.com/zeke/outlet/tree/other-branch')
      assert.equal(obj.branch, 'other-branch')
    })

    it('resolves URLS for branches containing /', function () {
      var obj = gh('https://github.com/zeke/outlet/tree/feature/other-branch')
      assert.equal(obj.branch, 'feature/other-branch')
    })

    it('resolves URLS for branches containing .', function () {
      var obj = gh('https://github.com/zeke/outlet/tree/2.1')
      assert.equal(obj.branch, '2.1')
    })

    it('resolves blob-style URLS for branches other than master', function () {
      var obj = gh('https://github.com/zeke/ord/blob/new-style/.gitignore')
      assert.equal(obj.branch, 'new-style')
    })

    it('supports nested packages (lerna-style)', function () {
      var obj = gh('https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-object-rest-spread/')
      assert.equal(obj.https_url, 'https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-object-rest-spread')
    })

    describe('github enterprise', function () {
      it('supports http URLs', function () {
        var obj = gh('http://ghe.example.com/zeke/outlet.git', {enterprise: true})
        assert.equal(obj.user, 'zeke')
        assert.equal(obj.repo, 'outlet')
      })

      it('supports https URLs', function () {
        var obj = gh('https://ghe.example.com/zeke/outlet.git', {enterprise: true})
        assert.equal(obj.user, 'zeke')
        assert.equal(obj.repo, 'outlet')
      })
    })
  })

  describe('properties', function () {
    var obj

    describe('github.com', function () {
      before(function () {
        obj = gh('zeke/ord')
      })

      it('user', function () {
        assert.equal(obj.user, 'zeke')
      })

      it('repo', function () {
        assert.equal(obj.repo, 'ord')
      })

      it('branch', function () {
        assert.equal(obj.branch, 'master')
      })

      it('tarball_url', function () {
        assert.equal(obj.tarball_url, 'https://api.github.com/repos/zeke/ord/tarball/master')
      })

      it('api_url', function () {
        assert.equal(obj.api_url, 'https://api.github.com/repos/zeke/ord')
      })

      it('https_url', function () {
        assert.equal(obj.https_url, 'https://github.com/zeke/ord')
      })

      it('travis_url', function () {
        assert.equal(obj.travis_url, 'https://travis-ci.org/zeke/ord')
      })

      it('zip_url', function () {
        assert.equal(obj.zip_url, 'https://github.com/zeke/ord/archive/master.zip')
      })
    })

    describe('github enterprise', function () {
      before(function () {
        obj = gh('https://ghe.example.com/zeke/outlet.git', {enterprise: true})
      })

      it('user', function () {
        assert.equal(obj.user, 'zeke')
      })

      it('repo', function () {
        assert.equal(obj.repo, 'outlet')
      })

      it('branch', function () {
        assert.equal(obj.branch, 'master')
      })

      it('tarball_url', function () {
        assert.equal(obj.tarball_url, 'https://ghe.example.com/api/v3/repos/zeke/outlet/tarball/master')
      })

      it('api_url', function () {
        assert.equal(obj.api_url, 'https://ghe.example.com/api/v3/repos/zeke/outlet')
      })

      it('https_url', function () {
        assert.equal(obj.https_url, 'https://ghe.example.com/zeke/outlet')
      })

      it('zip_url', function () {
        assert.equal(obj.zip_url, 'https://ghe.example.com/zeke/outlet/archive/master.zip')
      })
    })
  })

  describe('branch other than master', function () {
    var obj

    before(function () {
      obj = gh('zeke/ord#experiment')
    })

    it('applies to tarball_url', function () {
      assert.equal(obj.tarball_url, 'https://api.github.com/repos/zeke/ord/tarball/experiment')
    })

    it('applies to https_url', function () {
      assert.equal(obj.https_url, 'https://github.com/zeke/ord/blob/experiment')
    })

    it('applies to clone_url', function () {
      assert.equal(obj.clone_url, 'https://github.com/zeke/ord')
    })

    it("doesn't apply to api_url", function () {
      assert.equal(obj.api_url, 'https://api.github.com/repos/zeke/ord')
    })

    it('applies to travis_url', function () {
      assert.equal(obj.travis_url, 'https://travis-ci.org/zeke/ord?branch=experiment')
    })

    it('applies to zip_url', function () {
      assert.equal(obj.zip_url, 'https://github.com/zeke/ord/archive/experiment.zip')
    })
  })

  describe('failure', function () {
    it('returns null if url is falsy', function () {
      assert.equal(gh(), null)
      assert.equal(gh(null), null)
      assert.equal(gh(undefined), null)
      assert.equal(gh(''), null)
      assert.equal(gh({url: '', type: 'git'}), null)
      assert.equal(gh({url: null, type: 'git'}), null)
      assert.equal(gh({url: undefined, type: 'git'}), null)
    })

    it('returns null if hostname is not github.com', function () {
      assert.equal(gh('https://ghe.something.com/foo/bar'), null)
    })
  })
})
