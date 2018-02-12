const { padEnd } = require('../../utils');

class OrgTableCell {
  static get name() {
    return 'org.table.cell';
  }
  static parse(tableCellStr) {
    const ret = {
      type: OrgTableCell.name,
      contents: null,
      width: tableCellStr.length - 1
    };
    let contents;
    //is empty cell?
    contents = /^(\s*)\|/.exec(tableCellStr);
    if (contents !== null) {
      ret.contents = '';
    } else {
      contents = /\s*([^\|\n\r]+[^\s])\s*(?:\||\+)/.exec(tableCellStr);
      ret.contents = contents[1];
    }

    return ret;
  }

  static serialize(tableCellObj) {
    let ret = ` ${tableCellObj.contents}`;
    const targPad = tableCellObj.width - ret.length;
    ret = targPad > -1 ? padEnd(ret, targPad, ' ') + '|' : ret + ' |';
    return ret;
  }
}

module.exports = OrgTableCell;
