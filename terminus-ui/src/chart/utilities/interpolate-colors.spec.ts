// tslint:disable: no-non-null-assertion
import {
  interpolateColor,
  interpolateColors,
  interpolateManyColors,
} from './interpolate-colors';
import { CHART_COLORS } from './../options-defaults';


/**
 * Helper function to convert colors from RGB to RGBA
 *
 * @param time - The time chosen
 * @return The difference in time
 */
export function rgbToRgba(color: string, opacity = 1): string {
  return `rgba(${color.match(/\d+/g)},${opacity})`;
}


describe(`color interpolation`, () => {

  describe(`interpolateColors`, () => {

    test(`should return an array of colors`, () => {
      const actual1 = interpolateColors('rgb(255,255,255)', 'rgb(0,0,0)', 4);
      expect(actual1!.length).toEqual(4);
      expect(actual1![actual1!.length - 1]).toEqual('rgba(0,0,0,1)');
      expect(actual1![0]).toEqual('rgba(255,255,255,1)');

      const actual2 = interpolateColors('rgb(0,0,0)', 'rgb(255,255,255)', 5);
      expect(actual2!.length).toEqual(5);
      expect(actual2![actual2!.length - 1]).toEqual('rgba(255,255,255,1)');
      expect(actual2![0]).toEqual('rgba(0,0,0,1)');
      expect(actual2![Math.floor(actual2!.length / 2)]).toEqual('rgba(128,128,128,1)');
    });


    test(`should return undefined if any params are missing`, () => {
      const missingParam1 = interpolateColors(null as any, 'rgb(0,0,0)', 4);
      expect(missingParam1).toEqual(undefined);

      const missingParam2 = interpolateColors('rgb(255,255,255)', null as any, 4);
      expect(missingParam2).toEqual(undefined);

      const missingParam3 = interpolateColors('rgb(255,255,255)', 'rgb(0,0,0)', null as any);
      expect(missingParam3).toEqual(undefined);
    });


    test(`should return undefined when an rgba value isn't passed in`, () => {
      const wrongParam1 = interpolateColors('blue', 'rgb(0,0,0)', 4);
      expect(wrongParam1).toEqual(undefined);

      const wrongParam2 = interpolateColors('rgb(255,255,255)', 'blue', 4);
      expect(wrongParam2).toEqual(undefined);
    });


    test(`should default to 2 steps if below 2`, () => {
      const actual = interpolateColors('rgb(255,255,255)', 'rgba(0,0,0,1)', 1);
      expect(actual!.length).toEqual(2);
    });


    test(`should interpolate with opacity`, () => {
      const actual = interpolateColors('rgb(255,255,255)', 'rgb(0,0,0)', 4, 0.7);
      expect(actual!.length).toEqual(4);
      expect(actual![actual!.length - 1]).toEqual('rgba(0,0,0,0.7)');
      expect(actual![0]).toEqual('rgba(255,255,255,0.7)');
    });

  });


  describe(`interpolateColor`, () => {

    test(`should use the default factor to step between the colors`, () => {
      const color = interpolateColor([255, 255, 255], [0, 0, 0]);
      expect(color).toEqual([128, 128, 128]);
    });


    test(`should use the passed in factor to step between the colors`, () => {
      const one = interpolateColor([255, 255, 255], [0, 0, 0], .2);
      expect(one).toEqual([204, 204, 204]);

      const two = interpolateColor([255, 255, 255], [0, 0, 0], .8);
      expect(two).toEqual([51, 51, 51]);
    });

  });


  describe(`interpolateManyColors`, () => {
    const colorArray = [...CHART_COLORS];

    test(`should return an array of colors including originals`, () => {
      const colors = interpolateManyColors(colorArray, 5, 1);

      expect(colors[0]).toEqual(rgbToRgba(CHART_COLORS[0]));
      expect(colors[4]).toEqual(rgbToRgba(CHART_COLORS[1]));
      expect(colors[8]).toEqual(rgbToRgba(CHART_COLORS[2]));
      expect(colors[12]).toEqual(rgbToRgba(CHART_COLORS[3]));
      expect(colors[colors.length - 1]).toEqual(rgbToRgba(CHART_COLORS[4]));
    });


    test(`should enforce a minimum of 2 steps`, () => {
      const colors = interpolateManyColors(colorArray, 1, 1);

      expect(colors[0]).toEqual(rgbToRgba(CHART_COLORS[0]));
      expect(colors[1]).toEqual(rgbToRgba(CHART_COLORS[1]));
      expect(colors[2]).toEqual(rgbToRgba(CHART_COLORS[2]));
      expect(colors[3]).toEqual(rgbToRgba(CHART_COLORS[3]));
      expect(colors[4]).toEqual(rgbToRgba(CHART_COLORS[4]));
    });

  });

});
