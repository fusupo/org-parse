const OrgTableCell = require('./OrgTableCell');

describe('has static method "parse"', () => {
  test('static attribute parse exists', () => {
    expect(OrgTableCell.parse).toBeDefined();
  });
  test('static attribute parse is a function', () => {
    expect(OrgTableCell.parse).toBeInstanceOf(Function);
  });
});

describe('parses table cell', () => {
  test('parses basic table cell', () => {
    const tableCellStr = ' foo bar baz |';
    expect(OrgTableCell.parse(tableCellStr)).toEqual({
      contents: 'foo bar baz',
      width: 13
    });
  });
  test('parses table cell with many spaces between content and "|"', () => {
    const tableCellStr = ' foo bar baz         |';
    expect(OrgTableCell.parse(tableCellStr)).toEqual({
      contents: 'foo bar baz',
      width: 21
    });
  });
  test('parses table cell of "rule" type, intermediate', () => {
    const tableCellStr = '--------------------+';
    expect(OrgTableCell.parse(tableCellStr)).toEqual({
      contents: '--------------------',
      width: 20
    });
  });
  test('parses table cell of "rule" type, end', () => {
    const tableCellStr = '----------|';
    expect(OrgTableCell.parse(tableCellStr)).toEqual({
      contents: '----------',
      width: 10
    });
  });
});

describe('has static method "serialize"', () => {
  test('static attribute serialize exists', () => {
    expect(OrgTableCell.serialize).toBeDefined();
  });
  test('static attribute parse is a function', () => {
    expect(OrgTableCell.serialize).toBeInstanceOf(Function);
  });
});

describe('serializes table cell', () => {
  test('serializes basic table cell', () => {
    const tableCellStr = ' foo bar baz |';
    expect(
      OrgTableCell.serialize({
        contents: 'foo bar baz',
        width: 13
      })
    ).toBe(tableCellStr);
  });
  test('serializes basic table cell, taking into account cell width attribute', () => {
    const tableCellStr = ' foo bar baz          |';
    expect(
      OrgTableCell.serialize({
        contents: 'foo bar baz',
        width: 22
      })
    ).toBe(tableCellStr);
  });
});
