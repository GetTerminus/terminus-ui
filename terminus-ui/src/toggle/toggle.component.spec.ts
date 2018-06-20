import {
  TsToggleComponent,
  CUSTOM_TOGGLE_CONTROL_VALUE_ACCESSOR,
} from './toggle.component';


describe(`ToggleComponent`, () => {
  let component: TsToggleComponent;

  beforeEach(() => {
    component = new TsToggleComponent();
  });


  test(`should exist`, () => {
    expect(component).toBeTruthy();
  });


  describe(`Custom select control value accessor`, () => {

    test(`should forward a reference to this component`, () => {
      expect(CUSTOM_TOGGLE_CONTROL_VALUE_ACCESSOR.useExisting()).toEqual(TsToggleComponent);
    });

  });


  describe(`isChecked`, () => {

    test(`should set the underlying model value`, () => {
      // NOTE: The inherited base class defaults the internal model to a string
      expect(component.value).toBeFalsy();
      expect(component.isChecked).toEqual(false);
      component.isChecked = true;
      expect(component.isChecked).toEqual(true);
      expect(component.value).toEqual(true);
    });

  });

});
