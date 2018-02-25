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

const tryParseGreaterElement = lines => {
  let idx = 0;
  let result = null;
  let delta;
  //console.log(lines);
  while (idx < greaterElements.length && result === null) {
    let res = greaterElements[idx].parse(lines);
    result = res.result;
    delta = res.delta;
    idx++;
  }
  return { result, delta };
};

const tryParseElement = lines => {
  let idx = 0;
  let result = null;
  let delta = 0;
  let name = null;
  do {
    let res = elements[idx].parse(lines);
    result = res.result;
    delta = res.delta;
    name = elements[idx].name;
  } while (result === null && ++idx < elements.length);

  return { name, result, delta };
};

class OrgSection {
  static get name() {
    return 'org.section';
  }
  static parse(sectionStr) {
    const lines = sectionStr.split('\n');
    const ret = {
      type: OrgSection.name,
      children: []
    };

    while (lines[0] === '') lines.shift();
    let idx = 0;
    while (idx < lines.length) {
      let currLine = lines[idx];
      let isOnlyWhitespace = /^\s+$/.exec(currLine) !== null;
      let isEmptyString = currLine === '';

      if (!isOnlyWhitespace && !isEmptyString) {
        let { name, result, delta } = tryParseGreaterElement(lines.slice(idx));
        //console.log('!!!!!!!!!!!!--->', result, delta);
        if (result !== null) {
          ret.children.push(result);
          //result.section = ret;
          idx += delta;

          continue;
        } else {
          let elem = tryParseElement(lines.slice(idx));

          name = elem.name;
          result = elem.result;
          delta = elem.delta;

          if (result !== null) {
            ret.children.push(result);
            // result.section = ret;
          }

          idx += delta === 0 ? 1 : delta;
        }
      } else {
        // console.log('do nothing');
        idx++;
      }
    }
    return ret;
  }

  static serialize(orgSection) {
    var ret = '';
    //    console.log(orgSection);
    if (!orgSection || !orgSection.children) return '';
    ret = orgSection.children.map(o => {
      let r = '';
      switch (o.type) {
        case OrgKeyword.name:
          r = OrgKeyword.serialize(o);
          break;
        case OrgPlanning.name:
          r = OrgPlanning.serialize(o);
          break;
        case OrgPropDrawer.name:
          r = OrgPropDrawer.serialize(o);
          break;
        case OrgTable.name:
          r = OrgTable.serialize(o);
          break;
        case OrgParagraph.name:
          r = OrgParagraph.serialize(o);
          break;
        case OrgPlainList.name:
          r = OrgPlainList.serialize(o);
          break;
        case OrgBlock.name:
          r = OrgBlock.serialize(o);
          break;
        case OrgLogbook.name:
          r = OrgLogbook.serialize(o);
          break;
        default:
          console.log('UNHANDLED TYPE AT ORG-SECTION SERIALIZE:', o.type);
          break;
      }
      return r;
    });

    return ret.join('\n');
  }
}

module.exports = OrgSection;
