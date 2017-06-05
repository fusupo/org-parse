const OrgTree = require('./org-tree');
const OrgNode = require('./org-node');

const createNodeMaybe = srcStr => {
  if (srcStr[0] === '*') {
    let node = OrgNode.parse(srcStr);
    return node;
  } else {
    return false;
  }
};

const parseTree = (parentTree, nodes, header) => {
  let idx = 0;
  const innerFunc = (pt, h) => {
    let currNode = nodes[idx];
    let currTree = OrgTree.new(currNode, h);
    idx++;
    pt.children.push(currTree);
    while (idx < nodes.length && nodes[idx].level === currNode.level + 1) {
      innerFunc(currTree);
    }
    if (idx < nodes.length && currNode.level === nodes[idx].level) {
      innerFunc(pt);
    }
  };
  innerFunc(parentTree, header);
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
    parseTree(tree, nodes, nodesSrc[0]); //super hacky to save to document header!!!
    resolve({ nodes, tree });
  });

const serializeTree = tree => {
  return OrgTree.serialize(tree);
};

module.exports.parseOrg = parseOrg;
module.exports.serializeTree = serializeTree;
