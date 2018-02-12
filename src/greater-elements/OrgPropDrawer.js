const OrgTimestamp = require('../objects/OrgTimestamp');

class OrgPropDrawer {
  static get name() {
    return 'org.propDrawer';
  }
  static parse(propData) {
    let result = null;
    let delta = 0;
    if (propData[0] === ':PROPERTIES:') {
      result = { type: OrgPropDrawer.name, props: {} };
      let index = propData.indexOf(':END:');
      delta = index + 1;
      let range = propData.slice(1, index);
      for (let i = 0; i < range.length; i++) {
        var [key, val] = range[i].split(': ');
        val = val.trim();
        key = key.substr(1);
        if (OrgTimestamp.isTimestamp(val)) {
          var ts = OrgTimestamp.parse(val);
          val = ts;
        }

        if (key.endsWith('+')) {
          key = key.substr(0, key.length - 1);
          if (!Array.isArray(result.props[key])) {
            result.props[key] = [result.props[key]];
          }
          result.props[key].push(val);
        } else {
          result.props[key] = val;
        }
      }
    }

    return { result, delta: delta };
  }

  static serialize(orgPropDrawer) {
    // if (orgPropDrawer.props) {
    let ret = ':PROPERTIES:\n';
    if (orgPropDrawer.props)
      Object.entries(orgPropDrawer.props).forEach(([key, val]) => {
        ret += `:${key}: `;
        if (typeof val === 'object') {
          ret += OrgTimestamp.serialize(val);
        } else {
          ret += val;
        }
        ret += '\n';
      });

    ret += ':END:';
    return ret;
    // }
    // return '';
  }
}

module.exports = OrgPropDrawer;
