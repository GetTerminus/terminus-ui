import {
  FormControl,
  Validators,
} from '@angular/forms';
import {
  TsInputComponent,
  CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR,
} from './input.component';


describe(`TsInputComponent`, () => {

  beforeEach(() => {
    this.component = new TsInputComponent();
  });


  it(`should exist`, () => {
    expect(this.component).toBeTruthy();
  });


  describe(`Custom select control value accessor`, () => {

    it(`should forward a reference to this component`, () => {
      expect(CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR.useExisting()).toEqual(TsInputComponent);
    });

  });


  describe(`requiredAttribute`, () => {

    test(`should return 'required' when the form control is required`, () => {
      this.component.formControl = new FormControl(null, Validators.required);

      expect(this.component.requiredAttribute).toEqual('required');
    });


    test(`should return 'required' when 'isRequired' is true`, () => {
      this.component.isRequired = true;

      expect(this.component.requiredAttribute).toEqual('required');
    });


    test(`should return null when the input is not required`, () => {
      expect(this.component.requiredAttribute).toEqual(null);
    });

  });


  describe(`reset()`, () => {

    it(`should clear the value`, () => {
      const VALUE = 'foo';

      this.component.value = VALUE;
      expect(this.component.value).toEqual(VALUE);

      this.component.reset();
      expect(this.component.value).toEqual('');
    });

  });

});
