import React from 'react';
import renderer from 'react-test-renderer';
import TheFooter from '../TheFooter';

test('The footer render correctyly', () => {
  const tree = renderer.create(<TheFooter />).toJSON();
  expect(tree).toMatchSnapshot();
});
