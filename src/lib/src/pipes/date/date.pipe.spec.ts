import { TsDatePipe } from './date.pipe';


describe(`TsDatePipe`, () => {

  beforeEach(() => {
    this.pipe = new TsDatePipe().transform;
  });


  describe(`short format`, () => {

    it(`should format a date`, () => {
      const date = new Date(2018, 1, 8);
      const actual = this.pipe(date, 'short');
      const expected = '02/08/2018';

      expect(actual).toEqual(expected);
    });


    it(`should format a date string`, () => {
      const date = new Date(2018, 1, 8).toISOString();
      const actual = this.pipe(date, 'short');
      const expected = '02/08/2018';

      expect(actual).toEqual(expected);
    });


  });


  describe(`medium format`, () => {

    it(`should format a date`, () => {
      const date = new Date(2018, 1, 8);
      const actual = this.pipe(date, 'medium');
      const expected = 'February 8th, 2018';

      expect(actual).toEqual(expected);
    });

  });


  describe(`extended format`, () => {

    it(`should format a date`, () => {
      const date = new Date(2018, 1, 8);
      const actual = this.pipe(date, 'extended');
      const expected = 'Thursday, February 8th, 2018, 12:00:00am';

      expect(actual).toEqual(expected);
    });

  });


  describe(`timestamp format`, () => {

    it(`should format a date`, () => {
      const date = new Date(2018, 1, 8);
      const actual = this.pipe(date, 'timestamp');
      const expected = '2018-02-08T05:00:00.000Z';

      expect(actual).toEqual(expected);
    });

  });


  describe(`if in dev mode`, () => {

    describe(`if the value is not a valid date`, () => {

      it(`should throw an error`, () => {
        const errFunc = () => this.pipe('foo');
        expect(errFunc).toThrowError(`'foo' is not a valid date.`);
      });

    });


    describe(`if the format is not valid`, () => {
      const date = new Date(2018, 1, 8);
      const message = `'foo' is not a valid format. Please see TsDateTypes for valid formats.`

      it(`should throw an error`, () => {
        const errFunc = () => this.pipe(date, 'foo');
        expect(errFunc).toThrowError(message);
      });

    });

  });

});
