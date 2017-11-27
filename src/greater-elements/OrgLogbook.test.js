const OrgLogbook = require('./OrgLogbook');

const logbookStr = `:LOGBOOK:
- State "DONE"       from "TODO"       [2017-11-08 Wed 14:54]
CLOCK: [2017-11-07 Tue 09:13]--[2017-11-07 Tue 09:16] =>  0:03
- Note taken on [2017-11-07 Tue 09:00] \\
  test log entry
  more text
:END:`;

let store = {};
let parsedObj = OrgLogbook.parse(logbookStr.split('\n'), store);
//console.log(JSON.stringify(parsedObj.result, null, 1));
console.log(JSON.stringify(store, null, 2));
