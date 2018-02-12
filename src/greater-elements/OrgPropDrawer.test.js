const OrgPropDrawer = require('./OrgPropDrawer');

const propStr = `:PROPERTIES:
:DESCRIPTION: a test prop
:SOMETHING_MORE: more data
:END:`;

const propStr2 = `:PROPERTIES:
:DESCRIPTION: a test prop
:SOMETHING_MORE: more data
:SOMETHING_MORE+: even more data
:END:`;

let parsedObj = OrgPropDrawer.parse(propStr.split('\n'));
let parsedObj2 = OrgPropDrawer.parse(propStr2.split('\n'));
console.log(JSON.stringify(parsedObj2, null, 1));

describe('has static method "parse"', () => {
  test('static attribute parse exists', () => {
    expect(OrgPropDrawer.parse).toBeDefined();
  });
  test('static attribute parse is a function', () => {
    expect(OrgPropDrawer.parse).toBeInstanceOf(Function);
  });
});

describe('parses org prop drawer', () => {
  test('parses org prop drawer', () => {
    expect(parsedObj).toEqual({
      result: {
        props: {
          DESCRIPTION: 'a test prop',
          SOMETHING_MORE: 'more data'
        }
      },
      delta: 4
    });
  });
  test('parses org prop drawer2', () => {
    expect(parsedObj2).toEqual({
      result: {
        props: {
          DESCRIPTION: 'a test prop',
          SOMETHING_MORE: ['more data', 'even more data']
        }
      },
      delta: 5
    });
  });
});
