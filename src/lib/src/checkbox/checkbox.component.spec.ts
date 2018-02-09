import {
  TsCheckboxComponent,
  CUSTOM_CHECKBOX_CONTROL_VALUE_ACCESSOR,
} from './checkbox.component';
import { ChangeDetectorRefMock } from './../utilities/testing/mocks/changeDetectorRef.mock';


describe(`TsCheckboxComponent`, () => {

  beforeEach(() => {
    this.component = new TsCheckboxComponent(
      new ChangeDetectorRefMock(),
    );

    // Stub in MatCheckbox
    this.component.checkbox = {
      checked: false,
      toggle: jest.fn(),
    };
  });


  it(`should exist`, () => {
    expect(this.component).toBeTruthy();
  });


  describe(`Custom checkbox control value accessor`, () => {

    it(`should forward a reference to this component`, () => {
      expect(CUSTOM_CHECKBOX_CONTROL_VALUE_ACCESSOR.useExisting()).toEqual(TsCheckboxComponent);
    });

  });


  describe(`set isChecked`, () => {

    test(`should set checkbox.checked value`, () => {
      expect(this.component.checkbox.checked).toEqual(false);

      this.component.isChecked = true;

      expect(this.component.checkbox.checked).toEqual(true);
    });

  });


  describe(`get isChecked`, () => {

    test(`should return the checkbox.checked value`, () => {
      this.component.checkbox.checked = true;

      expect(this.component.isChecked).toEqual(true);
    });

  });


  describe(`set ngModel`, () => {

    test(`should set the private variable`, () => {
      expect(this.component._isChecked).toEqual(false);

      this.component.ngModel = true;

      expect(this.component._isChecked).toEqual(true);
    });

  });


  describe(`ngAfterViewInit`, () => {

    test(`should set the checkbox.checked value if true`, () => {
      this.component._isChecked = true;
      expect(this.component.checkbox.checked).toEqual(false);

      this.component.ngAfterViewInit();

      expect(this.component.checkbox.checked).toEqual(true);
    });

  });

});
