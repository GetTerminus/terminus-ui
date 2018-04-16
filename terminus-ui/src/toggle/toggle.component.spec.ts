import {
  TsToggleComponent,
  CUSTOM_TOGGLE_CONTROL_VALUE_ACCESSOR,
} from './toggle.component';


describe(`ToggleComponent`, () => {
  let component: TsToggleComponent;

  beforeEach(() => {
    component = new TsToggleComponent();
  });


  it(`should exist`, () => {
    expect(component).toBeTruthy();
  });


  describe(`Custom select control value accessor`, () => {

    it(`should forward a reference to this component`, () => {
      expect(CUSTOM_TOGGLE_CONTROL_VALUE_ACCESSOR.useExisting()).toEqual(TsToggleComponent);
    });

  });

});
