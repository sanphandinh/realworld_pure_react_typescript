import { isString } from './string.helper';

describe('isString function work fine', () => {
  test('The value is string type', () => {
    expect(isString('string')).toBe(true);
    expect(isString('')).toBe(true);
  });

  test('The number is not string type', () => {
    expect(isString(1)).toBe(false);
    expect(isString(0)).toBe(false);
    expect(isString(Infinity)).toBe(false);
    expect(isString(-Infinity)).toBe(false);
    expect(isString(NaN)).toBe(false);
  });

  test('The boolean is not string type', () => {
    expect(isString(true)).toBe(false);
    expect(isString(false)).toBe(false);
  });

  test('Null is not string type', () => {
    expect(isString(null)).toBe(false);
  });

  test('Undefined is not string type', () => {
    expect(isString(undefined)).toBe(false);
  });

  test('object is not string type', () => {
    expect(isString({ a: 'a' })).toBe(false);
    expect(isString({})).toBe(false);
    expect(isString([1, 2])).toBe(false);
    expect(isString([])).toBe(false);
  });
});
