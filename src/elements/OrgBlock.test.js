const OrgBlock = require('./OrgBlock');

const blockStr = `#+begin_src plantuml :file tryout.png
someshit
foobar
#+end_src`;

let parsedObj = OrgBlock.parse(blockStr.split('\n'));

describe('has static method "parse"', () => {
  test('static attribute parse exists', () => {
    expect(OrgBlock.parse).toBeDefined();
  });
  test('static attribute parse is a function', () => {
    expect(OrgBlock.parse).toBeInstanceOf(Function);
  });
});

describe('parses org block', () => {
  test('parses org block', () => {
    let parsedObj = OrgBlock.parse(blockStr.split('\n'));
    expect(parsedObj).toEqual({
      result: {
        name: 'src',
        data: 'plantuml :file tryout.png',
        contents: ['someshit', 'foobar']
      },
      delta: 4
    });
  });
});
