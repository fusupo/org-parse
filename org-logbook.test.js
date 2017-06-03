const OrgLogbook = require('./org-logbook');
const logbook = new OrgLogbook('test');

const testLogItemA = `   - State "DONE"       from "TODO"       [2017-06-02 Fri 08:58] \\
     [2017-06-02 Fri 08:30]`;

test('has property "log"', () => {
  expect(logbook.log).toBeDefined();
  expect(logbook.log).toBeInstanceOf(Array);
  expect(logbook.log.length).toBe(0);
});

test('has method "push"', () => {
  expect(logbook.insert).toBeDefined();
  expect(logbook.insert).toBeInstanceOf(Function);
});

test('method "push" inserts an item into the "log"', () => {
  expect(logbook.log.length).toBe(0);
  logbook.insert(testLogItemA);
  expect(logbook.log.length).toBe(1);
});
