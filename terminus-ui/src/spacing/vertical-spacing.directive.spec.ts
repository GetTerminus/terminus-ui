import { ElementRefMock } from '@terminus/ngx-tools/testing';

import { TsVerticalSpacingDirective } from './vertical-spacing.directive';
import { TS_SPACING } from './spacing.constant';


describe(`TsVerticalSpacingDirective`, () => {
  let directive: TsVerticalSpacingDirective;

  beforeEach(() => {
    directive = new TsVerticalSpacingDirective(
      new ElementRefMock(),
    );
  });


  it(`should exist`, () => {
    expect(directive).toBeTruthy();
  });


  describe(`set tsVerticalSpacing()`, () => {

    it(`should set the default margin if no value is passed in`, () => {
      directive.tsVerticalSpacing = '' as any;

      expect(directive['elementRef'].nativeElement.style.marginBottom)
        .toEqual(TS_SPACING.default[0]);
    });


    it(`should add the expected spacing class`, () => {
      directive.tsVerticalSpacing = 'large--2';

      expect(directive['elementRef'].nativeElement.style.marginBottom)
        .toEqual(TS_SPACING.large[2]);
    });


    it(`should add the expected spacing class for 'none'`, () => {
      directive.tsVerticalSpacing = 'none';

      expect(directive['elementRef'].nativeElement.style.marginBottom)
        .toEqual(TS_SPACING.none[0]);
    });


    it(`should throw an error if an unexpected value is passed in`, () => {
      expect(() => {
        try {
          directive.tsVerticalSpacing = 'small--5' as any;
        } catch (e) {
          throw new Error(e);
        }
      }).toThrowError();
    });

  });

});
