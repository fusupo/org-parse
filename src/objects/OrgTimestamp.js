const { padStart } = require('../../utils');
const OrgDate = require('../sub-objects/OrgDate');
const OrgTime = require('../sub-objects/OrgTime');
const moment = require('moment');

// <%%(SEXP)>                                                     (diary)       // UNSUPPORTED

const base_coarse_ts_re = /[0-9\- SunMonTueWedThuFriSatmhdwmy\:\+\.\/]+/;
const coarse_active_ts_re = new RegExp('<' + base_coarse_ts_re.source + '>');
const coarse_inactive_ts_re = new RegExp('[' + base_coarse_ts_re.source + ']');
const coarse_active_range_A_ts_re = new RegExp(
  coarse_active_ts_re.source + '--' + coarse_active_ts_re.source
);
const coarse_inactive_range_A_ts_re = new RegExp(
  coarse_inactive_ts_re.source + '--' + coarse_inactive_ts_re.source
);
const active_ts_re = /<([0-9]{4}-[0-9]{2}-[0-9]{2} [MonTueWedThuFriSatSun]{3})(?: ([0-9]+\:[0-9]{2})(?:-([0-9]+\:[0-9]{2}))?)?(?: ([\.\+]+[0-9]+[mhdwmy]))?(?:\/([0-9]+[mhdwmy]))?(?: (\-[0-9]+[mhdwmy]))?>/;
const inactive_ts_re = /\[([0-9]{4}-[0-9]{2}-[0-9]{2} [MonTueWedThuFriSatSun]{3})(?: ([0-9]+\:[0-9]{2})(?:-([0-9]+\:[0-9]{2}))?)?(?: ([\.\+]+[0-9]+[mhdwmy]))?(?:\/([0-9]+[mhdwmy]))?(?: (\-[0-9]+[mhdwmy]))?\]/;

class OrgTimestamp {
  static get name() {
    return 'org.timestamp';
  }

  static get ACTIVE() {
    // <DATE TIME REPEATER-OR-DELAY>                                  (active)
    return OrgTimestamp.name + '.active';
  }
  static get INACTIVE() {
    // [DATE TIME REPEATER-OR-DELAY]                                  (inactive)
    return OrgTimestamp.name + '.inactive';
  }
  static get ACTIVE_RANGE_A() {
    // <DATE TIME REPEATER-OR-DELAY>--<DATE TIME REPEATER-OR-DELAY>   (active range A)
    return OrgTimestamp.name + '.active_range_a';
  }
  static get INACTIVE_RANGE_A() {
    // [DATE TIME REPEATER-OR-DELAY]--[DATE TIME REPEATER-OR-DELAY]   (inactive range A)
    return OrgTimestamp.name + '.inactive_range_a';
  }
  static get ACTIVE_RANGE_B() {
    // <DATE TIME-TIME REPEATER-OR-DELAY>                             (active range B)
    return OrgTimestamp.name + '.active_range_b';
  }
  static get INACTIVE_RANGE_B() {
    // [DATE TIME-TIME REPEATER-OR-DELAY]                             (inactive range B)
    return OrgTimestamp.name + '.inactive_range_b';
  }

  static parse(timestampStr) {
    let ret = {
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
      delayEnd: null,
      refs: {},
      value: timestampStr
    };

    if (timestampStr.search(coarse_active_range_A_ts_re) > -1) {
      ret.type = OrgTimestamp.ACTIVE_RANGE_A;
    } else if (timestampStr.search(coarse_inactive_range_A_ts_re) > -1) {
      ret.type = OrgTimestamp.INACTIVE_RANGE_A;
    } else if (timestampStr.search(coarse_active_ts_re) > -1) {
      let match = active_ts_re.exec(timestampStr);
      if (match !== null) {
        ret.type = OrgTimestamp.ACTIVE;
        ret.date = OrgDate.parse(match[1]);

        if (match[2] && match[3] === undefined) {
          ret.time = OrgTime.parse(match[2]);
        } else if (match[2] && match[3]) {
          ret.type = OrgTimestamp.ACTIVE_RANGE_B;
          ret.timeStart = OrgTime.parse(match[2]);
          ret.timeEnd = OrgTime.parse(match[3]);
        }

        if (match[4] !== undefined) ret.repeat = match[4];
        if (match[5] !== undefined) ret.repeat += '/' + match[5];
        if (match[6] !== undefined) ret.delay = match[6];
        return ret;
      }
    } else if (timestampStr.search(coarse_inactive_ts_re) > -1) {
      let match = inactive_ts_re.exec(timestampStr);

      if (match !== null) {
        ret.type = OrgTimestamp.INACTIVE;

        ret.date = OrgDate.parse(match[1]);

        if (match[2] && match[3] === undefined) {
          ret.time = OrgTime.parse(match[2]);
        } else if (match[2] && match[3]) {
          ret.type = OrgTimestamp.INACTIVE_RANGE_B;

          ret.timeStart = OrgTime.parse(match[2]);
          ret.timeEnd = OrgTime.parse(match[3]);
        }

        if (match[4] !== undefined) ret.repeat = match[4];
        if (match[5] !== undefined) ret.repeat += '/' + match[5];
        if (match[6] !== undefined) ret.delay = match[6];
        return ret;
      }

      match = inactive_ts_re.exec(timestampStr);
      if (match !== null) {
        ret.type = OrgTimestamp.INACTIVE;
        ret.date = OrgDate.parse(match[1]);

        //        if (doCache) OrgTimestamp.add(timestampStr, ret);
        return ret;
      }

      match = inactive_ts_with_time_re.exec(timestampStr);
      if (match !== null) {
        ret.type = OrgTimestamp.INACTIVE;
        ret.date = OrgDate.parse(match[1]);
        ret.time = OrgTime.parse(match[2]);

        //        if (doCache) OrgTimestamp.add(timestampStr, ret);
        return ret;
      }

      match = inactive_range_b_ts_re.exec(timestampStr);
      if (match !== null) {
        ret.type = OrgTimestamp.INACTIVE_RANGE_B;
        ret.date = OrgDate.parse(match[1]);
        ret.timeStart = OrgTime.parse(match[2]);
        ret.timeEnd = OrgTime.parse(match[3]);

        //        if (doCache) OrgTimestamp.add(timestampStr, ret);
        return ret;
      }
    } else {
      console.log('something went wrong: ', timestampStr);
    }

    return ret;
  }

