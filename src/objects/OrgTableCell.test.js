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
      contents: 'foo bar baz'
    });
  });
  test('parses table cell with many spaces between content and "|"', () => {
    const tableCellStr = ' foo bar baz         |';
    expect(OrgTableCell.parse(tableCellStr)).toEqual({
      contents: 'foo bar baz'
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
  test('serializes basic table cell, fit width when no "width" parameter is supplied', () => {
    const tableCellStr = ' foo bar baz |';
    expect(
      OrgTableCell.serialize({
        contents: 'foo bar baz'
      })
    ).toBe(tableCellStr);
  });
  test('serializes table cell to appropriate width when "width" parameter is supplied', () => {
    const tableCellStr = ' foo bar baz         |';
    expect(
      OrgTableCell.serialize(
        {
          contents: 'foo bar baz'
        },
        21
      )
    ).toBe(tableCellStr);
  });
  test('serializes table cell to fit width when "width" parameter is too small', () => {
    const tableCellStr = ' foo bar baz |';
    expect(
      OrgTableCell.serialize(
        {
          contents: 'foo bar baz'
        },
        1
      )
    ).toBe(tableCellStr);
  });
});
