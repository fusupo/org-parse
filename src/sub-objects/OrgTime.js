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
    const parts = timeStr.split(':');
    const [hh, mm] = parts;

    const prexisting = Object.values(store[OrgTime.name]).find(foo => {
      return foo.hh === hh && foo.mm === mm;
    });

    let ret;
    if (prexisting) {
      ret = prexisting;
    } else {
      ret = {}; //new OrgTime();
      ret.hh = hh;
      ret.mm = mm;
      ret.id = randomId();
      store[OrgTime.name][ret.id] = ret;
    }
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
