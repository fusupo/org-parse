const OrgTimestamp = require('./OrgTimestamp');
const OrgDate = require('../sub-objects/OrgDate');
const OrgTime = require('../sub-objects/OrgTime');

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
    delayEnd: null,
    refs: {}
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
      date: OrgDate.parse('2017-10-30 Mon')
    });
    const parsedObj = OrgTimestamp.parse(timestampStr);
    expect(timestampObj.type).toBe(parsedObj.type);
    expect(timestampObj.date).toEqual(parsedObj.date);
  });

  test('parses active timestamp with time but no repeater-or-delay', () => {
    const timestampStr = '<2017-10-31 Tue 20:45>';
    const timestampObj = gimmeTimestampObj({
      type: OrgTimestamp.ACTIVE,
      date: OrgDate.parse('2017-10-31 Tue'),
      time: OrgTime.parse('20:45')
    });
    const parsedObj = OrgTimestamp.parse(timestampStr);
    expect(parsedObj.type).toBe(timestampObj.type);
    expect(parsedObj.date).toEqual(timestampObj.date);
    expect(parsedObj.time).toEqual(timestampObj.time);
  });

  test('parses active timestamp range B', () => {
    const timestampStr = '<2017-10-31 Tue 20:45-21:37>';
    const timestampObj = gimmeTimestampObj({
      type: OrgTimestamp.ACTIVE_RANGE_B,
      date: OrgDate.parse('2017-10-31 Tue'),
      timeStart: OrgTime.parse('20:45'),
      timeEnd: OrgTime.parse('21:37')
    });
    const parsedObj = OrgTimestamp.parse(timestampStr);
    expect(parsedObj.type).toBe(timestampObj.type);
    expect(parsedObj.date).toEqual(timestampObj.date);
    expect(parsedObj.timeStart).toEqual(timestampObj.timeStart);
    expect(parsedObj.timeEnd).toEqual(timestampObj.timeEnd);
  });

  test('parses active timestamp with repeater', () => {
    const timestampStr = '<2017-05-06 Sat 13:42 .+1w>';
    const timestampObj = gimmeTimestampObj({
      type: OrgTimestamp.ACTIVE,
      date: OrgDate.parse('2017-05-06 Sat'),
      time: OrgTime.parse('13:42'),
      repeat: '.+1w'
    });
    const parsedObj = OrgTimestamp.parse(timestampStr);
    expect(parsedObj.type).toEqual(timestampObj.type);
    expect(parsedObj.date).toEqual(timestampObj.date);
    expect(parsedObj.time).toEqual(timestampObj.time);
    expect(parsedObj.repeat).toEqual(timestampObj.repeat);
  });
});

describe('parses inactive timestamp', () => {
  test('parses inactive timestamp without time or reapeater-or-delay', () => {
    const timestampStr = '[2017-10-30 Mon]';
    const timestampObj = gimmeTimestampObj({
      type: OrgTimestamp.INACTIVE,
      date: OrgDate.parse('2017-10-30 Mon')
    });
    const parsedObj = OrgTimestamp.parse(timestampStr);
    expect(timestampObj.type).toBe(parsedObj.type);
    expect(timestampObj.date).toEqual(parsedObj.date);
  });

  test('parses inactive timestamp with time but no repeater-or-delay', () => {
    const timestampStr = '[2017-10-31 Tue 20:45]';
    const timestampObj = gimmeTimestampObj({
      type: OrgTimestamp.INACTIVE,
      date: OrgDate.parse('2017-10-31 Tue'),
      time: OrgTime.parse('20:45')
    });
    const parsedObj = OrgTimestamp.parse(timestampStr);
    expect(parsedObj.type).toBe(timestampObj.type);
    expect(parsedObj.date).toEqual(timestampObj.date);
    expect(parsedObj.time).toEqual(timestampObj.time);
  });

  test('parses inactive timestamp range B', () => {
    const timestampStr = '[2017-10-31 Tue 20:45-21:37]';
    const timestampObj = gimmeTimestampObj({
      type: OrgTimestamp.INACTIVE_RANGE_B,
      date: OrgDate.parse('2017-10-31 Tue'),
      timeStart: OrgTime.parse('20:45'),
      timeEnd: OrgTime.parse('21:37')
    });
    const parsedObj = OrgTimestamp.parse(timestampStr);
    expect(parsedObj.type).toBe(timestampObj.type);
    expect(parsedObj.date).toEqual(timestampObj.date);
    expect(parsedObj.timeStart).toEqual(timestampObj.timeStart);
    expect(parsedObj.timeEnd).toEqual(timestampObj.timeEnd);
  });

  test('parses inactive timestamp with repeater', () => {
    const timestampStr = '[2017-05-06 Sat 13:42 .+1w]';
    const timestampObj = gimmeTimestampObj({
      type: OrgTimestamp.INACTIVE,
      date: OrgDate.parse('2017-05-06 Sat'),
      time: OrgTime.parse('13:42'),
      repeat: '.+1w'
    });
    const parsedObj = OrgTimestamp.parse(timestampStr);
    expect(parsedObj.type).toEqual(timestampObj.type);
    expect(parsedObj.date).toEqual(timestampObj.date);
    expect(parsedObj.time).toEqual(timestampObj.time);
    expect(parsedObj.repeat).toEqual(timestampObj.repeat);
  });
});

