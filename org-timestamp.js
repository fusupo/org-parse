const org_ts_re = /<([0-9]{4}-[0-9]{2}-[0-9]{2} ?[^\r\n>]*?)>/;
const org_ts_inactive_re = /\[([0-9]{4}-[0-9]{2}-[0-9]{2} ?[^\r\n>]*?)\]/;
const org_ts_re0 = /(([0-9]{4})-([0-9]{2})-([0-9]{2}) +([^\> ]+)? +(([0-9]{1,2}):([0-9]{2}))?)/;
const org_tr_re = new RegExp(org_ts_re.source + '--?-?' + org_ts_re.source);
const org_repeat_re = /<[0-9]{4}-[0-9][0-9]-[0-9][0-9] [^>\n]*?([.+]?\+)([0-9]+[hdwmy])(?:\/([0-9]+[hdwmy]))?/;

//<2017-01-08 Sun 12:30>

class OrgTimestamp {
  static parse(srcStr) {
    srcStr = srcStr.match(org_ts_re)[0];
    let date = srcStr.match(org_ts_re0);
    let repeat = srcStr.match(org_repeat_re);
    return {
      srcStr,
      year: +date[2],
      month: +date[3],
      date: +date[4],
      day: date[5],
      hour: +date[7],
      minute: +date[8],
      repInt: repeat && repeat[1] ? repeat[1] : null,
      repMin: repeat && repeat[2] ? repeat[2] : null,
      repMax: repeat && repeat[3] ? repeat[3] : null
    };
  }

  static serialize(timestamp) {
    const padMaybe = n => (n.toString().length === 1 ? '0' + n : n);
    let r = '';
    r += '<';
    r +=
      timestamp.year +
      '-' +
      padMaybe(timestamp.month) +
      '-' +
      padMaybe(timestamp.date) +
      ' ';
    r += timestamp.day + ' ';
    r += padMaybe(timestamp.hour) + ':' + padMaybe(timestamp.minute);
    // REPEAT
    if (timestamp.repInt) {
      r += ' ';
      r += timestamp.repInt + timestamp.repMin;
      r += timestamp.repMax ? '/' + timestamp.repMax : '';
    }
    //
    r += '>';
    return r;
  }
}

module.exports = OrgTimestamp;
