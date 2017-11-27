const OrgDocument = require('./src/OrgDocument');
const OrgHeadline = require('./src/OrgHeadline');
const OrgSection = require('./src/OrgSection.js');

const OrgPropDrawer = require('./src/greater-elements/OrgPropDrawer.js');

const OrgKeyword = require('./src/elements/OrgKeyword');
const OrgPlanning = require('./src/elements/OrgPlanning');

const OrgTimestamp = require('./src/objects/OrgTimestamp.js');

//--------------------------------------

const parseOrg = (srcStr, store) => {
  let doc = OrgDocument.parse(srcStr, store);
  return doc;
};

const serialize = orgDocument => {
  let ret = '';
  return ret;
};

module.exports.parse = parseOrg;
module.exports.serialize = serialize;

//--------------------

module.exports.OrgDocument = OrgDocument;
module.exports.OrgHeadline = OrgHeadline;
module.exports.OrgSection = OrgSection;

module.exports.OrgPropDrawer = OrgPropDrawer;

module.exports.OrgKeyword = OrgKeyword;
module.exports.OrgPlanning = OrgPlanning;

module.exports.OrgTimestamp = OrgTimestamp;
