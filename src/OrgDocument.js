const OrgSection = require('./OrgSection');
const OrgHeadline = require('./OrgHeadline');

//let documents = [];

class OrgDocument {
  static get name() {
    return 'org.document';
  }

  static parse(documentStr) {
    const ret = {
      type: OrgDocument.name,
      section: null,
      headlines: null
    };

    let nodesSrc = documentStr.split(/\n(?=\*{1} )/gm);

    // parse initial section
    let section = null;
    let firstPart = nodesSrc[0];
    if (!firstPart.startsWith('*')) {
      section = OrgSection.parse(firstPart);
      //      section.document = ret;
    }

    // parse subsequent headlines
    let headlines = [];
    for (let idx = section === null ? 0 : 1; idx < nodesSrc.length; idx++) {
      let headline = OrgHeadline.parse(nodesSrc[idx]);
      headlines.push(headline);
      //     headline.document = ret;
    }

    ret.section = section && section;
    ret.headlines = headlines;

    return ret;
  }

  static serialize(orgDocument) {
    var sectionStr = OrgSection.serialize(orgDocument.section);
    var headlines = orgDocument.headlines;
    var headlineStrs = headlines.map(h => {
      return OrgHeadline.serialize(h);
    });
    return sectionStr + '\n' + headlineStrs.join('\n');
  }
}

module.exports = OrgDocument;
