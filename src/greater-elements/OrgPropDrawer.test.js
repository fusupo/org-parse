const OrgPropDrawer = require('./OrgPropDrawer');

const propStr = `:PROPERTIES:
:DESCRIPTION: a test prop
:SOMETHING_MORE: more data
:END:`;

let store = {};
let parsedObj = OrgPropDrawer.parse(propStr.split('\n'), store);
console.log(parsedObj.result);
console.log(store);
