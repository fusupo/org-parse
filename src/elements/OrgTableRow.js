const { randomId } = require('../../utils');
const OrgTableCell = require('../objects/OrgTableCell');

class OrgTableRow {
  static get RULE() {
    return 'rule';
  }
  static get STANDARD() {
    return 'standard';
  }
  static get name() {
    return 'OrgTableRow';
  }
  static parse(tableRowStr, store) {
    if (store[OrgTableRow.name] === undefined) {
      store[OrgTableRow.name] = {};
    }

    const ret = {
      id: randomId(),
      type: null,
      cells: []
    };

    tableRowStr = tableRowStr.substr(1);

    if (tableRowStr[0] === '-') {
      ret.type = OrgTableRow.RULE;
      let idxPlus = tableRowStr.indexOf('+');
      while (idxPlus > -1) {
        const currCellStr = tableRowStr.substr(0, idxPlus + 1);
        tableRowStr = tableRowStr.substr(idxPlus + 1);
        idxPlus = tableRowStr.indexOf('+');
        ret.cells.push(OrgTableCell.parse(currCellStr, store).id);
      }
      ret.cells.push(OrgTableCell.parse(tableRowStr, store).id);
    } else {
      ret.type = OrgTableRow.STANDARD;
      let idxPlus = tableRowStr.indexOf('|');
      while (idxPlus > -1) {
        const currCellStr = tableRowStr.substr(0, idxPlus + 1);
        tableRowStr = tableRowStr.substr(idxPlus + 1);
        idxPlus = tableRowStr.indexOf('|');
        ret.cells.push(OrgTableCell.parse(currCellStr, store).id);
      }
    }

    store[OrgTableRow.name][ret.id] = ret;
    return ret;
  }

  static serialize(tableRowObj, widths = null) {
    let ret = '|';
    switch (tableRowObj.type) {
      case OrgTableRow.RULE:
        ret =
          tableRowObj.cells.reduce((memo, c, idx) => {
            return (
              memo +
              c.contents +
              (idx < tableRowObj.cells.length - 1 ? '+' : '')
            );
          }, ret) + '|';
        break;
      case OrgTableRow.STANDARD:
        tableRowObj.cells.forEach(c => {
          ret += OrgTableCell.serialize(c);
        });
        break;
    }
    return ret;
  }
}

module.exports = OrgTableRow;
