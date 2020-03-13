import { TsAbbreviateNumberPipe } from './abbreviate-number.pipe';

describe(`TsAbbreviateNumberPipe`, function() {
  let pipeClass: TsAbbreviateNumberPipe;
  let pipe: Function;
  const num = 1234;
  const num2 = 12345678;

  beforeEach(() => {
    pipeClass = new TsAbbreviateNumberPipe();
    pipe = pipeClass.transform;
  });

  test(`should return undefined if no value is passed in`, () => {
    expect(pipe(null)).toEqual('');
    expect(pipe('')).toEqual('');
  });

  test(`should abbreviate a number`, () => {
    expect(pipe(num, 2)).toEqual('1.23K');
    expect(pipe(num2, 2)).toEqual('12.35M');
  });

  test(`should default to a precision of 1`, () => {
    expect(pipe(num)).toEqual('1.2K');
  });
});
