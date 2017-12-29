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
    const store = {};
    const timestampObj = gimmeTimestampObj({
      type: OrgTimestamp.ACTIVE,
      date: OrgDate.parse('2017-10-30 Mon', store).id
    });
    const parsedObj = OrgTimestamp.parse(timestampStr, store);
    expect(timestampObj.type).toBe(parsedObj.type);
    expect(timestampObj.date).toBe(parsedObj.date);
  });

  test('parses active timestamp with time but no repeater-or-delay', () => {
    const timestampStr = '<2017-10-31 Tue 20:45>';
    const store = {};
    const timestampObj = gimmeTimestampObj({
      type: OrgTimestamp.ACTIVE,
      date: OrgDate.parse('2017-10-31 Tue', store).id,
      time: OrgTime.parse('20:45', store).id
    });
    const parsedObj = OrgTimestamp.parse(timestampStr, store);
    expect(parsedObj.type).toBe(timestampObj.type);
    expect(parsedObj.date).toBe(timestampObj.date);
    expect(parsedObj.time).toBe(timestampObj.time);
  });

  test('parses active timestamp range B', () => {
    const timestampStr = '<2017-10-31 Tue 20:45-21:37>';
    const store = {};
    const timestampObj = gimmeTimestampObj({
      type: OrgTimestamp.ACTIVE_RANGE_B,
      date: OrgDate.parse('2017-10-31 Tue', store).id,
      timeStart: OrgTime.parse('20:45', store).id,
      timeEnd: OrgTime.parse('21:37', store).id
    });
    const parsedObj = OrgTimestamp.parse(timestampStr, store);
    expect(parsedObj.type).toBe(timestampObj.type);
    expect(parsedObj.date).toBe(timestampObj.date);
    expect(parsedObj.timeStart).toBe(timestampObj.timeStart);
    expect(parsedObj.timeEnd).toBe(timestampObj.timeEnd);
  });

  test('parses active timestamp with repeater', () => {
    const timestampStr = '<2017-05-06 Sat 13:42 .+1w>';
    const store = {};
    const timestampObj = gimmeTimestampObj({
      type: OrgTimestamp.ACTIVE,
      date: OrgDate.parse('2017-05-06 Sat', store).id,
      time: OrgTime.parse('13:42', store).id,
      repeat: '.+1w'
    });
    const parsedObj = OrgTimestamp.parse(timestampStr, store);
    expect(parsedObj.type).toEqual(timestampObj.type);
    expect(parsedObj.date).toEqual(timestampObj.date);
    expect(parsedObj.time).toEqual(timestampObj.time);
    expect(parsedObj.repeat).toEqual(timestampObj.repeat);
  });
});

