const OrgParagraph = require('./OrgParagraph');

const paragraphStr = `Donec vitae dolor. Nullam tempus. Aenean in sem ac leo mollis blandit. Nunc
rutrum turpis sed pede. Sed id ligula quis est convallis tempor. Phasellus at
dui in ligula mollis ultricies.`;

let store = {};
let parsedObj = OrgParagraph.parse(paragraphStr.split('\n'), store);
//console.log(JSON.stringify(parsedObj.result, null, 1));
console.log(JSON.stringify(store, null, 2));
