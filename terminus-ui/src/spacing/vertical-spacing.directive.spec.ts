import { ElementRefMock } from '@terminus/ngx-tools/testing';

import { TsVerticalSpacingDirective } from './vertical-spacing.directive';
import { TS_SPACING } from './spacing.constant';


describe(`TsVerticalSpacingDirective`, () => {

  beforeEach(() => {
    this.directive = new TsVerticalSpacingDirective(
      new ElementRefMock(),
    );
  });


  it(`should exist`, () => {
    expect(this.directive).toBeTruthy();
  });


  describe(`set tsVerticalSpacing()`, () => {

    it(`should set the default margin if no value is passed in`, () => {
      this.directive.tsVerticalSpacing = '';

      expect(this.directive.elementRef.nativeElement.style.marginBottom)
        .toEqual(TS_SPACING.default[0]);
    });


    it(`should add the expected spacing class`, () => {
      this.directive.tsVerticalSpacing = 'large--2';

      expect(this.directive.elementRef.nativeElement.style.marginBottom)
        .toEqual(TS_SPACING.large[2]);
    });


    it(`should add the expected spacing class for 'none'`, () => {
      this.directive.tsVerticalSpacing = 'none';

      expect(this.directive.elementRef.nativeElement.style.marginBottom)
        .toEqual(TS_SPACING.none[0]);
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
