# remark-lint-no-repeat-punctuation

Warn when punctuations are used repeatedly. By default, following punctuations are only allowed to be appeared alone:

`！`, `!`, `~`, `～`, `.`, `。`, `,`, `，`, `·`, `?`, `？`.

## Example

**`valid.md`**

**In**

```markdown
好好学习，天天向上！
```

**Out**

No messages.

**`invalid.md`**

**In**

```markdown
好好学习，天天向上！！！
好好学习，天天向上~~~
好好学习，天天向上。。。
好好学习，天天向上？？？
```

**Out**

```text
input.md:1:11: Should not repeat "！"
input.md:1:12: Should not repeat "！"
input.md:2:11: Should not repeat "~"
input.md:2:12: Should not repeat "~"
input.md:3:11: Should not repeat "。"
input.md:3:12: Should not repeat "。"
input.md:4:11: Should not repeat "？"
input.md:4:12: Should not repeat "？"
```

## Install

```sh
npm install remark-lint-no-repeat-punctuation
```

## Usage

You probably want to use it on the CLI through a config file:

```diff
 ...
 "remarkConfig": {
   "plugins": [
     ...
     "remark-lint",
+    "remark-lint-no-repeat-punctuation",
     ...
   ]
 }
 ...
```

Or use it on the CLI directly

```sh
remark -u remark-lint -u remark-lint-no-repeat-punctuation readme.md
```

Or use this on the API:

```diff
 var remark = require('remark');
 var report = require('vfile-reporter');

 remark()
   .use(require('remark-lint'))
+  .use(require('remark-lint-no-repeat-punctuation'))
   .process('_Emphasis_ and **importance**', function (err, file) {
     console.error(report(err || file));
   });
```

## License

[MIT](https://github.com/laysent/remark-lint-plugins/blob/master/LICENSE) © [LaySent](https://github.com/laysent)
