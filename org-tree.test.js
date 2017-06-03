const OrgTree = require('./org-tree');
const tree = new OrgTree();

test('exists', () => {
  expect(tree).toBeDefined();
});
