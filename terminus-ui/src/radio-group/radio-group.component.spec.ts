import { FormControl } from '@angular/forms';
import { ChangeDetectorRefMock } from '@terminus/ngx-tools/testing';

import { TsRadioOption } from './../utilities/interfaces/radio-option.interface';
import {
  TsRadioGroupComponent,
  CUSTOM_RADIO_CONTROL_VALUE_ACCESSOR,
} from './radio-group.component';


describe('TsRadioGroupComponent', () => {
  let component: TsRadioGroupComponent;
  let options: TsRadioOption[];

  beforeEach(() => {
    component = new TsRadioGroupComponent(new ChangeDetectorRefMock());
    options = [
      {
        value: 'foo',
        displayValue: 'FOO',
      },
      {
        value: 'bar',
        displayValue: 'BAR',
        checked: true,
      },
      {
        value: 'baz',
        displayValue: 'BAZ',
        checked: true,
      },
    ];
  });


  test(`should exist`, () => {
    expect(component).toBeTruthy();
    options = undefined;
  });


  describe(`Custom radio control value accessor`, () => {

    test(`should forward a reference to this component`, () => {
      expect(CUSTOM_RADIO_CONTROL_VALUE_ACCESSOR.useExisting()).toEqual(TsRadioGroupComponent);
    });

  });


  describe(`ngOnInit`, () => {

    beforeEach(() => {
      component.options = options;
      component['changeDetectorRef'].markForCheck = jest.fn();
      component.formControl = new FormControl();
    });


    test(`should seed the initial selection`, () => {
      component['defaultSelection'] = jest.fn().mockReturnValue('bar');
      component.ngOnInit();
      const expected = 'bar';

      expect(component['defaultSelection']).toHaveBeenCalled();
      expect(component['changeDetectorRef'].markForCheck).toHaveBeenCalled();
      expect(component.formControl.value).toEqual(expected);
      expect(component.value).toEqual(expected);
    });


    test(`should do nothing if no selection should be checked`, () => {
      component['defaultSelection'] = jest.fn().mockReturnValue(null);
      component.options[1].checked = false;
      component.options[2].checked = false;
      component.ngOnInit();

      expect(component['defaultSelection']).toHaveBeenCalled();
      expect(component['changeDetectorRef'].markForCheck).not.toHaveBeenCalled();
      expect(component.value).toEqual('');
    });

  });


  describe(`defaultSelection`, () => {

    test(`should return the value of the first option found with checked=true`, () => {
      const actual = component['defaultSelection'](options);
      expect(actual).toEqual('bar');
    });


    test(`should return the value of the first option found with checked=true`, () => {
      const myOpts = options;
      myOpts[1].checked = false;
      myOpts[2].checked = false;
      const actual = component['defaultSelection'](myOpts);

      expect(actual).toEqual(null);
    });

  });

});
