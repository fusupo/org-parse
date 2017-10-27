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
    let ret = {
      stars: -1,
      todoKeyword: null,
      priority: null,
      comment: false,
      title: null,
      tags: null
    };

    let rawHeadline;
    let match;

    // parse stars
    match = /^\*+ /.exec(srcStr);
    ret.stars = match[0].length - 1;
    srcStr = srcStr.substr(ret.stars + 1); //.trim();

    if (srcStr.length === 0) return ret;

    // parse todo keyword
    let idx = 0;
    let foundKeyword = false;
    do {
      let keyword = keywords[idx];
      let re = new RegExp(`^${keyword}`, 'gm');
      match = re.exec(srcStr);
      if (match !== null) {
        foundKeyword = true;
        ret.todoKeyword = keyword;
        srcStr = srcStr.substr(ret.todoKeyword.length).trim();
      }
      idx++;
    } while (idx < keywords.length && foundKeyword === false);

    if (srcStr.length === 0) return ret;

    // parse priority cookie
    match = /^\[\#([ABC])\]/.exec(srcStr);
    if (match != null) {
      ret.priority = match[1];
      srcStr = srcStr.substr(match[0].length).trim();
    }

    if (srcStr.length === 0) return ret;

    // parse tags
    let re = /(?:\:)([^\:\n ]*)(?=\:)/g;
    let firstMatch = re.exec(srcStr);
    if (firstMatch !== null) {
      ret.tags = [];
      match = firstMatch;
      while (match !== null) {
        if (match[1] !== '') {
          ret.tags.push(match[1]);
        }
        match = re.exec(srcStr);
      }
      srcStr = srcStr.substr(0, firstMatch.index).trim();
    }

    if (srcStr.length === 0) return ret;

    // parse title
    if (srcStr.indexOf('COMMENT ') === 0) {
      ret.comment = true;
      ret.title = srcStr.substr(8).trim();
    } else {
      ret.title = srcStr;
    }

    return ret;
  }

  static colorForKeyword(keyword) {
    const idx = keywords.indexOf(keyword);
    if (idx > 0) {
      return colors[idx];
    } else {
      return '#ffffff';
    }
  }

  static keywords() {
    return keywords;
  }

  static serialize(headline) {
    const { stars, todoKeyword, priority, comment, title, tags } = headline;

    // TODOKEWYWORD
    let r = todoKeyword ? todoKeyword : '';
    if (todoKeyword && (priority || title || tags)) r += ' ';

    // PRIORITY
    r += priority ? `[#${priority}]` : '';

    // TITLE
    if (comment) r += 'COMMENT ';
    r += title ? title : '';
    r = padStart(r, 1, ' ');

    // STARS
    r = padStart(r, stars, '*');

    // TAGS
    let tagsStr =
      tags && tags.length > 0
        ? tags.reduce((m, t) => {
            return m + t + ':';
          }, ':')
        : '';
    if (tagsStr.length > 0) {
      const tagPad = Math.max(80 - tagsStr.length - r.length, 1);
      r += padStart(tagsStr, tagPad, ' ');
    }

    return r;
  }
}

module.exports = OrgHeadLine;
