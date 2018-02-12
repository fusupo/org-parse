const OrgTimestamp = require('../objects/OrgTimestamp');

const org_scheduled_or_deadline_start_re = /^[ /t]*SCHEDULED:[ /t]*|^[ /t]*DEADLINE:[ /t]*|^[ /t]*CLOSED:[ /t]*/gm; ///^[ \t]*SCHEDULED:[ \t]*/;

class OrgPlanning {
  static get name() {
    return 'org.planning';
  }
  static parse(planningData) {
    let result = null;
    let delta = 0;

    let planningStr;

    // if input is array, parse first line as string
    if (Array.isArray(planningData)) {
      planningStr = planningData[0];
    } else if (typeof planningData === 'string') {
      planningStr = planningData;
    }

    if (planningStr.match(org_scheduled_or_deadline_start_re)) {
      result = {
        type: OrgPlanning.name,
        scheduled: null,
        deadline: null,
        closed: null
      };
      delta = 1;
      let entries = planningStr.split(/ (?=SCHEDULED:|DEADLINE:|CLOSED:)/);
      while (entries.length > 0) {
        let entry = entries.shift();
        if (entry.startsWith('SCHEDULED: ')) {
          result.scheduled = OrgTimestamp.parse(
            entry.substr('SCHEDULED: '.length)
          );
        } else if (entry.startsWith('DEADLINE: ')) {
          result.deadline = OrgTimestamp.parse(
            entry.substr('DEADLINE: '.length)
          );
        } else if (entry.startsWith('CLOSED: ')) {
          result.closed = OrgTimestamp.parse(entry.substr('CLOSED: '.length));
        } else {
          console.log('unknown planning entry type');
        }
      }
    }

    return { result, delta };
  }
  static serialize(orgPlanning) {
    let ret = '';
    const { scheduled, deadline, closed } = orgPlanning;
    if (scheduled) ret += `SCHEDULED: ${OrgTimestamp.serialize(scheduled)}`;
    if (deadline) ret += ` DEADLINE: ${OrgTimestamp.serialize(deadline)}`;
    if (closed) ret += ` CLOSED: ${OrgTimestamp.serialize(closed)}`;
    return ret.trim();
  }
  //--------------------
  // constructor() {
  //   this.scheduled = null;
  //   this.deadline = null;
  //   this.closed = null;
  // }
}

module.exports = OrgPlanning;
