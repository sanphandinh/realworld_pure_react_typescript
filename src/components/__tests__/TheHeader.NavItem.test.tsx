import React from 'react';
import TheHeaderNavItem from '../TheHeader.NavItem';
import renderer from 'react-test-renderer';

test('TheHeaderNavItem normal render correctly', () => {
  const cmp = renderer.create(<TheHeaderNavItem title="Home" url="/" />);
  const tree = cmp.toJSON();
  const instance = cmp.root;
  expect(instance.findByProps({ className: 'nav-link' }).children).toEqual([
    'Home',
  ]);
  expect(tree).toMatchSnapshot();
});

test('TheHeaderNavItem active render correctly', () => {
  const cmp = renderer.create(<TheHeaderNavItem title="Home" url="/" active />);
  const tree = cmp.toJSON();
  const instance = cmp.root;
  expect(
    instance.findByProps({ className: 'nav-link active' }).children
  ).toEqual(['Home']);
  expect(tree).toMatchSnapshot();
});
