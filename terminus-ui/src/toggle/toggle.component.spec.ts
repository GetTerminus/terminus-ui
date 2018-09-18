import { TsToggleComponent } from './toggle.component';


describe(`ToggleComponent`, () => {
  let component: TsToggleComponent;

  beforeEach(() => {
    component = new TsToggleComponent();
  });


  test(`should exist`, () => {
    expect(component).toBeTruthy();
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
