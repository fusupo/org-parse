const padStart = require('./utils').padStart;

const logbookEntriesRx = /^(?:[\t ]*)(?:- )*((?:State)|(?:CLOCK:)|(?:Note)) ([\\ \-\:\[\]\=\>\"0-9a-zA-Z]*)/i;

class OrgLogbook {
  static parse(srcStr) {
    let r = {};
    r.entries = [];
    let srcItems = srcStr.split('\n');
    const gatherNotes = () => {
      const notes = [];
      if (srcItems.length > 0) {
        let reRes = logbookEntriesRx.exec(srcItems[0]);
        let type = reRes ? reRes[1] : null;
        while (type === null && srcItems.length > 0) {
          notes.push(srcItems.shift());
          reRes = logbookEntriesRx.exec(srcItems[0]);
          type = reRes ? reRes[1] : null;
        }
      }
      return notes;
    };

    while (srcItems.length > 0) {
      let item = null;
      let reResults = logbookEntriesRx.exec(srcItems.shift());
      let thisType = reResults ? reResults[1] : null;
      let thisBody = thisType ? reResults[2] : null;
      let nextType, srcParts = [thisBody];
      switch (thisType) {
        case 'State':
          item = OrgLogbook.parseStateEntry([thisBody].concat(gatherNotes()));
          break;
        case 'CLOCK:':
          item = OrgLogbook.parseClockEntry([thisBody].concat(gatherNotes()));
          break;
        case 'Note':
          item = OrgLogbook.parseNoteEntry([thisBody].concat(gatherNotes()));
          break;
        default:
          console.error('unhandled logbook entry type: ' + item);
          break;
      }
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
      case 3:
        // normal case: State "something" from "something else" [timestamp]
        ret = {
          type: 'state',
          state: headlineParts[0],
          from: headlineParts[2],
          timestamp: ts,
          text: ''
        };
        break;
      case 2:
        // assuming missing from state: State "something" from   [timestamp]
        ret = {
          type: 'state',
          state: headlineParts[0],
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

  static parseClockEntry(lines) {
    const re = /^(\[[0-9]{4}-[0-9]{2}-[0-9]{2} [a-zA-Z]{3} [0-9]{2}:[0-9]{2}\])(?:--(\[[0-9]{4}-[0-9]{2}-[0-9]{2} [a-zA-Z]{3} [0-9]{2}:[0-9]{2}\]) =>  ([0-9:]*))*/m;
    let ret;

    let headline = lines[0];
    let reRes = re.exec(headline);
    ret = {
      type: 'clock',
      start: reRes[1],
      end: reRes[2],
      duration: reRes[3]
    };
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
        } else if (entry.type === 'clock') {
          r += padStart(`CLOCK: ${entry.start}`);
          if (entry.end !== undefined) {
            r += `--${entry.end} =>  ${entry.duration}`;
          }
          r += '\n';
        }
      }
      r += padStart(':END:', level + 1) + '\n';
    }

    console.log(r);
    return r;
  }
}

module.exports = OrgLogbook;
