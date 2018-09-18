import {
  FormControl,
  Validators,
} from '@angular/forms';
import { ChangeDetectorRefMock } from '@terminus/ngx-tools/testing';

import {
  TsSelectComponent,
  TsSelectFormatFn,
} from './select.component';


describe(`TsSelectComponent`, () => {
  let component: TsSelectComponent;
  let options: any[];

  beforeEach(() => {
    component = new TsSelectComponent(
      new ChangeDetectorRefMock(),
    );
    options = [
      {
        foo: 'foo_value',
        bar: 'Foo Display',
      },
      {
        foo: 'bar_value',
        bar: 'Bar Display',
      },
      {
        foo: 'baz_value',
        bar: 'Baz Display',
      },
    ];
  });


  it(`should exist`, () => {
    expect(component).toBeTruthy();
  });


  describe(`items`, () => {

    test(`should throw an error if items are objects and no formatter fn exists`, () => {
      expect(() => {component.items = [{}, {}]; })
        .toThrowError();
    });


    test(`should not set items if nothing is passed in`, () => {
      component.items = '' as any;
      expect(component.items).toEqual(undefined);
    });

  });


  describe(`checkOpenChange`, () => {

    beforeEach(() => {
      component.formControl = new FormControl();
      component.formControl.markAsTouched = jest.fn();
      component.openedChange.emit = jest.fn();
    });


    test(`should mark the form control as touched if it exists`, () => {
      component.checkOpenChange(false);

      expect(component.formControl.markAsTouched).toHaveBeenCalled();
      expect(component.openedChange.emit).toHaveBeenCalledWith(false);
    });


    test(`should do nothing if the select is closed`, () => {
      component.checkOpenChange(true);

      expect(component.formControl.markAsTouched).not.toHaveBeenCalled();
      expect(component.openedChange.emit).toHaveBeenCalledWith(true);
    });

  });


  describe(`formatUiFn`, () => {

    test(`should return undefined if no value is passed in`, () => {
      // tslint:disable: prefer-const
      let foo;
      // tslint:enable: prefer-const
      expect(component.formatUIFn = foo as any).toEqual(undefined);
    });


    test(`should set/get the uiFormatFn`, () => {
      const myFn: TsSelectFormatFn = (v: any) => v.id;
      component.formatUIFn = myFn;
      expect(component.formatUIFn).toEqual(myFn);
    });


    test(`should throw an error in dev mode when passed a value that is not a function`, () => {
      expect(() => {component.formatUIFn = 3 as any; })
        .toThrowError();
    });

  });


  describe(`formatModelValueFn`, () => {

    test(`should return undefined if no value is passed in`, () => {
      // tslint:disable: prefer-const
      let foo;
      // tslint:enable: prefer-const
      expect(component.formatModelValueFn = foo as any).toEqual(undefined);
    });


    test(`should set/get the formatModelValueFn`, () => {
      const myFn: TsSelectFormatFn = (v: any) => v.id;
      component.formatModelValueFn = myFn;
      expect(component.formatModelValueFn).toEqual(myFn);
    });


    test(`should throw an error in dev mode when passed a value that is not a function`, () => {
      expect(() => {component.formatModelValueFn = 3 as any; })
        .toThrowError();
    });

  });


  describe(`isRequired`, () => {

    test(`should return true if the form group is required`, () => {
      component.formControl = new FormControl(null, Validators.required);
      expect(component.isRequired).toEqual(true);
    });

    test(`should return false if the form group is not required`, () => {
      component.formControl = new FormControl();
      expect(component.isRequired).toEqual(false);
    });

  });


  describe(`retrieveValue`, () => {

    test(`should use a formatter to return a value`, () => {
      const fn1: TsSelectFormatFn = (v: any) => v.foo;
      const val1: string = component.retrieveValue(options[0], fn1);
      expect(val1).toEqual('foo_value');

      const fn2: TsSelectFormatFn = (v: any) => v.bar;
      const val2: string = component.retrieveValue(options[1], fn2);
      expect(val2).toEqual('Bar Display');
    });

    test(`should return the option if no formatter was passed in`, () => {
      expect(component.retrieveValue(options[0])).toEqual(options[0]);
    });

  });


  test(`should trigger change detection on formControl changes`, () => {
    component['changeDetectorRef'].detectChanges = jest.fn();
    component.ngOnInit();
    component.formControl.setValue('foo');

    expect(component['changeDetectorRef'].detectChanges).toHaveBeenCalled();
  });

});
