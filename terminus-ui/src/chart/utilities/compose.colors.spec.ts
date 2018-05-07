import { CHART_COLORS } from './../options-defaults';
import { composeColors } from './compose-colors';
import { rgbToRgba } from './interpolate-colors.spec';


describe(`composeColors`, () => {
  const colorArray: string[] = [...CHART_COLORS];
  const interpolator = jest.fn((c, s, o) => {
    const rgbaColors = c.map((v) => {
      return rgbToRgba(v, o);
    });

    return rgbaColors;
  });


  test(`should work with the default interpolator`, () => {
    const colors = composeColors(2, 'bar');

    expect(colors.length).toEqual(2);
  });


  test(`should return an array of colors equal to the number of data points`, () => {
    const colors = composeColors(2, 'bar', interpolator);

    expect(interpolator).toBeCalledWith(colorArray, 5, undefined);
    expect(colors.length).toEqual(2);
  });


  test(`should force 'steps' to 3 if the visualization is 'area'`, () => {
    composeColors(2, 'area', interpolator);

    expect(interpolator).toBeCalledWith(colorArray, 3, undefined);
  });


  test(`should overwrite params if visualization is 'scatter'`, () => {
    const colors = composeColors(2, 'scatter', interpolator);

    expect(interpolator).toBeCalledWith(colorArray, 2, 0.5);
    expect(colors.length).toEqual(2);
    expect(colors[1]).toEqual(rgbToRgba(colorArray[colorArray.length - 2], 0.5));
  });


  test(`should only return the first and the last color if visualization is 'map'`, () => {
    const colors = composeColors(4, 'map', interpolator);

    expect(colors.length).toEqual(2);
    expect(colors[0]).toEqual(rgbToRgba(colorArray[0]));
    expect(colors[1]).toEqual(rgbToRgba(colorArray[3]));
  });


  test(`should reverse the colors array if the visualization is 'column'`, () => {
    const colors1 = composeColors(2, 'line', interpolator);
    const colors2 = composeColors(2, 'column', interpolator);

    expect(colors1[0]).toEqual(colors2[1]);
    expect(colors1[1]).toEqual(colors2[0]);
  });

});
