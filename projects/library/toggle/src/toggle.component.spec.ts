import { TsToggleComponent } from './toggle.component';

describe(`ToggleComponent`, function() {
  let component: TsToggleComponent;

  beforeEach(() => {
    component = new TsToggleComponent();
  });

  test(`should exist`, () => {
    expect(component).toBeTruthy();
  });

  describe(`isDisabled`, () => {
    test(`should set and retrieve`, () => {
      component.isDisabled = true;
      expect(component.isDisabled).toEqual(true);
    });
  });

  describe(`isRequired`, () => {
    test(`should set and retrieve`, () => {
      component.isRequired = true;
      expect(component.isRequired).toEqual(true);
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
