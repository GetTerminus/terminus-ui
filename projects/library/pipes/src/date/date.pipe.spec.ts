import { TsDatePipe } from './date.pipe';

describe(`TsDatePipe`, function() {
  let pipeClass: TsDatePipe;
  let pipe: Function;
  let date: string;
  let originalGetTimezoneOffset: () => number;

  beforeEach(() => {
    pipeClass = new TsDatePipe();
    pipe = pipeClass.transform;
    date = '2018-02-08T05:00:00.000Z';

    // Save a reference to the original timezone method
    originalGetTimezoneOffset = Date.prototype.getTimezoneOffset;

    // Overwrite the method to always return Eastern timezone offset
    Date.prototype.getTimezoneOffset = () => 300;
  });

  afterEach(() => {
    // Reset the timezone offset method
    Date.prototype.getTimezoneOffset = originalGetTimezoneOffset;
  });

  test(`should return undefined if no value is passed in`, () => {
    expect(pipe(null as any)).toEqual(undefined);
    expect(pipe('')).toEqual(undefined);
  });

  describe(`short format`, () => {
    test(`should format a date`, () => {
      const actual = pipe(new Date(date), 'short');
      const expected = '02-08-2018';

      expect(actual).toEqual(expected);
    });

    test(`should format a date string`, () => {
      const actual = pipe(date, 'short');
      const expected = '02-08-2018';

      expect(actual).toEqual(expected);
    });
  });

  describe(`medium format`, () => {
    test(`should format a date`, () => {
      const actual = pipe(date, 'medium');
      const expected = 'Feb 8th, 2018';

      expect(actual).toEqual(expected);
    });
  });

  describe(`extended format`, () => {
    test(`should format a date`, () => {
      const actual = pipe(date, 'extended');
      const expected = 'Thursday, February 8th, 2018, 12:00:00AM';

      expect(actual).toEqual(expected);
    });
  });

  describe(`timestamp format`, () => {
    test(`should format a date`, () => {
      const actual = pipe(date, 'timestamp');
      const expected = '2018-02-08T05:00:00.000Z';

      expect(actual).toEqual(expected);
    });
  });

  describe(`if in dev mode`, () => {
    describe(`if the value is not a valid date`, () => {
      test(`should throw an error`, () => {
        const errFunc = () => pipe('foo');
        expect(errFunc).toThrowError(`'foo' is not a valid date object.`);
      });
    });

    describe(`if the format is not valid`, () => {
      const message = `'foo' is not a valid format. Please see TsDateTypes for valid formats.`;

      test(`should throw an error`, () => {
        const errFunc = () => pipe(date, 'foo');
        expect(errFunc).toThrowError(message);
      });
    });
  });
});
