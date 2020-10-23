# supports-hyperlinks [![Build Status](https://travis-ci.org/jamestalmage/supports-hyperlinks.svg?branch=master)](https://travis-ci.org/jamestalmage/supports-hyperlinks) [![codecov](https://codecov.io/gh/jamestalmage/supports-hyperlinks/badge.svg?branch=master)](https://codecov.io/gh/jamestalmage/supports-hyperlinks?branch=master)

> Detect whether a terminal emulator supports hyperlinks

Terminal emulators are [starting to support hyperlinks](https://gist.github.com/egmontkob/eb114294efbcd5adb1944c9f3cb5feda). While many terminals have long detected URL's and linkified them, allowing you to Command-Click or Control-Click them to open a browser, you were forced to print the long unsightly URL's on the screen. As of spring 2017 [a few terminals](https://gist.github.com/egmontkob/eb114294efbcd5adb1944c9f3cb5feda) began supporting HTML like links, where the link text and destination could be specified separately.

This module allows you to detect if hyperlinks are supported in the current Terminal.

As this is a new development, we anticipate the list of supported Terminals to grow rapidly. Please open an issue or submit a PR as new Terminals implement support.

## Install

```
$ npm install supports-hyperlinks
```


## Usage

```js
const supportsHyperlinks = require('supports-hyperlinks');

if (supportsHyperlinks.stdout) {
	console.log('Terminal stdout supports hyperlinks');
}

if (supportsHyperlinks.stderr) {
	console.log('Terminal stderr supports hyperlinks');
}
```

## API

Returns an `Object` with a `stdout` and `stderr` property for testing either streams. Each property is a `boolean`, indicating whether or not hyperlinks are supported.

## Info

Obeys the `--no-hyperlinks`, `--hyperlink=always`, and `--hyperlink=never` CLI flags.

Can be overridden by the user with the flags `--hyperlinks=always` and `--no-hyperlinks`. For situations where using those flags are not possible, add the environment variable `FORCE_HYPERLINK=1` to forcefully enable hyperlinks or `FORCE_HYPERLINK=0` to forcefully disable. The use of `FORCE_HYPERLINK` overrides all other hyperlink support checks.

## Related

  * [`hyperlinker`](https://github.com/jamestalmage/hyperlinker): Write hyperlinks for the Terminal.

## License

MIT © [James Talmage](https://github.com/jamestalmage)
