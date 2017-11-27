const { randomId } = require('../../utils');

class OrgPropDrawer {
  static get name() {
    return 'OrgPropDrawer';
  }
  static parse(propData, store) {
    if (store[OrgPropDrawer.name] === undefined) {
      store[OrgPropDrawer.name] = {};
    }

    let result = null;
    let delta = 0;
    if (propData[0] === ':PROPERTIES:') {
      result = { id: randomId(), props: {} };
      let index = propData.indexOf(':END:');
      delta = index + 1;
      let range = propData.slice(1, index);
      for (let i = 0; i < range.length; i++) {
        var keyval = range[i].split(': ');
        result.props[keyval[0].substr(1)] = keyval[1];
      }
      store[OrgPropDrawer.name][result.id] = result;
    }

    return { result, delta: delta };
  }

  static serialize(tableObj) {
    let ret = '';
    return ret;
  }
  //--------------------
  // constructor() {
  //   this.props = {};
  // }
}

module.exports = OrgPropDrawer;
