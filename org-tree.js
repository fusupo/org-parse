class OrgTree {
  static new(node) {
    return {
      node,
      children: []
    };
  }
}

module.exports = OrgTree;
