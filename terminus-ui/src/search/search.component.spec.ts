// tslint:disable: no-non-null-assertion
import { FormBuilder } from '@angular/forms';

import { TsSearchComponent } from './search.component';


describe('TsSearchComponent', () => {
  let component: TsSearchComponent;

  beforeEach(() => {
    component = new TsSearchComponent(new FormBuilder());
  });


  it(`should exist`, () => {
    expect(component).toBeTruthy();
  });


  describe(`currentQuery`, () => {

    it(`should return the current query with no trailing or leading whitespace`, () => {
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

    it(`should seed the query with an initial value if one exists`, () => {
      const STRING = 'foo';
      component.initialValue = STRING;
      expect(component.query).toEqual('');

      component.ngOnInit();

      expect(component.searchForm.get('query')!.value).toEqual(STRING);
    });

  });


  describe(`emitSubmit()`, () => {

    it(`should emit an event if the form is valid`, () => {
      component.submitted.emit = jest.fn();
      component.initialValue = 'foo';
      component.ngOnInit();
      component.emitSubmit();

      expect(component.submitted.emit).toHaveBeenCalledWith({query: 'foo'});
    });

  });


  describe(`keyup()`, () => {

    beforeEach(() => {
      component.changed.emit = jest.fn();
      component.debouncedEmit = jest.fn();
    });


    it(`should emit each change`, () => {
      component.initialValue = 'foo';
      component.ngOnInit();
      component.keyup();

      expect(component.changed.emit).toHaveBeenCalledWith('foo');
      expect(component.debouncedEmit).not.toHaveBeenCalled();
    });


    describe(`with auto submit enabled`, () => {

      it(`should call the debounced emit if the form is valid`, () => {
        component.autoSubmit = true;
        component.initialValue = 'foo';
        component.ngOnInit();
        component.keyup();

        expect(component.debouncedEmit).toHaveBeenCalled();
      });


      it(`should NOT call the debounced emit if the form is NOT valid`, () => {
        component.autoSubmit = true;
        component.initialValue = 'foo&';
        component.ngOnInit();
        component.keyup();

        expect(component.debouncedEmit).not.toHaveBeenCalled();
      });

    });


    describe(`without auto submit enabled`, () => {

      it(`should NOT call the debounced emit even if the form is valid`, () => {
        component.autoSubmit = false;
        component.initialValue = 'foo';
        component.ngOnInit();
        component.keyup();

        expect(component.debouncedEmit).not.toHaveBeenCalled();
      });

    });

  });

});
