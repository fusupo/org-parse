const orgParse = require('./main');
const OrgTree = require('./org-tree');
const fs = require('fs');

const testOrgStr = fs.readFileSync('./projects.org').toString();

test('is method', () => {
  expect(orgParse).toBeInstanceOf(Function);
});

test('does something', () => {
  orgParse(testOrgStr).then(res => {
    expect(res).toBeInstanceOf(Object);
    expect(res).toBeInstanceOf(Object);
    expect(res.nodes).toBeInstanceOf(Object);
    expect(res.tree).toBeInstanceOf(OrgTree);
  });
});
