import {
  ElementRef,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatAutocompleteTrigger,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import createMockInstance from 'jest-create-mock-instance';

import { TsAutocompleteComponent } from './autocomplete.component';


describe(`TsAutocompleteComponent`, () => {
  let component: TsAutocompleteComponent;
  const opt1 = {id: 1};
  let trigger: jest.Mocked<MatAutocompleteTrigger>;

  beforeEach(() => {
    trigger = createMockInstance(MatAutocompleteTrigger);
    component = new TsAutocompleteComponent();
    component['trigger'] = trigger;
    component.input = new ElementRef({});
  });

  afterEach(() => {
    component = null;
  });


  test(`should exist`, () => {
    expect(component).toBeTruthy();
  });


  describe(`autocompleteTrigger`, () => {

    test(`should should set/get the trigger component`, () => {
      component['trigger'] = null;
      expect(component['trigger']).toBeFalsy();

      component.autocompleteTrigger = trigger;
      expect(component['trigger']).toBeTruthy();
      expect(component.autocompleteTrigger).toBeTruthy();
    });

  });


  describe(`debounceDelay`, () => {

    test(`should set the debounceDelay`, () => {
      component.debounceDelay = 10;
      expect(component.debounceDelay).toEqual(10);
    });


    test(`should set the debounceDelay to 0`, () => {
      component.debounceDelay = 0;
      expect(component.debounceDelay).toEqual(0);
    });


    test(`should not set if the value is null`, () => {
      component.debounceDelay = null;
      expect(component.debounceDelay).toEqual(200);
    });

  });


  describe(`displayWith`, () => {

    test(`should return undefined if no value is passed in`, () => {
      // tslint:disable: prefer-const
      let foo;
      // tslint:enable: prefer-const
      expect(component.displayWith = foo).toEqual(undefined);
    });


    test(`should set/get the uiFormatFn`, () => {
      const myFn = (v: any) => v.id;
      component.displayWith = myFn;
      expect(component.displayWith).toEqual(myFn);
    });


    test(`should throw an error in dev mode when passed a value that is not a function`, () => {
      expect(() => {component.displayWith = 3 as any; })
        .toThrowError(`TsAutocompleteComponent: 'displayWith' must be passed a function.`);
    });

  });


  describe(`multiple`, () => {

    test(`should return undefined if no value is passed in`, () => {
      // tslint:disable: prefer-const
      let foo;
      // tslint:enable: prefer-const
      expect(component.multiple = foo).toEqual(undefined);
    });


    test(`should set/get the uiFormatFn`, () => {
      const myFn = (v: any) => v.id;
      component.multiple = myFn;
      expect(component.multiple).toEqual(myFn);
    });


    test(`should throw an error in dev mode when passed a value that is not a function`, () => {
      expect(() => {component.multiple = 3 as any; })
        .toThrowError(`TsAutocompleteComponent: 'multiple' must be passed a 'TsAutocompleteComparatorFn' function.`);
    });

  });


  describe(`initialSelections`, () => {

    test(`should seed the selectedOptions array`, () => {
      expect(component.selectedOptions.length).toEqual(0);

      component.selectionsControl = new FormControl();
      const initial = [{id: 1}, {id: 2}];
      component.initialSelections = initial;

      expect(component.selectedOptions.length).toEqual(2);
      expect(component.selectionsControl.value.length).toEqual(2);
    });

  });


  describe(`ngAfterViewInit`, () => {

    beforeEach(() => {
      jest.useFakeTimers();
      component.query = {
        next: jest.fn(),
      } as any;
    });

    afterEach(() => {
      (component.query as any).next.mockClear();
    });


    test(`should filter out items that aren't strings`, () => {
      component.ngAfterViewInit();
      component.querySubject.next('foo');
      jest.runAllTimers();

      expect(component.query.next).toHaveBeenCalledWith('foo');
    });


    test(`should debounce the stream`, () => {
      component.ngAfterViewInit();
      component.querySubject.next('f');
      jest.advanceTimersByTime(1);
      component.querySubject.next('fo');
      jest.advanceTimersByTime(1);
      component.querySubject.next('foo');
      jest.runAllTimers();

      expect(component.query.next).toHaveBeenCalledTimes(1);
    });


    test(`should allow debounce to be overridden`, () => {
      component.debounceDelay = 0;
      component.ngAfterViewInit();
      component.querySubject.next('f');
      jest.advanceTimersByTime(1);
      component.querySubject.next('fo');
      jest.advanceTimersByTime(1);
      component.querySubject.next('foo');
      jest.runAllTimers();

      expect(component.query.next).toHaveBeenCalledTimes(3);
    });


    test(`should only pass through a value if different from the previous value`, () => {
      component.ngAfterViewInit();
      component.querySubject.next('f');
      jest.advanceTimersByTime(500);
      component.querySubject.next('f');
      jest.runAllTimers();

      expect(component.query.next).toHaveBeenCalledTimes(1);
    });

  });


  describe(`ngOnDestroy`, () => {

    test(`should unsubscribe from query subscription`, () => {
      component['querySubscription'] = {
        unsubscribe: jest.fn(),
      } as any;
      component.ngOnDestroy();

      expect(component['querySubscription'].unsubscribe).toHaveBeenCalled();
    });

  });


  describe(`selectOption`, () => {
    const event: any = createMockInstance(MatAutocompleteSelectedEvent);
    event.option = {
      value: opt1,
    };

    beforeEach(() => {
      component.selectionsControl = new FormControl();
      component.optionSelected.emit = jest.fn();
      component.selection.emit = jest.fn();
    });


    test(`should add the selection and emit events`, () => {
      component.selectOption(event);

      // check data
      expect(component.selectedOptions).toEqual([opt1]);
      expect(component.selectionsControl.value).toEqual([opt1]);

      // check for both emits
      expect(component.optionSelected.emit).toHaveBeenCalledWith(opt1);
      expect(component.selection.emit).toHaveBeenCalledWith([opt1]);
    });


    test(`should reset the search if multiple selections are allowed`, () => {
      component.multiple = (v: any) => v.id;
      component['resetSearch'] = jest.fn();
      component.selectOption(event);

      expect(component['resetSearch']).toHaveBeenCalled();
    });


    test(`should set a validation error if a duplicate is selected`, () => {
      component.multiple = (v: any) => v.id;
      component.selectedOptions = [opt1];
      component['setDuplicateError'] = jest.fn();
      const result = component.selectOption(event);

      expect(component['setDuplicateError']).toHaveBeenCalled();
      expect(result).toEqual(undefined);
    });

  });


  describe(`deselectOption`, () => {

    beforeEach(() => {
      component.selectionsControl = new FormControl();
      component.optionRemoved.emit = jest.fn();
      component.selection.emit = jest.fn();
      component.initialSelections = [opt1];
    });


    test(`should remove an item from the selections array and form control`, () => {
      expect(component.selectedOptions).toEqual([opt1]);
      expect(component.selectionsControl.value).toEqual([opt1]);

      component.deselectOption(opt1);

      expect(component.selectedOptions).toEqual([]);
      expect(component.selectionsControl.value).toEqual([]);
      expect(component.optionRemoved.emit).toHaveBeenCalledWith(opt1);
      expect(component.selection.emit).toHaveBeenCalledWith([]);
    });


    test(`should return undefined if deselecting an item that doesnt exist`, () => {
      expect(component.selectedOptions).toEqual([opt1]);
      expect(component.selectionsControl.value).toEqual([opt1]);

      const result = component.deselectOption({id: 2});

      expect(result).toEqual(undefined);
      expect(component.selectedOptions).toEqual([opt1]);
      expect(component.selectionsControl.value).toEqual([opt1]);
    });

  });


  describe(`displayOption`, () => {

    test(`should return a value determined by uiFormatFn if it exists`, () => {
      component['uiFormatFn'] = (v: any) => v.id.toString();
      expect(component.displayOption(opt1)).toEqual('1');
    });


    test(`should return the full option if uiFormatFn does not exist`, () => {
      expect(component.displayOption(opt1)).toEqual(opt1);
    });

  });


  describe(`handleBlur`, () => {
    const eventDiv = {
      relatedTarget: {
        nodeName: 'DIV',
      },
    } as any;
    const eventOpt = {
      relatedTarget: {
        nodeName: 'MAT-OPTION',
      },
    } as any;
    const eventNoNode = {
      relatedTarget: {},
    } as MouseEvent;
    const eventNoRelatedTarget = {} as KeyboardEvent;


    beforeEach(() => {
      component.selectionsControl = new FormControl();
      component['resetSearch'] = jest.fn();
    });

    afterEach(() => {
      (component['resetSearch'] as any).mockClear();
    });


    test(`should call resetSearch if there is no event.relatedTarget`, () => {
      expect(component.selectionsControl.touched).toEqual(false);

      component.handleBlur(eventNoRelatedTarget);
      expect(component['resetSearch']).toHaveBeenCalled();
      expect(component.selectionsControl.touched).toEqual(true);
    });


    test(`should call resetSearch if the relatedTarget has no nodeName`, () => {
      component.handleBlur(eventNoNode);
      expect(component['resetSearch']).toHaveBeenCalled();
    });


    test(`should NOT call resetSearch if the nodeName is MAT-OPTION`, () => {
      component.handleBlur(eventOpt);
      expect(component['resetSearch']).not.toHaveBeenCalled();
    });


    test(`should call resetSearch if the nodeName isn't MAT-OPTION`, () => {
      component.handleBlur(eventDiv);
      expect(component['resetSearch']).toHaveBeenCalled();
    });

  });


  describe(`resetSearch`, () => {

    beforeEach(() => {
      component.searchQuery = 'foo';
      component.querySubject.next = jest.fn();
      component.input = {
        nativeElement: {
          value: 'foo',
        },
      };
      component['trigger'] = {
        panelOpen: jest.fn().mockReturnValue(true),
        closePanel: jest.fn(),
      } as any;
    });

    test(`should clear the search everywhere`, () => {
      (component['trigger'].panelOpen as any) = jest.fn().mockReturnValue(false);

      expect(component.searchQuery).toEqual('foo');
      component['resetSearch']();

      expect(component.searchQuery).toEqual('');
      expect(component.querySubject.next).toHaveBeenCalledWith('');
      expect(component.input.nativeElement.value).toEqual('');
    });


    test(`should close the panel if it is open`, () => {
      component['resetSearch']();

      expect(component['trigger'].closePanel).toHaveBeenCalled();
    });

  });


  describe(`setDuplicateError`, () => {
    let formControl: FormControl;
    interface ValidationErr {
      notUnique: {
        valid: boolean;
        actual: any;
      };
    }
    const error: ValidationErr = {
      notUnique: {
        valid: false,
        actual: 1,
      },
    };
    const formatter = (v: any) => v.id;

    beforeEach(() => {
      formControl = new FormControl();
    });


    test(`should set an error on the form control`, () => {
      component['setDuplicateError'](formControl, opt1, formatter);
      expect(formControl.errors).toEqual(error);
    });


    test(`should set actual to the full option if a formatter was not passed in`, () => {
      component['setDuplicateError'](formControl, opt1);
      error.notUnique.actual = opt1;
      expect(formControl.errors).toEqual(error);
    });

  });


});
