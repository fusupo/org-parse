const OrgBlock = require('./OrgBlock');

const blockStr = `#+begin_src plantuml :file tryout.png
someshit
foobar
#+end_src`;

let store = {};
let parsedObj = OrgBlock.parse(blockStr.split('\n'), store);
console.log(JSON.stringify(parsedObj.result, null, 1));
console.log(JSON.stringify(store, null, 2));
