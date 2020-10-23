# remark-lint-no-empty-sections [![Build Status](https://travis-ci.org/vhf/remark-lint-no-empty-sections.svg?branch=master)](https://travis-ci.org/vhf/remark-lint-no-empty-sections)

This [remark-lint](https://github.com/wooorm/remark-lint) rule was created for [free-programming-books-lint](https://github.com/vhf/free-programming-books-lint) to enforce [free-programming-books](https://github.com/vhf/free-programming-books) [formatting guidelines](https://github.com/vhf/free-programming-books/blob/master/CONTRIBUTING.md#formatting).

This rule checks that every `([#]+)heading` has some content. This content can be anything: a lower-level heading, a higher-level heading, text, list, etc. It will warn when it detects an `n`-level heading without content followed by another `n`-level heading.

## Examples

```markdown
<!-- Invalid -->

# A

## B (this section is empty!)
```

```markdown
<!-- Invalid -->

# A

## B (this section is empty!)

## C

Some content.
```

```markdown
<!-- Valid -->

# A

## C

Some content.
```

## Using the rule

### Via `.remarkrc`

```bash
npm install -g remark-cli
npm install remark-lint remark-lint-no-empty-sections
```

Then, set up your `.remarkrc`:

```JSON
{
  "plugins": [
    "lint",
    "lint-no-empty-sections"
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
npm install remark-lint remark-lint-no-empty-sections
remark -u lint -u lint-no-empty-sections xxx.md
```
