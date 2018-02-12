const OrgParagraph = require('./OrgParagraph');

const paragraphStr = `Donec vitae dolor. Nullam tempus. Aenean in sem ac leo mollis blandit. Nunc
rutrum turpis sed pede. Sed id ligula quis est convallis tempor. Phasellus at
dui in ligula mollis ultricies.`;

let store = {};
let parsedObj = OrgParagraph.parse(paragraphStr.split('\n'));

describe('has static method "parse"', () => {
  test('static attribute parse exists', () => {
    expect(OrgParagraph.parse).toBeDefined();
  });
  test('static attribute parse is a function', () => {
    expect(OrgParagraph.parse).toBeInstanceOf(Function);
  });
});

describe('parses org paragraph', () => {
  test('parses org paragraph', () => {
    expect(parsedObj).toEqual({
      result: {
        value: [
          'Donec vitae dolor. Nullam tempus. Aenean in sem ac leo mollis blandit. Nunc',
          'rutrum turpis sed pede. Sed id ligula quis est convallis tempor. Phasellus at',
          'dui in ligula mollis ultricies.'
        ]
      },
      delta: 3
    });
  });
});
