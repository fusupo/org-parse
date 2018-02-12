const OrgKeyword = require('./OrgKeyword');

const keywordStr = `#+ARCHIVE:  archive.org::datetree/* FROM %s`;

let store = {};
let parsedObj = OrgKeyword.parse(keywordStr.split('\n'));
console.log(JSON.stringify(parsedObj.result, null, 1));

describe('has static method "parse"', () => {
  test('static attribute parse exists', () => {
    expect(OrgKeyword.parse).toBeDefined();
  });
  test('static attribute parse is a function', () => {
    expect(OrgKeyword.parse).toBeInstanceOf(Function);
  });
});

describe('parses org keyword', () => {
  test('parses org keyword', () => {
    expect(parsedObj).toEqual({
      result: {
        key: 'ARCHIVE',
        value: 'archive.org::datetree/* FROM %s'
      },
      delta: 1
    });
  });
});
