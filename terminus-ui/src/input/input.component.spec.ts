import { Injector } from '@angular/core';
import {
  FormControl,
  Validators,
} from '@angular/forms';
import { ChangeDetectorRefMock } from '@terminus/ngx-tools/testing';

import {
  TsInputComponent,
  CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR,
} from './input.component';


describe(`TsInputComponent`, () => {
  let component: TsInputComponent;

  beforeEach(() => {
    component = new TsInputComponent(
      new ChangeDetectorRefMock(),
      {
        get: jest.fn().mockReturnValue({
          control: {
            disable: jest.fn(),
            enable: jest.fn(),
          },
        }),
      } as Injector,
    );
    component['changeDetectorRef'].markForCheck = jest.fn();
  });


  it(`should exist`, () => {
    expect(component).toBeTruthy();
  });


  describe(`Custom select control value accessor`, () => {

    it(`should forward a reference to this component`, () => {
      expect(CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR.useExisting()).toEqual(TsInputComponent);
    });

  });


  describe(`requiredAttribute`, () => {

    test(`should return 'required' when the form control is required`, () => {
      component.formControl = new FormControl(null, Validators.required);

      expect(component.requiredAttribute).toEqual('required');
    });


    test(`should return 'required' when 'isRequired' is true`, () => {
      component.isRequired = true;

      expect(component.requiredAttribute).toEqual('required');
    });


    test(`should return null when the input is not required`, () => {
      expect(component.requiredAttribute).toEqual(null);
    });

  });


  describe(`isDisabled`, () => {

    test(`should set the control to disabled`, () => {
      jest.useFakeTimers();
      component.matInput = {
        ngControl: {},
      } as any;
      component.ngAfterContentInit();
      expect(component.matInput.ngControl).toBeTruthy();
      expect(component.isDisabled).toEqual(false);

      component.isDisabled = true;
      jest.runAllTimers();

      expect(component.isDisabled).toEqual(true);
      expect(component.matInput.ngControl.control.disable).toHaveBeenCalled();
    });

  });


  describe(`reset()`, () => {

    it(`should clear the value`, () => {
      const VALUE = 'foo';
      component.cleared.emit = jest.fn();

      component.value = VALUE;
      expect(component.value).toEqual(VALUE);

      component.reset();
      expect(component.value).toEqual(null);
      expect(component.cleared.emit).toHaveBeenCalledWith(true);
      expect(component['changeDetectorRef'].markForCheck).toHaveBeenCalled();
    });

  });

});
