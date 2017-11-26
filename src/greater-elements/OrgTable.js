const { randomId } = require('../../utils');
const OrgTableRow = require('../elements/OrgTableRow');

class OrgTable {
  static get name() {
    return 'OrgTable';
  }
  static parse(tableData, store) {
    if (store[OrgTable.name] === undefined) {
      store[OrgTable.name] = {};
    }

    let result = null;
    let delta = 1;

    if (tableData[0].startsWith('|-')) {
      result = {
        id: randomId(),
        rows: null,
        tableFormulas: null
      };
      let idx = 0;
      let endFound = false;
      while (idx < tableData.length && !endFound) {
        if (tableData[idx].startsWith('|') === false) {
          endFound = true;
        }
        idx++;
      }
      delta = idx;
      let range = tableData.slice(0, idx);
      let rows = range.map(r => {
        return OrgTableRow.parse(r, store).id;
      });
      result.rows = rows;
      store[OrgTable.name][result.id] = result;
    }

    return { result, delta };
  }

  static serialize(tableObj) {
    let ret = '';
    tableObj.rows.forEach(r => {
      ret += OrgTableRow.serialize(r) + '\n';
    });
    return ret;
  }
  //--------------------
  // constructor() {
  //   this.rows = null;
  //   this.tableFormulas = null;
  // }
}

module.exports = OrgTable;