// describe('has static method "serialize"', () => {
//   test('static attribute serialize exists', () => {
//     expect(OrgTimestamp.serialize).toBeDefined();
//   });
//   test('static attribute parse is a function', () => {
//     expect(OrgTimestamp.serialize).toBeInstanceOf(Function);
//   });
// });

// describe('serializes active timestamp', () => {
//   test('without time or reapeater-or-delay', () => {
//     const timestampStr = '<2017-10-30 Mon>';
//     const timestampObj = gimmeTimestampObj({
//       type: OrgTimestamp.ACTIVE,
//       date: OrgDate.parse('2017-10-30 Mon')
//     });

//     expect(OrgTimestamp.serialize(timestampObj)).toBe(timestampStr);
//   });

//   test('with time but no repeater-or-delay', () => {
//     const timestampStr = '<2017-10-31 Tue 20:45>';
//     const timestampObj = gimmeTimestampObj({
//       type: OrgTimestamp.ACTIVE,
//       date: OrgDate.parse('2017-10-31 Tue'),
//       time: OrgTime.parse('20:45')
//     });
//     expect(OrgTimestamp.serialize(timestampObj)).toBe(timestampStr);
//   });

//   test('range B', () => {
//     const timestampStr = '<2017-10-31 Tue 20:45-21:37>';
//     const timestampObj = gimmeTimestampObj({
//       type: OrgTimestamp.ACTIVE_RANGE_B,
//       date: OrgDate.parse('2017-10-31 Tue'),
//       timeStart: OrgTime.parse('20:45'),
//       timeEnd: OrgTime.parse('21:37')
//     });
//     expect(OrgTimestamp.serialize(timestampObj)).toEqual(timestampStr);
//   });
// });

// describe('serializes inactive timestamp', () => {
//   test('without time or reapeater-or-delay', () => {
//     const timestampStr = '[2017-10-30 Mon]';
//     const timestampObj = gimmeTimestampObj({
//       type: OrgTimestamp.INACTIVE,
//       date: OrgDate.parse('2017-10-30 Mon')
//     });
//     expect(OrgTimestamp.serialize(timestampObj)).toBe(timestampStr);
//   });

//   test('with time but no repeater-or-delay', () => {
//     const timestampStr = '[2017-10-31 Tue 20:45]';
//     const timestampObj = gimmeTimestampObj({
//       type: OrgTimestamp.INACTIVE,
//       date: OrgDate.parse('2017-10-31 Tue'),
//       time: OrgTime.parse('20:45')
//     });
//     expect(OrgTimestamp.serialize(timestampObj)).toBe(timestampStr);
//   });

// test('serializes inactive timestamp range B', () => {
//   const timestampStr = '[2017-10-31 Tue 20:45-21:37]';
//   const timestampObj = gimmeTimestampObj({
//     type: OrgTimestamp.INACTIVE_RANGE_B,
//     date: new OrgDate(2017, 10, 31, 'Tue'),
//     timeStart: new OrgTime(20, 45),
//     timeEnd: new OrgTime(21, 37)
//   });
//   expect(OrgTimestamp.serialize(timestampObj)).toEqual(timestampStr);
// });
// });
