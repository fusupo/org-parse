const OrgHeadLine = require('./org-headline');

// const headline = OrgHeadLine.parse(
//   '** TODO Practice Typing 15mins                                       :@computer:some_other_tag:'
// );

// test('exists', () => {
//   expect(headline).toBeDefined();
// });

// test('has level', () => {
//   expect(headline.level).toBeDefined();
//   expect(headline.level).toBe(2);
// });

// test('has todoKeyword', () => {
//   expect(headline.todoKeyword).toBeDefined();
//   expect(headline.todoKeyword).toBe('TODO');
// });

// test('has content', () => {
//   expect(headline.content).toBeDefined();
//   expect(headline.content).toBe('Practice Typing 15mins');
// });

// test('has tags', () => {
//   expect(headline.tags).toBeDefined();
//   expect(headline.tags).toBeInstanceOf(Array);
//   expect(headline.tags[0]).toBe('@computer');
//   expect(headline.tags[1]).toBe('some_other_tag');
// });

describe('headline edge cases', () => {
  test('parses url headline with tags', () => {
    const headline =
      '**** http://www.js-arac.com/index.html       :something:tags:somethingElse:http:';
    const parsed = OrgHeadLine.parse(headline);
    const serialized = OrgHeadLine.serialize(parsed);
    expect(parsed).toEqual({
      level: 4,
      tags: ['something', 'tags', 'somethingElse', 'http'],
      content: 'http://www.js-arac.com/index.html',
      todoKeyword: null
    });
    expect(serialized).toBe(headline);
  });

  test('parses headline with repeated substrings', () => {
    const headline =
      '*** ramen hero                                        :ramen:delivery:authentic:';
    const parsed = OrgHeadLine.parse(headline);
    const serialized = OrgHeadLine.serialize(parsed);
    expect(parsed).toEqual({
      level: 3,
      tags: ['ramen', 'delivery', 'authentic'],
      content: 'ramen hero',
      todoKeyword: null
    });
    expect(serialized).toBe(headline);
  });
});
