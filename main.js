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

const parseTree = (parentTree, nodes) => {
  let idx = 0;
  const innerFunc = pt => {
    let currNode = nodes[idx];
    let currTree = OrgTree.new(currNode);
    idx++;
    pt.children.push(currTree);
    while (idx < nodes.length && nodes[idx].level === currNode.level + 1) {
      innerFunc(currTree);
    }
    if (idx < nodes.length && currNode.level === nodes[idx].level) {
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
    resolve({ nodes, tree });
  });

module.exports = parseOrg;
