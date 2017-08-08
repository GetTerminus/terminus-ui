import { TsReactiveFormBaseComponent } from './reactive-form-base.component';


describe(`TsReactiveFormBaseComponent`, () => {

  beforeEach(() => {
    this.component = new TsReactiveFormBaseComponent();
  });


  it(`should exist`, () => {
    expect(this.component).toBeTruthy();
  });


  describe(`get value()`, () => {

    it(`should return the innerValue`, () => {
      const VALUE = 'foo';
      this.component.innerValue = VALUE;
      expect(this.component.value).toEqual(VALUE);
    });

  });


  describe(`set value()`, () => {

    it(`should set the inner value and call the callback`, () => {
      const VALUE = 'bar';
      this.component.onChangeCallback = jasmine.createSpy('onChangeCallback');
      this.component.value = VALUE;
      expect(this.component.innerValue).toEqual(VALUE);
      expect(this.component.onChangeCallback).toHaveBeenCalled();
    });

  });


  describe(`onBlur()`, () => {

    it(`should call the onTouchedCallback`, () => {
      this.component.onTouchedCallback = jasmine.createSpy('onTouchedCallback');
      this.component.onBlur();
      expect(this.component.onTouchedCallback).toHaveBeenCalled();
    });

  });


  describe(`writeValue()`, () => {

    it(`should save the value to innerValue`, () => {
      const VALUE = 'baz';
      this.component.writeValue(VALUE);

      expect(this.component.innerValue).toEqual(VALUE);
    });

  });

});
