const { padStartMaybe } = require('../../utils');

class OrgTime {
  static get name() {
    return 'org.time';
  }
  static parse(timeStr) {
    // assuming well formed timeStr
    // something like 12:12 or
    // 09:00 or
    // 9:00
    const parts = timeStr.split(':');
    let [hh, mm] = parts;
    hh = parseInt(hh);
    mm = parseInt(mm);
    let ret = { type: OrgTime.name, hh, mm };

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
