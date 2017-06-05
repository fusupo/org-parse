const OrgNode = require('./org-node');
class OrgTree {
  static new(node, header = null) {
    return {
      header,
      node,
      children: []
    };
  }

  static serialize(tree) {
    let r = '';
    if (tree.header) {
      r += tree.header + '\n';
    }
    if (tree.node) {
      r += OrgNode.serialize(tree.node);
    }
    for (let i in tree.children) {
      r += OrgTree.serialize(tree.children[i]);
    }
    return r;
  }
}

module.exports = OrgTree;
