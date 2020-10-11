# git-clone

Clone a git repository via shell command.

## Installation

Install:

	$ npm install git-clone

Require:

	var clone = require('git-clone');

## API

#### `clone(repo, targetPath, [options], cb)`

Clone `repo` to `targetPath`, calling `cb` on completion.

Supported `options`:

  * `git`: path to `git` binary; default: `git` (optional).
  * `shallow`: when `true`, clone with depth 1 (optional).
  * `checkout`: revision/branch/tag to check out (optional).

## Copyright &amp; License

&copy; 2014 Jason Frame [ [@jaz303](http://twitter.com/jaz303) / [jason@onehackoranother.com](mailto:jason@onehackoranother.com) ]

Released under the ISC license.
