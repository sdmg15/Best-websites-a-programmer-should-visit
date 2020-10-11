# array-to-sentence

[![NPM version](https://img.shields.io/npm/v/array-to-sentence.svg)](https://www.npmjs.com/package/array-to-sentence)
[![Bower version](https://img.shields.io/bower/v/array-to-sentence.svg)](https://github.com/shinnn/array-to-sentence/releases)
[![Build Status](https://travis-ci.org/shinnn/array-to-sentence.svg?branch=master)](https://travis-ci.org/shinnn/array-to-sentence)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/array-to-sentence.svg)](https://coveralls.io/github/shinnn/array-to-sentence)
[![devDependency Status](https://david-dm.org/shinnn/array-to-sentence/dev-status.svg)](https://david-dm.org/shinnn/array-to-sentence#info=devDependencies)

Join all elements of an array and create a human-readable string

```javascript
arrayToSentence(['foo', 'bar', 'baz', 'qux']); //=> 'foo, bar, baz and qux'
```

## Installation

### Package managers

#### [npm](https://www.npmjs.com/)

```
npm install array-to-sentence
```

#### [bower](http://bower.io/)

```
bower install array-to-sentence
```

### Standalone

[Download the script file directly.](https://raw.githubusercontent.com/shinnn/array-to-sentence/master/browser.js)

## API

### arrayToSentence(*array* [, *options*])

*array*: `Array` of any values  
*options*: `Object`  
Return: `String`

It joins all elements of an array, and returns a string in the form `A, B, ... and X`.

```javascript
arrayToSentence(['one', 'two', 3]); //=> 'one, two and 3'
arrayToSentence(['one', 'two']); //=> 'one and two'
arrayToSentence(['one']); //=> 'one'
```

It returns an empty string if the array is empty.

```javascript
arrayToSentence([]); //=> ''
```

### options.separator

Type: `String`  
Default: `', '`

Set the separator string of each word.

### options.lastSeparator

Type: `String`  
Default: `' and '`

Set the separator string before the last word.

```javascript
arrayToSentence(['A', 'B', 'C'], {
  separator: '-',
  lastSeparator: '-'
}); //=> 'A-B-C'

arrayToSentence(['Earth', 'Wind', 'Fire'], {
  lastSeparator: ' & '
}); //=> 'Earth, Wind & Fire'
```

## Acknowledgement

For designing API, I used `.toSentence()` method of [underscore.string](https://github.com/epeli/underscore.string) as reference. Thanks, [Esa-Matti Suuronen](https://github.com/epeli) and [the contributors](https://github.com/epeli/underscore.string/graphs/contributors).

## License

Copyright (c) 2014 - 2015 [Shinnosuke Watanabe](https://github.com/shinnn)

Licensed under [the MIT License](./LICENSE).
