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
  constructor(srcStr) {
    let idx = 0;
    let token = '';
    this.tags = [];
    this.content = null;
    this.todoKeyword = null;
    this.todoKeywordColor = null;
    do {
      token = srcStr[idx];
      idx++;
    } while (token === '*' && idx < srcStr.length);
    this.level = idx - 1;
    let rawHeadline = srcStr.slice(idx);
    // parse todo keyword
    idx = 0;
    let foundKeyword = false;
    do {
      let keyword = keywords[idx];
      if (rawHeadline.startsWith(keyword)) {
        foundKeyword = true;
        rawHeadline = rawHeadline.slice(keyword.length);
        this.todoKeyword = keyword;
        this.todoKeywordColor = colors[idx];
      }
      idx++;
    } while (idx < keywords.length && foundKeyword === false);

    // parse tags
    this.tags = [];
    while (rawHeadline.endsWith(':')) {
      rawHeadline = rawHeadline.slice(0, rawHeadline.length - 1);
      let lastIdx = rawHeadline.lastIndexOf(':');
      if (lastIdx > -1 && rawHeadline[lastIdx + 1] !== ' ') {
        this.tags.unshift(rawHeadline.slice(lastIdx + 1));
        rawHeadline = rawHeadline.slice(0, lastIdx + 1);
      }
    }
    this.content = rawHeadline.trim();
  }
}

module.exports = OrgHeadLine;
