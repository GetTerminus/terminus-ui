import { tooltipPositionerFunction } from './options-defaults';


describe(`tooltipPositionerFunction`, () => {

  test(`should return a position object`, () => {
    const actual = tooltipPositionerFunction(100, 50, {plotX: 500, plotY: 500});

    expect(actual).toEqual({x: 450, y: 440});
  });

});
