import { TsTruncateAtPipe } from './truncate.pipe';

describe(`TsTruncateAtPipe`, function() {
  let pipeClass: TsTruncateAtPipe;
  let pipe: Function;
  const inputString = 'This is my test string';
  const ellipses = '\u2026';

  beforeEach(() => {
    pipeClass = new TsTruncateAtPipe();
    pipe = pipeClass.transform;
  });

  test(`should return undefined if no value is passed in`, () => {
    expect(pipe(null)).toEqual(undefined);
    expect(pipe('')).toEqual(undefined);
  });

  test(`should return the string if no parameters are passed`, () => {
    expect(pipe(inputString)).toEqual('This is my test string');
  });

  test(`should return the string if string length is shorter than character count`, () => {
    expect(pipe(inputString, 24)).toEqual('This is my test string');
  });

  test(`should return warning if string is passed instead of number`, () => {
    window.console.warn = jest.fn();
    pipe(inputString, 'start');

    expect(window.console.warn).toHaveBeenCalled();
  });

  test(`should default to end if no position is specified`, () => {
    expect(pipe(inputString, 10, 'undefined as any')).toEqual(`This is m${ellipses}`);
  });

  describe(`end`, () => {
    test(`should be the format if no position is specified`, () => {
      expect(pipe(inputString, 10)).toEqual(`This is m${ellipses}`);
      expect(pipe(inputString, 10)).toHaveLength(10);
    });

    test(`should remove last part of the string`, () => {
      expect(pipe(inputString, 10, 'end')).toEqual(`This is m${ellipses}`);
      expect(pipe(inputString, 10, 'end')).toHaveLength(10);
    });
  });

  describe(`start`, () => {
    test(`should remove first part of the string`, () => {
      expect(pipe(inputString, 10, 'start')).toEqual(`${ellipses}st string`);
      expect(pipe(inputString, 10, 'start')).toHaveLength(10);
    });
  });

  describe(`middle`, () => {
    test(`should have equal number of characters on each side of ellipses if character count is odd`, () => {
      expect(pipe(inputString, 11, 'middle')).toEqual(`This ${ellipses}tring`);
      expect(pipe(inputString, 11, 'middle')).toHaveLength(11);
    });

    test(`should have one more characters in front of ellipses if character count is even`, () => {
      expect(pipe(inputString, 10, 'middle')).toEqual(`This ${ellipses}ring`);
      expect(pipe(inputString, 10, 'middle')).toHaveLength(10);
    });
  });
});