describe('parses inactive timestamp', () => {
  test('parses inactive timestamp without time or reapeater-or-delay', () => {
    const timestampStr = '[2017-10-30 Mon]';
    const store = {};
    const timestampObj = gimmeTimestampObj({
      type: OrgTimestamp.INACTIVE,
      date: OrgDate.parse('2017-10-30 Mon', store).id
    });
    const parsedObj = OrgTimestamp.parse(timestampStr, store);
    expect(timestampObj.type).toBe(parsedObj.type);
    expect(timestampObj.date).toBe(parsedObj.date);
  });

  test('parses inactive timestamp with time but no repeater-or-delay', () => {
    const timestampStr = '[2017-10-31 Tue 20:45]';
    const store = {};
    const timestampObj = gimmeTimestampObj({
      type: OrgTimestamp.INACTIVE,
      date: OrgDate.parse('2017-10-31 Tue', store).id,
      time: OrgTime.parse('20:45', store).id
    });
    const parsedObj = OrgTimestamp.parse(timestampStr, store);
    expect(parsedObj.type).toBe(timestampObj.type);
    expect(parsedObj.date).toBe(timestampObj.date);
    expect(parsedObj.time).toBe(timestampObj.time);
  });

  test('parses inactive timestamp range B', () => {
    const timestampStr = '[2017-10-31 Tue 20:45-21:37]';
    const store = {};
    const timestampObj = gimmeTimestampObj({
      type: OrgTimestamp.INACTIVE_RANGE_B,
      date: OrgDate.parse('2017-10-31 Tue', store).id,
      timeStart: OrgTime.parse('20:45', store).id,
      timeEnd: OrgTime.parse('21:37', store).id
    });
    const parsedObj = OrgTimestamp.parse(timestampStr, store);
    expect(parsedObj.type).toBe(timestampObj.type);
    expect(parsedObj.date).toBe(timestampObj.date);
    expect(parsedObj.timeStart).toBe(timestampObj.timeStart);
    expect(parsedObj.timeEnd).toBe(timestampObj.timeEnd);
  });

  test('parses inactive timestamp with repeater', () => {
    const timestampStr = '[2017-05-06 Sat 13:42 .+1w]';
    const store = {};
    const timestampObj = gimmeTimestampObj({
      type: OrgTimestamp.INACTIVE,
      date: OrgDate.parse('2017-05-06 Sat', store).id,
      time: OrgTime.parse('13:42', store).id,
      repeat: '.+1w'
    });
    const parsedObj = OrgTimestamp.parse(timestampStr, store);
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
//   test('serializes active timestamp without time or reapeater-or-delay', () => {
//     const timestampStr = '<2017-10-30 Mon>';
//     const timestampObj = gimmeTimestampObj({
//       type: OrgTimestamp.ACTIVE,
//       date: new OrgDate(2017, 10, 30, 'Mon')
//     });
//     expect(OrgTimestamp.serialize(timestampObj)).toBe(timestampStr);
//   });

//   test('serializes active timestamp with time but no repeater-or-delay', () => {
//     const timestampStr = '<2017-10-31 Tue 20:45>';
//     const timestampObj = gimmeTimestampObj({
//       type: OrgTimestamp.ACTIVE,
//       date: new OrgDate(2017, 10, 31, 'Tue'),
//       time: new OrgTime(20, 45)
//     });
//     expect(OrgTimestamp.serialize(timestampObj)).toBe(timestampStr);
//   });

//   test('serializes active timestamp range B', () => {
//     const timestampStr = '<2017-10-31 Tue 20:45-21:37>';
//     const timestampObj = gimmeTimestampObj({
//       type: OrgTimestamp.ACTIVE_RANGE_B,
//       date: new OrgDate(2017, 10, 31, 'Tue'),
//       timeStart: new OrgTime(20, 45),
//       timeEnd: new OrgTime(21, 37)
//     });
//     expect(OrgTimestamp.serialize(timestampObj)).toEqual(timestampStr);
//   });
// });

// describe('serializes inactive timestamp', () => {
//   test('serializes inactive timestamp without time or reapeater-or-delay', () => {
//     const timestampStr = '[2017-10-30 Mon]';
//     const timestampObj = gimmeTimestampObj({
//       type: OrgTimestamp.INACTIVE,
//       date: new OrgDate(2017, 10, 30, 'Mon')
//     });
//     expect(OrgTimestamp.serialize(timestampObj)).toBe(timestampStr);
//   });

//   test('serializes inactive timestamp with time but no repeater-or-delay', () => {
//     const timestampStr = '[2017-10-31 Tue 20:45]';
//     const timestampObj = gimmeTimestampObj({
//       type: OrgTimestamp.INACTIVE,
//       date: new OrgDate(2017, 10, 31, 'Tue'),
//       time: new OrgTime(20, 45)
//     });
//     expect(OrgTimestamp.serialize(timestampObj)).toBe(timestampStr);
//   });

//   test('serializes inactive timestamp range B', () => {
//     const timestampStr = '[2017-10-31 Tue 20:45-21:37]';
//     const timestampObj = gimmeTimestampObj({
//       type: OrgTimestamp.INACTIVE_RANGE_B,
//       date: new OrgDate(2017, 10, 31, 'Tue'),
//       timeStart: new OrgTime(20, 45),
//       timeEnd: new OrgTime(21, 37)
//     });
//     expect(OrgTimestamp.serialize(timestampObj)).toEqual(timestampStr);
//   });
// });
