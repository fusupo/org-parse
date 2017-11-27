const { randomId } = require('../../utils');

class OrgBlock {
  static get name() {
    return 'OrgBlock';
  }
  static parse(blockData, store) {
    if (store[OrgBlock.name] === undefined) {
      store[OrgBlock.name] = {};
    }
    let result = null;
    let delta = 0;

    let firstLine = blockData[0];
    let match = /\#\+(?:(?:BEGIN)||(?:begin)){1}_([^\s]+)(?: ([^\n\r]+)){0,}/.exec(
      firstLine
    );
    if (match !== null) {
      result = {
        id: randomId(),
        name: null,
        data: null,
        contents: null
      };
      result.name = match[1];
      result.data = match[2] !== '' ? match[2] : null;
      let idx = blockData.indexOf('#+END_' + result.name);
      if (idx < 0) idx = blockData.indexOf('#+end_' + result.name);
      if (idx > -1) {
        delta = idx + 1;
        result.contents = blockData.slice(1, idx);
      }
      store[OrgBlock.name][result.id] = result;
    }

    return { result, delta };
  }
  static serialize(orgBlock) {}
  //--------------------
  // constructor() {
  //   this.name = null;
  //   this.data = null;
  //   this.contents = null;
  // }
}

module.exports = OrgBlock;
