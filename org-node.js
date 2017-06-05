const OrgTimestamp = require('./org-timestamp');
const OrgLogbook = require('./org-logbook');
const OrgDrawer = require('./org-drawer');
const OrgHeadLine = require('./org-headline');

const org_scheduled_start_re = /^[ \t]*SCHEDULED:[ \t]*/;
const org_closed_start_re = /^[ \t]*CLOSED:[ \t]*$/;
const org_property_start_re = /^[ \t]*:PROPERTIES:[ \t]*/;
const org_logbook_start_re = /^[ \t]*:LOGBOOK:[ \t]*$/;
const org_property_end_re = /^[ \t]*:END:[ \t]*$/;

class OrgNode {
  static parse(srcStr) {
    let ret = {};
    let srcLines = srcStr.split('\n');

    ret.headline = OrgHeadLine.parse(srcLines[0]);
    ret.scheduled = null;
    ret.closed = null;
    // ret.deadline = null;
    ret.propDrawer = OrgDrawer.new('PROPERTIES');
    ret.logbook = OrgLogbook.new('LOGBOOK');
    ret.opened = undefined;
    ret.body = '';

    let idx = 1;
    while (idx < srcLines.length) {
      const srcLine = srcLines[idx].trim();
      if (srcLine.match(org_scheduled_start_re)) {
        // SCHEDULED:
        ret.scheduled = OrgTimestamp.parse(srcLine);
      } else if (srcLine.match(org_closed_start_re)) {
        // CLOSED:
        ret.closed = OrgTimestamp.parse(srcLine);
      } else if (srcLine.match(org_property_start_re)) {
        // :PROPERTIES:
        let endIdx = idx + 1;
        while (
          endIdx < srcLines.length &&
          !srcLines[endIdx].match(org_property_end_re)
        ) {
          let keyval = OrgDrawer.parseKeyVal(srcLines[endIdx].trim());
          console.log(keyval);
          ret.propDrawer = OrgDrawer.insert(ret.propDrawer, keyval);
          endIdx++;
        }
        idx = endIdx;
      } else if (srcLine.match(org_logbook_start_re)) {
        // :LOGBOOK:
        let endIdx = idx + 1;
        while (
          endIdx < srcLines.length &&
          !srcLines[endIdx].match(org_property_end_re)
        ) {
          ret.logbook = OrgLogbook.insert(ret.logbook, srcLines[endIdx].trim());
          endIdx++;
        }
        idx = endIdx;
      } else {
        // else if(srcLine.startsWith('OPENED:')){
        //   ret.opened = new OrgTimestamp(srcLine.slice(7).trim());
        // }
        let endIdxX = idx;
        let line = srcLines[endIdxX].trim();
        while (endIdxX < srcLines.length) {
          line = srcLines[endIdxX].trim();
          ret.body += line + ' ';
          endIdxX++;
        }
        idx = endIdxX;
      }
      idx++;
    }
    return ret;
  }
}

module.exports = OrgNode;
