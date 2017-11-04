const OrgTableRow = require('../elements/OrgTableRow');

class OrgTable {
  static parse(tableStr) {
    const ret = {
      rows: [],
      formulas: []
    };
    const rowStrs = tableStr.split('\n');
    rowStrs.pop();
    rowStrs.forEach(r => {
      ret.rows.push(OrgTableRow.parse(r));
    });
    return ret;
  }

  static serialize(tableObj) {
    let ret = '';
    tableObj.rows.forEach(r => {
      ret += OrgTableRow.serialize(r) + '\n';
    });
    return ret;
  }
}

module.exports = OrgTable;
