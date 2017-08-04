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

  static parseEntryText(lines) {
    const lns = lines.slice(0);
    let text = '';
    if (lines[lines.length - 1] === '') lines.pop();
    if (lines.length > 1) {
      lines.shift();
      lines = lines.map(l => l.trim());
      text = lines.join('\n');
      //console.log(ret);
    }
    return text;
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
          text: ''
        };
        break;
      case 3:
        // assuming missing from state: State "something" from   [timestamp]
        ret = {
          type: 'state',
          state: headlineParts[1],
          from: 'undefined',
          timestamp: ts,
          text: ''
        };
        break;
      default:
        // dunno what to do in this case
        ret = {
          type: 'state',
          state: 'undefined',
          from: 'undefined',
          timestamp: 'undefined',
          text: ''
        };
        break;
    }

    ret.text = OrgLogbook.parseEntryText(lines);

    return ret;
  }

  static parseNoteEntry(lines) {
    // D.R.Y !!!!!!
    let ret;
    let headline = lines[0];
    const tssIdx = headline.indexOf('[');
    const tseIdx = headline.indexOf(']');
    const ts = headline.substr(tssIdx, tseIdx - tssIdx + 1);

    ret = {
      type: 'note',
      timestamp: ts
    };

    ret.text = OrgLogbook.parseEntryText(lines);

    return ret;
  }

  static serialize(logbook, level = 1) {
    let r = '';

    const serializeText = e => {
      let ret = '';
      if (e.text !== undefined && e.text !== '') {
        let lines = e.text.split('\n');
        lines = lines.map(l => padStart(l, level + 3));
        lines = lines.join('\n');
        ret += ` \\\\\n${lines}`;
      }
      ret += '\n';
      return ret;
    };

    if (logbook.entries.length > 0) {
      console.log(level);
      r += padStart(':LOGBOOK:', level + 1) + '\n';
      for (let i in logbook.entries) {
        const entry = logbook.entries[i];
        if (entry.type === 'state') {
          let prt1 = `- State ${entry.state}`;
          let prt2 = `from ${entry.from}`;
          let i;
          for (i = 0; i < 13 - entry.state.length; i++) {
            prt1 += ' ';
          }
          for (i = 0; i < 13 - entry.from.length; i++) {
            prt2 += ' ';
          }
          r += padStart(`${prt1}${prt2}${entry.timestamp}`, level + 1, ' ');
          r += serializeText(entry);
        } else if (entry.type === 'note') {
          r += padStart(`- Note taken on ${entry.timestamp}`, level + 1);
          r += serializeText(entry);
        } else {
          //handle error
        }
      }
      r += padStart(':END:', level + 1) + '\n';
    }

    console.log(r);
    return r;
  }
}

module.exports = OrgLogbook;
