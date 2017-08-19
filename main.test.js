const orgParse = require('./main');
const parseOrg = orgParse.parseOrg;
const serializeOrg = orgParse.serialize;
const OrgTree = require('./org-tree');
const fs = require('fs');

const testOrgStr = fs.readFileSync('./projects.org').toString();

test('is method', () => {
  expect(parseOrg).toBeInstanceOf(Function);
});

test('does something', () => {
  parseOrg(testOrgStr).then(res => {
    expect(res).toBeInstanceOf(Object);
    expect(res.nodes).toBeInstanceOf(Object);
    expect(res.tree).toBeInstanceOf(Object);
    serializeOrg(res.nodes, res.tree, res.settings);
  });
});
