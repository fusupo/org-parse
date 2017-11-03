const OrgDate = require('../sub-objects/OrgDate');
const OrgTime = require('../sub-objects/OrgTime');
const padStart = require('../../utils').padStart;
const moment = require('moment');

// <%%(SEXP)>                                                     (diary)       // UNSUPPORTED

class OrgTimestamp {
  static get ACTIVE() {
    // <DATE TIME REPEATER-OR-DELAY>                                  (active)
    return 'active';
  }
  static get INACTIVE() {
    // [DATE TIME REPEATER-OR-DELAY]                                  (inactive)
    return 'inactive';
  }
  static get ACTIVE_RANGE_A() {
    // <DATE TIME REPEATER-OR-DELAY>--<DATE TIME REPEATER-OR-DELAY>   (active range A)
    return 'active_range_a';
  }
  static get INACTIVE_RANGE_A() {
    // [DATE TIME REPEATER-OR-DELAY]--[DATE TIME REPEATER-OR-DELAY]   (inactive range A)
    return 'inactive_range_a';
  }
  static get ACTIVE_RANGE_B() {
    // <DATE TIME-TIME REPEATER-OR-DELAY>                             (active range B)
    return 'active_range_b';
  }
  static get INACTIVE_RANGE_B() {
    // [DATE TIME-TIME REPEATER-OR-DELAY]                             (inactive range B)
    return 'inactive_range_b';
  }

  static parse(timestampStr) {
    const base_coarse_ts_re = /[0-9\- SunMonTueWedThuFriSat\:\+]+/;
    const coarse_active_ts_re = new RegExp(
      '<' + base_coarse_ts_re.source + '>'
    );
    const coarse_inactive_ts_re = new RegExp(
      '[' + base_coarse_ts_re.source + ']'
    );
    const coarse_active_range_A_ts_re = new RegExp(
      coarse_active_ts_re.source + '--' + coarse_active_ts_re.source
    );
    const coarse_inactive_range_A_ts_re = new RegExp(
      coarse_inactive_ts_re.source + '--' + coarse_inactive_ts_re.source
    );

    const ret = {
      type: null,
      date: null,
      dateStart: null,
      dateEnd: null,
      time: null,
      timeStart: null,
      timeEnd: null,
      repeat: null,
      repeatStart: null,
      repeatEnd: null,
      delay: null,
      delayStart: null,
      delayEnd: null
    };

    if (timestampStr.search(coarse_active_range_A_ts_re) > -1) {
      ret.type = OrgTimestamp.ACTIVE_RANGE_A;
    } else if (timestampStr.search(coarse_inactive_range_A_ts_re) > -1) {
      ret.type = OrgTimestamp.INACTIVE_RANGE_A;
    } else if (timestampStr.search(coarse_active_ts_re) > -1) {
      const active_ts_re = /<([0-9]{4}-[0-9]{2}-[0-9]{2} [SunMonTueWedThuFri]{3})>/;
      const active_ts_with_time_re = /<([0-9]{4}-[0-9]{2}-[0-9]{2} [MonTueWedThuFriSatSun]{3}) ([0-9]+\:[0-9]{2})>/;
      // const active_ts_with_time_and_repeat_re =
      // const active_ts_with_time_and_delay_re =
      // const active_ts_with_time_and_repeat_and_delay_re =

      const active_range_b_ts_re = /<([0-9]{4}-[0-9]{2}-[0-9]{2} [MonTueWedThuFriSatSun]{3}) ([0-9]+\:[0-9]{2})-([0-9]+\:[0-9]{2})>/;
      // const active_range_b_ts_with_repeat_re =
      // const active_range_b_ts_with_delay_re =
      // const active_range_b_ts_with_repeat_delay_re =

      let match;

      match = active_ts_re.exec(timestampStr);
      if (match !== null) {
        ret.type = OrgTimestamp.ACTIVE;
        ret.date = OrgDate.parse(match[1]);
        return ret;
      }

      match = active_ts_with_time_re.exec(timestampStr);
      if (match !== null) {
        ret.type = OrgTimestamp.ACTIVE;
        ret.date = OrgDate.parse(match[1]);
        ret.time = OrgTime.parse(match[2]);
        return ret;
      }

      match = active_range_b_ts_re.exec(timestampStr);
      if (match !== null) {
        ret.type = OrgTimestamp.ACTIVE_RANGE_B;
        ret.date = OrgDate.parse(match[1]);
        ret.timeStart = OrgTime.parse(match[2]);
        ret.timeEnd = OrgTime.parse(match[3]);
        return ret;
      }
    } else if (timestampStr.search(coarse_inactive_ts_re) > -1) {
      const inactive_ts_re = /\[([0-9]{4}-[0-9]{2}-[0-9]{2} [SunMonTueWedThuFri]{3})\]/;
      const inactive_ts_with_time_re = /\[([0-9]{4}-[0-9]{2}-[0-9]{2} [MonTueWedThuFriSatSun]{3}) ([0-9]+\:[0-9]{2})\]/;
      // const active_ts_with_time_and_repeat_re =
      // const active_ts_with_time_and_delay_re =
      // const active_ts_with_time_and_repeat_and_delay_re =

      const inactive_range_b_ts_re = /\[([0-9]{4}-[0-9]{2}-[0-9]{2} [MonTueWedThuFriSatSun]{3}) ([0-9]+\:[0-9]{2})-([0-9]+\:[0-9]{2})\]/;
      // const inactive_range_b_ts_with_repeat_re =
      // const inactive_range_b_ts_with_delay_re =
      // const inactive_range_b_ts_with_repeat_delay_re =

      let match;

      match = inactive_ts_re.exec(timestampStr);
      if (match !== null) {
        ret.type = OrgTimestamp.INACTIVE;
        ret.date = OrgDate.parse(match[1]);
        return ret;
      }

      match = inactive_ts_with_time_re.exec(timestampStr);
      if (match !== null) {
        ret.type = OrgTimestamp.INACTIVE;
        ret.date = OrgDate.parse(match[1]);
        ret.time = OrgTime.parse(match[2]);
        return ret;
      }

      match = inactive_range_b_ts_re.exec(timestampStr);
      if (match !== null) {
        ret.type = OrgTimestamp.INACTIVE_RANGE_B;
        ret.date = OrgDate.parse(match[1]);
        ret.timeStart = OrgTime.parse(match[2]);
        ret.timeEnd = OrgTime.parse(match[3]);
        return ret;
      }
    } else {
      console.log('something went wrong');
    }

    return ret;
  }

