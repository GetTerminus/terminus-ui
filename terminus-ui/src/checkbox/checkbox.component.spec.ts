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


  describe(`id`, () => {

    test(`should have a default ID and allow a custom ID`, () => {
      expect(component.id.indexOf('ts-checkbox') >= 0).toEqual(true);
      component.id = 'foo';
      expect(component.id).toEqual('foo');
    });
  });


  describe(`isChecked`, () => {

    test(`should set/get checked value`, () => {
      expect(component.isChecked).toEqual(false);

      component.isChecked = true;

      expect(component.value).toEqual(true);
    });

  });


  describe(`set ngModel`, () => {

    test(`should set the private variable`, () => {
      expect(component['_isChecked']).toEqual(false);

      component.ngModel = true;

      expect(component['_isChecked']).toEqual(true);
    });

  });

});
