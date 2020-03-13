import { TsReactiveFormBaseComponent } from './reactive-form-base.component';

const METHOD_MOCK = () => 'foo';

describe(`TsReactiveFormBaseComponent`, function() {
  let component: TsReactiveFormBaseComponent;

  beforeEach(() => {
    component = new TsReactiveFormBaseComponent();
  });

  test(`should exist`, () => {
    expect(component).toBeTruthy();
  });

  describe(`get value()`, () => {
    test(`should return the innerValue`, () => {
      const VALUE = 'foo';
      component['innerValue'] = VALUE;
      expect(component.value).toEqual(VALUE);
    });
  });

  test(`should have a form control by default`, () => {
    expect(component.formControl).toBeTruthy();
  });

  describe(`set value()`, () => {
    test(`should set the inner value and call the callback`, () => {
      const VALUE = 'bar';
      component['onChangeCallback'] = jest.fn();
      component.value = VALUE;
      expect(component['innerValue']).toEqual(VALUE);
      expect(component['onChangeCallback']).toHaveBeenCalled();
    });

    test(`should not fire callback if the value is the same as innerValue`, () => {
      const VALUE = 'bar';
      component['onChangeCallback'] = jest.fn();
      component['innerValue'] = VALUE;
      component.value = VALUE;
      expect(component['onChangeCallback']).not.toHaveBeenCalled();
    });
  });

  describe(`onBlur()`, () => {
    test(`should call the onTouchedCallback`, () => {
      component['onTouchedCallback'] = jest.fn();
      component.onBlur();
      expect(component['onTouchedCallback']).toHaveBeenCalled();
    });
  });

  describe(`registerOnChange()`, () => {
    test(`should assign the passed in method`, () => {
      component['registerOnChange'](METHOD_MOCK);
      expect(component['onChangeCallback']).toEqual(METHOD_MOCK);
    });
  });

  describe(`registerOnTouched()`, () => {
    test(`should assign the passed in method`, () => {
      component['registerOnTouched'](METHOD_MOCK);
      expect(component['onTouchedCallback']).toEqual(METHOD_MOCK);
    });
  });

  describe(`writeValue()`, () => {
    test(`should save the value to innerValue`, () => {
      const VALUE = 'baz';
      component['writeValue'](VALUE);

      expect(component['innerValue']).toEqual(VALUE);
    });
  });
});
