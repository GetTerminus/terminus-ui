import { TsVerticalSpacingDirective } from './vertical-spacing.directive';
import { TsVerticalSpacingTypes } from './../utilities/types';
import { ElementRefMock } from './../utilities/testing/mocks/elementRef.mock';
import { RendererMock } from './../utilities/testing/mocks/renderer.mock';


describe(`TsVerticalSpacingDirective`, () => {

  beforeEach(() => {
    this.defaultClass = 'u-vertical-spacing';

    this.directive = new TsVerticalSpacingDirective(
      RendererMock,
      new ElementRefMock(),
    );
  });


  it(`should exist`, () => {
    expect(this.directive).toBeTruthy();
  });


  describe(`set tsVerticalSpacing()`, () => {

    afterEach(() => {
      this.directive.renderer.setElementClass.calls.reset();
    });


    it(`should add the default class if no value is passed in`, () => {
      this.directive.tsVerticalSpacing = '';

      expect(this.directive.renderer.setElementClass.calls.argsFor(0)[1])
        .toEqual(this.defaultClass);
    });


    it(`should add the expected spacing class`, () => {
      this.directive.tsVerticalSpacing = 'large--2';

      expect(this.directive.renderer.setElementClass.calls.argsFor(0)[1])
        .toEqual(this.defaultClass + '__large--2');
    });


    it(`should throw an error if an unexpected value is passed in`, () => {
      expect(() => {
        try {
          this.directive.tsVerticalSpacing = 'small--5';
        } catch (e) {
          throw new Error(e);
        }
      }).toThrowError();
    });

  });

});
