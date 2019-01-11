// tslint:disable: no-non-null-assertion
import {
  ReactiveFormsModule,
} from '@angular/forms';
import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { Type, Provider } from '@angular/core';
import { By } from '@angular/platform-browser';
import { typeInElement } from '@terminus/ngx-tools/testing';

import * as testComponents from './testing/test-components';
import { TsDateRangeModule } from './date-range.module';


/**
 * NOTE (B$): The ideal test would be to actually check the DOM to verify that specific dates are disabled etc. I was not having any luck
 * querying that deeply into the generated DOM. So, for now, we are simply testing the class as fully as possible.
 */


describe(`TsDateRangeComponent`, function() {

  describe(`date constraints`, function() {

    test(`should set the END min date according to the start date`, function() {
      const fixture = createComponent(testComponents.SeededDates);
      fixture.detectChanges();
      const endInputInstance = fixture.debugElement.queryAll(By.css('ts-input'))[1].componentInstance;

      expect(endInputInstance.minDate).toEqual(new Date(2018, 1, 1));
    });


    test(`should set the START max date according to the end date`, function() {
      const fixture = createComponent(testComponents.SeededDates);
      fixture.detectChanges();
      const startInputInstance = fixture.debugElement.queryAll(By.css('ts-input'))[0].componentInstance;

      expect(startInputInstance.maxDate).toEqual(new Date(2018, 1, 12));
    });


    test(`should set the START max date according to the end date on BLUR`, function() {
      const fixture = createComponent(testComponents.Basic);
      fixture.detectChanges();
      const startInputInstance = fixture.debugElement.queryAll(By.css('ts-input'))[0].componentInstance;
      const endInputInstance = fixture.debugElement.queryAll(By.css('ts-input'))[1].componentInstance;
      typeInElement('3-4-2019', endInputInstance.inputElement.nativeElement);
      endInputInstance.inputElement.nativeElement.blur();
      fixture.detectChanges();

      expect(startInputInstance.maxDate).toEqual(new Date('3-4-2019'));
    });

  });


  describe(`control syncing`, function() {

    describe(`internal controls`, function() {

      test(`should update their VALUE when the external control value changes`, function() {
        const fixture = createComponent(testComponents.Basic);
        fixture.detectChanges();
        const startInputInstance = fixture.debugElement.queryAll(By.css('ts-input'))[0].componentInstance;
        const endInputInstance = fixture.debugElement.queryAll(By.css('ts-input'))[1].componentInstance;

        expect(startInputInstance.formControl.value).toEqual(null);
        expect(endInputInstance.formControl.value).toEqual(null);

        const date = new Date(2018, 3, 3);
        startInputInstance.formControl.setValue(date);
        endInputInstance.formControl.setValue(date);
        fixture.detectChanges();

        expect(fixture.componentInstance.dateRangeComponent['internalStartControl'].value).toEqual(date);
        expect(fixture.componentInstance.dateRangeComponent['internalEndControl'].value).toEqual(date);
        expect.assertions(4);
      });


      // internal status/error updated by external ctrl
      test(`should update their STATUS when the external control changes`, function() {
        jest.useFakeTimers();
        const fixture = createComponent(testComponents.Basic);
        fixture.detectChanges();
        const startInputInstance = fixture.debugElement.queryAll(By.css('ts-input'))[0].componentInstance;
        const endInputInstance = fixture.debugElement.queryAll(By.css('ts-input'))[1].componentInstance;

        expect(startInputInstance.formControl.valid).toEqual(true);
        expect(endInputInstance.formControl.valid).toEqual(true);

        // Simulate user entering and leaving the input to trigger validation
        startInputInstance.inputElement.nativeElement.focus();
        endInputInstance.inputElement.nativeElement.focus();
        fixture.detectChanges();
        startInputInstance.inputElement.nativeElement.blur();
        endInputInstance.inputElement.nativeElement.blur();
        fixture.detectChanges();

        expect(startInputInstance.formControl.errors).toEqual({required: true});
        expect(endInputInstance.formControl.errors).toEqual({required: true});
        jest.runAllTimers();
        expect.assertions(4);
      });


      test(`should do nothing if no controls exist`, function() {
        jest.useFakeTimers();
        const fixture = createComponent(testComponents.NoControls);
        fixture.detectChanges();
        const startInputInstance = fixture.debugElement.queryAll(By.css('ts-input'))[0].componentInstance;
        const endInputInstance = fixture.debugElement.queryAll(By.css('ts-input'))[1].componentInstance;

        expect(startInputInstance.formControl.valid).toEqual(true);
        expect(endInputInstance.formControl.valid).toEqual(true);

        // Simulate user entering and leaving the input to trigger validation
        startInputInstance.inputElement.nativeElement.focus();
        endInputInstance.inputElement.nativeElement.focus();
        fixture.detectChanges();
        startInputInstance.inputElement.nativeElement.blur();
        endInputInstance.inputElement.nativeElement.blur();
        fixture.detectChanges();

        expect(startInputInstance.formControl.errors).toEqual(null);
        expect(endInputInstance.formControl.errors).toEqual(null);
        jest.runAllTimers();
        expect.assertions(4);
      });

    });


    describe(`external controls`, function() {

      test(`should update their VALUE when the internal control changes`, function() {
        const fixture = createComponent(testComponents.Basic);
        fixture.detectChanges();
        const startInputInstance = fixture.debugElement.queryAll(By.css('ts-input'))[0].componentInstance;
        const endInputInstance = fixture.debugElement.queryAll(By.css('ts-input'))[1].componentInstance;

        expect(startInputInstance.formControl.value).toBeNull();
        expect(endInputInstance.formControl.value).toBeNull();

        typeInElement('3-4-2019', startInputInstance.inputElement.nativeElement);
        typeInElement('3-8-2019', endInputInstance.inputElement.nativeElement);
        fixture.detectChanges();

        expect(fixture.componentInstance.dateRangeComponent['internalStartControl'].value).toEqual(new Date('3-4-2019'));
        expect(fixture.componentInstance.dateRangeComponent['internalEndControl'].value).toEqual(new Date('3-8-2019'));
        expect.assertions(4);
      });

    });

  });


  describe(`emitters`, function() {

    test(`should pass correct values when fired`, function() {
      const fixture = createComponent(testComponents.Emitters);
      fixture.detectChanges();
      const startInputInstance = fixture.debugElement.queryAll(By.css('ts-input'))[0].componentInstance;
      const endInputInstance = fixture.debugElement.queryAll(By.css('ts-input'))[1].componentInstance;

      typeInElement('3-4-2019', startInputInstance.inputElement.nativeElement);
      fixture.detectChanges();
      expect(fixture.componentInstance.startSelected).toHaveBeenCalledWith(new Date('3-4-2019'));
      expect(fixture.componentInstance.change).toHaveBeenCalledWith({start: new Date('3-4-2019'), end: null});

      typeInElement('3-8-2019', endInputInstance.inputElement.nativeElement);
      fixture.detectChanges();
      expect(fixture.componentInstance.endSelected).toHaveBeenCalledWith(new Date('3-8-2019'));
      expect(fixture.componentInstance.change).toHaveBeenCalledWith({start: new Date('3-4-2019'), end: new Date('3-8-2019')});

      expect.assertions(4);
    });

  });


  describe(`input component`, function() {

    test(`should receive all needed parameters from the date range component`, function() {
      const fixture = createComponent(testComponents.Params);
      const hostInstance = fixture.componentInstance;
      fixture.detectChanges();
      const startInputInstance = fixture.debugElement.queryAll(By.css('ts-input'))[0].componentInstance;
      const endInputInstance = fixture.debugElement.queryAll(By.css('ts-input'))[1].componentInstance;

      expect(endInputInstance.maxDate).toEqual(hostInstance.endMax);
      expect(endInputInstance.minDate).toEqual(hostInstance.endMin);

      expect(startInputInstance.isDisabled).toEqual(true);
      expect(endInputInstance.isDisabled).toEqual(true);

      expect(startInputInstance.startingView).toEqual(hostInstance.startingView);
      expect(endInputInstance.startingView).toEqual(hostInstance.startingView);

      expect(startInputInstance.maxDate).toEqual(hostInstance.startMax);
      expect(startInputInstance.minDate).toEqual(hostInstance.startMin);

      expect(startInputInstance.theme).toEqual(hostInstance.theme);
      expect(endInputInstance.theme).toEqual(hostInstance.theme);

      expect.assertions(10);
    });

  });


  test(`should work without a form group`, function() {
    const fixture = createComponent(testComponents.NoFormGroup);
    fixture.detectChanges();
    const startInputInstance = fixture.debugElement.queryAll(By.css('ts-input'))[0].componentInstance;
    typeInElement('3-4-2019', startInputInstance.inputElement.nativeElement);
    fixture.detectChanges();

    expect(fixture.componentInstance.startSelected).toHaveBeenCalled();
  });

});




/**
 * HELPERS
 */

// TODO: Move to ngx-tools (and all other instances of this utility)
export function createComponent<T>(component: Type<T>, providers: Provider[] = [], imports: any[] = []): ComponentFixture<T> {
  TestBed.configureTestingModule({
    imports: [
      ReactiveFormsModule,
      TsDateRangeModule,
      ...imports,
    ],
    declarations: [component],
    providers: [
      ...providers,
    ],
  }).compileComponents();

  return TestBed.createComponent<T>(component);
}
