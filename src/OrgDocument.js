const { randomId } = require('../utils');

const OrgSection = require('./OrgSection');
const OrgHeadLine = require('./OrgHeadline');

//let documents = [];

class OrgDocument {
  static get name() {
    return 'OrgDocument';
  }
  static parse(documentStr, store) {
    if (store[OrgDocument.name] === undefined) {
      store[OrgDocument.name] = {};
    }

    const ret = {
      id: randomId(),
      section: null,
      headlines: null
    };

    let nodesSrc = documentStr.split(/\n(?=\*{1} )/gm);

    // parse initial section
    let section = null;
    let firstPart = nodesSrc[0];
    if (!firstPart.startsWith('*')) {
      section = OrgSection.parse(firstPart, store);
      section.document = ret.id;
    }

    // parse subsequent headlines
    let headlines = [];
    for (let idx = section === null ? 0 : 1; idx < nodesSrc.length; idx++) {
      let headline = OrgHeadLine.parse(nodesSrc[idx], store);
      headlines.push(headline.id);
      headline.document = ret.id;
    }

    ret.section = section.id;
    ret.headlines = headlines;

    store[OrgDocument.name][ret.id] = ret;

    return ret;
  }

  static serialize(orgDocument, store) {
    // !! assuming well formed dateObj
    var sectionStr = OrgSection.serializeId(orgDocument.section, store);
    var headlines = orgDocument.headlines;
    var headlineStrs = headlines.map(h => {
      return OrgHeadline.serializeId(h, stor);
    });
    return sectionStr + headlineStrs.join('\n');
  }

  //--------------------

  // static addDocument(document) {
  //   documents.push(document);
  // }

  // static removeDocument(docOrId) {
  // if (docOrId instanceof OrgDocument) {
  //   documents[docOrId.id];
  // } else if (typeof docOrId === 'string') {
  //   documents[docOrId];
  // }
  // }

  // static get documents() {
  //   return documents;
  // }
  //--------------------
  // constructor() {
  //   this.section = null;
  //   this.headlines = null;
  // }
}

module.exports = OrgDocument;
