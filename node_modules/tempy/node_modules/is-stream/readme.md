# is-stream [![Build Status](https://travis-ci.org/sindresorhus/is-stream.svg?branch=master)](https://travis-ci.org/sindresorhus/is-stream)

> Check if something is a [Node.js stream](https://nodejs.org/api/stream.html)


## Install

```
$ npm install is-stream
```


## Usage

```js
const fs = require('fs');
const isStream = require('is-stream');

isStream(fs.createReadStream('unicorn.png'));
//=> true

isStream({});
//=> false
```


## API

### isStream(stream)

Returns a `boolean` for whether it's a [`Stream`](https://nodejs.org/api/stream.html#stream_stream).

#### isStream.writable(stream)

Returns a `boolean` for whether it's a [`stream.Writable`](https://nodejs.org/api/stream.html#stream_class_stream_writable).

#### isStream.readable(stream)

Returns a `boolean` for whether it's a [`stream.Readable`](https://nodejs.org/api/stream.html#stream_class_stream_readable).

#### isStream.duplex(stream)

Returns a `boolean` for whether it's a [`stream.Duplex`](https://nodejs.org/api/stream.html#stream_class_stream_duplex).

#### isStream.transform(stream)

Returns a `boolean` for whether it's a [`stream.Transform`](https://nodejs.org/api/stream.html#stream_class_stream_transform).


## Related

- [is-file-stream](https://github.com/jamestalmage/is-file-stream) - Detect if a stream is a file stream


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
