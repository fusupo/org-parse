const orderedList_re = /^ *[0-9]+[\.\)]{1} /;
const unorderedList_re = /^ *[\-\+]{1} /;
class OrgParagraph {
  static get name() {
    return 'org.paragraph';
  }
  static parse(paragraphData) {
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
        type: OrgParagraph.name,
        value: null
      };
      let range = paragraphData.slice(0, idx);
      result.value = range; //.map(..)?

      delta = idx;
      // store[OrgParagraph.name][result.id] = result;
    }

    return { result, delta };
  }
  static serialize(orgParagraph) {
    let ret = '';
    if (orgParagraph.value)
      ret = orgParagraph.value.reduce((m, line, idx) => {
        return line !== ''
          ? idx < orgParagraph.value.length - 1 ? m + line + '\n' : m + line
          : m;
      }, '');
    return ret;
  }
}
module.exports = OrgParagraph;
