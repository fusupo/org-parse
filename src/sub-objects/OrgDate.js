const { padStartMaybe, randomId } = require('../../utils');
const moment = require('moment');

class OrgDate {
  static get name() {
    return 'OrgDate';
  }
  static parse(dateStr, store) {
    if (store[OrgDate.name] === undefined) {
      store[OrgDate.name] = {};
    }

    // assuming well formed dateStr

    const parts = dateStr.split(' ');
    const [yyyy, mm, dd] = parts[0].split('-');

    const prexisting = Object.values(store[OrgDate.name]).find(foo => {
      return foo.yyyy === +yyyy && foo.mm === +mm && foo.dd === +dd;
    });

    let ret;
    if (prexisting) {
      ret = prexisting;
    } else {
      ret = {
        id: randomId(),
        yyyy: null,
        mm: null,
        dd: null,
        dayName: null
      };
      ret.yyyy = parseInt(yyyy);
      ret.mm = parseInt(mm);
      ret.dd = parseInt(dd);
      ret.dayName = parts[1];

      store[OrgDate.name][ret.id] = ret;
    }

    return ret;
  }

  static serialize(dateObj, store) {
    // !! assuming well formed dateObj
    let { yyyy, mm, dd, dayName } = dateObj;
    return `${yyyy}-${padStartMaybe(mm.toString(), 2, '0')}-${padStartMaybe(
      dd.toString(),
      2,
      '0'
    )} ${dayName}`;
  }
}

module.exports = OrgDate;
