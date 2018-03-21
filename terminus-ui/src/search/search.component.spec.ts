import { FormBuilder } from '@angular/forms';

import { TsSearchComponent } from './search.component';


describe('TsSearchComponent', () => {

  beforeEach(() => {
    this.component = new TsSearchComponent(new FormBuilder());
  });


  it(`should exist`, () => {
    expect(this.component).toBeTruthy();
  });


  describe(`currentQuery`, () => {

    it(`should return the current query with no trailing or leading whitespace`, () => {
      this.component.initialValue = 'foo';
      this.component.ngOnInit();
      expect(this.component.currentQuery).toEqual('foo');

      this.component.searchForm.patchValue({
        query: ' foo 23 ',
      });
      expect(this.component.currentQuery).toEqual('foo 23');

      this.component.searchForm.patchValue({
        query: null,
      });
      expect(this.component.currentQuery).toEqual('');
    });

  });


  describe(`ngOnInit()`, () => {

    it(`should seed the query with an initial value if one exists`, () => {
      const STRING = 'foo';
      this.component.initialValue = STRING;
      expect(this.component.query).toEqual('');

      this.component.ngOnInit();

      expect(this.component.searchForm.get('query').value).toEqual(STRING);
    });

  });


  describe(`emitSubmit()`, () => {

    beforeEach(() => {
      this.component.submitted.emit = jest.fn();
    });


    it(`should emit an event if the form is valid`, () => {
      this.component.initialValue = 'foo';
      this.component.ngOnInit();
      this.component.emitSubmit();

      expect(this.component.submitted.emit).toHaveBeenCalledWith({query: 'foo'});
    });


    it(`should NOT emit an event if the form is NOT valid`, () => {
      this.component.initialValue = 'f';
      this.component.ngOnInit();
      this.component.emitSubmit();
      expect(this.component.submitted.emit).not.toHaveBeenCalled();

      this.component.initialValue = 'fo.o';
      this.component.ngOnInit();
      this.component.emitSubmit();
      expect(this.component.submitted.emit).not.toHaveBeenCalled();
    });

  });


  describe(`keyup()`, () => {

    beforeEach(() => {
      this.component.changed.emit = jest.fn();
      this.component.debouncedEmit = jest.fn();
    });


    it(`should emit each change`, () => {
      this.component.initialValue = 'foo';
      this.component.ngOnInit();
      this.component.keyup();

      expect(this.component.changed.emit).toHaveBeenCalledWith('foo');
      expect(this.component.debouncedEmit).not.toHaveBeenCalled();
    });


    describe(`with auto submit enabled`, () => {

      it(`should call the debounced emit if the form is valid`, () => {
        this.component.autoSubmit = true;
        this.component.initialValue = 'foo';
        this.component.ngOnInit();
        this.component.keyup();

        expect(this.component.debouncedEmit).toHaveBeenCalled();
      });


      it(`should NOT call the debounced emit if the form is NOT valid`, () => {
        this.component.autoSubmit = true;
        this.component.initialValue = 'foo&';
        this.component.ngOnInit();
        this.component.keyup();

        expect(this.component.debouncedEmit).not.toHaveBeenCalled();
      });

    });


    describe(`without auto submit enabled`, () => {

      it(`should NOT call the debounced emit even if the form is valid`, () => {
        this.component.autoSubmit = false;
        this.component.initialValue = 'foo';
        this.component.ngOnInit();
        this.component.keyup();

        expect(this.component.debouncedEmit).not.toHaveBeenCalled();
      });

    });

  });

});
