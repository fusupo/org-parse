class OrgKeyword {
  static get name() {
    return 'org.keyword';
  }
  static parse(src) {
    //, store) {
    // if (store[OrgKeyword.name] === undefined) {
    //   store[OrgKeyword.name] = {};
    // }

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
      result = {
        type: OrgKeyword.name
      };
      result.key = match[1];
      result.value = (match[2] && match[2].trim()) || null;
      delta = 1;
      //store[OrgKeyword.name][result.id] = result;
    }
    return { result, delta };
  }
  static serialize(orgKeyword) {
    return `#+${orgKeyword.key}: ${orgKeyword.value}`;
  }
}

module.exports = OrgKeyword;
