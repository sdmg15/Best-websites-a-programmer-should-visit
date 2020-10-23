# log-symbols [![Build Status](https://travis-ci.org/sindresorhus/log-symbols.svg?branch=master)](https://travis-ci.org/sindresorhus/log-symbols)

<img src="screenshot.png" width="226" height="192" align="right">

> Colored symbols for various log levels

Includes fallbacks for Windows CMD which only supports a [limited character set](https://en.wikipedia.org/wiki/Code_page_437).


## Install

```
$ npm install log-symbols
```


## Usage

```js
const logSymbols = require('log-symbols');

console.log(logSymbols.success, 'Finished successfully!');
// On good OSes:  ✔ Finished successfully!
// On Windows:    √ Finished successfully!
```

## API

### logSymbols

#### info
#### success
#### warning
#### error


## Related

- [figures](https://github.com/sindresorhus/figures) - Unicode symbols with Windows CMD fallbacks
- [py-log-symbols](https://github.com/ManrajGrover/py-log-symbols) - Python port
- [log-symbols](https://github.com/palash25/log-symbols) - Ruby port


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
