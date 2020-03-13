import { TsRoundNumberPipe } from './round-number.pipe';

describe(`TsRoundNumberPipe`, function() {
  let pipeClass: TsRoundNumberPipe;
  let pipe: Function;
  const num = 3456.3456;

  beforeEach(() => {
    pipeClass = new TsRoundNumberPipe();
    pipe = pipeClass.transform;
  });

  test(`should return undefined if no value is passed in`, () => {
    expect(pipe(null)).toEqual(undefined);
    expect(pipe('')).toEqual(undefined);
  });

  test(`should round a number`, () => {
    expect(pipe(num, 2)).toEqual(3456.35);
  });

  test(`should default to a precision of 0`, () => {
    expect(pipe(num)).toEqual(3456);
  });
});
