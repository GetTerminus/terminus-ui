// tslint:disable: no-non-null-assertion
import { FormBuilder } from '@angular/forms';

import { TsSearchComponent } from './search.component';


describe('TsSearchComponent', () => {
  let component: TsSearchComponent;

  beforeEach(() => {
    component = new TsSearchComponent(new FormBuilder());
  });


  test(`should exist`, () => {
    expect(component).toBeTruthy();
  });


  describe(`currentQuery`, () => {

    test(`should return the current query with no trailing or leading whitespace`, () => {
      component.initialValue = 'foo';
      component.ngOnInit();
      expect(component.currentQuery).toEqual('foo');

      component.searchForm.patchValue({
        query: ' foo 23 ',
      });
      expect(component.currentQuery).toEqual('foo 23');

      component.searchForm.patchValue({
        query: null,
      });
      expect(component.currentQuery).toEqual('');
    });

  });


  describe(`ngOnInit()`, () => {

    test(`should seed the query with an initial value if one exists`, () => {
      const STRING = 'foo';
      component.initialValue = STRING;
      expect(component.query).toEqual('');

      component.ngOnInit();

      expect(component.searchForm.get('query')!.value).toEqual(STRING);
    });

  });


  describe(`keyup()`, () => {

    beforeEach(() => {
      component.changed.emit = jest.fn();
      component['debouncedEmit'] = jest.fn();
    });


    test(`should emit each change`, () => {
      component.initialValue = 'foo';
      component.ngOnInit();
      component.keyup();

      expect(component.changed.emit).toHaveBeenCalledWith('foo');
      expect(component['debouncedEmit']).not.toHaveBeenCalled();
    });


    describe(`with auto submit enabled`, () => {

      test(`should call the debounced emit if the form is valid`, () => {
        component.autoSubmit = true;
        component.initialValue = 'foo';
        component.ngOnInit();
        component.keyup();

        expect(component['debouncedEmit']).toHaveBeenCalled();
      });


      test(`should NOT call the debounced emit if the form is NOT valid`, () => {
        component.autoSubmit = true;
        component.initialValue = 'foo&';
        component.ngOnInit();
        component.keyup();

        expect(component['debouncedEmit']).not.toHaveBeenCalled();
      });

    });


    describe(`without auto submit enabled`, () => {

      test(`should NOT call the debounced emit even if the form is valid`, () => {
        component.autoSubmit = false;
        component.initialValue = 'foo';
        component.ngOnInit();
        component.keyup();

        expect(component['debouncedEmit']).not.toHaveBeenCalled();
      });

    });

  });


  describe(`emitSubmit()`, () => {

    beforeEach(() => {
      component.submitted.emit = jest.fn();
      component.initialValue = 'foo';
      component.ngOnInit();
    });


    test(`should emit an event if the form is valid`, () => {
      component['emitSubmit']();

      expect(component.submitted.emit).toHaveBeenCalledWith({query: 'foo'});
    });


    test(`should call emitSubmit via debouncedEmit`, () => {
      jest.useFakeTimers();
      component['debouncedEmit']();
      jest.runAllTimers();

      expect(component.submitted.emit).toHaveBeenCalledWith({query: 'foo'});
    });

  });

});
