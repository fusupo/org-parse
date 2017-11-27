const OrgKeyword = require('./OrgKeyword');

const keywordStr = `#+ARCHIVE:  archive.org::datetree/* FROM %s`;

let store = {};
let parsedObj = OrgKeyword.parse(keywordStr.split('\n'), store);
//console.log(JSON.stringify(parsedObj.result, null, 1));
console.log(JSON.stringify(store, null, 2));
