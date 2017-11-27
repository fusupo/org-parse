const { randomId } = require('../../utils');
class OrgKeyword {
  static get name() {
    return 'OrgKeyword';
  }
  static parse(src, store) {
    if (store[OrgKeyword.name] === undefined) {
      store[OrgKeyword.name] = {};
    }

    let keywordStr;
    let result = null;
    let delta = 0;
    if (typeof src === 'String') {
      keywordStr = src;
    } else if (Array.isArray(src)) {
      //src is an array of lines of text
      keywordStr = src[0];
    }
    let match = /\#\+([\w]+)\:(?: ([^\n\r]*))?/.exec(keywordStr);
    if (match !== null) {
      result = { id: randomId() };
      result.key = match[1];
      result.value = match[2] || null;
      delta = 1;
      store[OrgKeyword.name][result.id] = result;
    }
    return { result, delta };
  }
  static serialize(keywordObj) {}
}

module.exports = OrgKeyword;
