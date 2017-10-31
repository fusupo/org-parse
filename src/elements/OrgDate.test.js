const OrgDate = require('./OrgDate');

describe('has static method "parse"', () => {
  test('static attribute parse exists', () => {
    expect(OrgDate.parse).toBeDefined();
  });
  test('static attribute parse is a function', () => {
    expect(OrgDate.parse).toBeInstanceOf(Function);
  });
});

describe('active timestamp', () => {
  test('parses date from string', () => {
    const ts = '2017-10-30 Mon';
    expect(OrgTimestamp.parse(ts)).toEqual({
      yyyy: 2017,
      mm: 10,
      dd: 30,
      dayName: 'Mon'
    });
  });
});
