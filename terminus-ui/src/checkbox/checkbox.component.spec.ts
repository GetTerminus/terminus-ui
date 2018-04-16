import { ChangeDetectorRefMock } from '@terminus/ngx-tools/testing';

import {
  TsCheckboxComponent,
  CUSTOM_CHECKBOX_CONTROL_VALUE_ACCESSOR,
} from './checkbox.component';


describe(`TsCheckboxComponent`, () => {
  let component: TsCheckboxComponent;

  beforeEach(() => {
    component = new TsCheckboxComponent(
      new ChangeDetectorRefMock(),
    );

    // Stub in MatCheckbox
    component.checkbox = {
      checked: false,
      toggle: jest.fn(),
    } as any;
  });


  it(`should exist`, () => {
    expect(component).toBeTruthy();
  });


  describe(`Custom checkbox control value accessor`, () => {

    it(`should forward a reference to this component`, () => {
      expect(CUSTOM_CHECKBOX_CONTROL_VALUE_ACCESSOR.useExisting()).toEqual(TsCheckboxComponent);
    });

  });


  describe(`set isChecked`, () => {

    test(`should set checkbox.checked value`, () => {
      expect(component.checkbox.checked).toEqual(false);

      component.isChecked = true;

      expect(component.checkbox.checked).toEqual(true);
    });

  });


  describe(`get isChecked`, () => {

    test(`should return the checkbox.checked value`, () => {
      component.checkbox.checked = true;

      expect(component.isChecked).toEqual(true);
    });

  });


  describe(`set ngModel`, () => {

    test(`should set the private variable`, () => {
      expect(component['_isChecked']).toEqual(false);

      component.ngModel = true;

      expect(component['_isChecked']).toEqual(true);
    });

  });


  describe(`ngAfterViewInit`, () => {

    test(`should set the checkbox.checked value if true`, () => {
      component['_isChecked'] = true;
      expect(component.checkbox.checked).toEqual(false);

      component.ngAfterViewInit();

      expect(component.checkbox.checked).toEqual(true);
    });

  });

});
