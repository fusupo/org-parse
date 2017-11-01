const OrgTimestamp = require('./OrgTimestamp');

describe('has static method "parse"', () => {
  test('static attribute parse exists', () => {
    expect(OrgTimestamp.parse).toBeDefined();
  });
  test('static attribute parse is a function', () => {
    expect(OrgTimestamp.parse).toBeInstanceOf(Function);
  });
});

describe('simple active timestamp', () => {
  test('parses active timestamp without time or reapeater-or-delay', () => {
    const ts = '<2017-10-30 Mon>';
    expect(OrgTimestamp.parse(ts)).toEqual({
      type: OrgTimestamp.ACTIVE,
      date: {
        yyyy: 2017,
        mm: 10,
        dd: 30,
        dayName: 'Mon'
      },
      dateStart: null,
      dateEnd: null,
      time: null,
      timeStart: null,
      timeEnd: null,
      repeat: null,
      repeatStart: null,
      repeatEnd: null,
      delay: null,
      delayStart: null,
      delayEnd: null
    });
  });
  test('parses active timestamp with time but no repeater-or-delay', () => {
    const ts = '<2017-10-31 Tue 20:45>';
    expect(OrgTimestamp.parse(ts)).toEqual({
      type: OrgTimestamp.ACTIVE,
      date: {
        yyyy: 2017,
        mm: 10,
        dd: 31,
        dayName: 'Tue'
      },
      dateStart: null,
      dateEnd: null,
      time: {
        hh: 20,
        mm: 45
      },
      timeStart: null,
      timeEnd: null,
      repeat: null,
      repeatStart: null,
      repeatEnd: null,
      delay: null,
      delayStart: null,
      delayEnd: null
    });
  });
  test('parses active timestamp range B', () => {
    const ts = '<2017-10-31 Tue 20:45-21:37>';
    expect(OrgTimestamp.parse(ts)).toEqual({
      type: OrgTimestamp.ACTIVE_RANGE_B,
      date: {
        yyyy: 2017,
        mm: 10,
        dd: 31,
        dayName: 'Tue'
      },
      dateStart: null,
      dateEnd: null,
      time: null,
      timeStart: {
        hh: 20,
        mm: 45
      },
      timeEnd: {
        hh: 21,
        mm: 37
      },
      repeat: null,
      repeatStart: null,
      repeatEnd: null,
      delay: null,
      delayStart: null,
      delayEnd: null
    });
  });
});

describe('simple inactive timestamp', () => {
  test('parses inactive timestamp without time or reapeater-or-delay', () => {
    const ts = '[2017-10-30 Mon]';
    expect(OrgTimestamp.parse(ts)).toEqual({
      type: OrgTimestamp.INACTIVE,
      date: {
        yyyy: 2017,
        mm: 10,
        dd: 30,
        dayName: 'Mon'
      },
      dateStart: null,
      dateEnd: null,
      time: null,
      timeStart: null,
      timeEnd: null,
      repeat: null,
      repeatStart: null,
      repeatEnd: null,
      delay: null,
      delayStart: null,
      delayEnd: null
    });
  });
  test('parses inactive timestamp with time but no repeater-or-delay', () => {
    const ts = '[2017-10-31 Tue 20:45]';
    expect(OrgTimestamp.parse(ts)).toEqual({
      type: OrgTimestamp.INACTIVE,
      date: {
        yyyy: 2017,
        mm: 10,
        dd: 31,
        dayName: 'Tue'
      },
      dateStart: null,
      dateEnd: null,
      time: {
        hh: 20,
        mm: 45
      },
      timeStart: null,
      timeEnd: null,
      repeat: null,
      repeatStart: null,
      repeatEnd: null,
      delay: null,
      delayStart: null,
      delayEnd: null
    });
  });
  test('parses inactive timestamp range B', () => {
    const ts = '[2017-10-31 Tue 20:45-21:37]';
    expect(OrgTimestamp.parse(ts)).toEqual({
      type: OrgTimestamp.INACTIVE_RANGE_B,
      date: {
        yyyy: 2017,
        mm: 10,
        dd: 31,
        dayName: 'Tue'
      },
      dateStart: null,
      dateEnd: null,
      time: null,
      timeStart: {
        hh: 20,
        mm: 45
      },
      timeEnd: {
        hh: 21,
        mm: 37
      },
      repeat: null,
      repeatStart: null,
      repeatEnd: null,
      delay: null,
      delayStart: null,
      delayEnd: null
    });
  });
});

describe('has static method "serialize"', () => {
  test('static attribute serialize exists', () => {
    expect(OrgTimestamp.serialize).toBeDefined();
  });
  test('static attribute parse is a function', () => {
    expect(OrgTimestamp.serialize).toBeInstanceOf(Function);
  });
});
