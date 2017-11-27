const { randomId } = require('../../utils');
const OrgTimestamp = require('../objects/OrgTimestamp');

const org_scheduled_or_deadline_start_re = /^[ /t]*SCHEDULED:[ /t]*|^[ /t]*DEADLINE:[ /t]*|^[ /t]*CLOSED:[ /t]*/gm; ///^[ \t]*SCHEDULED:[ \t]*/;

class OrgPlanning {
  static get name() {
    return 'OrgPlanning';
  }
  static parse(planningData, store) {
    if (store[OrgPlanning.name] === undefined) {
      store[OrgPlanning.name] = {};
    }
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
        id: randomId(),
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
            entry.substr('SCHEDULED: '.length),
            store
          ).id;

          // if (store) result.scheduled.addToRef(result, 'planning:scheduled');
        } else if (entry.startsWith('DEADLINE: ')) {
          result.deadline = OrgTimestamp.parse(
            entry.substr('DEADLINE: '.length),
            store
          ).id;

          // if (store) result.deadline.addToRef(result, 'planning:deadline');
        } else if (entry.startsWith('CLOSED: ')) {
          result.closed = OrgTimestamp.parse(
            entry.substr('CLOSED: '.length),
            store
          ).id;

          // if (store) result.closed.addToRef(result, 'planning:closed');
        } else {
          console.log('unknown planning entry type');
        }
      }
      //
      store[OrgPlanning.name][result.id] = result;
    }

    return { result, delta };
  }
  static serialize(orgPlanning) {}
  //--------------------
  // constructor() {
  //   this.scheduled = null;
  //   this.deadline = null;
  //   this.closed = null;
  // }
}

module.exports = OrgPlanning;
