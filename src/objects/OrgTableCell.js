const padEnd = require('../../utils').padEnd;

class OrgTableCell {
  static parse(tableCellStr) {
    const ret = {
      contents: null,
      width: null
    };
    const contents = /\s*([^\|\n\r]+[^\s])\s*(?:\||\+)/.exec(tableCellStr);
    ret.contents = contents[1];
    ret.width = tableCellStr.length - 1;
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
