const { randomId } = require('../../utils');
const OrgTimestamp = require('../objects/OrgTimestamp');

const parseEntryText = lines => {
  let text = '';
  if (lines[lines.length - 1] === '') lines.pop();
  if (lines.length > 1) {
    lines.shift();
    lines = lines.map(l => l.trim());
    text = lines.join('\n');
  }
  return text;
};
const parseStateEntry = (lines, store, result) => {
  let ret;
  let headline = lines[0];
  headline = headline.substr(8);
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
        timestamp: OrgTimestamp.parse(ts, store).id,
        text: ''
      };

      // if (store) ret.timestamp.addToRef(result, 'logbook:state');

      break;
    case 2:
      // assuming missing from state: State "something" from   [timestamp]
      ret = {
        type: 'state',
        state: headlineParts[0],
        from: 'undefined',
        timestamp: OrgTimestamp.parse(ts, store).id,
        text: ''
      };

      // if (store) ret.timestamp.addToRef(result, 'logbook:state');

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

  ret.text = parseEntryText(lines);

  return ret;
};
const parseNoteEntry = (lines, store, result) => {
  // D.R.Y !!!!!!
  let ret;
  let headline = lines[0];
  const tssIdx = headline.indexOf('[');
  const tseIdx = headline.indexOf(']');
  const ts = headline.substr(tssIdx, tseIdx - tssIdx + 1);
  ret = {
    type: 'note',
    timestamp: OrgTimestamp.parse(ts, store).id //ts
  };
  ret.text = parseEntryText(lines);

  // if (store) {
  //   ret.timestamp.addToRef(result, 'logbook:note');
  // }

  return ret;
};

const parseClockEntry = (lines, store, result) => {
  const re = /^CLOCK: (\[[0-9]{4}-[0-9]{2}-[0-9]{2} [a-zA-Z]{3} [0-9]{2}:[0-9]{2}\])(?:--(\[[0-9]{4}-[0-9]{2}-[0-9]{2} [a-zA-Z]{3} [0-9]{2}:[0-9]{2}\]) =>  ([0-9:]*))*/m;
  let ret;

  let headline = lines[0];
  let reRes = re.exec(headline);
  ret = {
    type: 'clock',
    start: OrgTimestamp.parse(reRes[1], store).id,
    end: OrgTimestamp.parse(reRes[2], store).id,
    duration: reRes[3]
  };

  // if (store) ret.start.addToRef(result, 'logbook:clock:start');
  // if (store) ret.end.addToRef(result, 'logbook:clock:end');

  return ret;
};
class OrgLogbook {
  static get name() {
    return 'OrgLogbook';
  }
  static parse(logbookData, store = false) {
    if (store[OrgLogbook.name] === undefined) {
      store[OrgLogbook.name] = {};
    }
    let result = null;
    let delta = 0;
    if (logbookData[0] === ':LOGBOOK:') {
      result = {
        id: randomId(),
        items: []
      };
      let idx = logbookData.indexOf(':END:');
      delta = idx + 1;
      let range = logbookData.slice(1, idx);
      while (range.length > 0) {
        let currLine = range.shift();
        if (currLine.startsWith('CLOCK:')) {
          let clockBlock = [currLine];
          while (
            range.length > 0 &&
            !range[0].startsWith('CLOCK:') &&
            !range[0].startsWith('- Note') &&
            !range[0].startsWith('- State')
          ) {
            clockBlock.push(range.shift());
          }
          result.items.push(parseClockEntry(clockBlock, store, result));
        } else if (currLine.startsWith('- Note')) {
          let noteBlock = [currLine];
          while (
            range.length > 0 &&
            !range[0].startsWith('CLOCK:') &&
            !range[0].startsWith('- Note') &&
            !range[0].startsWith('- State')
          ) {
            noteBlock.push(range.shift());
          }
          result.items.push(parseNoteEntry(noteBlock, store, result));
        } else if (currLine.startsWith('- State')) {
          let stateBlock = [currLine];
          while (
            range.length > 0 &&
            !range[0].startsWith('CLOCK:') &&
            !range[0].startsWith('- Note') &&
            !range[0].startsWith('- State')
          ) {
            stateBlock.push(range.shift());
          }
          result.items.push(parseStateEntry(stateBlock, store, result));
        } else {
          console.log('dont know what to do');
        }
      }

      store[OrgLogbook.name][result.id] = result;
    }
    return { result, delta };
  }

  static serialize(orgLogbook) {
    return '';
  }
  //--------------------
  constructor() {
    this.items = null;
  }
}

module.exports = OrgLogbook;
