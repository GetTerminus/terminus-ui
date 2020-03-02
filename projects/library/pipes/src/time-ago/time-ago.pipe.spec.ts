import { TsTimeAgoPipe } from './time-ago.pipe';


describe(`TsTimeAgoPipe`, function() {
  let pipe: Function;
  let date: Date;
  let oldDate: Date;

  beforeEach(() => {
    pipe = new TsTimeAgoPipe().transform;
    date = new Date(2018, 1, 8);
    oldDate = new Date(2018, 1, 3);
  });


  it(`should return undefined if no value is passed in`, () => {
    expect(pipe(null as any, oldDate)).toEqual(undefined);
    expect(pipe('', oldDate)).toEqual(undefined);
  });


  it(`should format a date`, () => {
    const actual = pipe(date, oldDate);
    const expected = '5 days';

    expect(actual).toEqual(expected);
  });


  it(`should format string dates`, () => {
    const actual = pipe(date.toISOString(), oldDate.toISOString());
    const expected = '5 days';

    expect(actual).toEqual(expected);
  });


  describe(`if in dev mode`, () => {

    describe(`if either value is not a valid date`, () => {

      it(`should throw an error`, () => {
        const errFunc = () => pipe(date, 'foo');
        expect(errFunc).toThrowError(`'foo' is not a valid date.`);
      });

      it(`should throw an error`, () => {
        const errFunc = () => pipe('bar', date);
        expect(errFunc).toThrowError(`'bar' is not a valid date.`);
      });

    });

  });

});

