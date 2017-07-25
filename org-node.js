const OrgTimestamp = require('./org-timestamp');
const OrgLogbook = require('./org-logbook');
const OrgDrawer = require('./org-drawer');
const OrgHeadLine = require('./org-headline');
const padStart = require('./utils').padStart;

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
    ret.logbook = null;
    ret.opened = null;
    ret.body = null;

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
          ret.propDrawer = OrgDrawer.insert(ret.propDrawer, keyval);
          endIdx++;
        }
        idx = endIdx;
      } else if (srcLine.match(org_logbook_start_re)) {
        // :LOGBOOK:
        let logbookSrc = '';
        let endIdx = idx + 1;
        while (
          endIdx < srcLines.length &&
          !srcLines[endIdx].match(org_property_end_re)
        ) {
          logbookSrc += srcLines[endIdx] + '\n';
          endIdx++;
        }
        ret.logbook = OrgLogbook.parse(logbookSrc);
        idx = endIdx;
      } else {
        // else if(srcLine.startsWith('OPENED:')){
        //   ret.opened = new OrgTimestamp(srcLine.slice(7).trim());
        // }
        let endIdxX = idx;
        let line = srcLines[endIdxX].trim();
        ret.body = [];
        while (endIdxX < srcLines.length) {
          line = srcLines[endIdxX].trim();
          ret.body.push(line);
          endIdxX++;
        }
        idx = endIdxX;
      }
      idx++;
    }
    return ret;
  }

  static serialize(node) {
    const level = node.headline.level || 1;
    let r = '';
    // HEADLINE
    r += OrgHeadLine.serialize(node.headline);
    // SCHEDULED:
    if (node.scheduled) {
      r += padStart(
        `SCHEDULED: ${OrgTimestamp.serialize(node.scheduled)}`,
        level + 1,
        ' '
      );
      r += '\n';
    }
    // CLOSED:
    if (node.closed) {
      r += padStart(
        `CLOSED: ${OrgTimestamp.serialize(node.closed)}`,
        level + 1,
        ' '
      );
      r += '\n';
    }
    // :PROPERTIES:
    r += OrgDrawer.serialize(node.propDrawer, level);
    // :LOGBOOK:
    r += node.logbook ? OrgLogbook.serialize(node.logbook, level) : '';
    // Body
    for (let i in node.body) {
      r += padStart(node.body[i], level + 1, ' ');
      if (i < node.body.length) r += '\n';
    }
    return r;
  }
}

module.exports = OrgNode;
