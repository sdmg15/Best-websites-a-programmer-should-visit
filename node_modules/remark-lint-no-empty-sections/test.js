const test = require('tape');
const remark = require('remark');
const lint = require('remark-lint');
const noEmptySections = require('./');

const processor = remark().use(lint).use(noEmptySections);

const empty = `# A

## B (this section is empty!)

## C

This one is not.
`;

const emptySectionAsLastNode = `# A

## B

It should warn when the last section is empty!

## C (this section is empty!)
`;

const twoEmptySections = `# A

## B (empty!)

## C (empty and last!)
`;

const higher = `# A

## B (this section is empty!)

# C

This one is not.
`;

const lower = `# A

## B

### C

Not empty.
`;

const ok = `# A

## C

Not empty.
`;

test('remark-lint-no-empty-sections', (t) => {
  t.deepEqual(
    processor.processSync(empty).messages.map(String),
    ['3:30-5:1: Remove empty section: "B (this section is empty!)"'],
    'should warn for empty sections'
  );

  t.deepEqual(
    processor.processSync(emptySectionAsLastNode).messages.map(String),
    ['7:1-7:30: Remove empty section: "C (this section is empty!)"'],
    'should warn on empty section when it is the last section'
  );

  t.deepEqual(
    processor.processSync(twoEmptySections).messages.map(String),
    [
      '3:14-5:1: Remove empty section: "B (empty!)"',
      '5:1-5:23: Remove empty section: "C (empty and last!)"'
    ],
    'should warn on all empty sections, including last'
  );

  t.deepEqual(
    processor.processSync(lower).messages.map(String),
    [],
    'should work on lower headings'
  );

  t.deepEqual(
    processor.processSync(higher).messages.map(String),
    [],
    'should work on higher headings'
  );

  t.deepEqual(
    processor.processSync(ok).messages.map(String),
    [],
    'should work on valid fixtures'
  );

  t.end();
});
