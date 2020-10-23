# remark-lint-match-punctuation

Warn when punctuations are not matched. For example, when there is only left parenthesis without
right parenthesis, or when right parenthesis is before left parenthesis.

Only punctuations with left/right difference will be included to check, such as Chinese quotation
marks, parenthesis, angle quotes, etc. Currently, plugin will check the usage of following
punctuation:

`“”`, `『』`, `（）`, `《》`, `「」`, `【】`, `‘’`

## Option

If you would like to override the default punctuation check list above, you can
pass a list of pairs as configuration. It should be a list of string, with first
character representing the left punctuation and second character representing
it's right pair.

For example:

```javascript
[require('remark-lint-match-punctuation'), ['（）']]
```

This will override the default behavior and only warn when `（）` has any
mismatch.

## Example

**`valid.md`**

**In**

```markdown
子曰：“学而时习之，不亦说乎”
```

**Out**

No messages.

**`invalid.md`**

**In**

```markdown
子曰：”学而时习之，不亦说乎“
```

**Out**

```text
input.md:1:4: "”" is used without matching "“"
input.md:1:15: "“" is used without matching "”"
```

(In above example, double quotation marks are used in wrong order, right is before left)

## Install

```sh
npm install remark-lint-match-punctuation
```

## Usage

You probably want to use it on the CLI through a config file:

```diff
 ...
 "remarkConfig": {
   "plugins": [
     ...
     "remark-lint",
+    "remark-lint-match-punctuation",
     ...
   ]
 }
 ...
```

Or use it on the CLI directly

```sh
remark -u remark-lint -u remark-lint-match-punctuation readme.md
```

Or use this on the API:

```diff
 var remark = require('remark');
 var report = require('vfile-reporter');

 remark()
   .use(require('remark-lint'))
+  .use(require('remark-lint-match-punctuation')[, options])
   .process('_Emphasis_ and **importance**', function (err, file) {
     console.error(report(err || file));
   });
```

## License

[MIT](https://github.com/laysent/remark-lint-plugins/blob/master/LICENSE) © [LaySent](https://github.com/laysent)
