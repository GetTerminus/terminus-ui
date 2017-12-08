import { TsDateRangeComponent } from './date-range.component';


describe(`TsDateRangeComponent`, () => {

  beforeEach(() => {
    this.component = new TsDateRangeComponent();
  });


  it(`should exist`, () => {
    expect(this.component).toBeTruthy();
  });


  describe(`startInitialDate`, () => {

    it(`should set the startDate`, () => {
      const newDate = new Date();
      this.component.startInitialDate = newDate;
      expect(this.component.startDate).toEqual(newDate);
    });

  });


  describe(`endInitialDate`, () => {

    it(`should set the endDate`, () => {
      const newDate = new Date();
      this.component.endInitialDate = newDate;
      expect(this.component.endDate).toEqual(newDate);
    });

  });


  describe(`startDateSelected()`, () => {

    it(`should not emit event if no date is passed in`, () => {
      this.component.startSelected.emit = jasmine.createSpy('emit');

      this.component.startDateSelected();
      expect(this.component.startSelected.emit).not.toHaveBeenCalled();
    });


    it(`should set the startDate`, () => {
      const date = new Date(2017, 4, 1);
      expect(this.component.startDate).toEqual(undefined);

      this.component.startDateSelected(date);
      expect(this.component.startDate).toEqual(date);
    });


    it(`should clear the endDate if the new start is after the current end`, () => {
      this.component.startDate = new Date(2017, 4, 1);
      this.component.endDate = new Date(2017, 4, 2);
      this.component.end = {
        resetValue: jasmine.createSpy('resetValue'),
      };

      this.component.startDateSelected(new Date(2017, 4, 3));
      expect(this.component.endDate).toEqual(null);
      expect(this.component.end.resetValue).toHaveBeenCalled();
    });


    it(`should emit the startSelected event`, () => {
      this.component.startSelected.emit = jasmine.createSpy('emit');
      const date = new Date(2017, 4, 1);

      this.component.startDateSelected(date);
      expect(this.component.startSelected.emit).toHaveBeenCalled();
    });


    it(`should emit the selectedDate event`, () => {
      this.component.selectedDate.emit = jasmine.createSpy('emit');
      const date = new Date(2017, 4, 1);

      this.component.startDateSelected(date);
      expect(this.component.selectedDate.emit).toHaveBeenCalled();
    });

  });


  describe(`endDateSelected()`, () => {

    it(`should not emit if no date was passed in`, () => {
      this.component.endSelected.emit = jasmine.createSpy('emit');

      this.component.endDateSelected();

      expect(this.component.endDate).toEqual(undefined);
      expect(this.component.endSelected.emit).not.toHaveBeenCalled();
    });


    it(`should set the endDate and emit the endSelected event`, () => {
      this.component.endSelected.emit = jasmine.createSpy('emit');
      const date = new Date(2017, 4, 1);

      expect(this.component.endDate).toEqual(undefined);
      this.component.endDateSelected(date);

      expect(this.component.endDate).toEqual(date);
      expect(this.component.endSelected.emit).toHaveBeenCalled();
    });


    it(`should set the endDate and emit the selectedDate event`, () => {
      this.component.selectedDate.emit = jasmine.createSpy('emit');
      const date = new Date(2017, 4, 1);

      this.component.endDateSelected(date);
      expect(this.component.selectedDate.emit).toHaveBeenCalled();
    });

  });


  describe(`dateRange()`, () => {

    it(`should return the date range object`, () => {
      this.component.startDate = new Date(2017, 4, 1);
      this.component.endDate = new Date(2017, 4, 2);
      const actual = this.component.dateRange;

      expect(actual).toEqual(jasmine.any(Object));
      expect(actual.start).toEqual(this.component.startDate)
    });


    it(`should return null if no date is found`, () => {
      this.component.startDate = new Date(2017, 4, 1);
      const actual = this.component.dateRange;

      expect(actual.start).toEqual(this.component.startDate)
      expect(actual.end).toEqual(null);
    });

  });

});
