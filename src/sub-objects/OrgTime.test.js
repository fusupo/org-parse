const OrgTime = require('./OrgTime');

describe('has static method "parse"', () => {
  test('static attribute parse exists', () => {
    expect(OrgTime.parse).toBeDefined();
  });
  test('static attribute parse is a function', () => {
    expect(OrgTime.parse).toBeInstanceOf(Function);
  });
});

describe('parses time', () => {
  test('parses time with single digit "H"', () => {
    const time = '9:30';
    const parsedObj = OrgTime.parse(time, {});
    expect(parsedObj.hh).toBe(9);
    expect(parsedObj.mm).toBe(30);
  });
  test('parses time with double digit "HH"', () => {
    const time = '19:00';
    const parsedObj = OrgTime.parse(time, {});
    expect(parsedObj.hh).toBe(19);
    expect(parsedObj.mm).toBe(0);
  });
});

describe('has static method "serialize"', () => {
  test('static attribute serialize exists', () => {
    expect(OrgTime.serialize).toBeDefined();
  });
  test('static attribute parse is a function', () => {
    expect(OrgTime.serialize).toBeInstanceOf(Function);
  });
});

describe('serializes time', () => {
  test('parses time with single digit "H"', () => {
    expect(
      OrgTime.serialize({
        hh: 9,
        mm: 30
      })
    ).toBe('09:30');
  });
  test('serializes time with double digit "HH"', () => {
    expect(
      OrgTime.serialize({
        hh: 19,
        mm: 0
      })
    ).toBe('19:00');
  });
});
