### Case: An extensible utility to convert, identify, and flip string case.

Download: [Case.min.js][min]  or  [Case.js][full]  
[NPM][npm]: `npm install case`  (little 'c' due to NPM restrictions)  
[NuGet][]: `Install-Package Case`  


[![Build Status](https://img.shields.io/travis/nbubna/Case.svg)](https://travis-ci.org/nbubna/Case)
[![NPM version](https://img.shields.io/npm/v/case.svg)][npm]
[![NPM](https://img.shields.io/npm/dm/case.svg)][npm]

[NuGet]: http://nuget.org/packages/Case/
[min]: https://raw.github.com/nbubna/Case/master/dist/Case.min.js
[full]: https://raw.github.com/nbubna/Case/master/dist/Case.js
[npm]: https://npmjs.org/package/case

## Documentation
Each of the following functions will first "undo" previous case manipulations
before applying the desired case to the given string.

### Foundations
```javascript
Case.upper('foo_bar')     -> 'FOO BAR'
Case.lower('fooBar')      -> 'foo bar'
Case.capital('foo_v_bar') -> 'Foo V Bar'
```

### Code Helpers
```javascript
Case.snake('Foo bar!')   -> 'foo_bar'
Case.pascal('foo.bar')   -> 'FooBar'
Case.camel('foo, bar')   -> 'fooBar'
Case.kebab('Foo? Bar.')  -> 'foo-bar'
Case.header('fooBar=')   -> 'Foo-Bar'
Case.constant('Foo-Bar') -> 'FOO_BAR'
```


### UI Helpers
```javascript
Case.title('foo v. bar')                    -> 'Foo v. Bar'
Case.sentence('"foo!" said bar', ['Bar'])   -> '"Foo!" said Bar'
Case.sentence('the 12 oz. can', null, ['oz'])   -> 'The 12 oz. can'
```
`Case.sentence(str, names, abbreviations)` accepts an array of proper names that should be capitalized,
regardless of location in the sentence. This function is specialized, but useful
when dealing with input generated with capslock on (i.e. everything my grandma types).
It can also accept a list of abbreviations (words that may end in a period but aren't meant
to end a sentence).


### Custom Casing
```javascript
Case.lower('FOO-BAR', '.')                  -> 'foo.bar'
Case.upper('Foo? Bar.', '__')               -> 'FOO__BAR'
Case.capital('fooBar', ' + ')               -> 'Foo + Bar'

Case.lower("Don't keep 'em!", "/", true)    -> 'dont/keep/em'
Case.capital("'ello, world.", null, true)   -> 'Ello, World.'
```
`Case.upper`, `Case.lower`, and `Case.capital` accept an optional "fill" value
that will replace any characters which are not letters and numbers. All three also accept 
a third optional boolean argument indicating if apostrophes are to be stripped out or left in.
For example, programmatic case changes (snake, kebab, pascal, camel, constant) are best without
apostrophes, but user-facing ones (title, sentence) do not want "don't" turned into "Dont".


### Extending Case
```javascript
Case.type('bang', function(s) {
    return Case.upper(s, '!')+'!';
});
Case.bang('bang')       -> 'BANG!'
Case.of('TEST!THIS!')   -> 'bang'
```
`Case.type(name, fn)`: extends Case, creating a new function on `Case` and adding `Case.of` support automatically.


### Utilities
```javascript
Case.of('foo')          -> 'lower'
Case.of('foo_bar')      -> 'snake'
Case.of('Foo v Bar')    -> 'title'
Case.of('foo_ Bar')     -> undefined

Case.of('Hello there, Bob!', ['Bob']) -> 'sentence'

Case.flip('FlipMe')     -> 'fLIPmE'
Case.flip('TEST THIS!') -> 'test this!'

Case.random('Hello!')   -> 'hElLO!'
```
* `Case.of(str[, names])`: identifies the case of a string, returns undefined if it doesn't match a known type
* `Case.flip(str)`: reverses the case of letters, no other changes
* `Case.random(str)`: randomizes the case of letters, no other changes


## Release History
* 2013-06-10 [v1.0.0][] (public, initial)
* 2013-06-20 [v1.0.1][] (regex improvements)
* 2013-08-23 [v1.0.3][] (better support for Node, Component and AMD)
* 2014-10-24 [v1.1.2][] (regexps used are now extensible and support more latin diacritics)
* 2015-01-27 [v1.2.0][] (deprecate squish in favor of pascal)
* 2015-01-28 [v1.2.1][] (fix UMD regression)
* 2015-10-27 [v1.3.0][] (Case.kebab and Case.random)
* 2015-12-02 [v1.3.2][] (fix title case when small word is first or last)
* 2016-02-01 [v1.3.3][] (Case.of('foo') to return lower, not snake)
* 2016-02-07 [v1.4.0][] (fix apostrophe handling)
* 2016-02-08 [v1.4.1][] (fix swallowed prefix/suffix on lone words)
* 2016-11-11 [v1.4.2][] (add typings for TypeScript support)
* 2017-03-09 [v1.5.2][] (add Header-Case and expose noApostrophes option for upper/lower/capital fns)
* 2017-07-11 [v1.5.3][] (Case.of and to[Type]Case functions should accept extra arguments, like the rest)
* 2017-10-23 [v1.5.4][] (Shift order of Case.of tests to prioritize 'capital' over 'header')
* 2018-05-04 [v1.5.5][] (Fix issue #26, corner case of bad "decamelizing" of string w/number after caps)
* 2018-11-15 [v1.6.0][] (PR #29, support 'abbreviations' argument for Case.sentence to avoid incorrect sentence ends)
* 2019-01-11 [v1.6.1][] (PR #30, update typings to include 'abbreviations' argument for Case.sentence)
* 2019-07-26 [v1.6.2][] (PR #31, allow importing as default)
* 2020-03-24 [v1.6.3][] (PR #33, update license structure in package.json for automated checkers)

[v1.0.0]: https://github.com/nbubna/store/tree/1.0.0
[v1.0.1]: https://github.com/nbubna/store/tree/1.0.1
[v1.0.3]: https://github.com/nbubna/store/tree/1.0.3
[v1.1.2]: https://github.com/nbubna/store/tree/1.1.2
[v1.2.0]: https://github.com/nbubna/store/tree/1.2.0
[v1.2.1]: https://github.com/nbubna/store/tree/1.2.1
[v1.3.0]: https://github.com/nbubna/store/tree/1.3.0
[v1.3.2]: https://github.com/nbubna/store/tree/1.3.2
[v1.3.3]: https://github.com/nbubna/store/tree/1.3.3
[v1.4.0]: https://github.com/nbubna/store/tree/1.4.0
[v1.4.1]: https://github.com/nbubna/store/tree/1.4.1
[v1.4.2]: https://github.com/nbubna/store/tree/1.4.2
[v1.5.2]: https://github.com/nbubna/store/tree/1.5.2
[v1.5.3]: https://github.com/nbubna/store/tree/1.5.3
[v1.5.4]: https://github.com/nbubna/store/tree/1.5.4
[v1.5.5]: https://github.com/nbubna/store/tree/1.5.5
[v1.6.0]: https://github.com/nbubna/store/tree/1.6.0
[v1.6.1]: https://github.com/nbubna/store/tree/1.6.1
[v1.6.2]: https://github.com/nbubna/store/tree/1.6.2
[v1.6.3]: https://github.com/nbubna/store/tree/1.6.3