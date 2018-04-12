import {
  TsDatepickerComponent,
  CUSTOM_DATEPICKER_CONTROL_VALUE_ACCESSOR,
} from './datepicker.component';


describe(`TsDatepickerComponent`, () => {
  let component: TsDatepickerComponent;

  beforeEach(() => {
    component = new TsDatepickerComponent();
  });


  test(`should exist`, () => {
    expect(component).toBeTruthy();
  });


  describe(`Custom select control value accessor`, () => {

    test(`should forward a reference to this component`, () => {
      expect(CUSTOM_DATEPICKER_CONTROL_VALUE_ACCESSOR.useExisting()).toEqual(TsDatepickerComponent);
    });

  });


  describe(`set maxDate()`, () => {

    test(`should return undefined if no value is passed in`, () => {
      component['verifyIsDateObject'] = jest.fn();
      component.maxDate = null as any;

      expect(component['verifyIsDateObject']).not.toHaveBeenCalled();
    });


    test(`should convert the date and set when different`, () => {
      const dateMock = new Date(2017, 4, 10);
      component['verifyIsDateObject'] =
        jest.fn().mockReturnValue(dateMock);
      component.maxDate = dateMock;

      expect(component['verifyIsDateObject']).toHaveBeenCalledWith(dateMock);
      expect(component._maxDate).toEqual(dateMock);
    });

  });


  describe(`set minDate()`, () => {

    test(`should return undefined if no value is passed in`, () => {
      component['verifyIsDateObject'] = jest.fn();
      component.minDate = null as any;

      expect(component['verifyIsDateObject']).not.toHaveBeenCalled();
    });


    test(`should convert the date and set when different`, () => {
      const dateMock = new Date(2017, 4, 10);
      component['verifyIsDateObject'] =
        jest.fn().mockReturnValue(dateMock);
      component.minDate = dateMock;

      expect(component['verifyIsDateObject']).toHaveBeenCalledWith(dateMock);
      expect(component._minDate).toEqual(dateMock);
    });

  });


  describe(`set initialDate()`, () => {

    test(`should return undefined if no value is passed in`, () => {
      component['verifyIsDateObject'] = jest.fn();
      component.initialDate = null as any;

      expect(component['verifyIsDateObject']).not.toHaveBeenCalled();
    });


    test(`should convert the date and set when different`, () => {
      const dateMock = new Date(2017, 4, 10);
      component['verifyIsDateObject'] =
        jest.fn().mockReturnValue(dateMock);
      component.initialDate = dateMock;

      expect(component['verifyIsDateObject']).toHaveBeenCalledWith(dateMock);
      expect(component._initialDate).toEqual(dateMock);
    });

  });


  describe(`ngOnInit()`, () => {

    test(`should seed the date if an initial date exist`, () => {
      const date = new Date(1990, 3, 1);
      expect(component.value).toBeFalsy();

      component._initialDate = date;
      component.ngOnInit();

      expect(component.value).toEqual(date);
    });

  });


  describe(`resetValue()`, () => {

    test(`should reset the input value`, () => {
      component.value = new Date(1990, 3, 1);
      expect(component.value.toString()).toBeTruthy();

      component.resetValue();

      expect(component.value).toEqual(null);
    });

  });


  describe(`verifyIsDateObject()`, () => {

    test(`should convert an ISO string to a Date object`, () => {
      const date = new Date();
      const dateString = date.toISOString();

      expect(component['verifyIsDateObject'](dateString)).toEqual(date);

      const dateString2 = '2017-1-1';
      const date2 = new Date(dateString2);

      expect(component['verifyIsDateObject'](dateString2)).toEqual(date2);
    });


    test(`should simply return a passed in date object`, () => {
      const date = new Date();

      expect(component['verifyIsDateObject'](date)).toEqual(date);
    });

  });

});
