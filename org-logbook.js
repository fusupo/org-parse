const padStart = require('./utils').padStart;

class OrgLogbook {
  // static new(name) {
  //   let ret = {
  //     name: name || 'logbook',
  //     log: []
  //   };
  //   return ret;
  // }

  static parse(srcStr) {
    let r = {};
    r.entries = [];
    let srcItems = srcStr.split(/^(?:[\t ]* ) - /gm);
    srcItems.shift(); //using regex above first item is always empty string
    for (let i in srcItems) {
      let srcParts = srcItems[i].split('\n');
      let item = [];
      // likewise here the last item is always empty string
      for (let j = 0; j < srcParts.length - 1; j++) {
        // TODO: parse at least the headline here
        item.push(srcParts[j].trim());
      }
      r.entries.push(item);
    }
    return r;
  }

  static serialize(logbook, level = 1) {
    let r = '';
    if (logbook.entries.length > 0) {
      r += padStart(':LOGBOOK:', level + 1, ' ') + '\n';
      for (let i in logbook.entries) {
        for (let j in logbook.entries[i]) {
          r +=
            padStart(
              `${+j === 0 ? '- ' : ' '}${logbook.entries[i][j]}`,
              +j === 0 ? level + 1 : level + 2,
              ' '
            ) + '\n';
        }
      }
      r += padStart(':END:', level + 1, ' ') + '\n';
    }
    return r;
  }
}

module.exports = OrgLogbook;
