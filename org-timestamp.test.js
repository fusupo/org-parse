const OrgTimestamp = require('./org-timestamp');

const dummyInputA = '   SCHEDULED: <2017-01-08 Sun 12:30>';

describe('has static method "parse"', () => {
  test('static attribute parse exists', () => {
    expect(OrgTimestamp.parse).toBeDefined();
  });
  test('static attribute parse is a function', () => {
    expect(OrgTimestamp.parse).toBeInstanceOf(Function);
  });
  test('parse can extract timestamp from arbitrary text input', () => {
    let ts = OrgTimestamp.parse(dummyInputA);
    expect(ts.srcStr).toBe('<2017-01-08 Sun 12:30>');
  });
  test('parse can extract components from timestamp', () => {
    let ts = OrgTimestamp.parse(dummyInputA);
    expect(ts.year).toBe(2017);
    expect(ts.month).toBe(1);
    expect(ts.date).toBe(8);
    expect(ts.day).toBe('Sun');
    expect(ts.hour).toBe(12);
    expect(ts.minute).toBe(30);
  });
});
