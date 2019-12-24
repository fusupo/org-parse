const OrgTableRow = require('../elements/OrgTableRow');

class OrgTable {
  static get name() {
    return 'org.table';
  }
  static parse(tableData) {
    let result = null;
    let delta = 1;

    if (tableData[0].startsWith('|')) {
      result = {
        type: OrgTable.name,
        rows: null,
        tableFormulas: null
      };
      let idx = 0;
      let endFound = false;
      while (idx < tableData.length && !endFound) {
        if (tableData[idx].startsWith('|') === false) {
          endFound = true;
        } else {
          idx++;
        }
      }
      delta = idx;
      let range = tableData.slice(0, idx);
      let rows = range.map(r => {
        return OrgTableRow.parse(r);
      });
      result.rows = rows;
    }

    return { result, delta };
  }

  static serialize(tableObj) {
    let ret = '';
    tableObj.rows.forEach((r, idx) => {
      ret += `${idx === 0 ? '' : '\n'}${OrgTableRow.serialize(r)}`;
    });
    return ret;
  }
}

module.exports = OrgTable;
