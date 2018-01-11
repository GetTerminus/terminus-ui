import {
  TsRadioGroupComponent,
  CUSTOM_RADIO_CONTROL_VALUE_ACCESSOR,
} from './radio-group.component';


describe('TsRadioGroupComponent', () => {

  beforeEach(() => {
    this.component = new TsRadioGroupComponent();
  });


  it(`should exist`, () => {
    expect(this.component).toBeTruthy();
  });


  describe(`Custom radio control value accessor`, () => {

    it(`should forward a reference to this component`, () => {
      expect(CUSTOM_RADIO_CONTROL_VALUE_ACCESSOR.useExisting()).toEqual(TsRadioGroupComponent);
    });

  });

});
