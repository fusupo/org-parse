const OrgTimestamp = require('./org-timestamp');
const timestamp = new OrgTimestamp();

test('someshit', () => {
  expect(timestamp).toBeDefined();
});
