const OrgPlainList = require('./OrgPlainList.js');

const list = `1. The attack of the Rohirrim
2. Eowyn's fight with the witch king
   + this was already my favorite scene in the book
   + I really like Miranda Otto.
3. Peter Jackson being shot by Legolas
   - on DVD only
     He makes a really funny face when it happens.
4. foo
5. 
6. 
7. 
8. 
9. bar
   1) A indentation...
   2) A indentation two...
   3) A indentation three...
10. foo 
    - indentation...
    - indentation two...
    - indentation three...
11. foo
12. 
13.`;

const list2 = `+ The attack of the Rohirrim
  1) hello
  2) success
+ Eowyn's fight with the witch king
  - world
  - on DVD only
    He makes a really funny face when it happens.
+ foobar 
  - bazqux`;

list3 = '10) bar';
list4 = '10) [@10] [X] bar';
list5 = '1. someshit :: crap';
list6 = '10) [@10] [X] bar :: baz';

list7 = '+ bar';
list8 = '- [X] bar';
list9 = '+ someshij :: crap';
list10 = '- [-] bar :: baz';

list11 = `- on DVD only
  He makes a really funny face when it happens.
  20) [@20] sublist item
      + foobar
      + [X] baz :: qux
  21) yet another`;

list12 = `  1. foo

   2. some other crap`;

list13 = `1. food
1. barely
2. baz
   1. foo
      1. sdfdsfds
      2. fdsa
         dog staff
      cat
      shit
   2. bar
     fdsfdsfs
     fdsfdsfds
     fidsfds
3. quxbar
   folded
   1. greater
      1. than

   baz
4. quad


   foo
1. caz
2. funky
3. bunch`;

listxxx = '- foobar \n- Note taken on [2017-11-07 Tue 09:01] \\';

const store = {};
const res = OrgPlainList.parse(list13.split('\n'), store);
//console.log(JSON.stringify(res.result, null, ' '));
//console.log(JSON.stringify(res.result, null, ' '));
console.log(JSON.stringify(store, null, ' '));

describe('has static method "parse"', () => {
  test('static attribute parse exists', () => {
    expect(OrgPlainList.parse).toBeDefined();
  });
  test('static attribute parse is a function', () => {
    expect(OrgPlainList.parse).toBeInstanceOf(Function);
  });
});

// describe('parsing', () => {
//   test('parses date from string', () => {
//     const dateStr = '2017-10-30 Mon';
//     const store = {};
//     const parsedObj = OrgPlainList.parse(dateStr, store);

//     expect(parsedObj.yyyy).toBe(2017);
//     expect(parsedObj.mm).toBe(10);
//     expect(parsedObj.dd).toBe(30);
//     expect(parsedObj.dayName).toBe('Mon');
//     expect(parsedObj.id).toBeDefined();
//   });
// });

describe('has static method "serialize"', () => {
  test('static attribute serialize exists', () => {
    expect(OrgPlainList.serialize).toBeDefined();
  });
  test('static attribute serialize is a function', () => {
    expect(OrgPlainList.serialize).toBeInstanceOf(Function);
  });
});

// describe('serialization', () => {
//   test('serializes date to string', () => {
//     const dateObj = {
//       yyyy: 2017,
//       mm: 10,
//       dd: 30,
//       dayName: 'Mon'
//     };
//     expect(OrgPlainList.serialize(dateObj)).toBe('2017-10-30 Mon');
//   });

//   test('serializes date to string and pads zeroes where necessary', () => {
//     const dateObj = {
//       yyyy: 2017,
//       mm: 1,
//       dd: 3,
//       dayName: 'Mon'
//     };
//     expect(OrgPlainList.serialize(dateObj)).toBe('2017-01-03 Mon');
//   });
// });
