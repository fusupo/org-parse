const OrgDrawer = require('./org-drawer');
const drawer = OrgDrawer.new('test');

test('exists', () => {
  expect(drawer).toBeDefined();
});

test('has name', () => {
  expect(drawer.name).toBeDefined();
  expect(drawer.name).toBe('test');
});

describe('has static clone method', () => {
  // expect(OrgDrawer.clone).toBeDefined();
  // expect(OrgDrawer.clone(drawer)).toBeDefined();
  // expect(OrgDrawer.clone(drawer)).toBeDefined();
  let clone = OrgDrawer.clone(drawer);

  test('have all the same properties', () => {
    expect(clone).toEqual(drawer);
  });

  test('are not the exact same can', () => {
    expect(clone).not.toBe(drawer);
  });
});
