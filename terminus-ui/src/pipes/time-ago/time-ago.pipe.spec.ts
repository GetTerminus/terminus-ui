import { TsTimeAgoPipe } from './time-ago.pipe';


describe(`TsTimeAgoPipe`, () => {

  beforeEach(() => {
    this.pipe = new TsTimeAgoPipe().transform;
    this.date = new Date(2018, 1, 8);
    this.oldDate = new Date(2018, 1, 3);
  });


  it(`should return null if no value is passed in`, () => {
    expect(this.pipe(null, this.oldDate)).toEqual(null);
    expect(this.pipe('', this.oldDate)).toEqual(null);
  });


  it(`should format a date`, () => {
    const actual = this.pipe(this.date, this.oldDate);
    const expected = '5 days';

    expect(actual).toEqual(expected);
  });


  it(`should format string dates`, () => {
    const actual = this.pipe(this.date.toISOString(), this.oldDate.toISOString());
    const expected = '5 days';

    expect(actual).toEqual(expected);
  });


  describe(`if in dev mode`, () => {

    describe(`if either value is not a valid date`, () => {

      it(`should throw an error`, () => {
        const errFunc = () => this.pipe(this.date, 'foo');
        expect(errFunc).toThrowError(`'foo' is not a valid date.`);
      });

      it(`should throw an error`, () => {
        const errFunc = () => this.pipe('bar', this.date);
        expect(errFunc).toThrowError(`'bar' is not a valid date.`);
      });

    });

  });

});

