const OrgTable = require('./OrgTable');
const OrgTableRow = require('../elements/OrgTableRow');

const table = `|-----------------------+----------------+--------------|
| foo                   | bar            | baz          |
|-----------------------+----------------+--------------|
| qux                   | something      | else         |
| some table cell stuff | some more here | here as well |
|                       |                |              |
`;

const tableObj = {
  rows: [
    {
      type: OrgTableRow.RULE,
      cells: [
        { contents: '-----------------------', width: 23 },
        { contents: '----------------', width: 16 },
        { contents: '--------------', width: 14 }
      ]
    },
    {
      type: OrgTableRow.STANDARD,
      cells: [
        { contents: 'foo', width: 23 },
        { contents: 'bar', width: 16 },
        { contents: 'baz', width: 14 }
      ]
    },
    {
      type: OrgTableRow.RULE,
      cells: [
        { contents: '-----------------------', width: 23 },
        { contents: '----------------', width: 16 },
        { contents: '--------------', width: 14 }
      ]
    },
    {
      type: OrgTableRow.STANDARD,
      cells: [
        { contents: 'qux', width: 23 },
        { contents: 'something', width: 16 },
        { contents: 'else', width: 14 }
      ]
    },
    {
      type: OrgTableRow.STANDARD,
      cells: [
        { contents: 'some table cell stuff', width: 23 },
        { contents: 'some more here', width: 16 },
        { contents: 'here as well', width: 14 }
      ]
    },
    {
      type: OrgTableRow.STANDARD,
      cells: [
        { contents: '', width: 23 },
        { contents: '', width: 16 },
        { contents: '', width: 14 }
      ]
    }
  ],
  formulas: []
};

describe('has static method "parse"', () => {
  test('static attribute parse exists', () => {
    expect(OrgTable.parse).toBeDefined();
  });
  test('static attribute parse is a function', () => {
    expect(OrgTable.parse).toBeInstanceOf(Function);
  });
});

describe('parses table', () => {
  test('parses table', () => {
    let store = {};
    let parsedObj = OrgTable.parse(table.split('\n'), store);
    console.log(parsedObj.result);
    expect(parsedObj.result).toEqual(tableObj);
  });
});

describe('has static method "serialize"', () => {
  test('static attribute serialize exists', () => {
    expect(OrgTable.serialize).toBeDefined();
  });
  test('static attribute parse is a function', () => {
    expect(OrgTable.serialize).toBeInstanceOf(Function);
  });
});

describe('serializes table', () => {
  test('serializes table', () => {
    expect(OrgTable.serialize(tableObj)).toBe(table);
  });
});
console.log(table);
