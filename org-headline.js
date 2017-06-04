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

function parse(srcStr) {
  let ret = {};
  ret.tags = [];
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
  while (match !== null) {
    if (match[1] !== '') {
      ret.tags.push(match[1]);
    }
    match = re.exec(rawHeadline);
  }
  rawHeadline = rawHeadline.slice(0, rawHeadline.indexOf(ret.tags[0]) - 1);
  ret.content = rawHeadline.trim();
  return ret;
}

module.exports.parse = parse; //OrgHeadLine;
