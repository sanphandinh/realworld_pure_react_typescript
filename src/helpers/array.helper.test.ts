import { flatten } from './array.helper';

describe('flatten array work fine', () => {
  test('flatten with depth equal 1', () => {
    expect(flatten([1, 2, [3, 4]])).toEqual([1, 2, 3, 4]);
    expect(flatten([1, 2, [3, 4, [5, 6]]])).toEqual([1, 2, 3, 4, [5, 6]]);
  });
  test('flatten array with depth equal 2', () => {
    expect(flatten([1, 2, [3, 4, [5, 6]]], 2)).toEqual([1, 2, 3, 4, 5, 6]);
  });
  test('flatten array with depth equal 3', () => {
    expect(flatten([1, 2, [3, 4, [5, 6, [7, 8]]]], 3)).toEqual([
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
    ]);
  });
});
