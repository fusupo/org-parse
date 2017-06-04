const org_ts_re = '<([0-9]{4}-[0-9]{2}-[0-9]{2} ?[^\r\n>]*?)>';
const org_ts_inactive_re = '\[([0-9]{4}-[0-9]{2}-[0-9]{2} ?[^\r\n>]*?)\]';
const org_ts_re0 =
  '(([0-9]{4})-([0-9]{2})-([0-9]{2}) +([^\> ]+)? +(([0-9]{1,2}):([0-9]{2}))?)';
const org_tr_re = org_ts_re + '--?-?' + org_ts_re;
const org_repeat_re =
  '<[0-9]{4}-[0-9][0-9]-[0-9][0-9] [^>\n]*?([.+]?\+)([0-9]+[hdwmy])(?:\/([0-9]+[hdwmy]))?';

class OrgTimestamp {
  static parse(srcStr) {
    srcStr = srcStr.match(org_ts_re)[0];
    let date = srcStr.match(org_ts_re0);
    return {
      srcStr,
      year: +date[2],
      month: +date[3],
      day: +date[4],
      hour: +date[7],
      minute: +date[8]
    };
  }
}

module.exports = OrgTimestamp;
