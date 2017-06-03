const OrgHeadLine = require('./org-headline');

const headline = new OrgHeadLine(
  '** TODO Practice Typing 15mins                                       :@computer:'
);

test('exists', () => {
  expect(headline).toBeDefined();
});

test('has level', () => {
  expect(headline.level).toBeDefined();
  expect(headline.level).toBe(2);
});

test('has todoKeyword', () => {
  expect(headline.todoKeyword).toBeDefined();
  expect(headline.todoKeyword).toBe('TODO');
});

// test('has todoKeywordColor', () => {
// });

test('has content', () => {
  expect(headline.content).toBeDefined();
  expect(headline.content).toBe('Practice Typing 15mins');
});

test('has tags', () => {
  expect(headline.tags).toBeDefined();
  expect(headline.tags).toBeInstanceOf(Array);
  expect(headline.tags[0]).toBe('@computer');
});
