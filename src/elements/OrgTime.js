const padStartMaybe = require('../../utils').padStartMaybe;

class OrgTime {
  static parse(timeStr) {
    // assuming well formed timeStr
    // something like 12:12 or
    // 09:00 or
    // 9:00
    const ret = {
      hh: '',
      mm: ''
    };
    const parts = timeStr.split(':');
    ret.hh = parseInt(parts[0]);
    ret.mm = parseInt(parts[1]);
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
  }
}

module.exports = OrgTime;
