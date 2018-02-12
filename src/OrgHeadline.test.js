const OrgHeadline = require('./OrgHeadline');

describe('has static method "parse"', () => {
  test('static attribute parse exists', () => {
    expect(OrgHeadline.parse).toBeDefined();
  });
  test('static attribute parse is a function', () => {
    expect(OrgHeadline.parse).toBeInstanceOf(Function);
  });
});

describe('parses headline', () => {
  test('A', () => {
    const headline = '* LAYOUT foo';
    const parsedObj = OrgHeadline.parse(headline, {});
    expect(9).toBe(91);
  });
});

describe('has static method "serialize"', () => {
  test('static attribute serialize exists', () => {
    expect(OrgHeadline.serialize).toBeDefined();
  });
  test('static attribute parse is a function', () => {
    expect(OrgHeadline.serialize).toBeInstanceOf(Function);
  });
});
