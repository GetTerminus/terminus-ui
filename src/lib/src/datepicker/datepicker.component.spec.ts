import {
  TsDatepickerComponent,
  CUSTOM_DATEPICKER_CONTROL_VALUE_ACCESSOR,
} from './datepicker.component';


describe(`TsDatepickerComponent`, () => {

  beforeEach(() => {
    this.component = new TsDatepickerComponent();
  });


  it(`should exist`, () => {
    expect(this.component).toBeTruthy();
  });


  describe(`Custom select control value accessor`, () => {

    it(`should forward a reference to this component`, () => {
      expect(CUSTOM_DATEPICKER_CONTROL_VALUE_ACCESSOR.useExisting()).toEqual(TsDatepickerComponent);
    });

  });


  describe(`set maxDate()`, () => {

    beforeEach(() => {
      this.dateMock = new Date(2017, 4, 10);
      this.component.verifyIsDateObject =
        jasmine.createSpy('verifyIsDateObject').and.returnValue(this.dateMock);
    });


    it(`should convert the date and set when different`, () => {
      this.component.maxDate = this.dateMock;

      expect(this.component.verifyIsDateObject).toHaveBeenCalledWith(this.dateMock);
      expect(this.component._maxDate).toEqual(this.dateMock);
    });

  });


  describe(`set minDate()`, () => {

    beforeEach(() => {
      this.dateMock = new Date(2017, 4, 10);
      this.component.verifyIsDateObject =
        jasmine.createSpy('verifyIsDateObject').and.returnValue(this.dateMock);
    });


    it(`should convert the date and set when different`, () => {
      this.component.minDate = this.dateMock;

      expect(this.component.verifyIsDateObject).toHaveBeenCalledWith(this.dateMock);
      expect(this.component._minDate).toEqual(this.dateMock);
    });

  });


  describe(`set initialDate()`, () => {

    beforeEach(() => {
      this.dateMock = new Date(2017, 4, 10);
      this.component.verifyIsDateObject =
        jasmine.createSpy('verifyIsDateObject').and.returnValue(this.dateMock);
    });


    it(`should convert the date and set when different`, () => {
      this.component.initialDate = this.dateMock;

      expect(this.component.verifyIsDateObject).toHaveBeenCalledWith(this.dateMock);
      expect(this.component._initialDate).toEqual(this.dateMock);
    });

  });


  describe(`ngOnInit()`, () => {
    const date = new Date(1990, 3, 1);

    it(`should seed the date if an initial date exist`, () => {
      expect(this.component.value).toBeFalsy();

      this.component._initialDate = date;
      this.component.ngOnInit();

      expect(this.component.value).toEqual(date);
    });

  });


  describe(`resetValue()`, () => {

    it(`should reset the input value`, () => {
      this.component.value = new Date(1990, 3, 1);
      expect(this.component.value.toString()).toBeTruthy();

      this.component.resetValue();

      expect(this.component.value).toEqual(null);
    });

  });


  describe(`verifyIsDateObject()`, () => {

    it(`should convert an ISO string to a Date object`, () => {
      const date = new Date();
      const dateString = date.toISOString();

      expect(this.component.verifyIsDateObject(dateString)).toEqual(date);

      const dateString2 = '2017-1-1';
      const date2 = new Date(dateString2);

      expect(this.component.verifyIsDateObject(dateString2)).toEqual(date2);
    });


    it(`should simply return a passed in date object`, () => {
      const date = new Date();

      expect(this.component.verifyIsDateObject(date)).toEqual(date);
    });

  });

});
