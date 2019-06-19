import {
  Component,
  ViewChild,
} from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { createComponent } from '@terminus/ngx-tools/testing';

import { TS_SPACING } from './spacing.constant';
import { TsSpacingModule } from './spacing.module';
import {
  TsVerticalSpacingDirective,
  TsVerticalSpacingTypes,
} from './vertical-spacing.directive';


@Component({
  template: `
    <div [tsVerticalSpacing]="verticalSpacing">Vertical Spacing Content</div>
  `,
})
class TestHostComponent {
  verticalSpacing: TsVerticalSpacingTypes;

  @ViewChild(TsVerticalSpacingDirective, {static: true})
  verticalSpacingDirective: TsVerticalSpacingDirective;
}

@Component({
  template: `
    <div tsVerticalSpacing>
      Vertical Spacing Basic
    </div>
  `,
})
class TestHostBasicComponent {
  @ViewChild(TsVerticalSpacingDirective, {static: true})
  verticalSpacingDirective: TsVerticalSpacingDirective;
}


describe(`TsVerticalSpacingDirective`, function() {

  describe(`set tsVerticalSpacing()`, () => {
    let component: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;
    let spacingDiv: HTMLElement;
    let directive: TsVerticalSpacingDirective;

    beforeEach(() => {
      fixture = createComponent(TestHostComponent, [], [TsSpacingModule]);
      component = fixture.componentInstance;
      fixture.detectChanges();
      directive = component.verticalSpacingDirective;
      spacingDiv = fixture.debugElement.query(By.directive(TsVerticalSpacingDirective)).nativeElement as HTMLElement;
    });


    test(`should exist`, () => {
      expect(fixture).toBeTruthy();
      expect(spacingDiv).toBeTruthy();
    });


    test(`should set the default margin if no value is passed in`, () => {
      directive.tsVerticalSpacing = '' as any;

      expect(directive['elementRef'].nativeElement.style.marginBottom)
        .toEqual(TS_SPACING.default[0]);
    });


    test(`should add the expected spacing class`, () => {
      directive.tsVerticalSpacing = 'large--2';

      expect(directive['elementRef'].nativeElement.style.marginBottom)
        .toEqual(TS_SPACING.large[2]);
    });


    test(`should add the expected spacing class for 'none'`, () => {
      directive.tsVerticalSpacing = 'none';

      expect(directive['elementRef'].nativeElement.style.marginBottom)
        .toEqual('0px');
    });


    test(`should throw an error if an unexpected value is passed in`, () => {
      expect(() => {
        try {
          directive.tsVerticalSpacing = 'small--5' as any;
        } catch (e) {
          throw new Error(e);
        }
      }).toThrowError();
    });

  });

  describe(`default TsVerticalSpacing`, () => {
    test(`should set default values`, () => {
      const fixtureBasic = createComponent(TestHostBasicComponent, [], [TsSpacingModule]);
      fixtureBasic.detectChanges();

      expect(fixtureBasic).toBeTruthy();
      const spacingDiv = fixtureBasic.debugElement.query(By.directive(TsVerticalSpacingDirective));
      expect(spacingDiv).toBeTruthy();
      expect(spacingDiv.nativeElement.style.marginBottom).toEqual('16px');
    });
  });

});
