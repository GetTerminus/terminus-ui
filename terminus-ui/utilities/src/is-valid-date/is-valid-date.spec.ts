import { isValidDate } from './is-valid-date';

describe('isValidDate', () => {
  test('pass valid string date', () => {
    const date = '2019-08-09T12:22:01';
    expect(isValidDate(date)).toBeTruthy();
  });

  test('pass invalid string date', () => {
    const date = 'foo';
    expect(isValidDate(date)).toBeFalsy();
  });

  test('pass valid date object', () => {
    const date = new Date();
    expect(isValidDate(date)).toBeTruthy();
  });

  test('pass invalid date object', () => {
    const date = new Date('foo');
    expect(isValidDate(date)).toBeFalsy();
  });
});
