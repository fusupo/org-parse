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
    this.tags = [];
    this.content = null;
    this.todoKeyword = null;
    this.todoKeywordColor = null;
    let idx = 0;
    let rawHeadline;

    // parse todo keyword
    idx = 0;
    let foundKeyword = false;
    do {
      let keyword = keywords[idx];
      let re = new RegExp(`^(\\*+)(?: +${keyword})(?: +(.*?))?[ \\t]*$`, 'gm');
      let match = re.exec(srcStr);
      if (match !== null) {
        foundKeyword = true;
        this.todoKeyword = keyword;
        this.todoKeywordColor = colors[idx];
        this.level = match[1].length;
        rawHeadline = match[2];
      }
      idx++;
    } while (idx < keywords.length && foundKeyword === false);

    // or parse normal
    if (idx === keywords.length && foundKeyword === false) {
      let re = /^(\*+)(?: +(.*?))?[ \t]*$/g;
      let match = re.exec(srcStr);
      this.level = match[1].length;
      rawHeadline = match[2];
    }

    // parse tags
    this.tags = [];
    let re = /(?:\:)([^\:\n ]*)/g;
    let match = re.exec(rawHeadline);
    while (match !== null) {
      if (match[1] !== '') {
        this.tags.push(match[1]);
      }
      match = re.exec(rawHeadline);
    }
    rawHeadline = rawHeadline.slice(0, rawHeadline.indexOf(this.tags[0]) - 1);
    this.content = rawHeadline.trim();
  }
}

module.exports = OrgHeadLine;
