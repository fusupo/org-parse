const OrgTimestamp = require('./OrgTimestamp');

const gimmeTimestampObj = inputObj => {
  const baseObj = {
    type: null,
    date: null,
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
  };
  Object.keys(inputObj).forEach(k => {
    baseObj[k] = inputObj[k];
  });
  return baseObj;
};

describe('has static method "parse"', () => {
  test('static attribute parse exists', () => {
    expect(OrgTimestamp.parse).toBeDefined();
  });
  test('static attribute parse is a function', () => {
    expect(OrgTimestamp.parse).toBeInstanceOf(Function);
  });
});

describe('parses active timestamp', () => {
  test('parses active timestamp without time or reapeater-or-delay', () => {
    const timestampStr = '<2017-10-30 Mon>';
    const timestampObj = gimmeTimestampObj({
      type: OrgTimestamp.ACTIVE,
      date: {
        yyyy: 2017,
        mm: 10,
        dd: 30,
        dayName: 'Mon'
      }
    });
    expect(OrgTimestamp.parse(timestampStr)).toEqual(timestampObj);
  });

  test('parses active timestamp with time but no repeater-or-delay', () => {
    const timestampStr = '<2017-10-31 Tue 20:45>';
    const timestampObj = gimmeTimestampObj({
      type: OrgTimestamp.ACTIVE,
      date: {
        yyyy: 2017,
        mm: 10,
        dd: 31,
        dayName: 'Tue'
      },
      time: {
        hh: 20,
        mm: 45
      }
    });
    expect(OrgTimestamp.parse(timestampStr)).toEqual(timestampObj);
  });

  test('parses active timestamp range B', () => {
    const timestampStr = '<2017-10-31 Tue 20:45-21:37>';
    const timestampObj = gimmeTimestampObj({
      type: OrgTimestamp.ACTIVE_RANGE_B,
      date: {
        yyyy: 2017,
        mm: 10,
        dd: 31,
        dayName: 'Tue'
      },
      timeStart: {
        hh: 20,
        mm: 45
      },
      timeEnd: {
        hh: 21,
        mm: 37
      }
    });
    expect(OrgTimestamp.parse(timestampStr)).toEqual(timestampObj);
  });
});

describe('simple inactive timestamp', () => {
  test('parses inactive timestamp without time or reapeater-or-delay', () => {
    const timestampStr = '[2017-10-30 Mon]';
    const timestampObj = gimmeTimestampObj({
      type: OrgTimestamp.INACTIVE,
      date: {
        yyyy: 2017,
        mm: 10,
        dd: 30,
        dayName: 'Mon'
      }
    });
    expect(OrgTimestamp.parse(timestampStr)).toEqual(timestampObj);
  });
  test('parses inactive timestamp with time but no repeater-or-delay', () => {
    const timestampStr = '[2017-10-31 Tue 20:45]';
    const timestampObj = gimmeTimestampObj({
      type: OrgTimestamp.INACTIVE,
      date: {
        yyyy: 2017,
        mm: 10,
        dd: 31,
        dayName: 'Tue'
      },
      time: {
        hh: 20,
        mm: 45
      }
    });
    expect(OrgTimestamp.parse(timestampStr)).toEqual(timestampObj);
  });
  test('parses inactive timestamp range B', () => {
    const timestampStr = '[2017-10-31 Tue 20:45-21:37]';
    const timestampObj = gimmeTimestampObj({
      type: OrgTimestamp.INACTIVE_RANGE_B,
      date: {
        yyyy: 2017,
        mm: 10,
        dd: 31,
        dayName: 'Tue'
      },
      timeStart: {
        hh: 20,
        mm: 45
      },
      timeEnd: {
        hh: 21,
        mm: 37
      }
    });
    expect(OrgTimestamp.parse(timestampStr)).toEqual(timestampObj);
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

describe('serializes active timestamp', () => {
  test('serializes active timestamp without time or reapeater-or-delay', () => {
    const timestampStr = '<2017-10-30 Mon>';
    const timestampObj = gimmeTimestampObj({
      type: OrgTimestamp.ACTIVE,
      date: {
        yyyy: 2017,
        mm: 10,
        dd: 30,
        dayName: 'Mon'
      }
    });
    expect(OrgTimestamp.serialize(timestampObj)).toBe(timestampStr);
  });

  test('serializes active timestamp with time but no repeater-or-delay', () => {
    const timestampStr = '<2017-10-31 Tue 20:45>';
    const timestampObj = gimmeTimestampObj({
      type: OrgTimestamp.ACTIVE,
      date: {
        yyyy: 2017,
        mm: 10,
        dd: 31,
        dayName: 'Tue'
      },
      time: {
        hh: 20,
        mm: 45
      }
    });
    expect(OrgTimestamp.serialize(timestampObj)).toBe(timestampStr);
  });

  test('serializes active timestamp range B', () => {
    const timestampStr = '<2017-10-31 Tue 20:45-21:37>';
    const timestampObj = gimmeTimestampObj({
      type: OrgTimestamp.ACTIVE_RANGE_B,
      date: {
        yyyy: 2017,
        mm: 10,
        dd: 31,
        dayName: 'Tue'
      },
      timeStart: {
        hh: 20,
        mm: 45
      },
      timeEnd: {
        hh: 21,
        mm: 37
      }
    });
    expect(OrgTimestamp.serialize(timestampObj)).toEqual(timestampStr);
  });
});

describe('serializes inactive timestamp', () => {
  test('serializes inactive timestamp without time or reapeater-or-delay', () => {
    const timestampStr = '[2017-10-30 Mon]';
    const timestampObj = gimmeTimestampObj({
      type: OrgTimestamp.INACTIVE,
      date: {
        yyyy: 2017,
        mm: 10,
        dd: 30,
        dayName: 'Mon'
      }
    });
    expect(OrgTimestamp.serialize(timestampObj)).toBe(timestampStr);
  });

  test('serializes inactive timestamp with time but no repeater-or-delay', () => {
    const timestampStr = '[2017-10-31 Tue 20:45]';
    const timestampObj = gimmeTimestampObj({
      type: OrgTimestamp.INACTIVE,
      date: {
        yyyy: 2017,
        mm: 10,
        dd: 31,
        dayName: 'Tue'
      },
      time: {
        hh: 20,
        mm: 45
      }
    });
    expect(OrgTimestamp.serialize(timestampObj)).toBe(timestampStr);
  });

  test('serializes inactive timestamp range B', () => {
    const timestampStr = '[2017-10-31 Tue 20:45-21:37]';
    const timestampObj = gimmeTimestampObj({
      type: OrgTimestamp.INACTIVE_RANGE_B,
      date: {
        yyyy: 2017,
        mm: 10,
        dd: 31,
        dayName: 'Tue'
      },
      timeStart: {
        hh: 20,
        mm: 45
      },
      timeEnd: {
        hh: 21,
        mm: 37
      }
    });
    expect(OrgTimestamp.serialize(timestampObj)).toEqual(timestampStr);
  });
});
