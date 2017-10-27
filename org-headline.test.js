const OrgHeadLine = require('./org-headline');

const parseSerialize = headline => {
  const parsed = OrgHeadLine.parse(headline);
  const serialized = OrgHeadLine.serialize(parsed);
  return {
    parsed,
    serialized
  };
};

// const headline = OrgHeadLine.parse(
//   '** TODO Practice Typing 15mins                                       :@computer:some_other_tag:'
// );

// test('has stars', () => {
//   expect(headline.stars).toBeDefined();
//   expect(headline.stars).toBe(2);
// });

// test('has todoKeyword', () => {
//   expect(headline.todoKeyword).toBeDefined();
//   expect(headline.todoKeyword).toBe('TODO');
// });

// test('has title', () => {
//   expect(headline.title).toBeDefined();
//   expect(headline.title).toBe('Practice Typing 15mins');
// });

// test('has tags', () => {
//   expect(headline.tags).toBeDefined();
//   expect(headline.tags).toBeInstanceOf(Array);
//   expect(headline.tags[0]).toBe('@computer');
//   expect(headline.tags[1]).toBe('some_other_tag');
// });

////////////////////////////////////////////////////////////////////////////////

// describe('headline basics', () => {
//   test('class exists', () => {
//     expect(OrgHeadLine).toBeDefined();
//   });

//   test('class has static parse function', () => {
//     expect(OrgHeadLine.parse).toBeDefined();
//   });

//   test('class has serialize function', () => {
//     expect(OrgHeadLine.serialize).toBeDefined();
//   });
// });

describe('parsing and serialization', () => {
  test('parses and serializes simplest headline', () => {
    const headline = '* ';
    const { parsed, serialized } = parseSerialize(headline);
    expect(parsed).toEqual({
      stars: 1,
      todoKeyword: null,
      priority: null,
      comment: false,
      title: null,
      tags: null
    });
    expect(serialized).toBe(headline);
  });
  test('parses and serializes simple headline with many stars', () => {
    const headline = '***** ';
    const { parsed, serialized } = parseSerialize(headline);
    expect(parsed).toEqual({
      stars: 5,
      todoKeyword: null,
      priority: null,
      comment: false,
      title: null,
      tags: null
    });
    expect(serialized).toBe(headline);
  });
  test('parses and serializes todoKeyword', () => {
    const headline = '***** TODO';
    const { parsed, serialized } = parseSerialize(headline);
    expect(parsed).toEqual({
      stars: 5,
      todoKeyword: 'TODO',
      priority: null,
      comment: false,
      title: null,
      tags: null
    });
    expect(serialized).toBe(headline);
  });
  test('parses and serializes priority cookie without title or todoKeyword', () => {
    const headline = '*** [#A]';
    const { parsed, serialized } = parseSerialize(headline);
    expect(parsed).toEqual({
      stars: 3,
      todoKeyword: null,
      priority: 'A',
      comment: false,
      title: null,
      tags: null
    });
    expect(serialized).toBe(headline);
  });
  test('parses and serializes priority cookie without title but with todoKeyword', () => {
    const headline = '** WAITING [#C]';
    const { parsed, serialized } = parseSerialize(headline);
    expect(parsed).toEqual({
      stars: 2,
      todoKeyword: 'WAITING',
      priority: 'C',
      comment: false,
      title: null,
      tags: null
    });
    expect(serialized).toBe(headline);
  });
  test('parses and serializes simple headline with tags', () => {
    const headline = '**        :foo:bar:baz:';
    const { parsed, serialized } = parseSerialize(headline);
    expect(parsed).toEqual({
      stars: 2,
      todoKeyword: null,
      priority: null,
      comment: false,
      title: null,
      tags: ['foo', 'bar', 'baz']
    });
    expect(serialized).toBe(
      '**                                                                 :foo:bar:baz:'
    );
  });
  test('parses and serializes simple headline with title', () => {
    const headline = '** some title of somesort';
    const { parsed, serialized } = parseSerialize(headline);
    expect(parsed).toEqual({
      stars: 2,
      todoKeyword: null,
      priority: null,
      comment: false,
      title: 'some title of somesort',
      tags: null
    });
    expect(serialized).toBe(headline);
  });
  test('parses and serializes asterix at begining as stars, later ones as part of title', () => {
    const headline = '* some headline * with a star in the middle';
    const { parsed, serialized } = parseSerialize(headline);
    expect(parsed).toEqual({
      stars: 1,
      todoKeyword: null,
      priority: null,
      comment: false,
      title: 'some headline * with a star in the middle',
      tags: null
    });
    expect(serialized).toBe(headline);
  });
  test('parses and serializes COMMENT from title', () => {
    const headline = '* COMMENT some commented headline';
    const { parsed, serialized } = parseSerialize(headline);
    expect(parsed).toEqual({
      stars: 1,
      todoKeyword: null,
      priority: null,
      comment: true,
      title: 'some commented headline',
      tags: null
    });
    expect(serialized).toBe(headline);
  });
});
describe('headline edge cases', () => {
  test('parses url headline with tags', () => {
    const headline =
      '**** http://www.js-arac.com/index.html       :something:tags:somethingElse:http:';
    const { parsed, serialized } = parseSerialize(headline);
    expect(parsed).toEqual({
      stars: 4,
      todoKeyword: null,
      priority: null,
      comment: false,
      title: 'http://www.js-arac.com/index.html',
      tags: ['something', 'tags', 'somethingElse', 'http']
    });
    expect(serialized).toBe(headline);
  });

  test('parses headline with repeated substrings', () => {
    const headline =
      '*** ramen hero                                        :ramen:delivery:authentic:';
    const { parsed, serialized } = parseSerialize(headline);
    expect(parsed).toEqual({
      stars: 3,
      todoKeyword: null,
      priority: null,
      comment: false,
      tags: ['ramen', 'delivery', 'authentic'],
      title: 'ramen hero'
    });
    expect(serialized).toBe(headline);
  });
});
