# eslint-rule-docs 
[![Actions Status](https://github.com/stefanbuck/eslint-rule-docs/workflows/Cron/badge.svg)](https://github.com/stefanbuck/eslint-rule-docs/actions) [![NPM](https://badgen.net/npm/v/eslint-rule-docs)](https://npmjs.com/package/eslint-rule-docs) 

> Find documentation url for a given ESLint rule. Updated daily!

## Install

```bash
$ npm install eslint-rule-docs
```

## Usage

```js
const getRuleUrl = require('eslint-rule-docs');

// Find url for core rules
getRuleUrl('no-undef');
// => { exactMatch: true, url: 'https://eslint.org/docs/rules/no-undef' }

// Find url for known plugins
getRuleUrl('react/sort-prop-types');
// => { exactMatch: true, url: 'https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/sort-prop-types.md' }

// If the plugin has no documentation, return repository url 
getRuleUrl('flowtype/semi');
// => { exactMatch: false, url: 'https://github.com/gajus/eslint-plugin-flowtype' }

// If the plugin is unknown, returns an empty object
getRuleUrl('unknown-foo/bar');
// => {}
```

## License

Copyright (c) 2018–present [Stefan Buck](https://stefanbuck.com/). Licensed under the MIT license.
