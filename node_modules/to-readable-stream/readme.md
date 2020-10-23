# to-readable-stream [![Build Status](https://travis-ci.org/sindresorhus/to-readable-stream.svg?branch=master)](https://travis-ci.org/sindresorhus/to-readable-stream)

> Convert a string/Buffer/Uint8Array to a [readable stream](https://nodejs.org/api/stream.html#stream_readable_streams)


## Install

```
$ npm install to-readable-stream
```


## Usage

```js
const toReadableStream = require('to-readable-stream');

toReadableStream('🦄🌈').pipe(process.stdout);
```


## API

### toReadableStream(input)

Returns a [`stream.Readable`](https://nodejs.org/api/stream.html#stream_readable_streams).

#### input

Type: `string` `Buffer` `Uint8Array`

Value to convert to a stream.


## Related

- [into-stream](https://github.com/sindresorhus/into-stream) - More advanced version of this module


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
