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
      let item;
      // likewise here the last item is always empty string
      let headlineParts = srcParts[0].split(' ');
      switch (headlineParts[0]) {
        case 'State':
          item = OrgLogbook.parseStateEntry(srcParts);
          break;
        case 'Note':
          item = OrgLogbook.parseNoteEntry(srcParts);
          break;
        default:
          item = { type: 'unknown', text: srcParts[0] };
          break;
      }
      // for (let j = 0; j < srcParts.length - 1; j++) {
      //   // TODO: parse at least the headline here
      //   item.push(srcParts[j].trim());
      // }

      r.entries.push(item);
    }
    return r;
  }

  static parseStateEntry(lines) {
    let ret;
    let headline = lines[0];
    const tssIdx = headline.indexOf('[');
    const tseIdx = headline.indexOf(']');
    const ts = headline.substr(tssIdx, tseIdx - tssIdx + 1);
    headline = headline.substr(0, tssIdx).trim();
    let headlineParts = headline.split(/\s+(?=[A-Za-z"])/);

    switch (headlineParts.length) {
      case 4:
        // normal case: State "something" from "something else" [timestamp]
        ret = {
          type: 'state',
          state: headlineParts[1],
          from: headlineParts[3],
          timestamp: ts,
          text: 'foo'
        };
        break;
      case 3:
        // assuming missing from state: State "something" from   [timestamp]
        ret = {
          type: 'state',
          state: headlineParts[1],
          from: 'undefined',
          timestamp: ts,
          text: 'foo'
        };
        break;
      default:
        // dunno what to do in this case
        ret = {
          type: 'state',
          state: 'undefined',
          from: 'undefined',
          timestamp: 'undefined',
          text: 'foo'
        };
        break;
    }
    if (lines.length > 1) {
      lines.shift();
      ret.text = lines.join('\n');
    }
    return ret;
  }

  static parseNoteEntry(lines) {
    // D.R.Y !!!!!!
    let ret;
    let headline = lines[0];
    const tssIdx = headline.indexOf('[');
    const tseIdx = headline.indexOf(']');
    const ts = headline.substr(tssIdx, tseIdx - tssIdx + 1);
    // headline = headline.substr(0, tssIdx).trim();
    //let headlineParts = headline.split(/\s+(?=[A-Za-z"])/);

    ret = {
      type: 'note',
      timestamp: ts
    };

    console.log(lines.length);
    if (lines.length > 1) {
      lines.shift();
      ret.text = lines.join('\n');
      console.log(lines.join('\n'));
    }

    return ret;
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
