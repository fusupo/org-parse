const OrgLogbook = require('./org-logbook');
const testLogItemA = `   - State "DONE"       from "TODO"       [2017-06-02 Fri 08:58] \\
     [2017-06-02 Fri 08:30]`;
const testLog = `      :LOGBOOK:
      CLOCK: [2017-08-18 Fri 15:05]
      :END:`;

test('has property "prse"', () => {
  expect(OrgLogbook.parse).toBeDefined();
  expect(OrgLogbook.parse).toBeInstanceOf(Function);
});

OrgLogbook.parse(testLog);
// test('has method "push"', () => {
//   expect(OrgLogbook.insert).toBeDefined();
//   expect(OrgLogbook.insert).toBeInstanceOf(Function);
// });

// test('method "push" inserts an item into the "log"', () => {
//   expect(logbook.log.length).toBe(0);
//   logbook = OrgLogbook.insert(logbook, testLogItemA);
//   expect(logbook.log.length).toBe(1);
// });
