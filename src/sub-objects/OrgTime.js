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
    let [hh, mm] = parts;
    hh = parseInt(hh);
    mm = parseInt(mm);

    const prexisting = Object.values(store[OrgTime.name]).find(time => {
      return time.hh === hh && time.mm === mm;
    });

    let ret;
    if (prexisting) {
      ret = prexisting;
    } else {
      ret = { id: randomId(), hh, mm };
      store[OrgTime.name][ret.id] = ret;
    }
    return ret;
  }

  static serialize(timeObj) {
    return `${padStartMaybe(timeObj.hh.toString(), 2, '0')}:${padStartMaybe(
      timeObj.mm.toString(),
      2,
      '0'
    )}`;
  }

  //--------------------

  static toMilli(timeObj) {
    let millisH = timeObj.hh * (1000 * 60 * 60); //number of millis in an hour
    let millisM = timeObj.mm * (1000 * 60); // number of millis in a minute
    return millisH + millisM;
  }
}

module.exports = OrgTime;
