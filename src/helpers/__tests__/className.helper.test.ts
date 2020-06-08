import classNames from '../className.helper';

test('list class (string) to be class valid', () => {
  expect(classNames('class1', 'class2', 'class3')).toBe('class1 class2 class3');
  expect(classNames('class1', 'class2', 'class2')).toBe('class1 class2');
});

test('list combination to be class valid', () => {
  expect(
    classNames(
      'class1',
      undefined,
      {
        class2: true,
        class3: false,
        class4: 1,
      },
      'class5',
      {
        class6: {},
      }
    )
  ).toBe('class1 class2 class4 class5 class6');
});
