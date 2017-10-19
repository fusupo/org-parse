const OrgHeadLine = require('./org-headline');

const headline = OrgHeadLine.parse(
  '** TODO Practice Typing 15mins                                       :@computer:some_other_tag:'
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

test('has content', () => {
  expect(headline.content).toBeDefined();
  expect(headline.content).toBe('Practice Typing 15mins');
});

test('has tags', () => {
  expect(headline.tags).toBeDefined();
  expect(headline.tags).toBeInstanceOf(Array);
  expect(headline.tags[0]).toBe('@computer');
  expect(headline.tags[1]).toBe('some_other_tag');
});

test('parses urlHeadlineWithTags', () => {
  const urlHeadlineWithTags =
    '**** http://www.js-arac.com/index.html             :something:tags:somethingElse:http:';
  const parsed = OrgHeadLine.parse(urlHeadlineWithTags);
  expect(parsed).toEqual({
    level: 4,
    tags: ['something', 'tags', 'somethingElse', 'http'],
    content: 'http://www.js-arac.com/index.html',
    todoKeyword: null
  });
});
