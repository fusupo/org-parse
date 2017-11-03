const padStartMaybe = require('../../utils').padStartMaybe;
const moment = require('moment');

class OrgDate {
  static parse(dateStr) {
    // assuming well formed dateStr
    const ret = {
      yyyy: '',
      mm: '',
      dd: '',
      dayName: ''
    };
    const parts = dateStr.split(' ');
    const [yyyy, mm, dd] = parts[0].split('-');
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
}

module.exports = OrgDate;
