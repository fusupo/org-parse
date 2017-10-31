const OrgDate = require('./OrgDate');

describe('has static method "parse"', () => {
  test('static attribute parse exists', () => {
    expect(OrgDate.parse).toBeDefined();
  });
  test('static attribute parse is a function', () => {
    expect(OrgDate.parse).toBeInstanceOf(Function);
  });
});

describe('parsing', () => {
  test('parses date from string', () => {
    const dateStr = '2017-10-30 Mon';
    expect(OrgDate.parse(dateStr)).toEqual({
      yyyy: 2017,
      mm: 10,
      dd: 30,
      dayName: 'Mon'
    });
  });
});

describe('has static method "serialize"', () => {
  test('static attribute serialize exists', () => {
    expect(OrgDate.serialize).toBeDefined();
  });
  test('static attribute parse is a function', () => {
    expect(OrgDate.serialize).toBeInstanceOf(Function);
  });
});

describe('parsing', () => {
  test('parses date from string', () => {
    const dateObj = {
      yyyy: 2017,
      mm: 10,
      dd: 30,
      dayName: 'Mon'
    };
    expect(OrgDate.serialize(dateObj)).toBe('2017-10-30 Mon');
  });

  test('parses date from string and pads zeroes where necessary', () => {
    const dateObj = {
      yyyy: 2017,
      mm: 1,
      dd: 3,
      dayName: 'Mon'
    };
    expect(OrgDate.serialize(dateObj)).toBe('2017-01-03 Mon');
  });
});
