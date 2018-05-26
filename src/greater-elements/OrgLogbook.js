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

const parseStateEntry = (lines, result) => {
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
        timestamp: OrgTimestamp.parse(ts),
        text: ''
      };

      break;
    case 2:
      // assuming missing from state: State "something" from   [timestamp]
      ret = {
        type: 'state',
        state: headlineParts[0],
        from: 'undefined',
        timestamp: OrgTimestamp.parse(ts),
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

  ret.text = parseEntryText(lines);

  return ret;
};

const parseNoteEntry = (lines, result) => {
  // D.R.Y !!!!!!
  let ret;
  let headline = lines[0];
  const tssIdx = headline.indexOf('[');
  const tseIdx = headline.indexOf(']');
  const ts = headline.substr(tssIdx, tseIdx - tssIdx + 1);
  ret = {
    type: 'note',
    timestamp: OrgTimestamp.parse(ts)
  };
  ret.text = parseEntryText(lines);

  return ret;
};

const parseClockEntry = (lines, result) => {
  const re = /^CLOCK: (\[[0-9]{4}-[0-9]{2}-[0-9]{2} [a-zA-Z]{3} [0-9]{2}:[0-9]{2}\])(?:--(\[[0-9]{4}-[0-9]{2}-[0-9]{2} [a-zA-Z]{3} [0-9]{2}:[0-9]{2}\]) =>  ([0-9:]*))*/m;
  let ret;

  let headline = lines[0];
  let reRes = re.exec(headline);
  ret = {
    type: 'clock',
    start: OrgTimestamp.parse(reRes[1]),
    end: OrgTimestamp.parse(reRes[2]),
    duration: reRes[3]
  };

  return ret;
};

class OrgLogbook {
  static get name() {
    return 'org.logbook';
  }
  static parse(logbookData) {
    let result = null;
    let delta = 0;
    if (logbookData[0] === ':LOGBOOK:') {
      result = {
        type: OrgLogbook.name,
        items: []
      };
      let idx = logbookData.indexOf(':END:');
      delta = idx + 1;
      let range = logbookData.slice(1, idx);
      while (range.length > 0) {
        let currLine = range.shift();
        if (currLine.startsWith('CLOCK:')) {
          // TODO: handle attached text under clock entries
          let clockBlock = [currLine];
          while (
            range.length > 0 &&
            !range[0].startsWith('CLOCK:') &&
            !range[0].startsWith('- Note') &&
            !range[0].startsWith('- State')
          ) {
            clockBlock.push(range.shift());
          }
          result.items.push(parseClockEntry(clockBlock, result));
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
          result.items.push(parseNoteEntry(noteBlock, result));
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
          result.items.push(parseStateEntry(stateBlock, result));
        } else {
          console.log('dont know what to do');
        }
      }
    }
    return { result, delta };
  }

  static serialize(orgLogbook) {
    const { items } = orgLogbook;
    let ret = ':LOGBOOK:\n';

    if (items) {
      items.forEach((i, idx) => {
        switch (i.type) {
          case 'state':
            const padNum1 = 13 - i.state.length;
            const pad1 =
              padNum1 > 0 ? new Array(padNum1).fill(' ').join('') : ' ';
            const from = i.from && i.from !== 'undefined' ? i.from : '';
            const padNum2 = 13 - from.length;
            const pad2 =
              padNum2 > 0 ? new Array(padNum2).fill(' ').join('') : ' ';

            ret += `- State ${i.state}${pad1}from ${from}${pad2}${OrgTimestamp.serialize(
              i.timestamp
            )}`;
            if (i.text) ret += ` \\\\\n  ${i.text.split('\n').join('\n  ')}`;
            break;
          case 'note':
            ret += `- Note taken on ${OrgTimestamp.serialize(
              i.timestamp
            )} \\\\\n  ${i.text.split('\n').join('\n  ')}`;
            break;
          case 'clock':
            ret += `CLOCK: ${OrgTimestamp.serialize(
              i.start
            )}--${OrgTimestamp.serialize(i.end)} =>  ${i.duration}`;
            break;
          default:
            break;
        }
        ret += '\n';
      });
    }

    ret += ':END:';
    return ret;
  }
}

module.exports = OrgLogbook;
