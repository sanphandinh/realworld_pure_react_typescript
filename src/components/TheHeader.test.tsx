import React from 'react';
import TheHeader from './TheHeader';
import renderer from 'react-test-renderer';

test('The header render correctly', () => {
  const cmp = renderer.create(<TheHeader />);
  const tree = cmp.toJSON();
  expect(tree).toMatchSnapshot();
});
