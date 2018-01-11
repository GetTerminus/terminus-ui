import {
  TsCheckboxComponent,
  CUSTOM_CHECKBOX_CONTROL_VALUE_ACCESSOR,
} from './checkbox.component';


describe(`TsCheckboxComponent`, () => {

  beforeEach(() => {
    this.component = new TsCheckboxComponent();
  });


  it(`should exist`, () => {
    expect(this.component).toBeTruthy();
  });


  describe(`Custom checkbox control value accessor`, () => {

    it(`should forward a reference to this component`, () => {
      expect(CUSTOM_CHECKBOX_CONTROL_VALUE_ACCESSOR.useExisting()).toEqual(TsCheckboxComponent);
    });

  });

});
