# remark-lint-double-link
> This [remark-lint](https://github.com/wooorm/remark-lint) rule ensures that there will be no duplicate links `URL` in the list

[![Actions Status](https://github.com/Scrum/remark-lint-double-link/workflows/Actions%20Status/badge.svg?style=flat-square)](https://github.com/Scrum/remark-lint-double-link/actions?query=workflow%3A%22CI+tests%22)[![node](https://img.shields.io/node/v/remark-lint-double-link.svg?style=flat-square)]()[![npm version](https://img.shields.io/npm/v/remark-lint-double-link.svg?style=flat-square)](https://www.npmjs.com/package/remark-lint-double-link)[![Dependency Status](https://david-dm.org/Scrum/remark-lint-double-link.svg?style=flat-square)](https://david-dm.org/Scrum/remark-lint-double-link)[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg?style=flat-square)](https://github.com/xojs/xo)[![Coveralls status](https://img.shields.io/coveralls/Scrum/remark-lint-double-link.svg?style=flat-square)](https://coveralls.io/r/Scrum/remark-lint-double-link)

[![npm downloads](https://img.shields.io/npm/dm/remark-lint-double-link.svg?style=flat-square)](https://www.npmjs.com/package/remark-lint-double-link)[![npm](https://img.shields.io/npm/dt/remark-lint-double-link.svg?style=flat-square)](https://www.npmjs.com/package/remark-lint-double-link)

## Why?
Checks only duplicate `URL`, which helps to get rid of duplicates with the same link names or with different ones. 
The main policy is not to duplicate links to the same resources


```Text
<!-- Invalid -->

[link-1](http://link-1)
[link-2](http://link-1)

<!-- Valid -->

[link](http://link-1)
```

## Using the rule

### Via `.remarkrc`

```bash
npm install -g remark-cli
npm install remark-lint remark-lint-alphabetize-lists
```

Then, set up your `.remarkrc`:

```JSON
{
  "plugins": [
    "lint",
    "lint-double-link"
  ]
}
```

Now you can use the following command to run the lint:

```bash
remark xxx.md
```

### Via CLI

```bash
npm install -g remark-cli
npm install remark-lint remark-lint-double-link
remark -u lint -u lint-double-link xxx.md
```
