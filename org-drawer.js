class OrgDrawer {
  static new(name) {
    var ret = {};
    ret.name = name;
    ret.properties = [];
    return ret;
  }

  static parseKeyVal(srcStr) {
    if (srcStr.length > 0) {
      let idx = 0;
      let colonCount = 0;
      do {
        let token = srcStr[idx];
        colonCount = token === ':' ? colonCount + 1 : colonCount;
        idx++;
      } while (idx < srcStr.length && colonCount < 2);
      let key = srcStr.slice(1, idx - 1);
      let val = srcStr.slice(idx).trim();
      // maybe parse val into OrgTimestamp/Number/etc..
      return [key, val];
    } else {
      throw new Error('empty drawer property string');
    }
  }

  static insert(drawer, keyval) {
    drawer.properties.push(keyval);
    return drawer;
  }

  static clone(drawer) {
    let ret = OrgDrawer.new(drawer.name);
    for (let i in drawer.properties) {
      var srcKeyval = drawer.properties[i];
      var targKeyval = [srcKeyval[0], srcKeyval[1]];
      ret.properties.push(targKeyval);
    }
    return ret;
  }
}

module.exports = OrgDrawer;
