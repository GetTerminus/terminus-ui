import { TsDatepickerComponent } from './datepicker.component';


describe(`TsDatepickerComponent`, () => {

  beforeEach(() => {
    this.component = new TsDatepickerComponent();
  });


  it(`should exist`, () => {
    expect(this.component).toBeTruthy();
  });


  describe(`ngOnChanges()`, () => {
    const date = new Date(1990, 3, 1);

    it(`should seed the date if an initial date exist`, () => {
      expect(this.component.value).toBeFalsy();

      this.component.initialDate = date;
      this.component.ngOnChanges();

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

});
