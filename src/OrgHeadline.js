const OrgSection = require('./OrgSection');
const padStartMaybe = require('../utils').padStartMaybe;

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
  'COMPLETE',
  'LAYOUT',
  'VIEW',
  'FILE',
  'EMAIL'
];

const headlines = {};

class OrgHeadline {
  static get name() {
    return 'org.headline';
  }
  static parse(headlineStr) {
    let ret = {
      type: OrgHeadline.name,
      stars: null,
      keyword: null,
      priority: null,
      comment: false,
      title: null,
      tags: null,
      section: null,
      children: null,
      parent: null
    };

    let srcStr = '';
    let lineBreakIdx = headlineStr.indexOf('\n');
    if (lineBreakIdx > -1) {
      srcStr = headlineStr.substring(0, lineBreakIdx);
      headlineStr = headlineStr.substring(lineBreakIdx);
    } else {
      srcStr = headlineStr;
      headlineStr = '';
    }

    // parse stars
    let match = /^\*+ /.exec(srcStr);
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
        ret.keyword = keyword;
        srcStr = srcStr.substr(keyword.length).trim();
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

    // still want to parse (at least children) even if headline is empty, per se
    //if (srcStr.length === 0) return ret;

    // parse title
    if (srcStr.indexOf('COMMENT ') === 0) {
      ret.comment = true;
      ret.title = srcStr.substr(8).trim();
    } else {
      ret.title = srcStr;
    }

    if (headlineStr !== '') {
      let some_re = new RegExp(`\\n(?=\\*{${ret.stars + 1}} )`, 'gm');
      let nodesSrc = headlineStr.split(some_re);

      // parse initial section
      while (nodesSrc[0] === '') nodesSrc.shift();
      let firstPart = nodesSrc[0];
      if (!firstPart.startsWith('*')) {
        //console.log(firstPart);
        let section = OrgSection.parse(firstPart);
        ret.section = section;
        // section.headline = ret;
      }

      // parse subsequent headlines
      ret.children = [];
      for (
        let idx = ret.section === null ? 0 : 1;
        idx < nodesSrc.length;
        idx++
      ) {
        // parseHeadline
        let headline = OrgHeadline.parse(nodesSrc[idx]);
        ret.children.push(headline);
        // headline.parent = ret;
      }
    }

    return ret;
  }

  static serialize(orgHeadline) {
    const {
      stars,
      keyword,
      priority,
      comment,
      title,
      tags,
      section,
      children
    } = orgHeadline;

    let ret = '';
    for (var i = 0; i < stars; i++) {
      ret += '*';
    }
    if (keyword) ret += ` ${keyword}`;
    if (priority) ret += ` [#${priority}]`;
    if (comment) ret += ` COMMENT`;
    if (title) ret += ` ${title}`;
    if (tags) {
      let tagsStr = tags.reduce((m, o) => {
        return o ? m + o + ':' : m;
      }, ':');
      if (tagsStr !== ':') ret += padStartMaybe(` ${tagsStr}`, 80 - ret.length);
    }
    if (section) {
      ret += '\n';
      let sectStr = OrgSection.serialize(orgHeadline.section);
      ret += sectStr;
    }
    if (children) {
      ret += '\n';
      let childStrs = children.map(c => OrgHeadline.serialize(c));
      ret += childStrs.join('\n');
    }

    return ret;
  }
  //--------------------
  static addHeadline(orgHeadline) {}
  static removeHeadline(headlineOrId) {}
  static get headlines() {
    return headlines;
  }
  //--------------------
  constructor() {
    this.stars = null;
    this.keyword = null;
    this.priority = null;
    this.comment = false;
    this.title = null;
    this.tags = null;

    this.section = null;
    this.children = null;
    this.parent = null;
  }
}

module.exports = OrgHeadline;
