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


  describe(`reset()`, () => {

    it(`should clear the value`, () => {
      const VALUE = 'foo';

      this.component.value = VALUE;
      expect(this.component.value).toEqual(VALUE);

      this.component.reset();
      expect(this.component.value).toEqual('');
    });

  });


  describe(`Custom select control value accessor`, () => {

    it(`should forward a reference to this component`, () => {
      expect(CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR.useExisting()).toEqual(TsInputComponent);
    });

  });

});
