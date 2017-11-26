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
    const store = {};
    const parsedObj = OrgDate.parse(dateStr, store);

    expect(parsedObj.yyyy).toBe(2017);
    expect(parsedObj.mm).toBe(10);
    expect(parsedObj.dd).toBe(30);
    expect(parsedObj.dayName).toBe('Mon');
    expect(parsedObj.id).toBeDefined();
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

describe('serialization', () => {
  test('serializes date to string', () => {
    const dateObj = {
      yyyy: 2017,
      mm: 10,
      dd: 30,
      dayName: 'Mon'
    };
    expect(OrgDate.serialize(dateObj)).toBe('2017-10-30 Mon');
  });

  test('serializes date to string and pads zeroes where necessary', () => {
    const dateObj = {
      yyyy: 2017,
      mm: 1,
      dd: 3,
      dayName: 'Mon'
    };
    expect(OrgDate.serialize(dateObj)).toBe('2017-01-03 Mon');
  });
});
