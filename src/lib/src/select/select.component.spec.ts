import { FormControl } from '@angular/forms';

import {
  TsSelectComponent,
  CUSTOM_SELECT_CONTROL_VALUE_ACCESSOR,
} from './select.component';


describe(`TsSelectComponent`, () => {

  beforeEach(() => {
    this.component = new TsSelectComponent();
  });


  it(`should exist`, () => {
    expect(this.component).toBeTruthy();
  });


  describe(`getValueKey()`, () => {

    it(`should return the item if no valueKey was passed in`, () => {
      const items = ['a', 'b'];

      expect(this.component.getValueKey(items[0])).toEqual('a');
      expect(this.component.getValueKey(items[1])).toEqual('b');
    });


    it(`should return the correct value for the valueKey`, () => {
      const items = [
        {
          name: 'AAA',
          thing: 'aaa',
        },
        {
          name: 'BBB',
          thing: 'bbb',
        },
      ];

      expect(this.component.getValueKey(items[0], 'thing')).toEqual('aaa');
    });

    it(`should return one item if no valueKey provided`, () => {
      const items = [
        {
          name: 'abc',
          url: 'http://abc.com',
        },
        {
          name: 'xyz',
          url: 'http://xyz.com',
        },
      ];

      expect(this.component.getValueKey(items[0])).toEqual(items[0]);
    })

  });


  describe(`Custom select control value accessor`, () => {

    it(`should forward a reference to this component`, () => {
      expect(CUSTOM_SELECT_CONTROL_VALUE_ACCESSOR.useExisting()).toEqual(TsSelectComponent);
    });

  });


  describe(`checkOpenChange`, () => {

    beforeEach(() => {
      this.component.formControl = new FormControl();
      this.component.formControl.markAsTouched = jest.fn();
      this.component.openedChange.emit = jest.fn();
    });


    test(`should mark the form control as touched if it exists`, () => {
      this.component.checkOpenChange(false);

      expect(this.component.formControl.markAsTouched).toHaveBeenCalled();
      expect(this.component.openedChange.emit).toHaveBeenCalledWith(false);
    });


    test(`should do nothing if the select is closed`, () => {
      this.component.checkOpenChange(true);

      expect(this.component.formControl.markAsTouched).not.toHaveBeenCalled();
      expect(this.component.openedChange.emit).toHaveBeenCalledWith(true);
    });

  });

});
