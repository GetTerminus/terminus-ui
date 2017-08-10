import {
  Component,
} from '@angular/core';
import {
  TestBed,
  ComponentFixture,
  async,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TsVerticalSpacingDirective } from './vertical-spacing.directive';
import { TsVerticalSpacingTypes } from './../utilities/types';

@Component({
  template: `
    <div [tsVerticalSpacing]="spacing">
      Foo
    </div>
  `,
})
class TestHostComponent {
  spacing: TsVerticalSpacingTypes;
}

describe(`TsSpacingComponent`, () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      declarations: [
        TsVerticalSpacingDirective,
        TestHostComponent,
      ],
    })
      .compileComponents().then(() => {
        this.fixture = TestBed.createComponent(TestHostComponent);
        this.testComponent = this.fixture.componentInstance;
      });
  }));


  describe(`set tsVerticalSpacing()`, () => {

    it(`should add the default class if no value is passed in`, () => {
      this.fixture.detectChanges();
      const defaultClass = 'u-vertical-spacing';
      const de = this.fixture.debugElement.query(By.css('div'));
      const classList = de.nativeElement.classList;

      expect(classList.contains(defaultClass)).toEqual(true);
    });


    it(`should add the expected spacing class`, () => {
      const setClass = 'u-vertical-spacing__large--2x';
      this.testComponent.spacing = 'large--2x';
      this.fixture.detectChanges();
      const de = this.fixture.debugElement.query(By.css('div'));
      const classList = de.nativeElement.classList;

      expect(classList.contains(setClass)).toEqual(true);
    });

  });

});
