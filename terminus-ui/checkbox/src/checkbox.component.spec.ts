import {
  Component,
  ViewChild,
} from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  TestModuleMetadata,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  ChangeDetectorRefMock,
  configureTestBedWithoutReset,
} from '@terminus/ngx-tools/testing';
import { TsStyleThemeTypes } from '@terminus/ui/utilities';

import { TsCheckboxComponent } from './checkbox.component';
import { TsCheckboxModule } from './checkbox.module';


@Component({
  template: `
  <ts-checkbox
    [isChecked]="checked"
    [theme]="myTheme"
    [isDisabled]="disabled"
    [isRequired]="required"
    [isIndeterminate]="indeterminate"
    (inputChange)="changed($event)"
    (indeterminateChange)="interChanged($event)"
  >My checkbox!</ts-checkbox>
  `,
})
class TestHostComponent {
  checked!: boolean;
  myTheme: TsStyleThemeTypes | undefined;
  disabled!: boolean;
  required!: boolean;
  indeterminate!: boolean | undefined;


  @ViewChild(TsCheckboxComponent, {static: true})
  component!: TsCheckboxComponent;

  changed = jest.fn();
  interChanged = jest.fn();
}

describe(`TsCheckboxComponent`, function() {

  describe(`CheckboxComponent with DOM`, () => {

    let fixture: ComponentFixture<TestHostComponent>;
    let hostComponent: TestHostComponent;
    let component: TsCheckboxComponent;

    const moduleDefinition: TestModuleMetadata = {
      imports: [
        TsCheckboxModule,
      ],
      declarations: [
        TestHostComponent,
      ],
    };

    configureTestBedWithoutReset(moduleDefinition);

    beforeEach(() => {
      // Reset parent component inputs
      if (hostComponent) {
        hostComponent.checked = false;
        hostComponent.disabled = false;
        hostComponent.required = false;
        hostComponent.indeterminate = undefined;
        hostComponent.myTheme = undefined;
        fixture.detectChanges();
      }

      fixture = TestBed.createComponent(TestHostComponent);
      hostComponent = fixture.componentInstance;
      component = hostComponent.component;
      fixture.detectChanges();
    });


    describe(`isChecked`, () => {

      test(`checkbox is checked`, () => {
        hostComponent.checked = true;
        fixture.detectChanges();
        expect(component.isChecked).toEqual(true);
        const checkbox = fixture.debugElement.query(By.css('#mat-checkbox-1-input'));
        expect(checkbox.nativeElement.checked).toEqual(true);
      });


      test(`checkbox is unchecked`, () => {
        hostComponent.checked = false;
        fixture.detectChanges();
        expect(component.isChecked).toEqual(false);
        const checkbox = fixture.debugElement.query(By.css('#mat-checkbox-2-input'));
        expect(checkbox.nativeElement.checked).toEqual(false);
      });

    });


    describe(`isIndeterminate`, () => {

      test(`checkbox changes to indeterminate:`, () => {
        hostComponent.checked = false;
        hostComponent.indeterminate = true;
        fixture.detectChanges();
        expect(component.isIndeterminate).toEqual(true);
        const checkbox = fixture.debugElement.query(By.css('#mat-checkbox-3-input'));
        expect(checkbox.nativeElement.indeterminate).toEqual(true);
      });

    });


    describe(`isDisabled`, () => {

      test(`checkbox is disabled`, () => {
        hostComponent.disabled = true;
        fixture.detectChanges();
        expect(component.isDisabled).toEqual(true);
        const checkbox = fixture.debugElement.query(By.css('#mat-checkbox-4-input'));
        expect(checkbox.nativeElement.disabled).toEqual(true);
      });


      test(`checkbox is not disabled`, () => {
        hostComponent.disabled = false;
        fixture.detectChanges();
        expect(component.isDisabled).toEqual(false);
        const checkbox = fixture.debugElement.query(By.css('#mat-checkbox-5-input'));
        expect(checkbox.nativeElement.disabled).toEqual(false);
      });

    });


    describe(`isRequired`, () => {

      test(`checkbox is required`, () => {
        hostComponent.required = true;
        fixture.detectChanges();
        expect(component.isRequired).toEqual(true);
        const checkbox = fixture.debugElement.query(By.css('#mat-checkbox-6-input'));
        expect(checkbox.nativeElement.required).toEqual(true);
      });


      test(`checkbox is required`, () => {
        hostComponent.required = false;
        fixture.detectChanges();
        expect(component.isRequired).toEqual(false);
        const checkbox = fixture.debugElement.query(By.css('#mat-checkbox-7-input'));
        expect(checkbox.nativeElement.required).toEqual(false);
      });

    });

  });


  describe(`TsCheckboxComponent no DOM`, () => {
    let component: TsCheckboxComponent;

    beforeEach(() => {
      component = new TsCheckboxComponent(
        new ChangeDetectorRefMock(),
      );

      // Stub in MatCheckbox
      component.checkbox = {
        checked: false,
        toggle: jest.fn(),
      } as any;
    });


    it(`should exist`, () => {
      expect(component).toBeTruthy();
    });


    describe(`id`, () => {

      test(`should have a default ID and allow a custom ID`, () => {
        expect(component.id.indexOf('ts-checkbox') >= 0).toEqual(true);
        component.id = 'foo';
        expect(component.id).toEqual('foo');
      });

      test(`should fallback to the default ID`, () => {
        component.id = 'foo';
        expect(component.id).toEqual('foo');

        component.id = undefined as any;
        expect(component.id.indexOf('ts-checkbox') >= 0).toEqual(true);
      });

    });


    describe(`isChecked`, () => {

      test(`should set/get checked value`, () => {
        expect(component.isChecked).toEqual(false);

        component.isChecked = true;

        expect(component.value).toEqual(true);
      });

    });


    describe(`set ngModel`, () => {

      test(`should set the private variable`, () => {
        expect(component['_isChecked']).toEqual(false);

        component.ngModel = true;

        expect(component['_isChecked']).toEqual(true);
      });

    });

  });

});
