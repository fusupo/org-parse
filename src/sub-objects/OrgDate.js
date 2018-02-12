const { padStartMaybe } = require('../../utils');
const moment = require('moment');

class OrgDate {
  static get name() {
    return 'org.date';
  }
  static parse(dateStr) {
    // assuming well formed dateStr

    const parts = dateStr.split(' ');
    const [yyyy, mm, dd] = parts[0].split('-');

    let ret;
    ret = {
      type: OrgDate.name,
      yyyy: null,
      mm: null,
      dd: null,
      dayName: null
    };
    ret.yyyy = parseInt(yyyy);
    ret.mm = parseInt(mm);
    ret.dd = parseInt(dd);
    ret.dayName = parts[1];

    return ret;
  }

  static serialize(dateObj) {
    // !! assuming well formed dateObj
    let { yyyy, mm, dd, dayName } = dateObj;
    return `${yyyy}-${padStartMaybe(mm.toString(), 2, '0')}-${padStartMaybe(
      dd.toString(),
      2,
      '0'
    )} ${dayName}`;
  }

  static toMilli(dateObj) {
    let date = new Date(dateObj.yyyy, dateObj.mm, dateObj.dd);
    return date.valueOf();
  }
}

module.exports = OrgDate;
