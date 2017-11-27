const OrgPlanning = require('./OrgPlanning');

const planningStr = `CLOSED: [2017-11-08 Wed 14:54] DEADLINE: <2017-11-01 Wed 10:14> SCHEDULED: <2017-10-31 Tue 20:17>`;

let store = {};
let parsedObj = OrgPlanning.parse(planningStr.split('\n'), store);
//console.log(JSON.stringify(parsedObj.result, null, 1));
console.log(JSON.stringify(store, null, 2));
