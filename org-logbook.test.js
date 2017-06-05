const OrgLogbook = require('./org-logbook');
const testLogItemA = `   - State "DONE"       from "TODO"       [2017-06-02 Fri 08:58] \\
     [2017-06-02 Fri 08:30]`;
let logbook = OrgLogbook.new('test');

test('has property "log"', () => {
  expect(logbook.log).toBeDefined();
  expect(logbook.log).toBeInstanceOf(Array);
  expect(logbook.log.length).toBe(0);
});

test('has method "push"', () => {
  expect(OrgLogbook.insert).toBeDefined();
  expect(OrgLogbook.insert).toBeInstanceOf(Function);
});

test('method "push" inserts an item into the "log"', () => {
  expect(logbook.log.length).toBe(0);
  logbook = OrgLogbook.insert(logbook, testLogItemA);
  expect(logbook.log.length).toBe(1);
});
