import {
  TsToggleComponent,
  CUSTOM_TOGGLE_CONTROL_VALUE_ACCESSOR,
} from '@toggle/toggle.component';


describe(`ToggleComponent`, () => {

  beforeEach(() => {
    this.component = new TsToggleComponent();
  });


  it(`should exist`, () => {
    expect(this.component).toBeTruthy();
  });


  describe(`Custom select control value accessor`, () => {

    it(`should forward a reference to this component`, () => {
      expect(CUSTOM_TOGGLE_CONTROL_VALUE_ACCESSOR.useExisting()).toEqual(TsToggleComponent);
    });

  });

});
