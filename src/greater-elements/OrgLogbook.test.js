const OrgLogbook = require('./OrgLogbook');

const logbookStr = `:LOGBOOK:
- State "DONE"       from "TODO"       [2017-11-08 Wed 14:54]
CLOCK: [2017-11-07 Tue 09:13]--[2017-11-07 Tue 09:16] =>  0:03
- Note taken on [2017-11-07 Tue 09:00] \\
  test log entry
  more text
:END:`;

let parsedObj = OrgLogbook.parse(logbookStr.split('\n'));

describe('has static method "parse"', () => {
  test('static attribute parse exists', () => {
    expect(OrgLogbook.parse).toBeDefined();
  });
  test('static attribute parse is a function', () => {
    expect(OrgLogbook.parse).toBeInstanceOf(Function);
  });
});

describe('parses org logbook', () => {
  test('parses org logbook', () => {
    expect(parsedObj).toEqual({
      result: {
        items: [
          {
            type: 'state',
            state: '"DONE"',
            from: '"TODO"',
            timestamp: {
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
            },
            text: ''
          },
          {
            type: 'clock',
            start: {
              type: 'inactive',
              date: {
                yyyy: 2017,
                mm: 11,
                dd: 7,
                dayName: 'Tue'
              },
              dateStart: null,
              dateEnd: null,
              time: {
                hh: 9,
                mm: 13
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
              value: '[2017-11-07 Tue 09:13]'
            },
            end: {
              type: 'inactive',
              date: {
                yyyy: 2017,
                mm: 11,
                dd: 7,
                dayName: 'Tue'
              },
              dateStart: null,
              dateEnd: null,
              time: {
                hh: 9,
                mm: 16
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
              value: '[2017-11-07 Tue 09:16]'
            },
            duration: '0:03'
          },
          {
            type: 'note',
            timestamp: {
              type: 'inactive',
              date: {
                yyyy: 2017,
                mm: 11,
                dd: 7,
                dayName: 'Tue'
              },
              dateStart: null,
              dateEnd: null,
              time: {
                hh: 9,
                mm: 0
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
              value: '[2017-11-07 Tue 09:00]'
            },
            text: 'test log entry\nmore text'
          }
        ]
      },
      delta: 7
    });
  });
});
