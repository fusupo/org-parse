const padStart = require('./utils').padStart;

const keywords = [
  'PROJ',
  'TODO',
  'NEXT',
  'STARTED',
  'WAITING',
  'SOMEDAY',
  'DONE',
  'CANCELLED',
  'TODELEGATE',
  'DELEGATED',
  'COMPLETE'
];

const colors = [
  '#b22222', // firebrick
  '#b22222', // firebrick
  '#ff0000', // red
  '#ffd700', // gold
  '#d2691e', // chocolate
  '#b0c4de', // light steel blue
  '#6b8e23', // olive drab
  '#696969', // dim gray
  '#b22222', // firebrick
  '#d2691e', // chocolate
  '#6b8e23' // olive drab
];

class OrgHeadLine {
  static parse(srcStr) {
    let ret = {};
    ret.level = -1;
    ret.tags = null;
    ret.content = null;
    ret.todoKeyword = null;
    ret.todoKeywordColor = null;

    let rawHeadline;

    // parse todo keyword
    let idx = 0;
    let foundKeyword = false;
    do {
      let keyword = keywords[idx];
      let re = new RegExp(`^(\\*+)(?: +${keyword})(?: +(.*?))?[ \\t]*$`, 'gm');
      let match = re.exec(srcStr);
      if (match !== null) {
        foundKeyword = true;
        ret.todoKeyword = keyword;
        ret.todoKeywordColor = colors[idx];
        ret.level = match[1].length;
        rawHeadline = match[2];
      }
      idx++;
    } while (idx < keywords.length && foundKeyword === false);

    // or parse normal
    if (idx === keywords.length && foundKeyword === false) {
      let re = /^(\*+)(?: +(.*?))?[ \t]*$/g;
      let match = re.exec(srcStr);
      ret.level = match[1].length;
      rawHeadline = match[2];
    }

    // parse tags
    ret.tags = [];
    let re = /(?:\:)([^\:\n ]*)/g;
    let match = re.exec(rawHeadline);
    if (match !== null) ret.tags = [];
    while (match !== null) {
      if (match[1] !== '') {
        ret.tags.push(match[1]);
      }
      match = re.exec(rawHeadline);
    }
    if (ret.tags && ret.tags.length > 0) {
      rawHeadline = rawHeadline.slice(0, rawHeadline.indexOf(ret.tags[0]) - 1);
    } else {
      ret.tags = null;
    } // this is a little hacky
    ret.content = rawHeadline.trim();
    return ret;
  }

  static serialize(headline) {
    const level = headline.level;
    // TODO KEWYWORD
    let r = headline.todoKeyword ? ` ${headline.todoKeyword} ` : ' ';
    // CONTENT
    r += headline.content;
    r = padStart(r, level, '*');
    // TAGS
    let tags = headline.tags
      ? headline.tags.reduce((m, t) => {
          return m + t + ':';
        }, ':')
      : '';
    if (tags.length > 0) {
      const tagPad = Math.max(80 - tags.length - r.length, 1);
      r += padStart(tags, tagPad, ' ');
    }
    r += '\n';
    return r;
  }
}

module.exports = OrgHeadLine;
