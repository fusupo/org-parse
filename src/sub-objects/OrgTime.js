const { padStartMaybe, randomId } = require('../../utils');

class OrgTime {
  static get name() {
    return 'OrgTime';
  }
  static parse(timeStr, store) {
    if (store[OrgTime.name] === undefined) {
      store[OrgTime.name] = {};
    }
    // assuming well formed timeStr
    // something like 12:12 or
    // 09:00 or
    // 9:00
    const ret = {}; //new OrgTime();
    const parts = timeStr.split(':');
    ret.id = randomId();
    ret.hh = parseInt(parts[0]);
    ret.mm = parseInt(parts[1]);

    store[OrgTime.name][ret.id] = ret;
    return ret;
  }

  static serialize(timeObj) {
    // !! assuming well formed timeObj
    // {
    //   hh: int [0-23],
    //   mm: int [0-59]
    // }
    return `${padStartMaybe(timeObj.hh.toString(), 2, '0')}:${padStartMaybe(
      timeObj.mm.toString(),
      2,
      '0'
    )}`;
    return '';
  }
  //--------------------
}

module.exports = OrgTime;
