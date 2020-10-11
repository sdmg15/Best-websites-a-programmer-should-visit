# http-timer
> Timings for HTTP requests

[![Build Status](https://travis-ci.org/szmarczak/http-timer.svg?branch=master)](https://travis-ci.org/szmarczak/http-timer)
[![Coverage Status](https://coveralls.io/repos/github/szmarczak/http-timer/badge.svg?branch=master)](https://coveralls.io/github/szmarczak/http-timer?branch=master)
[![install size](https://packagephobia.now.sh/badge?p=@szmarczak/http-timer)](https://packagephobia.now.sh/result?p=@szmarczak/http-timer)

Inspired by the [`request` package](https://github.com/request/request).

## Usage
```js
'use strict';
const https = require('https');
const timer = require('@szmarczak/http-timer');

const request = https.get('https://httpbin.org/anything');
const timings = timer(request);

request.on('response', response => {
	response.on('data', () => {}); // Consume the data somehow
	response.on('end', () => {
		console.log(timings);
	});
});

// { start: 1535708511443,
//   socket: 1535708511444,
//   lookup: 1535708511444,
//   connect: 1535708511582,
//   upload: 1535708511887,
//   response: 1535708512037,
//   end: 1535708512040,
//   phases:
//    { wait: 1,
//      dns: 0,
//      tcp: 138,
//      request: 305,
//      firstByte: 150,
//      download: 3,
//      total: 597 } }
```

## API

### timer(request)

Returns: `Object`

- `start` - Time when the request started.
- `socket` - Time when a socket was assigned to the request.
- `lookup` - Time when the DNS lookup finished.
- `connect` - Time when the socket successfully connected.
- `upload` - Time when the request finished uploading.
- `response` - Time when the request fired the `response` event.
- `end` - Time when the response fired the `end` event.
- `error` - Time when the request fired the `error` event.
- `phases`
	- `wait` - `timings.socket - timings.start`
	- `dns` - `timings.lookup - timings.socket`
	- `tcp` - `timings.connect - timings.lookup`
	- `request` - `timings.upload - timings.connect`
	- `firstByte` - `timings.response - timings.upload`
	- `download` - `timings.end - timings.response`
	- `total` - `timings.end - timings.start` or `timings.error - timings.start`

**Note**: The time is a `number` representing the milliseconds elapsed since the UNIX epoch.

## License

MIT
