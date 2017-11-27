const { randomId } = require('../../utils');
const orderedList_re = /^ *[0-9]+[\.\)]{1} /;
const unorderedList_re = /^ *[\-\+]{1} /;
class OrgParagraph {
  static get name() {
    return 'OrgParagraph';
  }
  static parse(paragraphData, store) {
    if (store[OrgParagraph.name] === undefined) {
      store[OrgParagraph.name] = {};
    }

    let result = null;
    let delta = 0;
    let idx = 0;
    let foundEnd = false;
    while (idx < paragraphData.length && !foundEnd) {
      let currLine = paragraphData[idx];
      if (
        currLine.search(orderedList_re) < 0 &&
        currLine.search(unorderedList_re) < 0 &&
        currLine !== ''
      ) {
        idx++;
      } else {
        if (currLine === '') idx++;
        foundEnd = true;
      }
    }
    if (idx > 0) {
      result = {
        id: randomId(),
        value: null
      };
      let range = paragraphData.slice(0, idx);
      result.value = range; //.map(..)?

      delta = idx;
      store[OrgParagraph.name][result.id] = result;
    }

    return { result, delta };
  }
  //--------------------
  // constructor() {
  //   this.value = null;
  // }
}
module.exports = OrgParagraph;
