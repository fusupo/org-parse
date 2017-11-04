const padEnd = require('../../utils').padEnd;

class OrgTableCell {
  static parse(tableCellStr) {
    const ret = {
      contents: null
    };
    const contents = /\s*([^\|\n\r]+[^\s])\s*(?:\||\+)/.exec(tableCellStr);
    ret.contents = contents[1];
    return ret;
  }

  static serialize(tableCellObj, width = -1) {
    let ret = ` ${tableCellObj.contents}`;
    if (width === -1) {
      ret += ' |';
    } else {
      const targPad = width - ret.length;
      ret = targPad > -1 ? padEnd(ret, targPad, ' ') + '|' : ret + ' |';
    }
    return ret;
  }
}

module.exports = OrgTableCell;
