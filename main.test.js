const OrgParser = require('./main');
const fs = require('fs');

const testOrgStr = fs.readFileSync('./test.org').toString();

test('is method', () => {
  expect(OrgParser.parse).toBeInstanceOf(Function);
});

// test('does something', () => {
//   parseOrg(testOrgStr).then(res => {
//     expect(res).toBeInstanceOf(Object);
//     expect(res.nodes).toBeInstanceOf(Object);
//     expect(res.tree).toBeInstanceOf(Object);
//     serializeOrg(res.nodes, res.tree, res.settings);
//   });
// });

let store = {};
let foo = OrgParser.parse(testOrgStr, store);

//console.log(foo);
console.log(JSON.stringify(store, null, 1));