  static serialize(timestampObj) {
    return timestampObj.value;
    // switch (timestampObj.type) {
    //   case OrgTimestamp.ACTIVE:
    //     ret += '<';
    //     ret += OrgDate.serialize(store[OrgDate.name][timestampObj.date]);
    //     ret += timestampObj.time
    //       ? ' ' + OrgTime.serialize(store[OrgTime.name][timestampObj.time])
    //       : '';
    //     ret += '>';
    //     break;
    //   case OrgTimestamp.INACTIVE:
    //     ret += '[';
    //     ret += OrgDate.serialize(store[OrgDate.name][timestampObj.date]);
    //     ret += timestampObj.time
    //       ? ' ' + OrgTime.serialize(store[OrgTime.name][timestampObj.time])
    //       : '';
    //     ret += ']';
    //     break;
    //   case OrgTimestamp.ACTIVE_RANGE_A:
    //     break;
    //   case OrgTimestamp.INACTIVE_RANGE_A:
    //     break;
    //   case OrgTimestamp.ACTIVE_RANGE_B:
    //     ret += '<';
    //     ret += OrgDate.serialize(store[OrgDate.name][timestampObj.date]);
    //     ret +=
    //       ' ' +
    //       OrgTime.serialize(
    //         store[OrgTime.name][timestampObj.timeStart],
    //         store
    //       ) +
    //       '-' +
    //       OrgTime.serialize(store[OrgTime.name][timestampObj.timeEnd]);
    //     ret += '>';
    //     break;
    //   case OrgTimestamp.INACTIVE_RANGE_B:
    //     ret += '[';
    //     ret += OrgDate.serialize(timestampObj.date);
    //     ret +=
    //       ' ' +
    //       OrgTime.serialize(timestampObj.timeStart) +
    //       '-' +
    //       OrgTime.serialize(timestampObj.timeEnd);
    //     ret += ']';
    //     break;
    // }
  }

  static add(timestampStr, orgTimestamp) {
    cache[timestampStr] = orgTimestamp;
  }

  // static find(timestampStr) {
  //   const timestampObjs = Object.values(store[OrgTimestamp.name]);
  //   return timestampObjs.find(tso => tso.value === timestampStr);
  // }

  static list(store) {
    return Object.values(store[OrgTimestamp.name]);
  }

  static compare(a, b) {
    // let dateAId = a.date || a.dateStart;
    // let timeAId = a.time || a.timeStart;
    // let dateBId = b.date || b.dateStart;
    // let timeBId = b.time || b.timeStart;

    // //console.log(dateAId, timeAId, dateBId, timeBId);
    // let dateA = store[OrgDate.name][dateAId];
    // let timeA = store[OrgTime.name][timeAId];
    // let dateB = store[OrgDate.name][dateBId];
    // let timeB = store[OrgTime.name][timeBId];

    // //console.log(dateA, timeA, dateB, timeB);
    // let dateAMilli = OrgDate.toMilli(dateA);
    // let timeAMilli = OrgTime.toMilli(timeA);
    // let dateBMilli = OrgDate.toMilli(dateB);
    // let timeBMilli = OrgTime.toMilli(timeB);

    // let milliA = dateAMilli + timeAMilli;
    // let milliB = dateBMilli + timeBMilli;

    // //console.log(milliA - milliB);
    // return milliA - milliB;
    return 1;
  }

  // static fromId(id) {
  //   return store[OrgTimestamp.name][id];
  // }

  static isTimestamp(tsStr) {
    if (typeof tsStr !== 'string') return false;
    return (
      active_ts_re.exec(tsStr) !== null || inactive_ts_re.exec(tsStr) !== null
    );
  }
  // static get timestamps() {
  //   let tss = Object.values(cache);
  //   tss.sort(OrgTimestamp.compare);
  //   return tss;
  // }

  // static timestampRange(aStr, bStr) {
  //   const timestamps = OrgTimestamp.timestamps;
  //   const a = OrgTimestamp.parse(aStr, false);
  //   const b = OrgTimestamp.parse(bStr, false);
  //   if (a && b) {
  //     const idxstart = timestamps.findIndex(ts => {
  //       console.log(OrgTimestamp.compare(a, ts));
  //       return OrgTimestamp.compare(a, ts) < 0;
  //     });
  //     const idxend = timestamps.findIndex(ts => {
  //       console.log(OrgTimestamp.compare(b, ts));
  //       return OrgTimestamp.compare(b, ts) < 0;
  //     });
  //     console.log(idxstart, idxend);
  //     return timestamps.splice(idxstart, idxend - idxstart);
  //   }
  //   return [];
  // }
  //--------------------
  // static addToRefs(key, val, ts) {
  //   if (ts.refs[key] === undefined) {
  //     ts.refs[key] = [];
  //   }
  //   ts.refs[key].push(val);
  // }
}

module.exports = OrgTimestamp;
