import { TsReactiveFormBaseComponent } from './reactive-form-base.component';


const METHOD_MOCK = () => 'foo';

describe(`TsReactiveFormBaseComponent`, () => {

  beforeEach(() => {
    this.component = new TsReactiveFormBaseComponent();
  });


  // FIXME: Currently our coverage reporting includes spec files. This test gets us to 100%
  // coverage. We should ultimately fix our reporting so that only non-spec files count against our
  // coverage report.
  describe(`METHOD_MOCK`, () => {

    it(`should verify the testing utility`, () => {
      expect(METHOD_MOCK()).toEqual('foo');
    });

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
      this.component.onChangeCallback = jest.fn();
      this.component.value = VALUE;
      expect(this.component.innerValue).toEqual(VALUE);
      expect(this.component.onChangeCallback).toHaveBeenCalled();
    });


    it(`should not fire callback if the value is the same as innerValue`, () => {
      const VALUE = 'bar';
      this.component.onChangeCallback = jest.fn();
      this.component.innerValue = VALUE;
      this.component.value = VALUE;
      expect(this.component.onChangeCallback).not.toHaveBeenCalled();
    });

  });


  describe(`onBlur()`, () => {

    it(`should call the onTouchedCallback`, () => {
      this.component.onTouchedCallback = jest.fn();
      this.component.onBlur();
      expect(this.component.onTouchedCallback).toHaveBeenCalled();
    });

  });


  describe(`registerOnChange()`, () => {

    it(`should assign the passed in method`, () => {
      this.component.registerOnChange(METHOD_MOCK);
      expect(this.component.onChangeCallback).toEqual(METHOD_MOCK);
    });

  });


  describe(`registerOnTouched()`, () => {

    it(`should assign the passed in method`, () => {
      this.component.registerOnTouched(METHOD_MOCK);
      expect(this.component.onTouchedCallback).toEqual(METHOD_MOCK);
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
