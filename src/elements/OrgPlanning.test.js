const OrgPlanning = require('./OrgPlanning');

const planningStr = `CLOSED: [2017-11-08 Wed 14:54] DEADLINE: <2017-11-01 Wed 10:14> SCHEDULED: <2017-10-31 Tue 20:17>`;

let parsedObj = OrgPlanning.parse(planningStr.split('\n'));

describe('has static method "parse"', () => {
  test('static attribute parse exists', () => {
    expect(OrgPlanning.parse).toBeDefined();
  });
  test('static attribute parse is a function', () => {
    expect(OrgPlanning.parse).toBeInstanceOf(Function);
  });
});

describe('parses org planning', () => {
  test('parses org planning with closed, deadline, and scheduled', () => {
    expect(parsedObj).toEqual({
      result: {
        scheduled: {
          type: 'active',
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
            mm: 17
          },
          timeStart: null,
          timeEnd: null,
          repeat: null,
          repeatStart: null,
          repeatEnd: null,
          delay: null,
          delayStart: null,
          delayEnd: null,
          refs: {},
          value: '<2017-10-31 Tue 20:17>'
        },
        deadline: {
          type: 'active',
          date: {
            yyyy: 2017,
            mm: 11,
            dd: 1,
            dayName: 'Wed'
          },
          dateStart: null,
          dateEnd: null,
          time: {
            hh: 10,
            mm: 14
          },
          timeStart: null,
          timeEnd: null,
          repeat: null,
          repeatStart: null,
          repeatEnd: null,
          delay: null,
          delayStart: null,
          delayEnd: null,
          refs: {},
          value: '<2017-11-01 Wed 10:14>'
        },
        closed: {
          type: 'inactive',
          date: {
            yyyy: 2017,
            mm: 11,
            dd: 8,
            dayName: 'Wed'
          },
          dateStart: null,
          dateEnd: null,
          time: {
            hh: 14,
            mm: 54
          },
          timeStart: null,
          timeEnd: null,
          repeat: null,
          repeatStart: null,
          repeatEnd: null,
          delay: null,
          delayStart: null,
          delayEnd: null,
          refs: {},
          value: '[2017-11-08 Wed 14:54]'
        }
      },
      delta: 1
    });
  });
});
