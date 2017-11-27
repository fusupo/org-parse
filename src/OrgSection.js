const { randomId } = require('../utils');
const OrgGreaterBlock = require('./greater-elements/OrgGreaterBlock');
const OrgPropDrawer = require('./greater-elements/OrgPropDrawer');
const OrgLogbook = require('./greater-elements/OrgLogbook');
const OrgTable = require('./greater-elements/OrgTable');
const OrgPlainList = require('./greater-elements/OrgPlainList');

const OrgKeyword = require('./elements/OrgKeyword');
const OrgPlanning = require('./elements/OrgPlanning');
const OrgBlock = require('./elements/OrgBlock');
const OrgParagraph = require('./elements/OrgParagraph');

// -----------------------------
// GREATER ELEMENTS
// *Greater Blocks
// *Drawers and Property Drawers
// *Dynamic Blocks
// *Footnote Definitions
// Inlinetasks
// *Plain Lists and Items
// *Property Drawers
// *Tables

// -----------------------------
// ELEMENTS
// *Babel Call
// *Blocks
// Clock, Diary Sexp and Planning
// *Comments
// *Fixed Width Areas
// *Horizontal Rules
// *Keywords
// *LaTeX Environments
// *Node Properties
// *Paragraphs
// Table Rows

const greaterElements = [
  OrgGreaterBlock,
  OrgPropDrawer,
  OrgLogbook,
  OrgTable,
  OrgPlainList
];

const elements = [OrgKeyword, OrgPlanning, OrgBlock, OrgParagraph];

const tryParseGreaterElement = (lines, store = false) => {
  let idx = 0;
  let result = null;
  let delta;
  //console.log(lines);
  while (idx < greaterElements.length && result === null) {
    let res = greaterElements[idx].parse(lines, store);
    result = res.result;
    delta = res.delta;
    idx++;
  }
  return { result, delta };
};

const tryParseElement = (lines, store = false) => {
  let idx = 0;
  let result = null;
  let delta = 0;
  let name = null;
  do {
    let res = elements[idx].parse(lines, store);
    result = res.result;
    delta = res.delta;
    name = elements[idx].name;
  } while (result === null && ++idx < elements.length);

  return { name, result, delta };
};

class OrgSection {
  static get name() {
    return 'OrgSection';
  }
  static parse(sectionStr, store = false) {
    if (store[OrgSection.name] === undefined) {
      store[OrgSection.name] = {};
    }
    const lines = sectionStr.split('\n');
    const ret = {
      id: randomId(),
      children: []
    };

    while (lines[0] === '') lines.shift();
    let idx = 0;
    while (idx < lines.length) {
      let currLine = lines[idx];
      //console.log(currLine);
      let isOnlyWhitespace = /^\s+$/.exec(currLine) !== null;
      let isEmptyString = currLine === '';

      if (!isOnlyWhitespace && !isEmptyString) {
        let { name, result, delta } = tryParseGreaterElement(
          lines.slice(idx),
          store
        );
        // console.log('!!!!!!!!!!!!--->', result, delta);
        if (result !== null) {
          ret.children.push(result.id);
          result.section = ret.id;
          idx += delta;

          continue;
        } else {
          let elem = tryParseElement(lines.slice(idx), store);

          name = elem.name;
          result = elem.result;
          delta = elem.delta;

          if (result !== null) {
            ret.children.push(result.id);
            result.section = ret.id;
          }

          idx += delta === 0 ? 1 : delta;
        }
      } else {
        // console.log('do nothing');
        idx++;
      }
    }
    store[OrgSection.name][ret.id] = ret;
    return ret;
  }

  static serialize(sectionObj) {
    return ``;
  }

  //--------------------
  // constructor() {
  //   this.children = [];

  //   //this.document = null;
  // }
}

module.exports = OrgSection;