  static serialize(timestampObj) {
    let ret = '';
    switch (timestampObj.type) {
      case OrgTimestamp.ACTIVE:
        ret += '<';
        ret += OrgDate.serialize(timestampObj.date);
        ret += timestampObj.time
          ? ' ' + OrgTime.serialize(timestampObj.time)
          : '';
        ret += '>';
        break;
      case OrgTimestamp.INACTIVE:
        ret += '[';
        ret += OrgDate.serialize(timestampObj.date);
        ret += timestampObj.time
          ? ' ' + OrgTime.serialize(timestampObj.time)
          : '';
        ret += ']';
        break;
      case OrgTimestamp.ACTIVE_RANGE_A:
        break;
      case OrgTimestamp.INACTIVE_RANGE_A:
        break;
      case OrgTimestamp.ACTIVE_RANGE_B:
        ret += '<';
        ret += OrgDate.serialize(timestampObj.date);
        ret +=
          ' ' +
          OrgTime.serialize(timestampObj.timeStart) +
          '-' +
          OrgTime.serialize(timestampObj.timeEnd);
        ret += '>';
        break;
      case OrgTimestamp.INACTIVE_RANGE_B:
        ret += '[';
        ret += OrgDate.serialize(timestampObj.date);
        ret +=
          ' ' +
          OrgTime.serialize(timestampObj.timeStart) +
          '-' +
          OrgTime.serialize(timestampObj.timeEnd);
        ret += ']';
        break;
    }
    return ret;
  }
}

module.exports = OrgTimestamp;
