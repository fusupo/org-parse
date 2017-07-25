const OrgTree = require('./org-tree');
const OrgNode = require('./org-node');
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

const parseTree = (parentTree, nodes) => {
  let idx = 0;
  const innerFunc = pt => {
    let currNode = nodes[idx];
    let currTree = OrgTree.new(currNode);
    idx++;
    pt.children.push(currTree);
    while (
      idx < nodes.length &&
      nodes[idx].headline.level === currNode.headline.level + 1
    ) {
      innerFunc(currTree);
    }
    if (
      idx < nodes.length &&
      currNode.headline.level === nodes[idx].headline.level
    ) {
      innerFunc(pt);
    }
  };
  innerFunc(parentTree);
};

const parseOrg = srcStr =>
  new Promise((resolve, reject) => {
    let nodesSrc = srcStr.split(/\n(?=\*)/gm);
    let nodes = [];
    let tree = OrgTree.new(null);
    for (let idx in nodesSrc) {
      let node = createNodeMaybe(nodesSrc[idx]);
      if (node) {
        nodes.push(node);
      }
    }
    parseTree(tree, nodes);
    tree.header = nodesSrc[0]; //super hacky to save to document header!!!
    resolve({ nodes, tree });
  });

const serializeTree = tree => {
  return OrgTree.serialize(tree);
};

let utils = {
  nodeHasActiveTimeStamp_p,
  activeTimeStampFromNode
};

module.exports.parseOrg = parseOrg;
module.exports.serializeTree = serializeTree;
module.exports.utils = utils;
