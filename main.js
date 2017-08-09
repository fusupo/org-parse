const OrgDrawer = require('./org-drawer');
const OrgTree = require('./org-tree');
const OrgNode = require('./org-node');
const OrgHeadline = require('./org-headline');
const OrgTimestamp = require('./org-timestamp');
const nodeHasActiveTimeStamp_p = require('./utils').nodeHasActiveTimeStamp_p;
const activeTimeStampFromNode = require('./utils').activeTimeStampFromNode;

const createNodeMaybe = srcStr => {
  if (srcStr[0] === '*') {
    let node = OrgNode.parse(srcStr);
    return node;
  } else {
    return false;
  }
};

const parseTree = (parentTree, nodes, nodeIDs) => {
  let idx = 0;
  const innerFunc = pt => {
    const currID = nodeIDs[idx];
    let currNode = nodes[currID];
    let currTree = OrgTree.new(currID);
    idx++;
    pt.children.push(currTree);
    while (
      idx < nodeIDs.length &&
      nodes[nodeIDs[idx]].headline.level === currNode.headline.level + 1
    ) {
      innerFunc(currTree);
    }
    if (
      idx < nodeIDs.length &&
      currNode.headline.level === nodes[nodeIDs[idx]].headline.level
    ) {
      innerFunc(pt);
    }
  };
  innerFunc(parentTree);
};

const parseOrg = srcStr =>
  new Promise((resolve, reject) => {
    let nodesSrc = srcStr.split(/\n(?=\*)/gm);
    let settings = [];
    let nodes = {};
    let tree = OrgTree.new('root');
    while (nodesSrc[0].startsWith('#+')) {
      settings.push(nodesSrc[0]);
      nodesSrc.shift();
    }
    for (let idx in nodesSrc) {
      let node = createNodeMaybe(nodesSrc[idx]);
      if (node) {
        nodes[node.id] = node;
      }
    }
    parseTree(tree, nodes, Object.keys(nodes));
    //tree.header = nodesSrc[0]; //super hacky to save to document header!!!
    resolve({ nodes, tree, settings });
  });

const serialize = (nodes, tree) => {
  return OrgTree.serialize(tree, nodes);
};

let utils = {
  nodeHasActiveTimeStamp_p,
  activeTimeStampFromNode
};

module.exports.parseOrg = parseOrg;
module.exports.serialize = serialize;
module.exports.utils = utils;

module.exports.OrgTimestamp = OrgTimestamp;
module.exports.OrgDrawer = OrgDrawer;
module.exports.OrgTree = OrgTree;
module.exports.OrgNode = OrgNode;
module.exports.OrgHeadline = OrgHeadline;
