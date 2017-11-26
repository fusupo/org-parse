const OrgTableRow = require('./OrgTableRow');

const tableRowA = `|-----------------------+----------------+--------------|`;
const tableRowB = `| foo                   | bar            | baz          |`;
const tableRowC = `| some table cell stuff | some more here | here as well |`;
const tableRowD = `|                       |                |              |`;

describe('has static method "parse"', () => {
  test('static attribute parse exists', () => {
    expect(OrgTableRow.parse).toBeDefined();
  });
  test('static attribute parse is a function', () => {
    expect(OrgTableRow.parse).toBeInstanceOf(Function);
  });
});

describe('parses table row', () => {
  test('parses table row "rule" type', () => {
    let store = {};
    let parsedObj = OrgTableRow.parse(tableRowA, store);
    console.log(JSON.stringify(store, null, 2));
    // expect().toEqual({
    //   type: OrgTableRow.RULE,
    //   cells: [
    //     { contents: '-----------------------', width: 23 },
    //     { contents: '----------------', width: 16 },
    //     { contents: '--------------', width: 14 }
    //   ]
    // });
  });
  // test('parses table row "standard" type', () => {
  //   expect(OrgTableRow.parse(tableRowB)).toEqual({
  //     type: OrgTableRow.STANDARD,
  //     cells: [
  //       { contents: 'foo', width: 23 },
  //       { contents: 'bar', width: 16 },
  //       { contents: 'baz', width: 14 }
  //     ]
  //   });
  //   expect(OrgTableRow.parse(tableRowC)).toEqual({
  //     type: OrgTableRow.STANDARD,
  //     cells: [
  //       { contents: 'some table cell stuff', width: 23 },
  //       { contents: 'some more here', width: 16 },
  //       { contents: 'here as well', width: 14 }
  //     ]
  //   });
  // });
  // test('parses table row of empty cells', () => {
  //   expect(OrgTableRow.parse(tableRowD)).toEqual({
  //     type: OrgTableRow.STANDARD,
  //     cells: [
  //       { contents: '', width: 23 },
  //       { contents: '', width: 16 },
  //       { contents: '', width: 14 }
  //     ]
  //   });
  // });
});

describe('has static method "serialize"', () => {
  test('static attribute serialize exists', () => {
    expect(OrgTableRow.serialize).toBeDefined();
  });
  test('static attribute parse is a function', () => {
    expect(OrgTableRow.serialize).toBeInstanceOf(Function);
  });
});

describe('serialize table row', () => {
  test('serializes table row of "rule" type', () => {
    expect(
      OrgTableRow.serialize({
        type: OrgTableRow.RULE,
        cells: [
          { contents: '-----------------------', width: 23 },
          { contents: '----------------', width: 16 },
          { contents: '--------------', width: 14 }
        ]
      })
    ).toBe(tableRowA);
  });
  test('serializes table row of "standard" type', () => {
    expect(
      OrgTableRow.serialize({
        type: OrgTableRow.STANDARD,
        cells: [
          { contents: 'foo', width: 5 },
          { contents: 'bar', width: 5 },
          { contents: 'baz', width: 5 }
        ]
      })
    ).toBe('| foo | bar | baz |');
  });
  test('serializes table row of "standard" type taking into account cell widths', () => {
    expect(
      OrgTableRow.serialize({
        type: OrgTableRow.STANDARD,
        cells: [
          { contents: 'foo', width: 23 },
          { contents: 'bar', width: 16 },
          { contents: 'baz', width: 14 }
        ]
      })
    ).toBe(tableRowB);
  });
  test('serializes table row of empty cells', () => {
    expect(
      OrgTableRow.serialize({
        type: OrgTableRow.STANDARD,
        cells: [
          { contents: '', width: 23 },
          { contents: '', width: 16 },
          { contents: '', width: 14 }
        ]
      })
    ).toBe(tableRowD);
  });
});
