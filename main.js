const OrgDocument = require('./src/OrgDocument');
const OrgHeadline = require('./src/OrgHeadline');
const OrgSection = require('./src/OrgSection');

const OrgLogbook = require('./src/greater-elements/OrgLogbook');
const OrgPlainList = require('./src/greater-elements/OrgPlainList');
const OrgPropDrawer = require('./src/greater-elements/OrgPropDrawer');
const OrgTable = require('./src/greater-elements/OrgTable');

const OrgBlock = require('./src/elements/OrgBlock');
const OrgKeyword = require('./src/elements/OrgKeyword');
const OrgParagraph = require('./src/elements/OrgParagraph');
const OrgPlanning = require('./src/elements/OrgPlanning');

const OrgTimestamp = require('./src/objects/OrgTimestamp');
const OrgTableCell = require('./src/objects/OrgTableCell');

const OrgDate = require('./src/sub-objects/OrgDate');
const OrgTime = require('./src/sub-objects/OrgTime');

const randomId = require('./utils').randomId;

const parseOrg = srcStr => {
  let doc = OrgDocument.parse(srcStr);
  return doc;
};

const serialize = orgDocument => {
  let ret = OrgDocument.serialize(orgDocument);
  return ret;
};

module.exports.OrgDocument = OrgDocument;
module.exports.OrgHeadline = OrgHeadline;
module.exports.OrgSection = OrgSection;

module.exports.OrgLogbook = OrgLogbook;
module.exports.OrgPlainList = OrgPlainList;
module.exports.OrgPropDrawer = OrgPropDrawer;
module.exports.OrgTable = OrgTable;

module.exports.OrgBlock = OrgBlock;
module.exports.OrgKeyword = OrgKeyword;
module.exports.OrgParagraph = OrgParagraph;
module.exports.OrgPlanning = OrgPlanning;

module.exports.OrgTimestamp = OrgTimestamp;
module.exports.OrgTableCell = OrgTableCell;

module.exports.OrgDate = OrgDate;
module.exports.OrgTime = OrgTime;

module.exports.parse = parseOrg;
module.exports.serialize = serialize;
