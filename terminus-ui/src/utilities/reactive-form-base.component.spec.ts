import { TsReactiveFormBaseComponent } from './reactive-form-base.component';


const METHOD_MOCK = () => 'foo';

describe(`TsReactiveFormBaseComponent`, () => {
  let component: TsReactiveFormBaseComponent;

  beforeEach(() => {
    component = new TsReactiveFormBaseComponent();
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
    expect(component).toBeTruthy();
  });


  describe(`get value()`, () => {

    it(`should return the innerValue`, () => {
      const VALUE = 'foo';
      component['innerValue'] = VALUE;
      expect(component.value).toEqual(VALUE);
    });

  });


  describe(`set value()`, () => {

    it(`should set the inner value and call the callback`, () => {
      const VALUE = 'bar';
      component['onChangeCallback'] = jest.fn();
      component.value = VALUE;
      expect(component['innerValue']).toEqual(VALUE);
      expect(component['onChangeCallback']).toHaveBeenCalled();
    });


    it(`should not fire callback if the value is the same as innerValue`, () => {
      const VALUE = 'bar';
      component['onChangeCallback'] = jest.fn();
      component['innerValue'] = VALUE;
      component.value = VALUE;
      expect(component['onChangeCallback']).not.toHaveBeenCalled();
    });

  });


  describe(`onBlur()`, () => {

    it(`should call the onTouchedCallback`, () => {
      component['onTouchedCallback'] = jest.fn();
      component.onBlur();
      expect(component['onTouchedCallback']).toHaveBeenCalled();
    });

  });


  describe(`registerOnChange()`, () => {

    it(`should assign the passed in method`, () => {
      component['registerOnChange'](METHOD_MOCK);
      expect(component['onChangeCallback']).toEqual(METHOD_MOCK);
    });

  });


  describe(`registerOnTouched()`, () => {

    it(`should assign the passed in method`, () => {
      component['registerOnTouched'](METHOD_MOCK);
      expect(component['onTouchedCallback']).toEqual(METHOD_MOCK);
    });

  });


  describe(`writeValue()`, () => {

    it(`should save the value to innerValue`, () => {
      const VALUE = 'baz';
      component['writeValue'](VALUE);

      expect(component['innerValue']).toEqual(VALUE);
    });

  });

});
