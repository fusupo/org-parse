const OrgNode = require('./org-node');
class OrgTree {
  static new(nodeID) {
    return {
      nodeID,
      children: []
    };
  }

  static findBranch(tree, nodeID) {
    let ret = tree.nodeID === nodeID ? tree : undefined;
    let i = 0;
    while (i < tree.children.length && ret === undefined) {
      ret = OrgTree.findBranch(tree.children[i], nodeID);
      i++;
    }
    return ret;
  }

  static childIDs(tree, nodeID) {
    const branch = OrgTree.findBranch(tree, nodeID);
    return branch !== undefined ? branch.children : undefined;
  }

  static serialize(tree, nodes) {
    let r = '';
    // // if (tree.header) {
    // //   r += tree.header + '\n';
    // // }
    if (tree.nodeID && tree.nodeID !== 'root') {
      r += OrgNode.serialize(nodes[tree.nodeID]);
    }
    for (let i in tree.children) {
      r += OrgTree.serialize(tree.children[i], nodes);
    }
    return r;
  }
}

module.exports = OrgTree;
